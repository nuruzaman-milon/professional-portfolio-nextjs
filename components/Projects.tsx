"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Projects() {
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

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      image: "/images/ecommerce-platform.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      github: "#",
      live: "#",
      slug: "ecommerce-platform",
    },
    {
      id: 2,
      title: "Real-Time Chat App",
      description:
        "Modern chat application with real-time messaging, file sharing, and group chat functionality using Socket.io and React.",
      image: "/images/chat-app.jpg",
      technologies: ["React", "Socket.io", "Express", "MongoDB", "Cloudinary"],
      github: "#",
      live: "#",
      slug: "chat-app",
    },
    {
      id: 3,
      title: "Task Management System",
      description:
        "Collaborative project management tool with drag-and-drop functionality, team collaboration, and progress tracking.",
      image: "/images/task-management.jpg",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],
      github: "#",
      live: "#",
      slug: "task-management",
    },
  ]

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="glass-effect rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <a
                        href={project.github}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={project.live}
                        className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <Link href={`/projects/${project.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-white bg-transparent"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
