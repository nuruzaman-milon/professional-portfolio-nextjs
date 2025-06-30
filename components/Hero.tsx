"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = [
    "Full Stack Developer",
    "MERN Stack Specialist",
    "React.js Expert",
    "Node.js Developer",
    "JavaScript Engineer",
    "TypeScript Enthusiast",
  ];

  const [currentRole, setCurrentRole] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
    }, 3500); // Slightly longer interval for better readability
    return () => clearInterval(interval);
  }, [roles.length]);

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 sm:pt-0"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 dark:bg-green-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-slide-up">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-2xl hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/profile-photo.jpg"
                  alt="Alex Johnson - Full Stack Developer"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Animated ring around profile */}
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/50 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full border border-emerald-400/30 animate-ping"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I'm <span className="gradient-text">Alex Johnson</span>
          </h1>

          <div className="h-20 mb-8 flex items-center justify-center">
            <div className="relative">
              <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light flex items-center gap-1">
                <div className="inline-block relative flex items-center gap-1">
                  <span
                    className={`inline-block transition-all duration-600 ease-in-out ${
                      isAnimating
                        ? "opacity-0 transform -translate-y-4 scale-95"
                        : "opacity-100 transform translate-y-0 scale-100"
                    }`}
                  >
                    <span className="gradient-text font-semibold">
                      {roles[currentRole]}
                    </span>
                  </span>

                  {/* Typing cursor effect */}
                  <span
                    className={`inline-block w-0.5 h-8 bg-emerald-500 ml-1 animate-pulse inline-block transition-all duration-600 ease-in-out ${
                      isAnimating
                        ? "opacity-0 transform -translate-y-4 scale-95"
                        : "opacity-100 transform translate-y-0 scale-100"
                    }`}
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate Full Stack Developer with 2+ years of experience crafting
            scalable web applications using the MERN stack. I transform ideas
            into digital reality with clean, efficient code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 animate-glow"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-3 rounded-full glass-effect text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-400 dark:text-gray-400" size={32} />
      </div>
    </section>
  );
}
