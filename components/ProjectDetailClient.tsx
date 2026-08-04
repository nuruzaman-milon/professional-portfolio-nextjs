"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Layers,
  Zap,
  BookOpen,
  AlertTriangle,
} from "lucide-react";
import type { ProjectDTO } from "@/lib/content";
import ImageCarousel from "@/components/custom/ImageCarosel";
import Container from "@/components/Container";
import Button from "@/components/Button";

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Small reusable pieces ────────────────────────────────────────────────────

function SectionLabel({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={13} className="text-teal-600" />
      <span className="text-[10px] font-mono tracking-[.18em] uppercase text-teal-600 dark:text-teal-400">
        {label}
      </span>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-5 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectDetailClient({
  project,
}: {
  project: ProjectDTO;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24">
      <div className="pf-grid absolute inset-0 z-0" />
      <div
        className="absolute pointer-events-none z-0 opacity-25"
        style={{
          top: "10%",
          left: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.18) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10">
        <Container>
          {/* ── Back ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
            >
              <ArrowLeft size={15} />
              Back to projects
            </Link>
          </motion.div>

          {/* ── Hero ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={stagger}
            initial="hidden"
            className="mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="text-[10px] font-mono tracking-[.18em] uppercase text-teal-600 dark:text-teal-400">
                {project.label}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="pf-serif text-4xl md:text-6xl font-normal text-gray-900 dark:text-white leading-tight mt-3 mb-5"
            >
              {project.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {project.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {project.completedDate
                  ? new Date(project.completedDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "Ongoing"}
              </span>
              <span className="flex items-center gap-1.5">
                <Layers size={13} />
                {project.role}
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              {project.live && (
                <Button
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={15} />
                  Live site
                  <ArrowUpRight size={13} />
                </Button>
              )}
              {project.github && (
                <Button
                  variant="ghost"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={15} />
                  View code
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* ── Full-width carousel — browser-frame window ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            transition={{ delay: 0.1 }}
            className="relative mb-16"
          >
            {/* soft glow behind the window */}
            <div className="absolute inset-10 rounded-full bg-teal-500/15 dark:bg-teal-400/15 blur-3xl pointer-events-none" />
            <div className="relative rounded-xl overflow-hidden border border-gray-200/70 dark:border-white/10 shadow-xl bg-white dark:bg-gray-900">
              {/* browser chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100/90 dark:bg-white/[0.06] border-b border-gray-200/70 dark:border-white/[0.06]">
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
                index={0}
                className="w-full !aspect-[16/9]"
              />
            </div>
          </motion.div>

          {/* ── Content grid ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={stagger}
            initial="hidden"
            className="grid lg:grid-cols-[1fr_300px] gap-6"
          >
            {/* Left */}
            <div className="space-y-6">
              <motion.div variants={fadeUp}>
                <Card>
                  <SectionLabel icon={BookOpen} label="Overview" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.overview}
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card>
                  <SectionLabel icon={Zap} label="Key Features" />
                  <ul className="space-y-2.5">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="mt-[9px] w-3 h-px bg-teal-500/70 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card>
                  <SectionLabel icon={AlertTriangle} label="Challenges" />
                  <ol className="space-y-4">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex gap-4">
                        <span
                          className="mt-0.5 flex-shrink-0 font-mono text-[10px] text-teal-600 dark:text-teal-400"
                          style={{ minWidth: 20 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {c}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Card>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card>
                  <SectionLabel icon={BookOpen} label="Key Learnings" />
                  <ol className="space-y-4">
                    {project.learnings.map((l, i) => (
                      <li key={i} className="flex gap-4">
                        <span
                          className="mt-0.5 flex-shrink-0 font-mono text-[10px] text-teal-600 dark:text-teal-400"
                          style={{ minWidth: 20 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {l}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Card>
              </motion.div>
            </div>

            {/* Right — sticky sidebar */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <motion.div variants={fadeUp}>
                <Card>
                  <SectionLabel icon={Layers} label="Tech Stack" />
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card>
                  <SectionLabel icon={Zap} label="Highlights" />
                  <ul className="space-y-2.5">
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
                </Card>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card>
                  <SectionLabel icon={Calendar} label="Details" />
                  <dl className="space-y-3">
                    {[
                      { label: "Role", value: project.role },
                      { label: "Duration", value: project.duration },
                      {
                        label: "Completed",
                        value: project.completedDate
                          ? new Date(project.completedDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              },
                            )
                          : "Ongoing",
                      },
                      {
                        label: "Status",
                        value: project.live ? "Live" : "Shipped",
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4">
                        <dt className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                          {label}
                        </dt>
                        <dd className="text-xs text-gray-600 dark:text-gray-300 text-right">
                          {value}
                          {label === "Status" && value === "Live" && (
                            <span className="inline-block ml-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium bg-teal-700 hover:bg-teal-800 dark:hover:bg-teal-600 text-white transition-colors duration-200"
                    >
                      <ExternalLink size={13} />
                      Visit live site
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </Card>
              </motion.div>
            </div>
          </motion.div>

        </Container>
      </div>
    </div>
  );
}
