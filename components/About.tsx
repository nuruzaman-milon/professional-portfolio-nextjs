"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Coffee, Lightbulb, Users } from "lucide-react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Code, label: "Projects Completed", value: "25+" },
    { icon: Coffee, label: "Cups of Coffee", value: "500+" },
    { icon: Lightbulb, label: "Problems Solved", value: "100+" },
    { icon: Users, label: "Happy Clients", value: "15+" },
  ]

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with over 2 years of experience in building modern web
                applications. My journey in software development started with curiosity and has evolved into a deep love
                for creating solutions that make a difference.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Specializing in the MERN stack, I've had the privilege of working on diverse projects ranging from
                e-commerce platforms to real-time chat applications. I believe in writing clean, maintainable code and
                staying updated with the latest technologies.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
                sharing my knowledge through technical blogs and mentoring fellow developers.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Express.js"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 glass-effect rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-effect p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300"
                >
                  <Icon className="mx-auto mb-4 text-emerald-600 dark:text-emerald-400" size={32} />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
