"use client";

import { notFound, useParams } from "next/navigation";
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
import { getProjectBySlug } from "@/data/projects";
import ImageCarousel from "@/components/custom/ImageCarosel";

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
      <Icon size={13} className="text-emerald-500" />
      <span className="text-[10px] font-mono tracking-[.18em] uppercase text-emerald-500 dark:text-emerald-400">
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
      className={`rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm p-7 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const params: { slug: string } = useParams();
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="pf-mesh pf-noise relative min-h-screen overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
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
            "radial-gradient(circle, rgba(16,185,129,.18) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* ── Back ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light"
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
            <span className="text-[10px] font-mono tracking-[.18em] uppercase text-emerald-500 dark:text-emerald-400">
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
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 dark:text-gray-500 font-light mb-6"
          >
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {project.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(project.completedDate).toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers size={13} />
              {project.role}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-white/[0.08] hover:border-emerald-300/50 dark:hover:border-emerald-700/40 transition-all duration-200"
              >
                <Github size={15} />
                View Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200"
              >
                <ExternalLink size={15} />
                Live Site
                <ArrowUpRight size={13} />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* ── Full-width carousel ── */}
        <motion.div
          animate={inView ? "show" : "hidden"}
          variants={fadeUp}
          initial="hidden"
          transition={{ delay: 0.1 }}
          className="mb-16 rounded-xl overflow-hidden border border-gray-200/60 dark:border-white/[0.07]"
          style={{ aspectRatio: "16/9" }}
        >
          <ImageCarousel
            images={project.images}
            title={project.title}
            index={0}
            className="w-full h-full"
          />
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
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
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
                      className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 font-light"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-emerald-400/70 flex-shrink-0" />
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
                        className="mt-0.5 flex-shrink-0 font-mono text-[10px] text-emerald-500 dark:text-emerald-400"
                        style={{ minWidth: 20 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
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
                        className="mt-0.5 flex-shrink-0 font-mono text-[10px] text-emerald-500 dark:text-emerald-400"
                        style={{ minWidth: 20 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
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
                      className="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400 font-light"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-emerald-400/70 flex-shrink-0" />
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
                      value: new Date(project.completedDate).toLocaleDateString(
                        "en-GB",
                        { month: "long", year: "numeric" },
                      ),
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
                      <dd className="text-xs text-gray-600 dark:text-gray-300 font-light text-right">
                        {value}
                        {label === "Status" && value === "Live" && (
                          <span className="inline-block ml-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                    className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200"
                  >
                    <ExternalLink size={13} />
                    Visit Live Site
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.div
          animate={inView ? "show" : "hidden"}
          variants={fadeUp}
          initial="hidden"
          transition={{ delay: 0.4 }}
          className="mt-20 pt-10 border-t border-gray-200/40 dark:border-white/[0.06] flex items-center justify-between"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 font-light"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link text-sm"
            >
              Live site <ArrowUpRight size={13} />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
