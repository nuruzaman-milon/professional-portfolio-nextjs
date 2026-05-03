export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  tags: string[];
  author: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript for better maintainability and developer experience. This comprehensive guide covers best practices, patterns, and real-world examples.",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications is crucial for long-term project success. When combined with TypeScript, you get the benefits of static typing, better IDE support, and improved developer experience.</p>
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
      <ul>
        <li>Use strict TypeScript configuration</li>
        <li>Define proper interfaces for props and state</li>
        <li>Leverage union types for better type safety</li>
        <li>Use generic types for reusable components</li>
      </ul>
      <h2>Component Architecture</h2>
      <h3>1. Single Responsibility Principle</h3>
      <p>Each component should have a single, well-defined purpose. This makes components easier to test, maintain, and reuse.</p>
      <h3>2. Composition over Inheritance</h3>
      <p>React's composition model allows you to build complex UIs from simple components.</p>
      <h2>State Management</h2>
      <ul>
        <li><strong>Context API</strong> - Great for simple global state</li>
        <li><strong>Redux Toolkit</strong> - Excellent for complex state logic</li>
        <li><strong>Zustand</strong> - Lightweight alternative to Redux</li>
        <li><strong>React Query</strong> - Perfect for server state management</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Building scalable React applications with TypeScript requires careful planning and adherence to best practices.</p>
    `,
    image: "/images/blog-react-typescript.jpg",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "React",
    slug: "scalable-react-typescript",
    tags: ["React", "TypeScript", "Architecture", "Best Practices"],
    author: "Nuruzaman Milon",
  },
  {
    id: 2,
    title: "Optimizing Node.js Performance for Production",
    excerpt:
      "Discover advanced techniques to optimize your Node.js applications for better performance and scalability. From memory management to clustering, learn how to make your apps production-ready.",
    content: `
      <h2>Introduction</h2>
      <p>Node.js performance optimization is crucial for building scalable server-side applications.</p>
      <h2>Memory Management</h2>
      <ul>
        <li>Monitor memory usage with built-in tools</li>
        <li>Identify and fix memory leaks</li>
        <li>Optimize garbage collection</li>
      </ul>
      <h2>Clustering</h2>
      <pre><code>const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
} else {
  require('./app.js');
}</code></pre>
      <h2>Caching Strategies</h2>
      <ul>
        <li>In-memory caching with Redis</li>
        <li>HTTP caching headers</li>
        <li>CDN integration</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Implementing these strategies will help ensure your applications perform well under production loads.</p>
    `,
    image: "/images/blog-nodejs-performance.jpg",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Node.js",
    slug: "nodejs-performance-optimization",
    tags: ["Node.js", "Performance", "Optimization", "Production"],
    author: "Nuruzaman Milon",
  },
  {
    id: 3,
    title: "MongoDB Best Practices for MERN Stack",
    excerpt:
      "Essential MongoDB patterns and practices every MERN stack developer should know for building robust applications. Learn about schema design, indexing, and query optimization.",
    content: `
      <h2>Introduction</h2>
      <p>MongoDB is a powerful NoSQL database perfect for MERN stack applications.</p>
      <h2>Schema Design</h2>
      <ul>
        <li><strong>Embed</strong> when data is accessed together</li>
        <li><strong>Reference</strong> when data is accessed independently</li>
        <li>Consider document size limits (16MB)</li>
      </ul>
      <h2>Indexing</h2>
      <pre><code>db.users.createIndex({ "email": 1, "status": 1 });
