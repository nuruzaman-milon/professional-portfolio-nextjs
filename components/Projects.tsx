"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

import type { ProjectDTO } from "@/lib/content";
import Container from "./Container";
import Button from "./Button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Projects({ projects }: { projects: ProjectDTO[] }) {
  return (
    <section
      id="projects"
      className="pf-mesh pf-noise relative overflow-hidden py-14"
    >
      {/* Grid Overlay */}
      <div className="pf-grid absolute inset-0 z-0" />

      {/* Ambient Orb */}
      <div
        className="absolute pointer-events-none z-0 opacity-20 right-0 top-32 w-72 h-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,.12) 0%, transparent 70%)",
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
            <span className="sec-label">Projects</span>
            <h2 className="pf-serif font-normal leading-[1.08] text-gray-900 dark:text-white text-5xl md:text-6xl mt-3 mb-5">
              Things I've
              <br />
              <span className="em-g">built</span>{" "}
              <span className="pf-script font-medium text-4xl md:text-5xl relative inline-block -rotate-2 align-middle ml-1">
                &amp; shipped.
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
              Production work — real users, real problems, real constraints.
            </p>
          </motion.div>

          {/* ── Project Cards ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            className="space-y-6"
          >
            {projects.map((project, i) => {
              const flipped = i % 2 === 1;
              return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className={`group grid ${flipped ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"} rounded-xl overflow-hidden
                          border border-gray-200/60 dark:border-white/[0.06]
                          bg-white/75 dark:bg-zinc-900/60
                          transition-[border-color] duration-300
                          hover:border-teal-300/40 dark:hover:border-teal-800/30`}
              >
                {/* Image Pane — alternates sides per card on desktop */}
                <div
                  className={`relative overflow-hidden bg-gray-100 dark:bg-white/[0.02] aspect-video lg:aspect-auto lg:min-h-[240px] ${flipped ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Pane */}
                <div
                  className={`flex flex-col p-5 sm:p-7 ${flipped ? "lg:order-1" : ""}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-3">
                    <span className="text-[10px] font-mono tracking-[.15em] uppercase text-teal-600 dark:text-teal-400">
                      {project.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="w-8 h-8 rounded-lg border border-black/[0.08] bg-white/60 text-gray-500 hover:text-teal-700 hover:border-teal-700/40 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-teal-400 dark:hover:border-teal-400/40 flex items-center justify-center transition-colors duration-200"
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
                          className="w-8 h-8 rounded-lg border border-black/[0.08] bg-white/60 text-gray-500 hover:text-teal-700 hover:border-teal-700/40 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-teal-400 dark:hover:border-teal-400/40 flex items-center justify-center transition-colors duration-200"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <ul className="space-y-1 mb-5">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-teal-400/70 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="cta-link"
                    >
                      View case study <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            transition={{ delay: 0.2 }}
            className="mt-14 flex flex-col items-center gap-5"
          >
            <div className="hl w-full" />
            <Button variant="ghost" href="/projects">
              View all projects <ArrowUpRight size={14} />
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
