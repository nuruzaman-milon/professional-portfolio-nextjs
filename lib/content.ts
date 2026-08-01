import { blogPosts } from "@/data/blog";
import { projects as staticProjects } from "@/data/projects";
import { dbConnect, hasDb } from "./db";
import { PostModel, ProjectModel } from "./models";

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
