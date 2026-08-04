"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowUpRight,
  Search,
  X,
  Filter,
} from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { useDebounce } from "@/hooks/useDebounce";
import type { PostListItemDTO, PostsPageDTO } from "@/lib/content";

const POSTS_PER_PAGE = 6;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogListClient({
  initialPosts,
  initialTotal,
  initialHasMore,
  categories,
  allTags,
}: {
  initialPosts: PostListItemDTO[];
  initialTotal: number;
  initialHasMore: boolean;
  categories: string[];
  allTags: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // ── Filters ──
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // 350ms debounce — search hits the API after the user stops typing
  const debouncedQuery = useDebounce(searchQuery.trim().toLowerCase(), 350);
  const isSearching = searchQuery.trim().toLowerCase() !== debouncedQuery;

  // ── Server-paginated list ──
  const [posts, setPosts] = useState(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const buildParams = useCallback(
    (offset: number) => {
      const params = new URLSearchParams();
      if (debouncedQuery) params.set("q", debouncedQuery);
      if (selectedCategory !== "All") params.set("category", selectedCategory);
      if (selectedTag !== "All") params.set("tag", selectedTag);
      if (sortBy !== "newest") params.set("sort", sortBy);
      params.set("offset", String(offset));
      params.set("limit", String(POSTS_PER_PAGE));
      return params.toString();
    },
    [debouncedQuery, selectedCategory, selectedTag, sortBy],
  );

  // guards stale appends: loadMore only applies its result if the filters
  // haven't changed while the request was in flight
  const filterKey = `${debouncedQuery}|${selectedCategory}|${selectedTag}|${sortBy}`;
  const filterKeyRef = useRef(filterKey);
  useEffect(() => {
    filterKeyRef.current = filterKey;
  });

  // any filter/sort change → refetch page one (skip the SSR'd initial state)
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const controller = new AbortController();
    setRefreshing(true);
    fetch(`/api/blog?${buildParams(0)}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<PostsPageDTO>;
      })
      .then((data) => {
        setPosts(data.posts);
        setTotal(data.total);
        setHasMore(data.hasMore);
        setRefreshing(false);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setRefreshing(false);
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedCategory, selectedTag, sortBy]);

  const loadingRef = useRef(false);
  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);
    const key = filterKeyRef.current;
    try {
      const res = await fetch(`/api/blog?${buildParams(posts.length)}`);
      if (res.ok) {
        const data: PostsPageDTO = await res.json();
        if (filterKeyRef.current === key) {
          setPosts((prev) => [...prev, ...data.posts]);
          setTotal(data.total);
          setHasMore(data.hasMore);
        }
      }
    } catch {
      // network hiccup — the sentinel retriggers on the next scroll
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  }, [buildParams, posts.length]);

  // ── Infinite scroll sentinel ──
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !refreshing) loadMore();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, refreshing, loadMore]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag("All");
    setSortBy("newest");
  };

  const hasActiveFilters =
    debouncedQuery !== "" ||
    selectedCategory !== "All" ||
    selectedTag !== "All" ||
    sortBy !== "newest";

  const selectTag = (tag: string) => {
    setSelectedTag(tag);
    if (!showFilters) setShowFilters(true);
  };

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      {/* Grid overlay */}
      <div className="pf-grid absolute inset-0 z-0" />

      {/* Ambient orb — top right */}
      <div
        className="absolute pointer-events-none z-0 opacity-25"
        style={{
          top: "5%",
          right: "-8%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.15) 0%, transparent 70%)",
        }}
      />

      {/* Ambient orb — bottom left */}
      <div
        className="absolute pointer-events-none z-0 opacity-15"
        style={{
          bottom: "15%",
          left: "-6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10">
        <Container>
          {/* ── Back link ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
            >
              <ArrowLeft size={15} /> Back to home
            </Link>
          </motion.div>

          {/* ── Header ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-12"
          >
            <span className="sec-label">Blog</span>
            <h1 className="pf-serif font-normal leading-[1.08] text-gray-900 dark:text-white text-5xl md:text-6xl mt-3 mb-5">
              Every post,
              <br />
              <span className="em-g">written</span>{" "}
              <span className="pf-script font-medium text-4xl md:text-5xl relative inline-block -rotate-2 align-middle ml-1">
                in public.
                {/* hand-drawn underline swoosh */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-teal-500 dark:text-teal-400"
                  viewBox="0 0 120 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 6 C 30 2, 62 7, 118 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-[1.85] max-w-md">
              Insights, tutorials, and lessons learned building on the modern
              web.
            </p>
          </motion.div>

          {/* ── Search + Filter bar ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-12 space-y-4"
          >
            {/* Search + Sort row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-200/80 dark:border-white/[0.08]
                             bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm
                             text-sm text-gray-900 dark:text-white
                             placeholder:text-gray-400 dark:placeholder:text-gray-600
                             focus:outline-none focus:border-teal-400 dark:focus:border-teal-700
                             transition-colors duration-200"
                />
                {isSearching || refreshing ? (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1 h-1 rounded-full bg-teal-400 animate-bounce"
                        style={{ animationDelay: `${d * 0.12}s` }}
                      />
                    ))}
                  </span>
                ) : searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X size={13} />
                  </button>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 pr-7 rounded-lg border border-gray-200/80 dark:border-white/[0.08]
                           bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm
                           text-[11px] font-mono tracking-wide text-gray-600 dark:text-gray-400
                           focus:outline-none focus:border-teal-400 dark:focus:border-teal-700
                           transition-colors duration-200 cursor-pointer appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="shortest">Shortest</option>
                <option value="longest">Longest</option>
              </select>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`h-10 px-3.5 rounded-lg border text-[11px] font-mono tracking-wide
                            flex items-center gap-2 transition-colors duration-200
                            ${
                              showFilters ||
                              selectedCategory !== "All" ||
                              selectedTag !== "All"
                                ? "border-teal-400/60 dark:border-teal-700/50 text-teal-700 dark:text-teal-400 bg-teal-50/60 dark:bg-teal-600/[0.06]"
                                : "border-gray-200/80 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-white/[0.04] hover:border-teal-400/40"
                            }`}
              >
                <Filter size={13} />
                Filter
                {(selectedCategory !== "All" || selectedTag !== "All") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                )}
              </button>
              </div>
            </div>

            {/* Filter pills */}
            {showFilters && (
              <div className="space-y-3 pt-1">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400 mr-1">
                    Category
                  </span>
                  {["All", ...categories].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors duration-150 border
                                  ${
                                    selectedCategory === category
                                      ? "border-teal-400/70 bg-teal-50 dark:bg-teal-600/10 text-teal-700 dark:text-teal-400"
                                      : "border-gray-200/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 hover:border-teal-300/50 hover:text-teal-700 dark:hover:text-teal-400"
                                  }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400 mr-1">
                    Tag
                  </span>
                  {["All", ...allTags].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors duration-150 border
                                  ${
                                    selectedTag === tag
                                      ? "border-teal-400/70 bg-teal-50 dark:bg-teal-600/10 text-teal-700 dark:text-teal-400"
                                      : "border-gray-200/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 hover:border-teal-300/50 hover:text-teal-700 dark:hover:text-teal-400"
                                  }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter summary */}
            {hasActiveFilters && (
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <span>
                  {refreshing
                    ? "…"
                    : `${total} result${total !== 1 ? "s" : ""}`}
                  {selectedCategory !== "All" && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-teal-600">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                  {selectedTag !== "All" && (
                    <>
                      {" "}
                      · <span className="text-teal-600">{selectedTag}</span>
                    </>
                  )}
                  {debouncedQuery && <> · "{debouncedQuery}"</>}
                </span>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-gray-400 hover:text-teal-600 transition-colors duration-150"
                >
                  <X size={11} /> Clear all
                </button>
              </div>
            )}
          </motion.div>

          {/* ── Posts — one per row, infinite scroll ── */}
          {posts.length > 0 ? (
            <div className="relative">
              {refreshing && (
                <div className="absolute inset-0 z-10 rounded-xl pointer-events-none bg-white/10 dark:bg-black/10" />
              )}

              <motion.div
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                className="space-y-6"
              >
                {posts.map((post, idx) => {
                  const isFeatured = !hasActiveFilters && idx === 0;
                  return (
                    <article
                      key={post.id}
                      className="group grid lg:grid-cols-[2fr_3fr] rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-[border-color] duration-300"
                    >
                      {/* Image pane — framed and centered, not stretched full height */}
                      <div className="relative flex items-center p-4 sm:p-5">
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10 bg-gray-100 dark:bg-gray-800/50">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Badges — dark-glass category (+ featured on the first post) */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            {isFeatured && (
                              <span className="px-2.5 py-1 rounded-lg bg-teal-700 text-white text-[10px] font-mono tracking-[.12em] uppercase">
                                Featured
                              </span>
                            )}
                            <span className="px-2.5 py-1 rounded-lg bg-gray-900/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[.12em] uppercase text-teal-300">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col grow p-5 sm:p-7 lg:pl-2">
                        {/* serif title, links to the article */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group/title inline-flex items-start gap-2 mb-2.5 self-start"
                        >
                          <h2 className="pf-serif text-xl sm:text-2xl font-normal text-gray-900 dark:text-white leading-snug group-hover/title:text-teal-700 dark:group-hover/title:text-teal-300 transition-colors duration-200">
                            {post.title}
                          </h2>
                          <ArrowUpRight
                            size={18}
                            className="mt-1.5 flex-shrink-0 text-gray-400 group-hover/title:text-teal-600 dark:group-hover/title:text-teal-400 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all duration-200"
                          />
                        </Link>

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {post.tags.slice(0, 4).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => selectTag(tag)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors duration-150 border cursor-pointer
                                          ${
                                            selectedTag === tag
                                              ? "border-teal-400/70 bg-teal-50 dark:bg-teal-600/10 text-teal-700 dark:text-teal-400"
                                              : "border-gray-200/60 dark:border-white/[0.08] bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 hover:border-teal-300/50 hover:text-teal-600"
                                          }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>

                        {/* footer — date + read time + cta */}
                        <div className="mt-auto pt-4 border-t border-gray-200/60 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} />
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} />
                              {post.readTime}
                            </span>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="cta-link"
                          >
                            Read article <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </motion.div>

              {/* infinite-scroll sentinel — triggers the next page fetch */}
              <div ref={sentinelRef} className="h-px" />

              {loadingMore && (
                <div className="mt-10 flex items-center justify-center gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"
                      style={{ animationDelay: `${d * 0.12}s` }}
                    />
                  ))}
                </div>
              )}

              {!hasMore && total > POSTS_PER_PAGE && (
                <p className="mt-10 text-center text-[10px] font-mono tracking-[.18em] uppercase text-gray-400 dark:text-gray-600">
                  That's all {total} posts
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-12 h-12 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] flex items-center justify-center text-gray-300 dark:text-gray-700">
                <Search size={20} />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No articles match{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  "{debouncedQuery || selectedCategory || selectedTag}"
                </span>
              </p>
              <button onClick={clearFilters} className="cta-link text-xs">
                Clear filters <X size={11} />
              </button>
            </div>
          )}

          {/* ── Bottom back link ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            transition={{ delay: 0.35 }}
            className="mt-16 flex flex-col items-center gap-5"
          >
            <div className="hl w-full" />
            <Button variant="ghost" href="/">
              <ArrowLeft size={14} /> Back to home
            </Button>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
