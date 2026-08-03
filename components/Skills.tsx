"use client";

import { motion, type Variants } from "framer-motion";
import { Boxes } from "lucide-react";
import type { ComponentType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFramer,
  SiShadcnui,
  SiRedux,
  SiSolana,
  SiJsonwebtokens,
  SiGithub,
  SiDocker,
  SiVercel,
  SiGithubactions,
} from "react-icons/si";
import Container from "./Container";

type IconComponent = ComponentType<{ className?: string }>;

type Skill = {
  name: string;
  // brand icon + its color class; some tools have no official mark
  Icon?: IconComponent;
  iconClass?: string;
};

type SkillGroup = { label: string; note: string; skills: Skill[] };

const skillGroups: SkillGroup[] = [
  {
    label: "Core Stack",
    note: "Full-stack systems from idea to production",
    skills: [
      { name: "React", Icon: SiReact, iconClass: "text-[#61DAFB]" },
      {
        name: "Next.js",
        Icon: SiNextdotjs,
        iconClass: "text-gray-900 dark:text-white",
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        iconClass: "text-[#3178C6] dark:text-[#5c9fd8]",
      },
      { name: "Node.js", Icon: SiNodedotjs, iconClass: "text-[#5FA04E]" },
      {
        name: "Express.js",
        Icon: SiExpress,
        iconClass: "text-gray-900 dark:text-white",
      },
      { name: "MongoDB", Icon: SiMongodb, iconClass: "text-[#47A248]" },
      {
        name: "PostgreSQL",
        Icon: SiPostgresql,
        iconClass: "text-[#336791] dark:text-[#6f9fc8]",
      },
    ],
  },
  {
    label: "Frontend Craft",
    note: "High-performance UI, animation & state",
    skills: [
      {
        name: "Tailwind CSS",
        Icon: SiTailwindcss,
        iconClass: "text-[#06B6D4]",
      },
      {
        name: "Framer Motion",
        Icon: SiFramer,
        iconClass: "text-[#0055FF] dark:text-[#4d85ff]",
      },
      {
        name: "shadcn/ui",
        Icon: SiShadcnui,
        iconClass: "text-gray-900 dark:text-white",
      },
      {
        name: "Zustand",
        Icon: Boxes,
        iconClass: "text-gray-500 dark:text-gray-400",
      },
      {
        name: "Redux",
        Icon: SiRedux,
        iconClass: "text-[#764ABC] dark:text-[#9a76d0]",
      },
    ],
  },
  {
    label: "Web3 & Integrations",
    note: "Wallets, on-chain actions, payments & email",
    skills: [
      {
        name: "Solana",
        Icon: SiSolana,
        iconClass: "text-[#9945FF] dark:text-[#a866ff]",
      },
      { name: "Privy" },
      { name: "LI.FI SDK" },
      { name: "SSL Commerce" },
      { name: "SendGrid" },
    ],
  },
  {
    label: "Backend & APIs",
    note: "Secure, modular, production-ready services",
    skills: [
      { name: "REST API Design" },
      {
        name: "JWT Auth",
        Icon: SiJsonwebtokens,
        iconClass: "text-gray-900 dark:text-white",
      },
      { name: "API Architecture" },
    ],
  },
  {
    label: "DevOps & Tooling",
    note: "CI/CD, containers, deployments",
    skills: [
      {
        name: "Git & GitHub",
        Icon: SiGithub,
        iconClass: "text-gray-900 dark:text-white",
      },
      { name: "Docker", Icon: SiDocker, iconClass: "text-[#2496ED]" },
      {
        name: "Vercel",
        Icon: SiVercel,
        iconClass: "text-gray-900 dark:text-white",
      },
      {
        name: "GitHub Actions",
        Icon: SiGithubactions,
        iconClass: "text-[#2088FF]",
      },
    ],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="ab-bg pf-noise relative overflow-hidden py-14"
    >
      <div className="ab-grid absolute inset-0 z-0" />

      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none z-0 opacity-30"
        style={{
          bottom: "10%",
          left: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,.18) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <Container>
          {/* ── Header — mirrors the About section's header anatomy ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            className="mb-12"
          >
            <span className="sec-label">Skills</span>
            <h2 className="pf-serif font-normal leading-[1.08] text-gray-900 dark:text-white text-5xl md:text-6xl mt-3 mb-5">
              What I
              <br />
              <span className="em-g">build</span>{" "}
              <span className="pf-script font-medium text-4xl md:text-5xl relative inline-block -rotate-2 align-middle ml-1">
                with.
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
              Every tool here has shipped to production — across SWOP, ERP
              systems, and e-commerce platforms.
            </p>
          </motion.div>

          {/* ── Category rows — label left, chips right, hairline dividers ── */}
          <div className="border-y border-gray-200/60 dark:border-white/[0.06] divide-y divide-gray-200/60 dark:divide-white/[0.06]">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ delay: gi * 0.06 }}
                className="grid md:grid-cols-[230px_1fr] gap-x-10 gap-y-3 py-7 items-start"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[.18em] uppercase text-teal-700 dark:text-teal-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
                    {group.label}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {group.note}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(({ name, Icon, iconClass }) => (
                    <span key={name} className="tech-pill">
                      {Icon ? (
                        <Icon className={`w-3.5 h-3.5 ${iconClass ?? ""}`} />
                      ) : null}
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Footer note ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="hl flex-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
              All skills used in{" "}
              <a
                href="#projects"
                className="text-teal-700 dark:text-teal-400 hover:underline underline-offset-2"
              >
                production projects
              </a>
            </p>
            <div className="hl flex-1" />
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
