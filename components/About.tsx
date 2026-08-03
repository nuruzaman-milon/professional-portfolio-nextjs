"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Rocket,
  MapPin,
  Phone,
  Mail,
  Boxes,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiPrisma,
  SiDocker,
  SiFramer,
} from "react-icons/si";
import Container from "./Container";
import myImg from "@/public/images/me/nuruzaman-milon.webp";
import type { ExperienceDTO } from "@/lib/content";

type IconComponent = ComponentType<{ className?: string; size?: number }>;

// Zustand has no official brand icon — lucide Boxes stands in.
// iconClass carries the brand color; black/dark marks flip to white in dark
// mode, and the darkest brand blues get a lighter dark-mode variant
const techStack: { label: string; Icon: IconComponent; iconClass: string }[] = [
  { label: "Next.js", Icon: SiNextdotjs, iconClass: "text-gray-900 dark:text-white" },
  { label: "React", Icon: SiReact, iconClass: "text-[#61DAFB]" },
  { label: "TypeScript", Icon: SiTypescript, iconClass: "text-[#3178C6] dark:text-[#5c9fd8]" },
  { label: "Node.js", Icon: SiNodedotjs, iconClass: "text-[#5FA04E]" },
  { label: "Express.js", Icon: SiExpress, iconClass: "text-gray-900 dark:text-white" },
  { label: "MongoDB", Icon: SiMongodb, iconClass: "text-[#47A248]" },
  { label: "PostgreSQL", Icon: SiPostgresql, iconClass: "text-[#336791] dark:text-[#6f9fc8]" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, iconClass: "text-[#06B6D4]" },
  { label: "Prisma", Icon: SiPrisma, iconClass: "text-[#2D3748] dark:text-white" },
  { label: "Zustand", Icon: Boxes, iconClass: "text-gray-500 dark:text-gray-400" },
  { label: "Docker", Icon: SiDocker, iconClass: "text-[#2496ED]" },
  { label: "Framer Motion", Icon: SiFramer, iconClass: "text-[#0055FF] dark:text-[#4d85ff]" },
];

const stats: { Icon: IconComponent; value: string; label: string }[] = [
  { Icon: Briefcase, value: "4+", label: "Years Experience" },
  { Icon: Code2, value: "20+", label: "Projects Completed" },
  { Icon: Rocket, value: "3+", label: "Products Shipped" },
];

