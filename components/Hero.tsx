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
import Link from "next/link";
import myImg from "@/public/images/me/nuruzaman-milon1.webp";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "React & Next.js Expert",
  "Node.js Developer",
  "Web3 Builder",
  "TypeScript Engineer",
];

export const PORTFOLIO_STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "25+", label: "Projects Shipped" },
  { value: "15+", label: "Happy Clients" },
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
  const [currentRole, setCurrentRole] = useState(0);

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
            "radial-gradient(circle,rgba(16,185,129,.12) 0%,transparent 70%)",
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
            "radial-gradient(circle,rgba(20,184,166,.10) 0%,transparent 70%)",
        }}
      />

      <div className="relative z-10">
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
                <span className="pdot w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Available for new opportunities
              </span>
            </motion.div>

            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-16">
              {/* Text column */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  variants={slideUp}
                  className="mb-2 text-xs font-medium tracking-[.15em] uppercase text-emerald-600 dark:text-emerald-400"
                >
                  Software Engineer · Dhaka, Bangladesh
                </motion.div>

                <motion.h1
                  variants={slideUp}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-5 leading-[1.08]"
                >
                  Md. Nuruzaman Milon
                </motion.h1>

                {/* Role rotator */}
                <motion.div
                  variants={slideUp}
                  className="mb-8 h-9 flex items-center lg:justify-start justify-center overflow-hidden"
                >
                  <span className="text-gray-400 dark:text-gray-500 text-sm mr-2 font-light">
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
                  <span className="ml-1 inline-block w-px h-4 bg-emerald-500 animate-pulse" />
                </motion.div>

                <motion.p
                  variants={slideUp}
                  className="text-base text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
                >
                  Full-stack Software Engineer with 3+ years of experience
                  building scalable web applications using React, Next.js, and
                  Node.js — from e-commerce platforms and ERP systems to
                  Web3-integrated social platforms.
                </motion.p>

                <motion.div
                  variants={slideUp}
                  className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
                >
                  <Link href="/projects" className="btn-p">
                    View My Work <ArrowUpRight size={14} />
                  </Link>
                  <a
                    href="/resume/Nuruzaman-milon-resume.pdf"
                    download="Nuruzaman-Milon-Resume.pdf"
                    className="btn-g flex items-center gap-2"
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
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
                      aria-label={label}
                      className="soc"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={18} />
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
                  <div className="pd rs" />
                  <div className="relative w-56 h-56 md:w-64 md:h-64">
                    <div className="ctl" />
                    <div className="cbr" />
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl">
                      <Image
                        src={myImg}
                        alt="Nuruzaman Milon — Software Engineer"
                        width={256}
                        height={256}
                        quality={90}
                        sizes="(max-width: 768px) 224px, 256px"
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </div>

                    {/* Bottom-right badge */}
                    <div
                      className="absolute -bottom-5 -right-6 px-4 py-2.5 rounded-lg shadow-xl"
                      style={{
                        background: "linear-gradient(135deg,#059669,#0d9488)",
                        border: "1px solid rgba(16,185,129,.3)",
                      }}
                    >
                      <div className="text-white text-center">
                        <div className="text-xl font-bold leading-none">3+</div>
                        <div className="text-[10px] font-medium opacity-90 tracking-wide uppercase mt-0.5">
                          Yrs Exp.
                        </div>
                      </div>
                    </div>

                    {/* Top-left badge */}
                    <div
                      className="absolute -top-4 -left-6 px-3 py-2 rounded-lg shadow-lg"
                      style={{
                        background: "rgba(255,255,255,.92)",
                        border: "1px solid rgba(0,0,0,.06)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                        Core Stack
                      </div>
                      <div className="text-xs font-bold text-gray-800 mt-0.5">
                        Next.js · Node.js
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div variants={slideUp} className="hl mb-10" />

            {/* Stats */}
            <motion.div
              variants={slideUp}
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
            >
              {PORTFOLIO_STATS.map(({ value, label }) => (
                <div key={label} className="sc text-center lg:text-left">
                  <div className="pf-serif text-3xl em-g font-normal mb-1">
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sb">
        <span className="text-[10px] tracking-[.2em] uppercase text-gray-400 font-medium">
          Scroll
        </span>
        <ArrowDown size={14} className="text-gray-400" />
      </div>
    </section>
  );
}
