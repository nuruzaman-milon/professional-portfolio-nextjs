"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

// ─── Site config — change name/initials here only ───────────────────────────
const SITE = {
  name: "Nuruzaman Milon",
  initials: "NM",
};

const navItems = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#blog", label: "Blog", id: "blog" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  // ── Scroll → active section + scrolled state ──────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (pathname !== "/") return;

      const ids = navItems.map((i) => i.id);
      let current = "home";

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          current = ids[i];
          break;
        }
      }
      setActiveSection(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // ── Pathname → active section (for /blog, /projects pages) ───────────────
  useEffect(() => {
    if (pathname.startsWith("/blog")) setActiveSection("blog");
    else if (pathname.startsWith("/projects")) setActiveSection("projects");
    // home page active section is managed by scroll handler
  }, [pathname]);

  // ── Scroll to top on dedicated pages ──────────────────────────────────────
  useEffect(() => {
    if (pathname.startsWith("/blog") || pathname.startsWith("/projects")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  // ── Click handler — smooth scroll + mobile close ──────────────────────────
  const handleNavClick = (id: string) => {
    setIsOpen(false);

    // Dedicated pages for projects / blog when not on home
    if (id === "projects" && pathname !== "/") {
      router.push("/projects");
      return;
    }
    if (id === "blog" && pathname !== "/") {
      router.push("/blog");
      return;
    }

    // Smooth scroll on home page — let scroll handler update activeSection
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* ── Background layer ── */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          scrolled
            ? "bg-white/95 dark:bg-[#0C1014] backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-transparent"
        }`}
      />

      {/* ── Content layer ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: "linear-gradient(135deg,#059669,#0d9488)" }}
            >
              <span className="text-white text-xs font-bold tracking-tight">
                {SITE.initials}
              </span>
            </div>
            <span
              className={`text-base font-semibold transition-colors duration-300 ${
                scrolled
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {SITE.name}
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href} // ✅ no leading "/" — was "/${item.href}" before
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-sm transition-colors duration-300 group ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : scrolled
                        ? "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {item.label}
                  {/* Underline indicator — single indicator, no dot */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* ── Mobile: theme toggle + hamburger ── */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`p-2 rounded-lg transition-colors duration-300 ${
                scrolled
                  ? "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-gray-900 dark:text-white hover:bg-white/10"
              } hover:text-emerald-600 dark:hover:text-emerald-400`}
            >
              {/* Single animated icon swap */}
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-0 rotate-90 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile menu — Framer Motion, no inline-style conflict ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-2 mb-3 p-3 rounded-xl backdrop-blur-md bg-white/95 dark:bg-gray-900/95 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            >
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 font-semibold"
                          : "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
