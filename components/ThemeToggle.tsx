"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      {/* Icon container */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`absolute transition-all duration-500 ease-out ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100 text-amber-500"
              : "opacity-0 rotate-180 scale-75 text-gray-400"
          }`}
          size={20}
        />

        {/* Moon Icon */}
        <Moon
          className={`absolute transition-all duration-500 ease-out ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100 text-blue-400"
              : "opacity-0 -rotate-180 scale-75 text-gray-400"
          }`}
          size={20}
        />
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">
        {theme === "dark" ? "Light mode" : "Dark mode"}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45" />
      </div>
    </button>
  )
}
