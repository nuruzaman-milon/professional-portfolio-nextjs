"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for styling
      setScrolled(currentScrollY > 50);

      // Only update active section based on scroll if we're on the home page
      if (pathname === "/") {
        // Determine active section
        const sections = [
          "home",
          "about",
          "skills",
          "projects",
          "blog",
          "contact",
        ];
        const sectionElements = sections.map((id) =>
          document.getElementById(id)
        );

        let currentSection = "home";

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section) {
            const rect = section.getBoundingClientRect();
            // Consider a section active if it's in the top half of the viewport
            if (rect.top <= window.innerHeight / 2) {
              currentSection = sections[i];
              break;
            }
          }
        }

        setActiveSection(currentSection);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [pathname]);

  // Update active section based on current pathname
  useEffect(() => {
    if (pathname.startsWith("/blog")) {
      setActiveSection("blog");
    } else if (pathname.startsWith("/projects")) {
      setActiveSection("projects");
    } else if (pathname === "/") {
      // For home page, active section will be determined by scroll
      // Don't override here, let scroll handler manage it
    } else {
      // For any other page, default to home
      setActiveSection("home");
    }
  }, [pathname]);

  // Scroll to top when navigating to projects or blog pages
  useEffect(() => {
    if (pathname.startsWith("/blog") || pathname.startsWith("/projects")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  const navItems = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#blog", label: "Blog", id: "blog" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  const handleNavClick = (href: string, id: string) => {
    // Handle special cases for projects and blog sections
    if (id === "projects" && pathname !== "/") {
      router.push("/projects");
      return;
    }
    if (id === "blog" && pathname !== "/") {
      router.push("/blog");
      return;
    }

    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Background layer with smooth transitions */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-transparent backdrop-blur-none shadow-none border-b border-transparent"
        }`}
      />

      {/* Content layer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Code2
              className={`h-8 w-8 transition-all duration-500 ease-out ${
                scrolled
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-emerald-400"
              } group-hover:text-emerald-300 group-hover:scale-110`}
            />
            <span
              className={`text-xl font-bold transition-all duration-500 ease-out ${
                scrolled
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Alex Johnson
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`relative transition-all duration-500 ease-out transform hover:scale-105 group ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : scrolled
                      ? "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                scrolled
                  ? "text-gray-900 dark:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                  : "text-gray-900 dark:text-white hover:bg-white/10 dark:hover:bg-gray-800/50"
              } hover:text-emerald-600 dark:hover:text-emerald-400`}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-0 rotate-180 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 rotate-180 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 p-4 rounded-lg backdrop-blur-md bg-white/95 dark:bg-gray-900/95 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`flex items-center justify-between py-3 px-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-900/20 font-semibold"
                      : "hover:bg-emerald-50/80 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
