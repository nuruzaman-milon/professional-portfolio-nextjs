import { blogPosts } from "@/data/blog";
import { projects as staticProjects } from "@/data/projects";
import { experiences as staticExperiences } from "@/data/experience";
import { dbConnect, hasDb } from "./db";
import { PostModel, ProjectModel, ExperienceModel } from "./models";

/*
 * Data access layer for all public pages.
 * DB-first: reads from MongoDB when MONGODB_URI is set and has content.
 * Falls back to the static files in data/ when the DB is not configured,
 * unreachable, or empty — so the site always renders.
 */

export type PostDTO = {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
};

export type ProjectDTO = {
  id: string | number;
  slug: string;
  label: string;
  title: string;
  description: string;
  highlights: string[];
  images: string[];
  stack: string[];
  github: string | null;
  live: string | null;
  role: string;
  duration: string;
  completedDate: string;
  overview: string;
  features: string[];
  challenges: string[];
  learnings: string[];
};

export type ExperienceDTO = {
  id: string | number;
  company: string;
  role: string;
  period: string;
  desc: string;
};

// ─── Static fallbacks, normalised to DTOs ────────────────────────────────────
function staticPosts(): PostDTO[] {
  return blogPosts.map((p) => ({ ...p }));
}

function staticProjectDTOs(): ProjectDTO[] {
  return staticProjects.map((p) => ({
    ...p,
    images: p.images.map((img) => (typeof img === "string" ? img : img.src)),
  }));
}

function cleanPost(doc: any): PostDTO {
  return {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt ?? "",
    content: doc.content ?? "",
    image: doc.image ?? "",
    date: doc.date ?? "",
    readTime: doc.readTime ?? "",
    category: doc.category ?? "",
    tags: doc.tags ?? [],
    author: doc.author ?? "",
  };
}

function cleanProject(doc: any): ProjectDTO {
  return {
    id: String(doc._id),
    slug: doc.slug,
    label: doc.label ?? "",
    title: doc.title,
    description: doc.description ?? "",
    highlights: doc.highlights ?? [],
    images: doc.images ?? [],
    stack: doc.stack ?? [],
    github: doc.github || null,
    live: doc.live || null,
    role: doc.role ?? "",
    duration: doc.duration ?? "",
    completedDate: doc.completedDate ?? "",
    overview: doc.overview ?? "",
    features: doc.features ?? [],
    challenges: doc.challenges ?? [],
    learnings: doc.learnings ?? [],
  };
}

// ─── Posts ───────────────────────────────────────────────────────────────────
export async function getAllPosts(): Promise<PostDTO[]> {
  if (!hasDb()) return staticPosts();
  try {
    await dbConnect();
    const docs = await PostModel.find({ published: true })
      .sort({ date: -1 })
      .lean();
    return docs.length ? docs.map(cleanPost) : staticPosts();
  } catch {
    return staticPosts();
  }
}

export async function getLatestPosts(count = 3): Promise<PostDTO[]> {
  return (await getAllPosts()).slice(0, count);
}

export async function getPostBySlug(slug: string): Promise<PostDTO | null> {
  if (!hasDb()) return staticPosts().find((p) => p.slug === slug) ?? null;
  try {
    await dbConnect();
    const doc = await PostModel.findOne({ slug, published: true }).lean();
    if (doc) return cleanPost(doc);
    return staticPosts().find((p) => p.slug === slug) ?? null;
  } catch {
    return staticPosts().find((p) => p.slug === slug) ?? null;
  }
}

export async function getRelatedPosts(
  slug: string,
  count = 2,
): Promise<PostDTO[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, count);
}

// ─── Paginated post listing (backs /blog and GET /api/blog) ──────────────────
// Filtering/sorting happens here on top of getAllPosts() so the DB-first ▸
// static-fallback guarantee (and the readTime sort, a string field in Mongo)
// applies to both sources. Fine at portfolio scale — the client only ever
// receives one page, without the heavy `content` field.
export type PostSort = "newest" | "oldest" | "shortest" | "longest";

export type PostListItemDTO = Omit<PostDTO, "content">;

export type PostsPageDTO = {
  posts: PostListItemDTO[];
  total: number;
  hasMore: boolean;
};

export async function getPostsPage({
  q = "",
  category = "",
  tag = "",
  sort = "newest",
  offset = 0,
  limit = 6,
}: {
  q?: string;
  category?: string;
  tag?: string;
  sort?: PostSort;
  offset?: number;
  limit?: number;
} = {}): Promise<PostsPageDTO> {
  let posts = await getAllPosts();

  if (q) {
    const query = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query)),
    );
  }
  if (category) posts = posts.filter((p) => p.category === category);
  if (tag) posts = posts.filter((p) => p.tags.includes(tag));

  const byDateDesc = (a: PostDTO, b: PostDTO) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();
  posts = [...posts];
  switch (sort) {
    case "newest":
      posts.sort(byDateDesc);
      break;
    case "oldest":
      posts.sort((a, b) => byDateDesc(b, a));
      break;
    case "shortest":
      posts.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
      break;
    case "longest":
      posts.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
      break;
  }

  const total = posts.length;
  const page = posts
    .slice(offset, offset + limit)
    .map(({ content: _content, ...item }) => item);
  return { posts: page, total, hasMore: offset + limit < total };
}

