"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "./Container";
import myImg from "@/public/images/me/nuruzaman-milon.webp";
import type { ExperienceDTO } from "@/lib/content";

const techStack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Prisma",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "Zustand",
  "Docker",
];

const quickFacts: { label: string; value: string; href?: string }[] = [
  { label: "Location", value: "Dhaka, Bangladesh" },
  { label: "Phone", value: "+880 1303 746 940", href: "tel:+8801303746940" },
  {
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
          {/* ── Section header ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px", amount: 0.1 }}
            className="mb-12 flex flex-col items-center text-center gap-3"
          >
            <span className="sec-label">About Me</span>
            <h2 className="pf-serif text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
              The engineer behind
              <br />
              <span className="em-g italic">the products</span>
            </h2>
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* ── LEFT: bio + timeline ── */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ delay: 0.1 }}
                className="space-y-5 mb-8"
              >
                <p className="text-base text-gray-600 dark:text-gray-300 leading-[1.85]">
                  These days I'm a Software Engineer at Global 360 Ventures,
                  where I own the entire frontend of Build 360, an e-commerce
                  platform — from UI architecture and component systems to
                  performance across the storefront.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-[1.85]">
                  I care about the unglamorous parts of engineering:
                  maintainable architecture, honest error handling, and
                  performance that survives past the demo. Before this I led
                  the frontend of SWOP — a Web2/Web3 social platform with
                  Solana wallet integration — from idea to production. I hold a
                  BSc in CSE from IUBAT (&rsquo;21).
                </p>
              </motion.div>

              {/* Availability + CTA */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <span className="avail-chip">
                  <span className="pdot w-2 h-2 rounded-full bg-teal-600 inline-block" />
                  Open to opportunities
                </span>
                <a href="#contact" className="cta-link">
                  Let's talk <ArrowUpRight size={14} />
                </a>
              </motion.div>

              {/* Timeline */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-xs font-semibold tracking-[.12em] uppercase text-gray-400 dark:text-gray-500 mb-5">
                  Work Experience
                </div>
                <div className="tl-wrap space-y-4 pl-1">
                  {experiences.map(({ period, company, role, desc }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
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
                      className="flex gap-4"
                    >
                      <div className="tl-dot mt-1 ml-0" />
                      <div className="tl-card flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                            {company}
                          </span>
                          <span className="text-xs font-mono text-teal-700 dark:text-teal-400">
                            {role}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide mb-2">
                          {period}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: photo + stack + facts ── */}
            <div className="space-y-10">
              {/* Photo */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ delay: 0.15 }}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  {/* soft ambient glow — quieter sibling of the hero frame */}
                  <div className="absolute -inset-5 rounded-[32px] bg-teal-600/10 dark:bg-teal-400/10 blur-2xl pointer-events-none" />
                  <div className="relative w-64 h-72">
                    <div className="w-full h-full rounded-3xl overflow-hidden border border-teal-600/30 dark:border-teal-400/30 shadow-[0_24px_64px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
                      <Image
                        src={myImg}
                        alt="Nuruzaman Milon — Software Engineer"
                        width={256}
                        height={288}
                        quality={90}
                        sizes="256px"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Bottom-left badge — education (dark chip, both themes) */}
                    <div className="absolute -bottom-4 -left-5 px-4 py-2.5 rounded-2xl shadow-[-6px_0_18px_rgba(45,212,191,0.22),inset_3px_0_12px_rgba(45,212,191,0.12),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md border bg-gray-900/85 border-white/10">
                      <div className="text-[9px] font-medium uppercase tracking-[.15em] text-gray-400">
                        Education
                      </div>
                      <div className="text-xs font-semibold text-white mt-0.5 whitespace-nowrap">
                        BSc CSE · IUBAT &rsquo;21
                      </div>
                    </div>

                    {/* Top-right badge — current role (dark chip, both themes) */}
                    <div className="absolute -top-4 -right-5 px-4 py-2.5 rounded-2xl shadow-[-6px_0_18px_rgba(45,212,191,0.22),inset_3px_0_12px_rgba(45,212,191,0.12),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md border bg-gray-900/85 border-white/10">
                      <div className="text-[9px] font-medium uppercase tracking-[.15em] text-gray-400">
                        Currently at
                      </div>
                      <div className="text-xs font-semibold text-teal-400 mt-0.5 whitespace-nowrap">
                        Global 360 Ventures
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tech stack */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-xs font-semibold tracking-[.12em] uppercase text-gray-400 dark:text-gray-500 mb-4">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((label) => (
                    <span key={label} className="tech-pill">
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
                viewport={{ once: true, margin: "-40px", amount: 0.1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-xs font-semibold tracking-[.12em] uppercase text-gray-400 dark:text-gray-500 mb-4">
                  Quick Facts
                </div>
                <div className="space-y-2">
                  {quickFacts.map(({ label, value, href }) => (
                    <div key={label} className="flex gap-3 text-sm">
                      <span className="text-gray-400 dark:text-gray-500 font-medium w-20 flex-shrink-0">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="text-gray-600 dark:text-gray-300 break-all hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300 break-all">
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
