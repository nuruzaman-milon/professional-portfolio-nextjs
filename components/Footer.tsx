"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

// ─── Site config — match with Navbar ─────────────────────────────────────────
const SITE = {
  name: "Nuruzaman Milon",
  initials: "NM",
  tagline: "Full-stack engineer crafting Web2 & Web3 experiences.",
};

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const services = [
  "Web Development",
  "Full Stack Solutions",
  "API Development",
  "Web3 Integration",
  "Code Review",
];

const socials = [
  { icon: Mail, href: "mailto:nuruzaman.milon@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/nuruzaman-milon", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/nuruzaman-milon",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gray-200/60 dark:border-white/[0.07] bg-white/60 dark:bg-[#0C1014] backdrop-blur-sm">
      {/* Subtle ambient orb */}
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(16,185,129,.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* ── Top grid ── */}
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">
          {/* Brand col */}
          <div className="flex flex-col gap-5">
            {/* Logo — same as Navbar */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg,#059669,#0d9488)",
                }}
              >
                <span className="text-white text-xs font-bold tracking-tight">
                  {SITE.initials}
                </span>
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {SITE.name}
              </span>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-xs">
              {SITE.tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="soc"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400 mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 font-light"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-emerald-500">
                      ›
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] font-mono tracking-[.15em] uppercase text-emerald-500 dark:text-emerald-400 mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 font-light"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-emerald-400/60 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider — same .hl class used across all sections ── */}
        <div className="hl w-full mb-7" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-wide">
            © {year} {SITE.name}. All rights reserved.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Back to top"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-md
             border border-gray-200/70 dark:border-white/[0.08]
             bg-white/70 dark:bg-white/[0.04]
             backdrop-blur-sm
             text-[11px] font-mono tracking-[.14em] uppercase
             text-gray-500 dark:text-gray-400
             hover:border-emerald-400/60 dark:hover:border-emerald-600/50
             hover:text-emerald-600 dark:hover:text-emerald-400
             hover:bg-emerald-50/60 dark:hover:bg-emerald-500/[0.06]
             transition-all duration-300"
          >
            <span
              className="flex items-center justify-center w-5 h-5 rounded
               bg-gray-100 dark:bg-white/[0.06]
               group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20
               transition-colors duration-300"
            >
              {/* Arrow up icon inline — no extra import needed if ArrowUp already imported */}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                <path
                  d="M5 8V2M5 2L2 5M5 2L8 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
