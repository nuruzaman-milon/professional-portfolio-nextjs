"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300/70 text-gray-500 hover:text-teal-700 hover:border-teal-700/50 dark:border-white/15 dark:text-gray-400 dark:hover:text-teal-400 dark:hover:border-teal-400/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/50"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
    >
      <Sun
        size={17}
        className={`absolute transition-all duration-500 ease-out ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-180 scale-75"
        }`}
      />
      <Moon
        size={17}
        className={`absolute transition-all duration-500 ease-out ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-180 scale-75"
        }`}
      />
    </button>
  );
}
