"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Container from "./Container";
import type { PostDTO } from "@/lib/content";

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

export default function Blog({ posts }: { posts: PostDTO[] }) {
  return (
    <section
      id="blog"
      className="pf-mesh pf-noise relative overflow-hidden py-28"
    >
      <div className="pf-grid absolute inset-0 z-0" />

      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none z-0 opacity-30"
        style={{
          top: "25%",
          left: "-6%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <Container>
          {/* ── Header ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            className="mb-20 flex flex-col items-center text-center gap-3"
          >
            <span className="sec-label">Blog</span>
            <h2 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
              Things I've
              <br />
              <span className="em-g italic">written and shared</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mt-1">
              Thoughts on engineering, architecture, and lessons learned
              building in public.
            </p>
          </motion.div>

          {/* ── Blog cards ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            className="space-y-6"
          >
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                className="group grid lg:grid-cols-[2fr_3fr] gap-0 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-all duration-300"
              >
                {/* Image pane */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800/50 aspect-[16/10] lg:aspect-auto min-h-[200px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-transparent opacity-60" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-[.12em] uppercase bg-teal-600/90 text-white backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Index watermark */}
                  <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-[.18em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content pane */}
                <div className="flex flex-col p-5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-3">
                    <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
                      Article · {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
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

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                    {post.excerpt}
                  </p>

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
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            transition={{ delay: 0.2 }}
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
