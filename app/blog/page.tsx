"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Search, X, Filter } from "lucide-react";
import Container from "@/components/Container";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];
  const allTags = [
    "All",
    ...Array.from(new Set(blogPosts.flatMap((post) => post.tags))),
  ];

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (selectedTag !== "All") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "shortest":
          return parseInt(a.readTime) - parseInt(b.readTime);
        case "longest":
          return parseInt(b.readTime) - parseInt(a.readTime);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag("All");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "All" ||
    selectedTag !== "All" ||
    sortBy !== "newest";

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden pt-20">
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
            "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(16,185,129,.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Container className="py-12">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light mb-14"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tech <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl font-light">
              Insights, tutorials, and thoughts on modern web development.
              Sharing knowledge about MERN stack, best practices, and emerging
              technologies.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-4">
            {/* Search + Sort row */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
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
                             focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-600
                             transition-colors duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 pr-7 rounded-lg border border-gray-200/80 dark:border-white/[0.08]
                           bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm
                           text-[11px] font-mono tracking-wide text-gray-600 dark:text-gray-400
                           focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-600
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
                                ? "border-emerald-400/60 dark:border-emerald-600/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-500/[0.06]"
                                : "border-gray-200/80 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-white/[0.04] hover:border-emerald-400/40"
                            }`}
              >
                <Filter size={13} />
                Filter
                {(selectedCategory !== "All" || selectedTag !== "All") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            </div>

            {/* Filter pills */}
            {showFilters && (
              <div className="space-y-3 pt-1">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400 mr-1">
                    Category
                  </span>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors duration-150 border
                                  ${
                                    selectedCategory === category
                                      ? "border-emerald-400/70 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                      : "border-gray-200/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 hover:border-emerald-300/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                                  }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400 mr-1">
                    Tag
                  </span>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors duration-150 border
                                  ${
                                    selectedTag === tag
                                      ? "border-emerald-400/70 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                      : "border-gray-200/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 hover:border-emerald-300/50 hover:text-emerald-600 dark:hover:text-emerald-400"
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
                  {filteredPosts.length} result
                  {filteredPosts.length !== 1 ? "s" : ""}
                  {selectedCategory !== "All" && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-emerald-500">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                  {selectedTag !== "All" && (
                    <>
                      {" "}
                      · <span className="text-emerald-500">{selectedTag}</span>
                    </>
                  )}
                  {searchQuery && <> · "{searchQuery}"</>}
                </span>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-gray-400 hover:text-emerald-500 transition-colors duration-150"
                >
                  <X size={11} /> Clear all
                </button>
              </div>
            )}
          </div>

          {/* Featured Post */}
          {!hasActiveFilters && filteredPosts.length > 0 && (
            <div className="group rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-colors duration-300 mb-10">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={filteredPosts[0].image || "/placeholder.svg"}
                    alt={filteredPosts[0].title}
                    width={500}
                    height={300}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-mono tracking-wide rounded-md">
                      Featured
                    </span>
                    <span className="px-3 py-1 border border-emerald-400/50 text-emerald-500 dark:text-emerald-400 text-[11px] font-mono tracking-wide rounded-md">
                      {filteredPosts[0].category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 font-light leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center text-gray-400 dark:text-gray-500 text-xs font-mono mb-6 gap-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      <span>
                        {new Date(filteredPosts[0].date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${filteredPosts[0].slug}`}
                    className="cta-link w-fit"
                  >
                    Read Full Article →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(hasActiveFilters ? filteredPosts : filteredPosts.slice(1)).map(
                (post) => (
                  <article
                    key={post.id}
                    className="group rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-colors duration-300 flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-mono tracking-wide rounded-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center text-gray-400 dark:text-gray-500 text-xs font-mono mb-3 gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 font-light leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setSelectedTag(tag);
                              if (!showFilters) setShowFilters(true);
                            }}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors duration-150 border cursor-pointer
                                        ${
                                          selectedTag === tag
                                            ? "border-emerald-400/70 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : "border-gray-200/60 dark:border-white/[0.08] bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 hover:border-emerald-300/50 hover:text-emerald-500"
                                        }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="cta-link text-sm"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-12 h-12 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] flex items-center justify-center text-gray-300 dark:text-gray-700">
                <Search size={20} />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                No articles match{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  "{searchQuery || selectedCategory || selectedTag}"
                </span>
              </p>
              <button onClick={clearFilters} className="cta-link text-xs">
                Clear filters <X size={11} />
              </button>
            </div>
          )}

          {/* Bottom back link */}
          <div className="mt-20 pt-10 border-t border-gray-200/40 dark:border-white/[0.06]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light"
            >
              <ArrowLeft size={15} /> Back to home
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