const quickFacts: {
  Icon: IconComponent;
  label: string;
  value: string;
  href?: string;
}[] = [
  { Icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
  {
    Icon: Phone,
    label: "Phone",
    value: "+880 1303 746 940",
    href: "tel:+8801303746940",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "nuruzaman.milon@gmail.com",
    href: "mailto:nuruzaman.milon@gmail.com",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const viewportOnce = { once: true, margin: "-40px", amount: 0.1 } as const;

function MiniLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[.18em] uppercase text-teal-700 dark:text-teal-400 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
      {children}
    </div>
  );
}

export default function About({
  experiences,
}: {
  experiences: ExperienceDTO[];
}) {
  return (
    <section
      id="about"
      className="ab-bg pf-noise relative overflow-hidden py-14"
    >
      {/* Grid overlay */}
      <div className="ab-grid absolute inset-0 z-0" />

      <div className="relative z-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* ── LEFT: header + bio + stats + CTAs + experience ── */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                <span className="sec-label">About Me</span>
                <h2 className="pf-serif font-normal leading-[1.08] text-gray-900 dark:text-white text-5xl md:text-6xl mt-3 mb-6">
                  Engineering
                  <br />
                  <span className="em-g">Products</span>{" "}
                  <span className="pf-script font-medium text-4xl md:text-5xl relative inline-block -rotate-2 align-middle ml-1">
                    that scale.
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
                <p className="text-base text-gray-600 dark:text-gray-300 leading-[1.85] max-w-md mb-8">
                  I'm a Software Engineer at Global 360 Ventures, where I own
                  the entire frontend of Build 360, an e-commerce platform. I
                  care about clean architecture, honest error handling, and
                  performance that survives past the demo.
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-y-4 divide-x divide-gray-200/70 dark:divide-white/10 mb-8"
              >
                {stats.map(({ Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 px-4 first:pl-0"
                  >
                    <Icon
                      size={18}
                      className="text-teal-700 dark:text-teal-400 flex-shrink-0"
                    />
                    <div>
                      <div className="text-lg font-bold leading-none text-gray-900 dark:text-white">
                        {value}
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1 whitespace-nowrap">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Availability + CTA */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 mb-12"
              >
                <span className="tp">
                  <span className="pdot w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
                  Open to opportunities
                </span>
                <a href="#contact" className="cta-link">
                  Let's Talk <ArrowUpRight size={14} />
                </a>
              </motion.div>

              {/* Experience timeline */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: 0.3 }}
              >
                <MiniLabel>Work Experience</MiniLabel>
                <div className="relative pl-8 space-y-5">
                  {/* timeline line */}
                  <div className="absolute left-[5px] top-2 bottom-6 w-px bg-gradient-to-b from-teal-600/50 via-teal-600/25 to-transparent" />
                  {experiences.map(({ period, company, role, desc }, i) => (
                    <motion.div
                      key={`${company}-${period}`}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1] as [
                          number,
                          number,
                          number,
                          number,
                        ],
                        delay: 0.1 + i * 0.1,
                      }}
                      className="relative"
                    >
                      {/* ring dot on the line */}
                      <span className="absolute -left-8 top-6 w-3 h-3 rounded-full border-2 border-teal-500 bg-white dark:bg-[#0a0a0f] shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                      <div className="rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm p-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white">
                            {company}
                          </h3>
                          <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                            {period}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-teal-700 dark:text-teal-400 mt-0.5">
                          {role}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2.5 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: photo card + tech stack + quick facts + CTA ── */}
            <div className="space-y-10">
              {/* Photo card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: 0.15 }}
                className="flex justify-center"
              >
                <div className="relative w-full max-w-[280px]">
                  {/* constellation decoration */}
                  <svg
                    className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none text-teal-600/70 dark:text-teal-400"
                    viewBox="0 0 480 520"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden
                  >
                    <g
                      stroke="currentColor"
                      strokeOpacity="0.22"
                      strokeWidth="1"
                    >
                      {(
                        [
                          ["60,40 140,14 260,26 380,10 452,60", 0.2],
                          ["452,60 470,150 430,260 462,380", 0.5],
                          ["60,40 24,140 48,240 20,360 70,470", 0.8],
                          ["380,10 430,260", 1.1],
                        ] as const
                      ).map(([points, delay]) => (
                        <motion.polyline
                          key={points}
                          points={points}
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: [0, 1] }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.6,
                            ease: "easeInOut",
                            delay,
                            repeat: Infinity,
                            repeatDelay: 8.4,
                          }}
                        />
                      ))}
                    </g>
                    <g fill="currentColor">
                      {(
                        [
                          [140, 14, 2.5, 0],
                          [380, 10, 3, 0.4],
                          [452, 60, 2.5, 0.9],
                          [430, 260, 3, 1.3],
                          [462, 380, 2.5, 1.8],
                          [24, 140, 2.5, 0.6],
                          [48, 240, 2, 1.5],
                          [20, 360, 2.5, 2.1],
                        ] as const
                      ).map(([cx, cy, r, delay]) => (
                        <circle
                          key={`${cx}-${cy}`}
                          className="tw-dot"
                          cx={cx}
                          cy={cy}
                          r={r}
                          style={{ animationDelay: `${delay}s` }}
                        />
                      ))}
                    </g>
                  </svg>

                  <div className="relative aspect-[9/10] rounded-[28px] overflow-hidden border border-teal-600/40 dark:border-teal-400/40 shadow-[0_0_45px_rgba(13,148,136,0.22)] dark:shadow-[0_0_45px_rgba(45,212,191,0.25)]">
                    <Image
                      src={myImg}
                      alt="Nuruzaman Milon — Software Engineer"
                      quality={90}
                      sizes="(max-width: 768px) 90vw, 420px"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Top-left badge — current role (dark chip, both themes).
                      Outer motion.div = spring entrance, inner div = CSS float;
                      separate elements because both animate transform */}
                  <motion.div
                    className="absolute -top-5 -left-3"
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5,
                    }}
                  >
                    <div className="badge-float px-4 py-2.5 rounded-2xl shadow-[-6px_0_18px_rgba(45,212,191,0.22),inset_3px_0_12px_rgba(45,212,191,0.12),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md border bg-gray-900/85 border-white/10">
                      <div className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[.15em] text-gray-400">
                        <span className="pdot w-1.5 h-1.5 rounded-full bg-teal-400" />
                        Currently at
                      </div>
                      <div className="text-xs font-semibold text-teal-400 mt-0.5 whitespace-nowrap">
                        Global 360 Ventures
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom-right badge — education (dark chip, both themes) */}
                  <motion.div
                    className="absolute -bottom-5 right-6"
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.7,
                    }}
                  >
                    <div
                      className="badge-float px-4 py-2.5 rounded-2xl shadow-[-6px_0_18px_rgba(45,212,191,0.22),inset_3px_0_12px_rgba(45,212,191,0.12),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md border bg-gray-900/85 border-white/10"
                      style={{ animationDelay: "-2.5s" }}
                    >
                      <div className="text-[9px] font-medium uppercase tracking-[.15em] text-gray-400">
                        Education
                      </div>
                      <div className="text-xs font-semibold text-white mt-0.5 whitespace-nowrap">
                        BSc CSE · IUBAT &rsquo;21
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Tech stack */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: 0.25 }}
              >
                <MiniLabel>Tech Stack</MiniLabel>
                <div className="flex flex-wrap gap-2.5">
                  {techStack.map(({ label, Icon, iconClass }) => (
                    <span key={label} className="tech-pill">
                      <Icon className={`w-3.5 h-3.5 ${iconClass}`} />
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Quick facts */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: 0.35 }}
              >
                <MiniLabel>Quick Facts</MiniLabel>
                <div className="grid gap-3">
                  {quickFacts.map(({ Icon, label, value, href }) => {
                    const cardClass =
                      "flex items-center gap-3.5 rounded-xl border border-gray-200/60 dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm p-3.5 transition-colors duration-200";
                    const inner = (
                      <>
                        <span className="w-9 h-9 rounded-full bg-teal-600/10 dark:bg-teal-400/10 flex items-center justify-center text-teal-700 dark:text-teal-400 flex-shrink-0">
                          <Icon size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] uppercase tracking-[.12em] text-gray-400 dark:text-gray-500 font-semibold">
                            {label}
                          </span>
                          <span className="block text-sm text-gray-700 dark:text-gray-200 truncate">
                            {value}
                          </span>
                        </span>
                      </>
                    );
                    return href ? (
                      <a
                        key={label}
                        href={href}
                        className={`${cardClass} hover:border-teal-700/40 dark:hover:border-teal-400/30`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={label} className={cardClass}>
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* CTA banner */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: 0.45 }}
                className="relative overflow-hidden rounded-2xl border border-teal-600/25 dark:border-teal-400/25 bg-gradient-to-br from-teal-600/10 via-transparent to-teal-800/10 dark:from-teal-500/[0.08] dark:to-teal-900/25 backdrop-blur-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
              >
                {/* corner glow */}
                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
                <div className="relative text-center sm:text-left">
                  <div className="pf-serif text-2xl md:text-[28px] text-gray-900 dark:text-white">
                    Let's build{" "}
                    <span className="em-g italic px-1 -mx-1 box-decoration-clone">
                      something great
                    </span>{" "}
                    together
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                    Have a project in mind? I'm one message away.
                  </p>
                </div>
                {/* custom CTA — text + arrow knob that nudges and turns on hover */}
                <a
                  href="#contact"
                  className="group relative flex-shrink-0 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-700 to-teal-800 pl-6 pr-2 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,118,110,0.35)] hover:shadow-[0_12px_32px_rgba(15,118,110,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Contact Me
                  <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45">
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