db.posts.createIndex({ "title": "text", "content": "text" });</code></pre>
      <h2>Security Best Practices</h2>
      <ul>
        <li>Enable authentication and authorization</li>
        <li>Use SSL/TLS for connections</li>
        <li>Implement role-based access control</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Following these best practices will help you build robust, scalable MERN stack applications.</p>
    `,
    image: "/images/blog-mongodb.jpg",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "MongoDB",
    slug: "mongodb-best-practices",
    tags: ["MongoDB", "Database", "MERN Stack", "Best Practices"],
    author: "Nuruzaman Milon",
  },
  {
    id: 4,
    title: "Modern CSS Techniques for Better UX",
    excerpt:
      "Explore cutting-edge CSS features and techniques that can dramatically improve user experience. From CSS Grid to custom properties, learn how to create stunning interfaces.",
    content: `
      <h2>Introduction</h2>
      <p>Modern CSS has evolved dramatically, offering powerful tools for creating stunning user interfaces.</p>
      <h2>CSS Grid & Flexbox</h2>
      <p>These layout systems give you full control over complex designs with minimal code.</p>
      <h2>Custom Properties</h2>
      <pre><code>:root {
  --color-primary: #059669;
  --spacing-lg: 2rem;
}</code></pre>
      <h2>Conclusion</h2>
      <p>Mastering modern CSS techniques will dramatically improve the quality of your user interfaces.</p>
    `,
    image: "/images/blog-css-techniques.jpg",
    date: "2023-12-28",
    readTime: "6 min read",
    category: "CSS",
    slug: "modern-css-techniques",
    tags: ["CSS", "UI/UX", "Frontend", "Design"],
    author: "Nuruzaman Milon",
  },
  {
    id: 5,
    title: "Authentication Strategies in Modern Web Apps",
    excerpt:
      "A comprehensive guide to implementing secure authentication in web applications. Compare JWT, sessions, OAuth, and other authentication methods with practical examples.",
    content: `
      <h2>Introduction</h2>
      <p>Authentication is a critical component of any web application. Choosing the right strategy ensures security and a good user experience.</p>
      <h2>JWT Authentication</h2>
      <pre><code>const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);</code></pre>
      <h2>OAuth 2.0</h2>
      <p>OAuth allows third-party services to exchange user information without exposing credentials.</p>
      <h2>Conclusion</h2>
      <p>Choose your authentication strategy based on your application's specific security requirements.</p>
    `,
    image: "/images/blog-authentication.jpg",
    date: "2023-12-20",
    readTime: "15 min read",
    category: "Security",
    slug: "authentication-strategies",
    tags: ["Authentication", "Security", "JWT", "OAuth"],
    author: "Nuruzaman Milon",
  },
  {
    id: 6,
    title: "Building RESTful APIs with Express.js",
    excerpt:
      "Learn how to design and build robust RESTful APIs using Express.js. This tutorial covers routing, middleware, error handling, and API documentation best practices.",
    content: `
      <h2>Introduction</h2>
      <p>Express.js is the most popular Node.js framework for building RESTful APIs quickly and efficiently.</p>
      <h2>Routing</h2>
      <pre><code>router.get('/users/:id', authenticate, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});</code></pre>
      <h2>Error Handling</h2>
      <pre><code>app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});</code></pre>
      <h2>Conclusion</h2>
      <p>Express.js provides the flexibility and tools needed to build production-ready RESTful APIs.</p>
    `,
    image: "/images/blog-express-api.jpg",
    date: "2023-12-15",
    readTime: "11 min read",
    category: "Backend",
    slug: "restful-apis-express",
    tags: ["Express.js", "API", "Backend", "REST"],
    author: "Nuruzaman Milon",
  },
  {
    id: 7,
    title: "State Management in React: Redux vs Context",
    excerpt:
      "Compare different state management solutions in React applications. Learn when to use Redux, Context API, or other state management libraries.",
    content: `
      <h2>Introduction</h2>
      <p>Choosing the right state management solution is one of the most important architectural decisions in a React application.</p>
      <h2>Context API</h2>
      <p>Built into React, great for low-frequency updates like theme or auth state.</p>
      <h2>Redux Toolkit</h2>
      <pre><code>const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
});</code></pre>
      <h2>When to Use What</h2>
      <ul>
        <li><strong>Context</strong> — auth, theme, locale</li>
        <li><strong>Redux</strong> — complex, frequently updated global state</li>
        <li><strong>Zustand</strong> — simple API, less boilerplate than Redux</li>
      </ul>
      <h2>Conclusion</h2>
      <p>There's no one-size-fits-all solution — choose based on your app's complexity.</p>
    `,
    image: "/images/blog-react-state.jpg",
    date: "2023-12-10",
    readTime: "9 min read",
    category: "React",
    slug: "react-state-management",
    tags: ["React", "Redux", "Context API", "State Management"],
    author: "Nuruzaman Milon",
  },
  {
    id: 8,
    title: "Docker for JavaScript Developers",
    excerpt:
      "Get started with Docker for JavaScript applications. Learn how to containerize your Node.js apps and improve your development workflow.",
    content: `
      <h2>Introduction</h2>
      <p>Docker revolutionizes how we build, ship, and run applications by using containerization.</p>
      <h2>Basic Dockerfile</h2>
      <pre><code>FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
      <h2>Docker Compose</h2>
      <pre><code>services:
  app:
    build: .
    ports:
      - "3000:3000"
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"</code></pre>
      <h2>Conclusion</h2>
      <p>Docker simplifies development workflows and ensures consistency across all environments.</p>
    `,
    image: "/images/blog-docker.jpg",
    date: "2023-12-05",
    readTime: "13 min read",
    category: "DevOps",
    slug: "docker-javascript-developers",
    tags: ["Docker", "DevOps", "Node.js", "Containerization"],
    author: "Nuruzaman Milon",
  },
];

// ── Helper functions ──────────────────────────────────────────────────────────

export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, count);
}
