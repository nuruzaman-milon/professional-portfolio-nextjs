"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import type { ProjectListItemDTO, ProjectsPageDTO } from "@/lib/content";
import ImageCarousel from "@/components/custom/ImageCarosel";
import { useDebounce } from "@/hooks/useDebounce";
import Container from "@/components/Container";
import Button from "@/components/Button";

const PROJECTS_PER_PAGE = 6;

// hairline-glass icon chip — same primitive as the homepage Projects cards
const ICON_CHIP =
  "w-8 h-8 rounded-lg border border-black/[0.08] bg-white/60 text-gray-500 hover:text-teal-700 hover:border-teal-700/40 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-teal-400 dark:hover:border-teal-400/40 flex items-center justify-center transition-colors duration-200 flex-shrink-0";

// ─── Variants — lighter, no layout thrash ────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 },
  }),
};

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function ProjectsListClient({
  initialProjects,
  initialTotal,
  initialHasMore,
  stacks,
}: {
  initialProjects: ProjectListItemDTO[];
  initialTotal: number;
  initialHasMore: boolean;
  stacks: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // ── Filters ──
  const [inputValue, setInputValue] = useState("");
  const [activeStack, setActiveStack] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // 350ms debounce — search hits the API after the user stops typing
  const debouncedQuery = useDebounce(inputValue.trim().toLowerCase(), 350);
  const isSearching = inputValue.trim().toLowerCase() !== debouncedQuery;

  // ── Server-paginated list ──
  const [projects, setProjects] = useState(initialProjects);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const buildParams = useCallback(
    (offset: number) => {
      const params = new URLSearchParams();
      if (debouncedQuery) params.set("q", debouncedQuery);
      if (activeStack) params.set("stack", activeStack);
      if (sort !== "default") params.set("sort", sort);
      params.set("offset", String(offset));
      params.set("limit", String(PROJECTS_PER_PAGE));
      return params.toString();
    },
    [debouncedQuery, activeStack, sort],
  );

  // guards stale appends: loadMore only applies its result if the filters
  // haven't changed while the request was in flight
  const filterKey = `${debouncedQuery}|${activeStack}|${sort}`;
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
    fetch(`/api/projects/list?${buildParams(0)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ProjectsPageDTO>;
      })
      .then((data) => {
        setProjects(data.projects);
        setTotal(data.total);
        setHasMore(data.hasMore);
        setRefreshing(false);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setRefreshing(false);
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, activeStack, sort]);

  const loadingRef = useRef(false);
  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);
    const key = filterKeyRef.current;
    try {
      const res = await fetch(`/api/projects/list?${buildParams(projects.length)}`);
      if (res.ok) {
        const data: ProjectsPageDTO = await res.json();
        if (filterKeyRef.current === key) {
          setProjects((prev) => [...prev, ...data.projects]);
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
  }, [buildParams, projects.length]);

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

  const handleStackClick = useCallback((tech: string) => {
    setActiveStack((prev) => (prev === tech ? null : tech));
  }, []);

  const clearAll = useCallback(() => {
    setInputValue("");
    setActiveStack(null);
    setSort("default");
  }, []);

  const hasFilters =
    debouncedQuery !== "" || activeStack !== null || sort !== "default";

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      <div className="pf-grid absolute inset-0 z-0" />
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
            <span className="sec-label">Projects</span>
            <h1 className="pf-serif font-normal leading-[1.08] text-gray-900 dark:text-white text-5xl md:text-6xl mt-3 mb-5">
              The complete
              <br />
              <span className="em-g">archive</span>{" "}
              <span className="pf-script font-medium text-4xl md:text-5xl relative inline-block -rotate-2 align-middle ml-1">
                of work.
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
              Production work — real users, real problems, real constraints.
            </p>
          </motion.div>

          {/* ── Search + Filter bar ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-8 flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search projects or tech..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
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
                ) : inputValue ? (
                  <button
                    onClick={() => setInputValue("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X size={13} />
                  </button>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
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
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              {/* Filter toggle */}
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className={`h-10 px-3.5 rounded-lg border text-[11px] font-mono tracking-wide
                          flex items-center gap-2 transition-colors duration-200
                          ${
                            filtersOpen || activeStack
                              ? "border-teal-400/60 dark:border-teal-700/50 text-teal-700 dark:text-teal-400 bg-teal-50/60 dark:bg-teal-600/[0.06]"
                              : "border-gray-200/80 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-white/[0.04] hover:border-teal-400/40"
                          }`}
              >
                <SlidersHorizontal size={13} />
                Filter
                {activeStack && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                )}
              </button>
              </div>
            </div>

            {/* Stack pills — pure CSS transition, zero Framer Motion overhead */}
            {filtersOpen && (
              <div>
                <div className="flex flex-wrap gap-2 pt-1 pb-0.5">
                  {stacks.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleStackClick(tech)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors duration-150 border
                              ${
                                activeStack === tech
                                  ? "border-teal-400/70 bg-teal-50 dark:bg-teal-600/10 text-teal-700 dark:text-teal-400"
                                  : "border-gray-200/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 hover:border-teal-300/50 hover:text-teal-700 dark:hover:text-teal-400"
                              }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter summary */}
            {hasFilters && (
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <span>
                  {refreshing
                    ? "…"
                    : `${total} result${total !== 1 ? "s" : ""}`}
                  {activeStack && (
                    <>
                      {" "}
                      · <span className="text-teal-600">{activeStack}</span>
                    </>
                  )}
                  {debouncedQuery && <> · "{debouncedQuery}"</>}
                </span>
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-gray-400 hover:text-teal-600 transition-colors duration-150"
                >
                  <X size={11} /> Clear all
                </button>
              </div>
            )}
          </motion.div>

          {/* ── Project cards — infinite scroll ── */}
          {projects.length > 0 ? (
            <div className="relative">
              {refreshing && (
                <div className="absolute inset-0 z-10 rounded-xl pointer-events-none bg-white/10 dark:bg-black/10" />
              )}

              <div className="space-y-6">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    custom={i % PROJECTS_PER_PAGE}
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    className="group grid lg:grid-cols-[2fr_3fr] rounded-xl border border-gray-200/60 dark:border-white/[0.06] bg-white/75 dark:bg-zinc-900/60 overflow-hidden hover:border-teal-300/40 dark:hover:border-teal-800/30 transition-[border-color] duration-300"
                  >
                    {/* Browser-frame screenshots */}
                    <div className="relative flex flex-col p-4 sm:p-5 pb-0 sm:pb-0 lg:pb-5 lg:pr-0">
                      {/* soft glow behind the window */}
                      <div className="absolute inset-6 rounded-full bg-teal-500/15 dark:bg-teal-400/15 blur-3xl pointer-events-none" />
                      <div className="relative flex flex-col flex-1 rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10 shadow-xl bg-white dark:bg-gray-900">
                        {/* browser chrome */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/90 dark:bg-white/[0.06] border-b border-gray-200/70 dark:border-white/[0.06]">
                          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                          <span className="ml-2 flex-1 truncate rounded bg-white/80 dark:bg-white/[0.06] px-2 py-0.5 text-[9px] font-mono text-gray-400 dark:text-gray-500">
                            {project.live
                              ? project.live
                                  .replace(/^https?:\/\//, "")
                                  .replace(/\/.*$/, "")
                              : project.slug}
                          </span>
                        </div>
                        <ImageCarousel
                          images={project.images}
                          title={project.title}
                          index={i}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col p-5 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-3">
                        <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
                          {project.label}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
                          {project.completedDate
                            ? new Date(project.completedDate).toLocaleDateString(
                                "en-US",
                                { month: "short", year: "numeric" },
                              )
                            : "Ongoing"}
                        </span>
                      </div>

                      {/* serif display title (links to the case study) + live link */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="group/title inline-flex items-start gap-2"
                        >
                          <h2 className="pf-serif text-2xl sm:text-[1.75rem] font-normal text-gray-900 dark:text-white leading-snug group-hover/title:text-teal-700 dark:group-hover/title:text-teal-300 transition-colors duration-200">
                            {project.title}
                          </h2>
                          <ArrowUpRight
                            size={18}
                            className="mt-1.5 flex-shrink-0 text-gray-400 group-hover/title:text-teal-600 dark:group-hover/title:text-teal-400 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all duration-200"
                          />
                        </Link>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live site"
                            className={ICON_CHIP}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <ul className="space-y-1.5 mb-5">
                        {project.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <span className="mt-[9px] w-3 h-px bg-teal-500/70 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.stack.map((tech) => (
                          <button
                            key={tech}
                            onClick={() => {
                              handleStackClick(tech);
                              if (!filtersOpen) setFiltersOpen(true);
                            }}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors duration-150 border cursor-pointer
                                      ${
                                        activeStack === tech
                                          ? "border-teal-400/70 bg-teal-50 dark:bg-teal-600/10 text-teal-700 dark:text-teal-400"
                                          : "border-gray-200/60 dark:border-white/[0.08] bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 hover:border-teal-300/50 hover:text-teal-600"
                                      }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-200/60 dark:border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub"
                              className={ICON_CHIP}
                            >
                              <Github size={14} />
                            </a>
                          )}
                        </div>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="cta-link"
                        >
                          View case study <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

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

              {!hasMore && total > PROJECTS_PER_PAGE && (
                <p className="mt-10 text-center text-[10px] font-mono tracking-[.18em] uppercase text-gray-400 dark:text-gray-600">
                  That's all {total} projects
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-12 h-12 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] flex items-center justify-center text-gray-300 dark:text-gray-700">
                <Search size={20} />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No projects match{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  "{debouncedQuery || activeStack}"
                </span>
              </p>
              <button onClick={clearAll} className="cta-link text-xs">
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
