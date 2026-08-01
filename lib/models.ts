import mongoose, { Schema, type Model } from "mongoose";

// ─── Blog Post ────────────────────────────────────────────────────────────────
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" }, // HTML
    image: { type: String, default: "" },
    date: { type: String, required: true }, // ISO date string, e.g. 2026-05-10
    readTime: { type: String, default: "5 min read" },
    category: { type: String, default: "General" },
    tags: { type: [String], default: [] },
    author: { type: String, default: "Nuruzaman Milon" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ─── Project ──────────────────────────────────────────────────────────────────
const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    label: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    images: { type: [String], default: [] }, // public paths or full URLs
    stack: { type: [String], default: [] },
    github: { type: String, default: null },
    live: { type: String, default: null },
    role: { type: String, default: "" },
    duration: { type: String, default: "" },
    completedDate: { type: String, default: "" }, // empty = ongoing
    overview: { type: String, default: "" },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    learnings: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 }, // lower = shown first
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ─── Work Experience ──────────────────────────────────────────────────────────
const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true }, // e.g. "Mar 2023 – Present"
    desc: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 }, // lower = shown first (most recent job)
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const PostModel: Model<any> =
  mongoose.models.Post || mongoose.model("Post", PostSchema);
export const ProjectModel: Model<any> =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
export const ExperienceModel: Model<any> =
  mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
