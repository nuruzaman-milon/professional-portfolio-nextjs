"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Blog() {
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

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
      image: "/images/blog-react-typescript.jpg",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      slug: "scalable-react-typescript",
    },
    {
      id: 2,
      title: "Optimizing Node.js Performance for Production",
      excerpt:
        "Discover advanced techniques to optimize your Node.js applications for better performance and scalability.",
      image: "/images/blog-nodejs-performance.jpg",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Node.js",
      slug: "nodejs-performance-optimization",
    },
    {
      id: 3,
      title: "MongoDB Best Practices for MERN Stack",
      excerpt:
        "Essential MongoDB patterns and practices every MERN stack developer should know for building robust applications.",
      image: "/images/blog-mongodb.jpg",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "MongoDB",
      slug: "mongodb-best-practices",
    },
  ]

  return (
    <section id="blog" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/100">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Latest <span className="gradient-text">Blog Posts</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="glass-effect rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-full">{post.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-white bg-transparent"
              >
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
