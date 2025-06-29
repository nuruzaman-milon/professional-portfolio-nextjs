import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

// This would typically come from a database or CMS
const getProject = (slug: string) => {
  const projects = {
    "ecommerce-platform": {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      longDescription:
        "A comprehensive e-commerce platform built with modern web technologies. This project showcases advanced React patterns, secure authentication, payment processing with Stripe, and a robust admin panel for inventory management.",
      image: "/images/ecommerce-platform.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express", "Tailwind CSS"],
      github: "#",
      live: "#",
      features: [
        "User Authentication",
        "Payment Integration",
        "Admin Dashboard",
        "Inventory Management",
        "Order Tracking",
      ],
      challenges: [
        "Implementing secure payment processing with Stripe",
        "Building a scalable product catalog system",
        "Creating an intuitive admin dashboard",
        "Optimizing database queries for large product datasets",
      ],
      learnings: [
        "Advanced React state management patterns",
        "Secure authentication and authorization",
        "Payment gateway integration best practices",
        "Database optimization techniques",
      ],
      duration: "3 months",
      completedDate: "2024-01-15",
    },
    "chat-app": {
      id: 2,
      title: "Real-Time Chat Application",
      description: "Modern chat application with real-time messaging and file sharing",
      longDescription:
        "A feature-rich real-time chat application that enables seamless communication between users. Built with Socket.io for real-time functionality and includes advanced features like file sharing, emoji reactions, and group management.",
      image: "/images/chat-app.jpg",
      technologies: ["React", "Socket.io", "Express", "MongoDB", "Cloudinary", "JWT"],
      github: "#",
      live: "#",
      features: ["Real-time Messaging", "File Sharing", "Group Chats", "Emoji Reactions", "User Presence"],
      challenges: [
        "Implementing real-time communication with Socket.io",
        "Handling file uploads and storage with Cloudinary",
        "Managing user presence and online status",
        "Optimizing message delivery and storage",
      ],
      learnings: [
        "WebSocket communication patterns",
        "Real-time application architecture",
        "File upload and processing workflows",
        "Scalable chat system design",
      ],
      duration: "2 months",
      completedDate: "2024-02-20",
    },
    "task-management": {
      id: 3,
      title: "Task Management System",
      description: "Collaborative project management tool with drag-and-drop functionality",
      longDescription:
        "A comprehensive project management solution designed for teams. Features include Kanban boards, task assignments, progress tracking, and team collaboration tools to enhance productivity.",
      image: "/images/task-management.jpg",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "NextAuth"],
      github: "#",
      live: "#",
      features: ["Kanban Boards", "Team Collaboration", "Progress Tracking", "Task Assignment", "Time Tracking"],
      challenges: [
        "Implementing drag-and-drop functionality",
        "Building complex database relationships",
        "Creating real-time collaboration features",
        "Designing intuitive user interfaces",
      ],
      learnings: [
        "Advanced TypeScript patterns",
        "Database design and optimization",
        "Real-time collaboration implementation",
        "Complex state management",
      ],
      duration: "4 months",
      completedDate: "2024-03-10",
    },
  }

  return projects[slug as keyof typeof projects] || null
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="glass-effect rounded-xl overflow-hidden">
          <div className="relative">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={500}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-xl text-gray-200">{project.description}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{project.longDescription}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Duration: {project.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Completed: {new Date(project.completedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg transition-colors"
                  >
                    <Github size={18} className="mr-2" />
                    View Code
                  </a>
                  <a
                    href={project.live}
                    className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
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

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="text-gray-600 dark:text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Challenges Faced</h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">{index + 1}.</span>{" "}
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Learnings</h3>
                <ul className="space-y-3">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">•</span> {learning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
