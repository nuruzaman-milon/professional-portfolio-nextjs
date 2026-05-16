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
      "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
    content: `
      <h2>Introduction</h2>
      <p>
      Building scalable React applications is crucial for long-term project success.
      TypeScript improves maintainability, type safety, and developer experience.
      </p>

      <h2>Project Structure</h2>

      <pre><code>src/
├── components/
├── hooks/
├── services/
├── pages/
└── utils/
</code></pre>

      <h2>Feature-Based Architecture</h2>

      <pre><code>src/
├── features/
│   ├── auth/
│   ├── posts/
│   └── users/
</code></pre>

      <h2>Lazy Loading</h2>

      <pre><code>const Dashboard = lazy(() => import("./Dashboard"));</code></pre>

      <h2>Reusable Hooks</h2>

      <pre><code>function useFetch(url: string) {}</code></pre>

      <h2>Common Mistakes</h2>

      <ul>
        <li>Massive components</li>
        <li>Too much prop drilling</li>
        <li>Bad folder structure</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Scalable React architecture helps teams maintain projects efficiently.
      </p>
    `,
    image: "/images/blogs/react-typescript.png",
    date: "2026-05-10",
    readTime: "8 min read",
    category: "React",
    slug: "scalable-react-typescript",
    tags: ["React", "TypeScript", "Architecture"],
    author: "Nuruzaman Milon",
  },

  {
    id: 2,
    title: "Optimizing Node.js Performance for Production",
    excerpt:
      "Learn advanced Node.js optimization techniques for better scalability and production performance.",
    content: `
      <h2>Introduction</h2>

      <p>
      Node.js optimization is essential for scalable backend systems.
      </p>

      <h2>Memory Management</h2>

      <ul>
        <li>Monitor memory usage</li>
        <li>Fix memory leaks</li>
        <li>Optimize garbage collection</li>
      </ul>

      <h2>PM2 Clustering</h2>

      <pre><code>pm2 start app.js -i max</code></pre>

      <h2>Load Balancing</h2>

      <p>
      Use Nginx to distribute traffic efficiently.
      </p>

      <h2>Benchmarking</h2>

      <ul>
        <li>autocannon</li>
        <li>clinic.js</li>
        <li>Artillery</li>
      </ul>

      <h2>Common Mistakes</h2>

      <ul>
        <li>Blocking the event loop</li>
        <li>Large JSON payloads</li>
        <li>Sync filesystem operations</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Production optimization improves scalability and user experience.
      </p>
    `,
    image: "/images/blogs/nodejs-performance.png",
    date: "2026-04-28",
    readTime: "12 min read",
    category: "Node.js",
    slug: "nodejs-performance-optimization",
    tags: ["Node.js", "Performance", "Backend"],
    author: "Nuruzaman Milon",
  },

  {
    id: 3,
    title: "MongoDB Best Practices for MERN Stack",
    excerpt:
      "Learn MongoDB schema design, indexing, security, and optimization best practices.",
    content: `
      <h2>Introduction</h2>

      <p>
      MongoDB is one of the most popular databases for MERN stack applications.
      </p>

      <h2>Schema Design</h2>

      <ul>
        <li>Embed related data</li>
        <li>Reference large independent data</li>
      </ul>

      <h2>Aggregation Pipeline</h2>

      <pre><code>db.orders.aggregate([])</code></pre>

      <h2>Sharding</h2>

      <p>
      Sharding helps scale massive applications horizontally.
      </p>

      <h2>Query Optimization</h2>

      <pre><code>db.users.find().explain("executionStats")</code></pre>

      <h2>Common Mistakes</h2>

      <ul>
        <li>Over indexing</li>
        <li>Huge documents</li>
        <li>Bad schema planning</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Proper MongoDB architecture improves performance and scalability.
      </p>
    `,
    image: "/images/blogs/mongodb.png",
    date: "2026-04-15",
    readTime: "10 min read",
    category: "MongoDB",
    slug: "mongodb-best-practices",
    tags: ["MongoDB", "Database", "MERN"],
    author: "Nuruzaman Milon",
  },

  {
    id: 4,
    title: "Modern CSS Techniques for Better UX",
    excerpt:
      "Explore modern CSS techniques to create responsive and beautiful user interfaces.",
    content: `
      <h2>Introduction</h2>

      <p>
      Modern CSS gives developers powerful tools for building amazing interfaces.
      </p>

      <h2>Glassmorphism</h2>

      <pre><code>.card {
  backdrop-filter: blur(10px);
}</code></pre>

      <h2>Container Queries</h2>

      <pre><code>@container (min-width: 500px) {}</code></pre>

      <h2>Responsive Typography</h2>

      <pre><code>font-size: clamp(1rem, 2vw, 2rem);</code></pre>

      <h2>Animation Tips</h2>

      <ul>
        <li>Use transform animations</li>
        <li>Avoid layout thrashing</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Modern CSS improves both UI quality and user experience.
      </p>
    `,
    image: "/images/blogs/modern-css.png",
    date: "2026-03-30",
    readTime: "6 min read",
    category: "CSS",
    slug: "modern-css-techniques",
    tags: ["CSS", "UI", "Frontend"],
    author: "Nuruzaman Milon",
  },

  {
    id: 5,
    title: "Authentication Strategies in Modern Web Apps",
    excerpt:
      "Learn secure authentication strategies including JWT, OAuth, MFA, and refresh tokens.",
    content: `
      <h2>Introduction</h2>

      <p>
      Authentication protects users and applications from unauthorized access.
      </p>

      <h2>JWT Authentication</h2>

      <pre><code>jwt.sign({ id: user.id }, secret)</code></pre>

      <h2>Refresh Tokens</h2>

      <p>
      Refresh tokens keep users logged in securely.
      </p>

      <h2>Password Hashing</h2>

      <pre><code>bcrypt.hash(password, 10)</code></pre>

      <h2>Multi-Factor Authentication</h2>

      <ul>
        <li>OTP verification</li>
        <li>Authenticator apps</li>
      </ul>

      <h2>Common Mistakes</h2>

      <ul>
        <li>Weak JWT secrets</li>
        <li>Storing plain passwords</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Secure authentication is critical for modern web applications.
      </p>
    `,
    image: "/images/blogs/authentication.png",
    date: "2026-03-18",
    readTime: "15 min read",
    category: "Security",
    slug: "authentication-strategies",
    tags: ["Authentication", "JWT", "Security"],
    author: "Nuruzaman Milon",
  },

  {
    id: 6,
    title: "Building RESTful APIs with Express.js",
    excerpt:
      "Learn how to build scalable RESTful APIs using Express.js and Node.js.",
    content: `
      <h2>Introduction</h2>

      <p>
      Express.js is one of the most popular backend frameworks for Node.js.
      </p>

      <h2>Routing</h2>

      <pre><code>router.get("/users", handler)</code></pre>

      <h2>Validation Middleware</h2>

      <p>
      Validate requests using Zod or Joi.
      </p>

      <h2>API Versioning</h2>

      <pre><code>/api/v1/users</code></pre>

      <h2>Security</h2>

      <ul>
        <li>Helmet</li>
        <li>CORS</li>
        <li>Rate limiting</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Well-designed APIs are easier to maintain and scale.
      </p>
    `,
    image: "/images/blogs/express-api.png",
    date: "2026-03-05",
    readTime: "11 min read",
    category: "Backend",
    slug: "restful-apis-express",
    tags: ["Express", "API", "Backend"],
    author: "Nuruzaman Milon",
  },

  {
    id: 7,
    title: "State Management in React: Redux vs Context",
    excerpt:
      "Compare Redux, Context API, Zustand, and modern React state management approaches.",
    content: `
      <h2>Introduction</h2>

      <p>
      State management is an important architectural decision in React apps.
      </p>

      <h2>Redux Toolkit</h2>

      <pre><code>createSlice({})</code></pre>

      <h2>Zustand</h2>

      <p>
      Zustand provides minimal boilerplate and simple APIs.
      </p>

      <h2>React Query</h2>

      <p>
      React Query is ideal for server state management.
      </p>

      <h2>Common Mistakes</h2>

      <ul>
        <li>Too much global state</li>
        <li>Deep prop drilling</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Choose state management tools based on project complexity.
      </p>
    `,
    image: "/images/blogs/react-state.png",
    date: "2026-02-20",
    readTime: "9 min read",
    category: "React",
    slug: "react-state-management",
    tags: ["React", "Redux", "Context"],
    author: "Nuruzaman Milon",
  },

  {
    id: 8,
    title: "Docker for JavaScript Developers",
    excerpt:
      "Learn Docker basics, containerization, multi-stage builds, and deployment workflows.",
    content: `
      <h2>Introduction</h2>

      <p>
      Docker simplifies development and deployment using containers.
      </p>

      <h2>Basic Dockerfile</h2>

      <pre><code>FROM node:18-alpine</code></pre>

      <h2>Multi-Stage Builds</h2>

      <pre><code>FROM node:18-alpine AS builder</code></pre>

      <h2>.dockerignore</h2>

      <pre><code>node_modules
.env</code></pre>

      <h2>Production Tips</h2>

      <ul>
        <li>Use lightweight images</li>
        <li>Avoid root user</li>
        <li>Use environment variables</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      Docker improves consistency across development and production.
      </p>
    `,
    image: "/images/blogs/docker.png",
    date: "2026-02-08",
    readTime: "13 min read",
    category: "DevOps",
    slug: "docker-javascript-developers",
    tags: ["Docker", "DevOps", "Node.js"],
    author: "Nuruzaman Milon",
  },

  {
    id: 9,
    title: "SSH & GitHub: Complete SSH Setup Guide for Developers",
    excerpt:
      "Learn how to connect GitHub using SSH keys for secure authentication and faster development workflows.",
    content: `
      <h2>Introduction</h2>

      <p>
      SSH (Secure Shell) helps developers securely connect GitHub without typing passwords repeatedly.
      </p>

      <h2>Generate SSH Key</h2>

      <pre><code>ssh-keygen -t ed25519 -C "your@email.com"</code></pre>

      <h2>Start SSH Agent</h2>

      <pre><code>eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519</code></pre>

      <h2>Copy Public Key</h2>

      <pre><code>cat ~/.ssh/id_ed25519.pub</code></pre>

      <h2>Add SSH Key to GitHub</h2>

      <ol>
        <li>Open GitHub Settings</li>
        <li>Go to SSH and GPG Keys</li>
        <li>Add New SSH Key</li>
      </ol>

      <h2>Test Connection</h2>

      <pre><code>ssh -T git@github.com</code></pre>

      <h2>Clone Using SSH</h2>

      <pre><code>git clone git@github.com:user/repo.git</code></pre>

      <h2>Common Errors</h2>

      <ul>
        <li>Permission denied (publickey)</li>
        <li>Host verification failed</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
      SSH makes GitHub authentication secure and professional.
      </p>
    `,
    image: "/images/blogs/ssh.png",
    date: "2026-05-16",
    readTime: "10 min read",
    category: "DevOps",
    slug: "ssh-github-setup-guide",
    tags: ["SSH", "GitHub", "Security"],
    author: "Nuruzaman Milon",
  },
];

// ── Helper functions ─────────────────────────────

export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, count);
}
