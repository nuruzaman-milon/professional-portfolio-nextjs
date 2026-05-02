"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

// ─── Project data — sourced from resume ──────────────────────────────────────
const projects = [
  {
    id: 1,
    slug: "swop",
    label: "Featured · Web2 & Web3",
    title: "SWOP Platform",
    description:
      "A full-stack Web2/Web3 social platform with a Twitter-style feed, SmartSite builder, on-chain tipping, and a peer-to-peer token swap. Built from scratch at Bayshore Communication.",
    image: "/images/swop-platform.jpg",
    stack: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Zustand",
      "Privy.io",
      "LI.FI SDK",
      "Framer Motion",
    ],
    github: null, // private repo
    live: "https://swop.so",
    highlights: [
      "Solana wallet integration & token transfers",
      "SmartSite builder — Linktree-style portfolio",
      "Reward & points system",
    ],
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    label: "Full-stack · E-Commerce",
    title: "E-Commerce Platform",
    description:
      "A production-grade e-commerce platform built from scratch — covering product management, checkout, SSL Commerce payment gateway, and an admin dashboard.",
    image: "/images/ecommerce-platform.jpg",
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "SSL Commerce",
    ],
    github: null,
    live: null,
    highlights: [
      "Full checkout & payment flow",
      "Admin dashboard with analytics",
      "Performance-optimised product pages",
    ],
  },
  {
    id: 3,
    slug: "erp-system",
    label: "Frontend · ERP",
    title: "ERP System",
    description:
      "A modern ERP frontend for Peoples IT Solution covering account management, dealer management, product oversight, and labour tracking — reducing manual effort by 70–80%.",
    image: "/images/erp-system.jpg",
    stack: ["React", "Vite", "Redux", "Tailwind CSS", "REST API"],
    github: null,
    live: null,
    highlights: [
      "4 core modules — accounts, dealers, products, labour",
      "Automated complex business workflows",
      "70–80% reduction in manual operational effort",
    ],
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
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

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="projects"
      className="pf-mesh pf-noise relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="pf-grid absolute inset-0 z-0" />

      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none z-0 opacity-30"
        style={{
          top: "20%",
          right: "-6%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          animate={inView ? "show" : "hidden"}
          variants={fadeUp}
          initial="hidden"
          className="mb-20 flex flex-col items-center text-center gap-3"
        >
          <span className="sec-label">Projects</span>
          <h2 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
            Things I've
            <br />
            <span className="em-g italic">built and shipped</span>
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm leading-relaxed font-light mt-1">
            Production work — real users, real problems, real constraints.
          </p>
        </motion.div>

        {/* ── Project cards ── */}
        <motion.div
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          initial="hidden"
          className="space-y-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="group grid lg:grid-cols-[2fr_3fr] gap-0 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-all duration-300"
            >
              {/* ── Image pane ── */}
              <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800/50 aspect-[16/10] lg:aspect-auto min-h-[200px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback gradient if image missing
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-60" />

                {/* Index watermark */}
                <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-[.18em] text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* ── Content pane ── */}
              <div className="flex flex-col p-7">
                {/* Label + links row */}
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

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
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

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium
                                 bg-gray-100/80 dark:bg-white/[0.05]
                                 text-gray-600 dark:text-gray-400
                                 border border-gray-200/60 dark:border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Link href={`/projects/${project.slug}`} className="cta-link">
                    View case study <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
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
          <Link href="/projects" className="btn-g">
            View all projects <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