export async function getPostFilterOptions(): Promise<{
  categories: string[];
  tags: string[];
}> {
  const posts = await getAllPosts();
  return {
    categories: Array.from(
      new Set(posts.map((p) => p.category).filter(Boolean)),
    ),
    tags: Array.from(new Set(posts.flatMap((p) => p.tags))),
  };
}

// ─── Projects ────────────────────────────────────────────────────────────────
export async function getAllProjects(): Promise<ProjectDTO[]> {
  if (!hasDb()) return staticProjectDTOs();
  try {
    await dbConnect();
    const docs = await ProjectModel.find({ published: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
    return docs.length ? docs.map(cleanProject) : staticProjectDTOs();
  } catch {
    return staticProjectDTOs();
  }
}

export async function getFeaturedProjects(count = 3): Promise<ProjectDTO[]> {
  return (await getAllProjects()).slice(0, count);
}

// ─── Paginated project listing (backs /projects and GET /api/projects/list) ──
// Same shape as getPostsPage: filter/sort/slice on top of getAllProjects() so
// both the DB and static-fallback paths behave identically, and the heavy
// case-study fields never reach the list payload.
export type ProjectSort = "default" | "az" | "za" | "newest" | "oldest";

export type ProjectListItemDTO = Omit<
  ProjectDTO,
  "overview" | "features" | "challenges" | "learnings"
>;

export type ProjectsPageDTO = {
  projects: ProjectListItemDTO[];
  total: number;
  hasMore: boolean;
};

export async function getProjectsPage({
  q = "",
  stack = "",
  sort = "default",
  offset = 0,
  limit = 6,
}: {
  q?: string;
  stack?: string;
  sort?: ProjectSort;
  offset?: number;
  limit?: number;
} = {}): Promise<ProjectsPageDTO> {
  let projects = await getAllProjects();

  if (q) {
    const query = q.toLowerCase();
    projects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.stack.some((t) => t.toLowerCase().includes(query)),
    );
  }
  if (stack) projects = projects.filter((p) => p.stack.includes(stack));

  // empty/invalid completedDate ("Ongoing") sorts as oldest
  const completedAt = (p: ProjectDTO) => {
    const t = new Date(p.completedDate).getTime();
    return Number.isNaN(t) ? 0 : t;
  };
  projects = [...projects];
  switch (sort) {
    case "az":
      projects.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      projects.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "newest":
      projects.sort((a, b) => completedAt(b) - completedAt(a));
      break;
    case "oldest":
      projects.sort((a, b) => completedAt(a) - completedAt(b));
      break;
    // "default" keeps the curated sortOrder from getAllProjects()
  }

  const total = projects.length;
  const page = projects
    .slice(offset, offset + limit)
    .map(
      ({
        overview: _overview,
        features: _features,
        challenges: _challenges,
        learnings: _learnings,
        ...item
      }) => item,
    );
  return { projects: page, total, hasMore: offset + limit < total };
}

export async function getProjectStacks(): Promise<string[]> {
  const projects = await getAllProjects();
  return Array.from(new Set(projects.flatMap((p) => p.stack))).sort();
}

// ─── Work Experience ─────────────────────────────────────────────────────────
function staticExperienceDTOs(): ExperienceDTO[] {
  return staticExperiences.map((e, i) => ({ ...e, id: i }));
}

function cleanExperience(doc: any): ExperienceDTO {
  return {
    id: String(doc._id),
    company: doc.company,
    role: doc.role,
    period: doc.period ?? "",
    desc: doc.desc ?? "",
  };
}

export async function getAllExperiences(): Promise<ExperienceDTO[]> {
  if (!hasDb()) return staticExperienceDTOs();
  try {
    await dbConnect();
    const docs = await ExperienceModel.find({ published: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
    return docs.length ? docs.map(cleanExperience) : staticExperienceDTOs();
  } catch {
    return staticExperienceDTOs();
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDTO | null> {
  if (!hasDb())
    return staticProjectDTOs().find((p) => p.slug === slug) ?? null;
  try {
    await dbConnect();
    const doc = await ProjectModel.findOne({ slug, published: true }).lean();
    if (doc) return cleanProject(doc);
    return staticProjectDTOs().find((p) => p.slug === slug) ?? null;
  } catch {
    return staticProjectDTOs().find((p) => p.slug === slug) ?? null;
  }
}
