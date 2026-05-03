"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "./Container";

// ─── Tech stack ─────────────────────────────────────────────────────────────
const techStack = [
  { label: "TypeScript", bg: "#3178c6", text: "#fff" },
  { label: "JavaScript", bg: "#f7df1e", text: "#000" },
  { label: "React", bg: "#61dafb", text: "#000" },
  { label: "Next.js", bg: "#000000", text: "#fff" },
  { label: "Node.js", bg: "#339933", text: "#fff" },
  { label: "Express.js", bg: "#404040", text: "#fff" },
  { label: "MongoDB", bg: "#47a248", text: "#fff" },
  { label: "PostgreSQL", bg: "#336791", text: "#fff" },
  { label: "Tailwind CSS", bg: "#06b6d4", text: "#fff" },
  { label: "Framer Motion", bg: "#ff0050", text: "#fff" },
  { label: "Zustand", bg: "#443e38", text: "#fff" },
  { label: "Docker", bg: "#2496ed", text: "#fff" },
];

// ─── Work history ─────────────────────────────────────────────────────────────
// Source: resume (accurate dates + descriptions)
const timeline = [
  {
    period: "Mar 2023 – Present",
    company: "Bayshore Communication",
    role: "Software Engineer",
    desc: "Leading frontend of SWOP — a Web2/Web3 social platform — with wallet integration, social feed, and SmartSite builder. Also built a full-stack e-commerce platform from scratch.",
  },
  {
    period: "Jan 2022 – Feb 2023",
    company: "Peoples IT Solution",
    role: "Software Engineer",
    desc: "Built a modern ERP frontend covering account, dealer, product & labour modules. Automated workflows cutting manual operational effort by 70–80%.",
  },
  {
    period: "Jun 2021 – Sep 2021",
    company: "Kodeeo Limited",
    role: "Software Engineer Intern",
    desc: "Built web features with PHP & Laravel following MVC architecture. Collaborated in an agile team on real-world full-stack implementations.",
  },
];

// ─── Animation variants ──────────────────────────────────────────────────────
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

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      className="ab-bg pf-noise relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8"
    >
      {/* Grid overlay */}
      <div className="ab-grid absolute inset-0 z-0" />

      <div className="relative z-10">
        <Container>
          {/* ── Section header ── */}
          <motion.div
            animate={inView ? "show" : "hidden"}
            variants={fadeUp}
            initial="hidden"
            className="mb-16 flex flex-col items-center text-center gap-3"
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
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                transition={{ delay: 0.1 }}
                className="space-y-5 mb-8"
              >
                <p className="text-base text-gray-500 dark:text-gray-400 leading-[1.85] font-light">
                  I'm a Full Stack Software Engineer with 3+ years of
                  professional experience delivering production-grade web
                  applications. I specialise in React, Next.js, and Node.js —
                  with a strong focus on performance, maintainable architecture,
                  and clean user experiences.
                </p>
                <p className="text-base text-gray-500 dark:text-gray-400 leading-[1.85] font-light">
                  My work spans e-commerce platforms, ERP systems, and
                  Web3-integrated social platforms. I care about translating
                  complex requirements into reliable features that hold up in
                  production.
                </p>
              </motion.div>

              {/* Availability + CTA */}
              <motion.div
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <span className="avail-chip">
                  <span className="pdot w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Open to opportunities
                </span>
                <a href="#contact" className="cta-link">
                  Let's talk <ArrowUpRight size={14} />
                </a>
              </motion.div>

              {/* Timeline */}
              <motion.div
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                transition={{ delay: 0.3 }}
              >
                <div className="text-xs font-semibold tracking-[.12em] uppercase text-gray-400 dark:text-gray-500 mb-5">
                  Work Experience
                </div>
                <div className="tl-wrap space-y-4 pl-1">
                  {timeline.map(({ period, company, role, desc }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1] as [
                          number,
                          number,
                          number,
                          number,
                        ],
                        delay: 0.35 + i * 0.1,
                      }}
                      className="flex gap-4"
                    >
                      <div className="tl-dot mt-1 ml-0" />
                      <div className="tl-card flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                            {company}
                          </span>
                          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                            {role}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium tracking-wide mb-2">
                          {period}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
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
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                transition={{ delay: 0.15 }}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  <div className="relative w-64 h-72">
                    <div className="ctl" />
                    <div className="cbr" />
                    <div className="ph-frame w-full h-full">
                      <Image
                        src="/images/nuruzaman-milon-profile-photo.png"
                        alt="Nuruzaman Milon — Software Engineer"
                        width={256}
                        height={288}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/*
                    BOTTOM-LEFT BADGE — Education
                    Source: resume → BSc in Computer Science & Engineering
                    IUBAT University, Dhaka · 2017–2021
                  */}
                    <div
                      className="absolute -bottom-4 -left-5 px-3 py-2.5 rounded-lg shadow-lg"
                      style={{
                        background: "rgba(255,255,255,.92)",
                        border: "1px solid rgba(0,0,0,.06)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                        Education
                      </div>
                      <div className="text-xs font-bold text-gray-800 mt-0.5">
                        BSc CSE · IUBAT &rsquo;21
                      </div>
                    </div>

                    {/*
                    TOP-RIGHT BADGE — Current role
                    Source: resume → Bayshore Communication, Software Engineer, Mar 2023–Present
                    Kept here (not in Hero) as About is where detailed context lives.
                  */}
                    <div
                      className="absolute -top-4 -right-5 px-3 py-2.5 rounded-lg shadow-xl"
                      style={{
                        background: "linear-gradient(135deg,#059669,#0d9488)",
                        border: "1px solid rgba(16,185,129,.3)",
                      }}
                    >
                      <div className="text-white text-center">
                        <div className="text-[10px] font-medium opacity-80 tracking-wide uppercase">
                          Currently at
                        </div>
                        <div className="text-xs font-bold leading-tight mt-0.5">
                          Bayshore
                        </div>
                        <div className="text-[10px] font-medium opacity-80 tracking-wide mt-0.5">
                          Comm.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tech stack */}
              <motion.div
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                transition={{ delay: 0.4 }}
              >
                <div className="text-xs font-semibold tracking-[.12em] uppercase text-gray-400 dark:text-gray-500 mb-4">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(({ label, bg, text }) => (
                    <span
                      key={label}
                      className="tech-pill"
                      style={{ background: bg, color: text }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Quick facts — no duplication with badges */}
              <motion.div
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                initial="hidden"
                transition={{ delay: 0.5 }}
              >
                <div className="text-xs font-semibold tracking-[.12em] uppercase text-gray-400 dark:text-gray-500 mb-4">
                  Quick Facts
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Location", value: "Dhaka, Bangladesh" },
                    { label: "Phone", value: "+880 1303 746 940" },
                    { label: "Email", value: "nuruzaman.milon@gmail.com" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-3 text-sm">
                      <span className="text-gray-400 dark:text-gray-500 font-medium w-20 flex-shrink-0">
                        {label}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 font-light">
                        {value}
                      </span>
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
