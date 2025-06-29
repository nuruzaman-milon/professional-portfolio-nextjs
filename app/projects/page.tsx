import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      longDescription:
        "A comprehensive e-commerce platform built with modern web technologies. This project showcases advanced React patterns, secure authentication, payment processing with Stripe, and a robust admin panel for inventory management.",
      image: "/images/ecommerce-platform.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express", "Tailwind CSS"],
      github: "#",
      live: "#",
      slug: "ecommerce-platform",
      features: [
        "User Authentication",
        "Payment Integration",
        "Admin Dashboard",
        "Inventory Management",
        "Order Tracking",
      ],
    },
    {
      id: 2,
      title: "Real-Time Chat App",
      description:
        "Modern chat application with real-time messaging, file sharing, and group chat functionality using Socket.io and React.",
      longDescription:
        "A feature-rich real-time chat application that enables seamless communication between users. Built with Socket.io for real-time functionality and includes advanced features like file sharing, emoji reactions, and group management.",
      image: "/images/chat-app.jpg",
      technologies: ["React", "Socket.io", "Express", "MongoDB", "Cloudinary", "JWT"],
      github: "#",
      live: "#",
      slug: "chat-app",
      features: ["Real-time Messaging", "File Sharing", "Group Chats", "Emoji Reactions", "User Presence"],
    },
    {
      id: 3,
      title: "Task Management System",
      description:
        "Collaborative project management tool with drag-and-drop functionality, team collaboration, and progress tracking.",
      longDescription:
        "A comprehensive project management solution designed for teams. Features include Kanban boards, task assignments, progress tracking, and team collaboration tools to enhance productivity.",
      image: "/images/task-management.jpg",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "NextAuth"],
      github: "#",
      live: "#",
      slug: "task-management",
      features: ["Kanban Boards", "Team Collaboration", "Progress Tracking", "Task Assignment", "Time Tracking"],
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      longDescription:
        "A modern weather dashboard that provides comprehensive weather information with beautiful visualizations. Includes location-based forecasts, interactive weather maps, and detailed analytics.",
      image: "/images/weather-dashboard.jpg",
      technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js", "Mapbox"],
      github: "#",
      live: "#",
      slug: "weather-dashboard",
      features: [
        "Location-based Forecasts",
        "Interactive Maps",
        "Weather Analytics",
        "Responsive Design",
        "PWA Support",
      ],
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "Analytics dashboard for social media metrics with data visualization and reporting features.",
      longDescription:
        "A comprehensive analytics platform for social media management. Provides detailed insights, engagement metrics, and automated reporting for multiple social media platforms.",
      image: "/images/social-analytics.jpg",
      technologies: ["Next.js", "D3.js", "Node.js", "MongoDB", "Social Media APIs"],
      github: "#",
      live: "#",
      slug: "social-analytics",
      features: [
        "Multi-platform Analytics",
        "Data Visualization",
        "Automated Reports",
        "Engagement Tracking",
        "Custom Dashboards",
      ],
    },
    {
      id: 6,
      title: "Learning Management System",
      description:
        "Educational platform with course management, student progress tracking, and interactive learning tools.",
      longDescription:
        "A complete learning management system designed for educational institutions. Features course creation, student enrollment, progress tracking, and interactive learning tools.",
      image: "/images/lms-platform.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "Video.js", "Socket.io"],
      github: "#",
      live: "#",
      slug: "lms-platform",
      features: [
        "Course Management",
        "Student Tracking",
        "Interactive Quizzes",
        "Video Streaming",
        "Certification System",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Explore my complete portfolio of web applications, from e-commerce platforms to real-time applications. Each
            project demonstrates different aspects of modern web development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-effect rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-sm rounded-full"
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
                      <Github size={18} />
                    </a>
                    <a
                      href={project.live}
                      className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <Link href={`/projects/${project.slug}`}>
                    <Button
                      variant="ghost"
                      className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
