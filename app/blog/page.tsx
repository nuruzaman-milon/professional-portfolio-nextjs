"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTag, setSelectedTag] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to structure large React applications using TypeScript for better maintainability and developer experience. This comprehensive guide covers best practices, patterns, and real-world examples.",
      image: "/images/blog-react-typescript.jpg",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      slug: "scalable-react-typescript",
      tags: ["React", "TypeScript", "Architecture", "Best Practices"],
    },
    {
      id: 2,
      title: "Optimizing Node.js Performance for Production",
      excerpt:
        "Discover advanced techniques to optimize your Node.js applications for better performance and scalability. From memory management to clustering, learn how to make your apps production-ready.",
      image: "/images/blog-nodejs-performance.jpg",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Node.js",
      slug: "nodejs-performance-optimization",
      tags: ["Node.js", "Performance", "Optimization", "Production"],
    },
    {
      id: 3,
      title: "MongoDB Best Practices for MERN Stack",
      excerpt:
        "Essential MongoDB patterns and practices every MERN stack developer should know for building robust applications. Learn about schema design, indexing, and query optimization.",
      image: "/images/blog-mongodb.jpg",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "MongoDB",
      slug: "mongodb-best-practices",
      tags: ["MongoDB", "Database", "MERN Stack", "Best Practices"],
    },
    {
      id: 4,
      title: "Modern CSS Techniques for Better UX",
      excerpt:
        "Explore cutting-edge CSS features and techniques that can dramatically improve user experience. From CSS Grid to custom properties, learn how to create stunning interfaces.",
      image: "/images/blog-css-techniques.jpg",
      date: "2023-12-28",
      readTime: "6 min read",
      category: "CSS",
      slug: "modern-css-techniques",
      tags: ["CSS", "UI/UX", "Frontend", "Design"],
    },
    {
      id: 5,
      title: "Authentication Strategies in Modern Web Apps",
      excerpt:
        "A comprehensive guide to implementing secure authentication in web applications. Compare JWT, sessions, OAuth, and other authentication methods with practical examples.",
      image: "/images/blog-authentication.jpg",
      date: "2023-12-20",
      readTime: "15 min read",
      category: "Security",
      slug: "authentication-strategies",
      tags: ["Authentication", "Security", "JWT", "OAuth"],
    },
    {
      id: 6,
      title: "Building RESTful APIs with Express.js",
      excerpt:
        "Learn how to design and build robust RESTful APIs using Express.js. This tutorial covers routing, middleware, error handling, and API documentation best practices.",
      image: "/images/blog-express-api.jpg",
      date: "2023-12-15",
      readTime: "11 min read",
      category: "Backend",
      slug: "restful-apis-express",
      tags: ["Express.js", "API", "Backend", "REST"],
    },
    {
      id: 7,
      title: "State Management in React: Redux vs Context",
      excerpt:
        "Compare different state management solutions in React applications. Learn when to use Redux, Context API, or other state management libraries.",
      image: "/images/blog-react-state.jpg",
      date: "2023-12-10",
      readTime: "9 min read",
      category: "React",
      slug: "react-state-management",
      tags: ["React", "Redux", "Context API", "State Management"],
    },
    {
      id: 8,
      title: "Docker for JavaScript Developers",
      excerpt:
        "Get started with Docker for JavaScript applications. Learn how to containerize your Node.js apps and improve your development workflow.",
      image: "/images/blog-docker.jpg",
      date: "2023-12-05",
      readTime: "13 min read",
      category: "DevOps",
      slug: "docker-javascript-developers",
      tags: ["Docker", "DevOps", "Node.js", "Containerization"],
    },
  ]

  // Get unique categories and tags
  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))]
  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap((post) => post.tags)))]

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Tag filter
    if (selectedTag !== "All") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "shortest":
          return Number.parseInt(a.readTime) - Number.parseInt(b.readTime)
        case "longest":
          return Number.parseInt(b.readTime) - Number.parseInt(a.readTime)
        default:
          return 0
      }
    })

    return filtered
  }, [blogPosts, searchQuery, selectedCategory, selectedTag, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedTag("All")
    setSortBy("newest")
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || selectedTag !== "All" || sortBy !== "newest"

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
            Tech <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Insights, tutorials, and thoughts on modern web development. Sharing knowledge about MERN stack, best
            practices, and emerging technologies.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search articles by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg bg-white border-gray-300 text-gray-900 focus:border-emerald-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:focus:border-emerald-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="md:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full border-gray-300 dark:border-slate-600"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters */}
          <div
            className={`space-y-4 md:space-y-0 md:flex md:flex-wrap md:gap-4 md:items-center ${showFilters ? "block" : "hidden md:flex"}`}
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 flex items-center">
                Categories:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 flex items-center">Tags:</span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:border-emerald-500 dark:focus:border-emerald-400"
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:border-emerald-500 dark:focus:border-emerald-400"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="shortest">Shortest Read</option>
                <option value="longest">Longest Read</option>
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                <X size={16} className="mr-1" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPosts.length === blogPosts.length
              ? `Showing all ${blogPosts.length} articles`
              : `Showing ${filteredPosts.length} of ${blogPosts.length} articles`}
          </div>
        </div>

        {/* Featured Post (only show if no filters applied) */}
        {!hasActiveFilters && filteredPosts.length > 0 && (
          <div className="glass-effect rounded-xl overflow-hidden mb-12 hover:scale-105 transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={filteredPosts[0].image || "/placeholder.svg"}
                  alt={filteredPosts[0].title}
                  width={500}
                  height={300}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-full mr-4">Featured</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                    {filteredPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${filteredPosts[0].slug}`}
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors font-medium"
                >
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(hasActiveFilters ? filteredPosts : filteredPosts.slice(1)).map((post) => (
              <article
                key={post.id}
                className="glass-effect rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={500}
                    height={300}
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="px-2 py-1 bg-gray-200 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 text-xs rounded transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-effect rounded-xl p-8 max-w-md mx-auto">
              <Search className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
