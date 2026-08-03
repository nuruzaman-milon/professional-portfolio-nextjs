"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
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
      className="pf-mesh pf-noise relative overflow-hidden py-14"
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
            className="mb-12"
          >
            <span className="sec-label">Blog</span>
            <h2 className="pf-serif font-normal leading-[1.08] text-gray-900 dark:text-white text-5xl md:text-6xl mt-3 mb-5">
              Things I've
              <br />
              <span className="em-g">written</span>{" "}
              <span className="pf-script font-medium text-4xl md:text-5xl relative inline-block -rotate-2 align-middle ml-1">
                &amp; shared.
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
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-[1.85] max-w-md">
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
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                className="group grid lg:grid-cols-[2fr_3fr] rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-teal-300/50 dark:hover:border-teal-800/40 transition-[border-color] duration-300"
              >
                {/* Image pane — framed and centered, not stretched full height */}
                <div className="relative flex items-center p-4 sm:p-5">
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10 bg-gray-100 dark:bg-gray-800/50">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category badge — dark glass, site badge language */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gray-900/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[.12em] uppercase text-teal-300">
                      {post.category}
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
                    <h3 className="pf-serif text-xl sm:text-2xl font-normal text-gray-900 dark:text-white leading-snug group-hover/title:text-teal-700 dark:group-hover/title:text-teal-300 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="mt-1.5 flex-shrink-0 text-gray-400 group-hover/title:text-teal-600 dark:group-hover/title:text-teal-400 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all duration-200"
                    />
                  </Link>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* footer — date + read time */}
                  <div className="mt-auto pt-4 border-t border-gray-200/60 dark:border-white/[0.06] flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
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
            <Button variant="ghost" href="/blog">
              View all posts <ArrowUpRight size={14} />
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
