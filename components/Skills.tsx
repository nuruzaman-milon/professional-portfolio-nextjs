"use client"

import { useEffect, useRef, useState } from "react"

export default function Skills() {
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

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "REST APIs", level: 90 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "Jest", level: 75 },
        { name: "Figma", level: 70 },
      ],
    },
  ]

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            My <span className="gradient-text">Skills</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.title} className="glass-effect p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${(categoryIndex * 3 + skillIndex) * 100}ms`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
