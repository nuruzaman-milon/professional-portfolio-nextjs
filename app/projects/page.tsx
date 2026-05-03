"use client";

import { useRef, useState, useMemo, useCallback, useTransition } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { projects } from "@/data/projects";
import ImageCarousel from "@/components/custom/ImageCarosel";
import { useDebounce } from "@/hooks/useDebounce";
import Container from "@/components/Container";

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

// ─── Static data derived once at module level ─────────────────────────────────
const ALL_STACKS = Array.from(new Set(projects.flatMap((p) => p.stack))).sort();

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function applyFilters(
  query: string,
  activeStack: string | null,
  sort: SortValue,
) {
  let list = [...projects];
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.some((t) => t.toLowerCase().includes(q)),
    );
  }
  if (activeStack) list = list.filter((p) => p.stack.includes(activeStack));
  switch (sort) {
    case "az":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      list.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "newest":
      list.sort(
        (a, b) => +new Date(b.completedDate) - +new Date(a.completedDate),
      );
      break;
    case "oldest":
      list.sort(
        (a, b) => +new Date(a.completedDate) - +new Date(b.completedDate),
      );
      break;
  }
  return list;
}

export default function ProjectsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [inputValue, setInputValue] = useState("");
  const [activeStack, setActiveStack] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // 350ms debounce — search fires after user stops typing
  const debouncedQuery = useDebounce(inputValue.trim().toLowerCase(), 350);

  // useTransition — marks filter/sort state updates as non-urgent
  const [isPending, startTransition] = useTransition();

  const handleStackClick = useCallback((tech: string) => {
    startTransition(() =>
      setActiveStack((prev) => (prev === tech ? null : tech)),
    );
  }, []);

  const handleSort = useCallback((val: SortValue) => {
    startTransition(() => setSort(val));
  }, []);

  const clearAll = useCallback(() => {
    setInputValue("");
    startTransition(() => {
      setActiveStack(null);
      setSort("default");
    });
  }, []);

  const filtered = useMemo(
    () => applyFilters(debouncedQuery, activeStack, sort),
    [debouncedQuery, activeStack, sort],
  );

  const hasFilters =
    debouncedQuery !== "" || activeStack !== null || sort !== "default";
  const isSearching = inputValue.trim().toLowerCase() !== debouncedQuery;

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
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
            "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(16,185,129,.12) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10">
        <Container>
          {/* ── Back link ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light"
            >
              <ArrowLeft size={15} /> Back to home
            </Link>
          </motion.div>

          {/* ── Search + Filter bar ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-8 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1">
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
                           focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-600
                           transition-colors duration-200"
                />
                {isSearching ? (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce"
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

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => handleSort(e.target.value as SortValue)}
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
                              ? "border-emerald-400/60 dark:border-emerald-600/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-500/[0.06]"
                              : "border-gray-200/80 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-white/[0.04] hover:border-emerald-400/40"
                          }`}
              >
                <SlidersHorizontal size={13} />
                Filter
                {activeStack && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            </div>

            {/* Stack pills — pure CSS transition, zero Framer Motion overhead */}
            {filtersOpen && (
              <div>
                <div className="flex flex-wrap gap-2 pt-1 pb-0.5">
                  {ALL_STACKS.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleStackClick(tech)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors duration-150 border
                              ${
                                activeStack === tech
                                  ? "border-emerald-400/70 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : "border-gray-200/70 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 hover:border-emerald-300/50 hover:text-emerald-600 dark:hover:text-emerald-400"
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
                  {isPending
                    ? "…"
                    : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
                  {activeStack && (
                    <>
                      {" "}
                      · <span className="text-emerald-500">{activeStack}</span>
                    </>
                  )}
                  {debouncedQuery && <> · "{debouncedQuery}"</>}
                </span>
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-gray-400 hover:text-emerald-500 transition-colors duration-150"
                >
                  <X size={11} /> Clear all
                </button>
              </div>
            )}
          </motion.div>

          {/* ── Project cards ── */}
          <div className="relative">
            {isPending && (
              <div className="absolute inset-0 z-10 rounded-xl pointer-events-none bg-white/10 dark:bg-black/10" />
            )}

            <AnimatePresence mode="wait" initial={false}>
              {filtered.length > 0 ? (
                <motion.div
                  key={`${debouncedQuery}-${activeStack}-${sort}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-6"
                >
                  {filtered.map((project, i) => (
                    <motion.div
                      key={project.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      className="group grid lg:grid-cols-[2fr_3fr] gap-0 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-colors duration-300"
                    >
                      <ImageCarousel
                        images={project.images}
                        title={project.title}
                        index={i}
                      />

                      <div className="flex flex-col p-7">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400">
                            {project.label}
                          </span>
                          <div className="flex items-center gap-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="soc !w-8 !h-8"
                              >
                                <Github size={14} />
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Live site"
                                className="soc !w-8 !h-8"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                          {project.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-4">
                          {project.description}
                        </p>

                        <ul className="space-y-1 mb-5">
                          {project.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 font-light"
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400/70 flex-shrink-0" />
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
                                            ? "border-emerald-400/70 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : "border-gray-200/60 dark:border-white/[0.08] bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 hover:border-emerald-300/50 hover:text-emerald-500"
                                        }`}
                            >
                              {tech}
                            </button>
                          ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="cta-link"
                          >
                            View case study <ArrowUpRight size={13} />
                          </Link>
                          <span className="text-[10px] font-mono text-gray-300 dark:text-gray-700">
                            {new Date(project.completedDate).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" },
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col items-center justify-center py-24 gap-4 text-center"
                >
                  <div className="w-12 h-12 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] flex items-center justify-center text-gray-300 dark:text-gray-700">
                    <Search size={20} />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                    No projects match{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      "{debouncedQuery || activeStack}"
                    </span>
                  </p>
                  <button onClick={clearAll} className="cta-link text-xs">
                    Clear filters <X size={11} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom back link ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            transition={{ delay: 0.35 }}
            className="mt-20 pt-10 border-t border-gray-200/40 dark:border-white/[0.06]"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light"
            >
              <ArrowLeft size={15} /> Back to home
            </Link>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
