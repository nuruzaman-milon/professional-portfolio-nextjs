"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Container from "./Container";

// ─── Blog data ────────────────────────────────────────────────────────────────
const blogPosts = [
  {
    id: 1,
    slug: "scalable-react-typescript",
    label: "Article · React",
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
    image: "/images/blog-react-typescript.jpg",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "React",
    tags: ["React", "TypeScript", "Architecture"],
  },
  {
    id: 2,
    slug: "nodejs-performance-optimization",
    label: "Article · Node.js",
    title: "Optimizing Node.js Performance for Production",
    excerpt:
      "Discover advanced techniques to optimize your Node.js applications for better performance and scalability.",
    image: "/images/blog-nodejs-performance.jpg",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Node.js",
    tags: ["Node.js", "Performance", "Backend"],
  },
  {
    id: 3,
    slug: "mongodb-best-practices",
    label: "Article · MongoDB",
    title: "MongoDB Best Practices for MERN Stack",
    excerpt:
      "Essential MongoDB patterns and practices every MERN stack developer should know for building robust applications.",
    image: "/images/blog-mongodb.jpg",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "MongoDB",
    tags: ["MongoDB", "MERN", "Database"],
  },
];

// ─── Variants — identical timing to Projects ──────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="blog"
      className="pf-mesh pf-noise relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="pf-grid absolute inset-0 z-0" />

      {/* Ambient orb — mirrored to left side for visual variety */}
      <div
        className="absolute pointer-events-none z-0 opacity-30"
        style={{
          top: "25%",
          left: "-6%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <Container>
          {/* ── Header ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-20 flex flex-col items-center text-center gap-3"
          >
            <span className="sec-label">Blog</span>
            <h2 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
              Things I've
              <br />
              <span className="em-g italic">written and shared</span>
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm leading-relaxed font-light mt-1">
              Thoughts on engineering, architecture, and lessons learned
              building in public.
            </p>
          </motion.div>

          {/* ── Blog cards ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={stagger}
            initial="hidden"
            className="space-y-6"
          >
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                className="group grid lg:grid-cols-[2fr_3fr] gap-0 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-all duration-300"
              >
                {/* ── Image pane ── */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800/50 aspect-[16/10] lg:aspect-auto min-h-[200px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-60" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-[.12em] uppercase bg-emerald-500/90 text-white backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Index watermark */}
                  <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-[.18em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* ── Content pane ── */}
                <div className="flex flex-col p-7">
                  {/* Label + meta row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400">
                      {post.label}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-5">
                    {post.excerpt}
                  </p>

                  {/* Tags — styled as stack pills in Projects */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium
                                 bg-gray-100/80 dark:bg-white/[0.05]
                                 text-gray-600 dark:text-gray-400
                                 border border-gray-200/60 dark:border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link href={`/blog/${post.slug}`} className="cta-link">
                      Read article <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* ── View all CTA ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            transition={{ delay: 0.45 }}
            className="mt-14 flex flex-col items-center gap-5"
          >
            <div className="hl w-full" />
            <Link href="/blog" className="btn-g">
              View all posts <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
