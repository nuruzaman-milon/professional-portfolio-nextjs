import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// This would typically come from a database or CMS
const getBlogPost = (slug: string) => {
  const posts = {
    "scalable-react-typescript": {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
      content: `
        <h2>Introduction</h2>
        <p>Building scalable React applications is crucial for long-term project success. When combined with TypeScript, you get the benefits of static typing, better IDE support, and improved developer experience. In this comprehensive guide, we'll explore the best practices for structuring large React applications with TypeScript.</p>
        
        <h2>Project Structure</h2>
        <p>A well-organized project structure is the foundation of any scalable application. Here's a recommended structure for React TypeScript projects:</p>
        
        <pre><code>src/
├── components/
│   ├── common/
│   ├── forms/
│   └── layout/
├── hooks/
├── services/
├── types/
├── utils/
└── pages/</code></pre>
        
        <h2>TypeScript Best Practices</h2>
        <p>When working with TypeScript in React applications, following these practices will help maintain code quality:</p>
        
        <ul>
          <li>Use strict TypeScript configuration</li>
          <li>Define proper interfaces for props and state</li>
          <li>Leverage union types for better type safety</li>
          <li>Use generic types for reusable components</li>
        </ul>
        
        <h2>Component Architecture</h2>
        <p>Designing components with scalability in mind involves several key principles:</p>
        
        <h3>1. Single Responsibility Principle</h3>
        <p>Each component should have a single, well-defined purpose. This makes components easier to test, maintain, and reuse.</p>
        
        <h3>2. Composition over Inheritance</h3>
        <p>React's composition model allows you to build complex UIs from simple components. This approach is more flexible than inheritance-based patterns.</p>
        
        <h2>State Management</h2>
        <p>For large applications, choosing the right state management solution is crucial. Consider these options:</p>
        
        <ul>
          <li><strong>Context API</strong> - Great for simple global state</li>
          <li><strong>Redux Toolkit</strong> - Excellent for complex state logic</li>
          <li><strong>Zustand</strong> - Lightweight alternative to Redux</li>
          <li><strong>React Query</strong> - Perfect for server state management</li>
        </ul>
        
        <h2>Performance Optimization</h2>
        <p>TypeScript can help with performance optimization through better static analysis and type checking. Key techniques include:</p>
        
        <ul>
          <li>Using React.memo for component memoization</li>
          <li>Implementing useMemo and useCallback hooks</li>
          <li>Code splitting with React.lazy</li>
          <li>Bundle analysis and optimization</li>
        </ul>
        
        <h2>Testing Strategies</h2>
        <p>TypeScript enhances testing by providing type safety in test files. Recommended testing approaches:</p>
        
        <ul>
          <li>Unit testing with Jest and React Testing Library</li>
          <li>Integration testing for component interactions</li>
          <li>End-to-end testing with Playwright or Cypress</li>
          <li>Type testing with TypeScript compiler</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Building scalable React applications with TypeScript requires careful planning and adherence to best practices. By following the guidelines outlined in this article, you'll be well-equipped to create maintainable, type-safe applications that can grow with your project's needs.</p>
        
        <p>Remember that scalability is not just about code organization—it's also about team collaboration, documentation, and continuous improvement of your development processes.</p>
      `,
      image: "/images/blog-react-typescript.jpg",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      tags: ["React", "TypeScript", "Architecture", "Best Practices"],
      author: "Alex Johnson",
    },
    "nodejs-performance-optimization": {
      id: 2,
      title: "Optimizing Node.js Performance for Production",
      excerpt:
        "Discover advanced techniques to optimize your Node.js applications for better performance and scalability.",
      content: `
        <h2>Introduction</h2>
        <p>Node.js performance optimization is crucial for building scalable server-side applications. This guide covers advanced techniques and best practices to ensure your Node.js applications perform optimally in production environments.</p>
        
        <h2>Memory Management</h2>
        <p>Proper memory management is essential for Node.js applications. Here are key strategies:</p>
        
        <ul>
          <li>Monitor memory usage with built-in tools</li>
          <li>Identify and fix memory leaks</li>
          <li>Optimize garbage collection</li>
          <li>Use memory profiling tools</li>
        </ul>
        
        <h2>Event Loop Optimization</h2>
        <p>Understanding and optimizing the event loop is crucial for Node.js performance:</p>
        
        <pre><code>// Avoid blocking the event loop
setImmediate(() => {
  // CPU-intensive task
  performHeavyComputation();
});</code></pre>
        
        <h2>Clustering and Load Balancing</h2>
        <p>Utilize multiple CPU cores with Node.js clustering:</p>
        
        <pre><code>const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker process
  require('./app.js');
}</code></pre>
        
        <h2>Database Optimization</h2>
        <p>Database interactions often become bottlenecks. Optimize with:</p>
        
        <ul>
          <li>Connection pooling</li>
          <li>Query optimization</li>
          <li>Indexing strategies</li>
          <li>Caching mechanisms</li>
        </ul>
        
        <h2>Caching Strategies</h2>
        <p>Implement effective caching to reduce server load:</p>
        
        <ul>
          <li>In-memory caching with Redis</li>
          <li>HTTP caching headers</li>
          <li>CDN integration</li>
          <li>Application-level caching</li>
        </ul>
        
        <h2>Monitoring and Profiling</h2>
        <p>Continuous monitoring is essential for maintaining performance:</p>
        
        <ul>
          <li>Application Performance Monitoring (APM)</li>
          <li>Custom metrics and logging</li>
          <li>Performance profiling tools</li>
          <li>Real-time alerting systems</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Optimizing Node.js performance requires a holistic approach covering memory management, event loop optimization, clustering, database optimization, and continuous monitoring. Implementing these strategies will help ensure your applications perform well under production loads.</p>
      `,
      image: "/images/blog-nodejs-performance.jpg",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Node.js",
      tags: ["Node.js", "Performance", "Optimization", "Production"],
      author: "Alex Johnson",
    },
    "mongodb-best-practices": {
      id: 3,
      title: "MongoDB Best Practices for MERN Stack",
      excerpt:
        "Essential MongoDB patterns and practices every MERN stack developer should know for building robust applications.",
      content: `
        <h2>Introduction</h2>
        <p>MongoDB is a powerful NoSQL database that's perfect for MERN stack applications. However, to get the most out of MongoDB, you need to follow best practices for schema design, indexing, and query optimization.</p>
        
        <h2>Schema Design Principles</h2>
        <p>Effective schema design is crucial for MongoDB performance:</p>
        
        <h3>Embedding vs. Referencing</h3>
        <p>Choose between embedding and referencing based on your data access patterns:</p>
        
        <ul>
          <li><strong>Embed</strong> when data is accessed together</li>
          <li><strong>Reference</strong> when data is accessed independently</li>
          <li>Consider document size limits (16MB)</li>
          <li>Think about update patterns</li>
        </ul>
        
        <h2>Indexing Strategies</h2>
        <p>Proper indexing dramatically improves query performance:</p>
        
        <pre><code>// Create compound index
db.users.createIndex({ "email": 1, "status": 1 });

// Create text index for search
db.posts.createIndex({ "title": "text", "content": "text" });</code></pre>
        
        <h2>Query Optimization</h2>
        <p>Write efficient queries to minimize database load:</p>
        
        <ul>
          <li>Use projection to limit returned fields</li>
          <li>Implement pagination for large result sets</li>
          <li>Use aggregation pipeline for complex operations</li>
          <li>Avoid expensive operations like $regex without anchors</li>
        </ul>
        
        <h2>Data Validation</h2>
        <p>Implement schema validation to ensure data integrity:</p>
        
        <pre><code>const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: 'Invalid email format'
    }
  }
});</code></pre>
        
        <h2>Connection Management</h2>
        <p>Properly manage database connections:</p>
        
        <ul>
          <li>Use connection pooling</li>
          <li>Handle connection errors gracefully</li>
          <li>Monitor connection metrics</li>
          <li>Implement connection retry logic</li>
        </ul>
        
        <h2>Security Best Practices</h2>
        <p>Secure your MongoDB deployment:</p>
        
        <ul>
          <li>Enable authentication and authorization</li>
          <li>Use SSL/TLS for connections</li>
          <li>Implement role-based access control</li>
          <li>Regular security updates</li>
        </ul>
        
        <h2>Backup and Recovery</h2>
        <p>Implement robust backup strategies:</p>
        
        <ul>
          <li>Regular automated backups</li>
          <li>Test restore procedures</li>
          <li>Consider replica sets for high availability</li>
          <li>Monitor backup integrity</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Following these MongoDB best practices will help you build robust, scalable MERN stack applications. Remember to continuously monitor performance and adjust your strategies based on your application's specific needs.</p>
      `,
      image: "/images/blog-mongodb.jpg",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "MongoDB",
      tags: ["MongoDB", "Database", "MERN Stack", "Best Practices"],
      author: "Alex Johnson",
    },
  }

  return posts[slug as keyof typeof posts] || null
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </div>

        <header className="mb-12">
          <div className="flex items-center mb-4">
            <span className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-full mr-4">{post.category}</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
              <span>By {post.author}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20"
              >
                <Heart size={16} className="mr-1" />
                24
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20"
              >
                <MessageCircle size={16} className="mr-1" />8
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20"
              >
                <Share2 size={16} />
              </Button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </header>

        <div className="glass-effect rounded-xl p-8 md:p-12 shadow-lg">
          <div
            className="prose prose-lg prose-gray dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-emerald-600 dark:prose-code:text-emerald-400
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800
              prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
              prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-a:text-emerald-600 dark:prose-a:text-emerald-400
              prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="mt-12 p-8 glass-effect rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              AJ
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Alex Johnson</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Full Stack Developer with 2+ years of experience in MERN stack development. Passionate about sharing
                knowledge and helping developers build better applications.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/nodejs-performance-optimization"
              className="group p-6 glass-effect rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Optimizing Node.js Performance for Production
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Discover advanced techniques to optimize your Node.js applications for better performance and
                scalability.
              </p>
            </Link>
            <Link
              href="/blog/mongodb-best-practices"
              className="group p-6 glass-effect rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                MongoDB Best Practices for MERN Stack
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Essential MongoDB patterns and practices every MERN stack developer should know for building robust
                applications.
              </p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
