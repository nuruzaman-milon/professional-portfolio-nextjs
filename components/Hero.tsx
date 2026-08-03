"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Download,
} from "lucide-react";
import type { Variants } from "framer-motion";
import Container from "./Container";
import Button from "./Button";
import myImg from "@/public/images/me/nuruzaman-milon1.webp";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "React & Next.js Expert",
  "Node.js Developer",
  "Web3 Builder",
  "TypeScript Engineer",
];

const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

export default function Hero() {
  // starts at 1 — the eyebrow already reads "Software Engineer" (roles[0])
  const [currentRole, setCurrentRole] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentRole((p) => (p + 1) % roles.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="pf-mesh pf-noise min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-0"
    >
      {/* Grid overlay */}
      <div className="ab-grid absolute inset-0 z-0" />

      {/* Static orbs */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "15%",
          left: "8%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(13,148,136,.12) 0%,transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "10%",
          right: "5%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(15,118,110,.10) 0%,transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full">
        <Container className="py-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-10"
          >
            {/* Status badge */}
            <motion.div
              variants={slideUp}
              className="flex justify-center mb-10"
            >
              <span className="tp">
                <span className="pdot w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
                Available for new opportunities
              </span>
            </motion.div>

            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
              {/* Text column */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  variants={slideUp}
                  className="mb-2 text-xs font-medium tracking-[.15em] uppercase text-teal-700 dark:text-teal-400"
                >
                  Software Engineer · Dhaka, Bangladesh
                </motion.div>

                <motion.h1
                  variants={slideUp}
                  className="pf-serif text-[clamp(2rem,10vw,2.5rem)] md:text-6xl xl:text-7xl font-normal text-gray-900 dark:text-white mb-5 leading-[1.05]"
                >
                  Md. Nuruzaman <span className="em-g">Milon</span>
                </motion.h1>

                {/* Role rotator */}
                <motion.div
                  variants={slideUp}
                  className="mb-8 h-9 flex items-center lg:justify-start justify-center overflow-hidden"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-sm mr-2">
                    I work as a
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentRole}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-sm font-semibold em-g"
                    >
                      {roles[currentRole]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="ml-1 inline-block w-px h-4 bg-teal-600 animate-pulse" />
                </motion.div>

                <motion.p
                  variants={slideUp}
                  className="text-base text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                >
                  Full-stack Software Engineer with 4+ years of experience
                  building scalable web applications using React, Next.js, and
                  Node.js — from e-commerce platforms and ERP systems to
                  Web3-integrated social platforms.
                </motion.p>

                <motion.div
                  variants={slideUp}
                  className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
                >
                  <Button href="/projects">
                    View My Work <ArrowUpRight size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    href="/resume/Nuruzaman-milon-resume.pdf"
                    download="Nuruzaman-Milon-Resume.pdf"
                  >
                    <Download size={14} />
                    Download Resume
                  </Button>
                </motion.div>

                <motion.div
                  variants={slideUp}
                  className="flex gap-3 justify-center lg:justify-start"
                >
                  {[
                    {
                      icon: Github,
                      href: "https://github.com/nuruzaman-milon",
                      label: "GitHub",
                    },
                    {
                      icon: Linkedin,
                      href: "https://linkedin.com/in/nuruzaman-milon",
                      label: "LinkedIn",
                    },
                    {
                      icon: Mail,
                      href: "mailto:nuruzaman.milon@gmail.com",
                      label: "Email",
                    },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-black/[0.08] bg-white/60 text-gray-600 hover:text-teal-700 hover:border-teal-700/40 hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-teal-400 dark:hover:border-teal-400/40 transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={15} />
                      {label}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Photo column */}
              <motion.div
                variants={slideUp}
                className="flex-shrink-0 flex justify-center"
              >
                <div className="relative">
                  {/* soft ambient glow behind the portrait */}
                  <div className="absolute -inset-6 rounded-[40px] bg-teal-600/15 dark:bg-teal-400/15 blur-3xl pointer-events-none" />
                  <div className="relative w-56 h-64 md:w-72 md:h-80">
                    {/* orbital arc — a true ellipse (rounded-[50%], matching the
                        dots' offset-path exactly), wider but shorter than the
                        photo so only the side sweeps show. Three dots ride the
                        edge a third of a lap apart — with these zone sizes that
                        guarantees at least one dot is always out from behind
                        the photo. left/top are only a static fallback for
                        browsers without motion paths. */}
                    <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[10deg] w-[145%] h-[72%] rounded-[50%] border border-teal-600/70 dark:border-teal-300/70 pointer-events-none">
                      <div className="orbit-node absolute left-[97%] top-[67%] w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]" />
                      <div
                        className="orbit-node absolute left-[11.7%] top-[82%] w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_12px_3px_rgba(45,212,191,0.55)]"
                        style={{ animationDelay: "-6s" }}
                      />
                      <div
                        className="orbit-node absolute left-[41%] top-[1%] w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-300 shadow-[0_0_8px_2px_rgba(45,212,191,0.5)]"
                        style={{ animationDelay: "-12s" }}
                      />
                    </div>
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-teal-600/40 dark:border-teal-400/50 shadow-[0_0_45px_rgba(13,148,136,0.25)] dark:shadow-[0_0_55px_rgba(45,212,191,0.3)]">
                      <Image
                        src={myImg}
                        alt="Nuruzaman Milon — Software Engineer"
                        quality={90}
                        sizes="(max-width: 768px) 224px, 288px"
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </div>

                    {/* Bottom-right badge — experience (dark chip on the photo, both themes).
                        Outer motion.div = spring entrance, inner div = CSS float */}
                    <motion.div
                      className="absolute -bottom-5 -right-6"
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 1.1,
                      }}
                    >
                      <div
                        className="badge-float flex items-center gap-3 px-5 py-3 rounded-2xl shadow-[-6px_0_18px_rgba(45,212,191,0.22),inset_3px_0_12px_rgba(45,212,191,0.12),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md border bg-gray-900/85 border-white/10"
                        style={{ animationDelay: "-2.5s" }}
                      >
                        <span className="pf-serif text-3xl leading-none text-teal-400">
                          4+
                        </span>
                        <span className="text-[9px] font-medium uppercase tracking-[.15em] leading-[1.5] text-gray-300">
                          Years
                          <br />
                          Experience
                        </span>
                      </div>
                    </motion.div>

                    {/* Top-left badge — core stack (dark pill on the photo, both themes) */}
                    <motion.div
                      className="absolute -top-4 -left-6"
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.9,
                      }}
                    >
                      <div className="badge-float flex items-center gap-2 px-4 py-2.5 rounded-full shadow-[-6px_0_18px_rgba(45,212,191,0.22),inset_3px_0_12px_rgba(45,212,191,0.12),0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md border bg-gray-900/85 border-white/10">
                        <span className="pdot w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-xs font-semibold tracking-wide text-white whitespace-nowrap">
                          Next.js · Node.js
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </Container>
      </div>

      {/* Scroll cue — only when the hero fits in one viewport, else it crowds the stats */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden [@media(min-width:1024px)_and_(min-height:800px)]:flex flex-col items-center gap-2 sb">
        <span className="text-[10px] tracking-[.2em] uppercase text-gray-400 font-medium">
          Scroll
        </span>
        <ArrowDown size={14} className="text-gray-400" />
      </div>
    </section>
  );
}
