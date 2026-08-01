import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConnect, hasDb } from "@/lib/db";
import { PostModel, ProjectModel } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";
import { blogPosts } from "@/data/blog";
import { projects as staticProjects } from "@/data/projects";

/*
 * One-click migration: imports the existing static content from data/blog.ts
 * and data/projects.ts into MongoDB. Safe to run multiple times (upserts by
 * slug — existing documents keep any edits you've made, only missing ones
 * are inserted).
 */

// Static project images are next/image imports; map slugs to their stable
// public/ paths so the DB stores portable URLs.
const projectImages: Record<string, string[]> = {
  swop: [
    "/images/projects/swop/swop-thumb-12.png",
    "/images/projects/swop/swop-thumb-13.png",
    "/images/projects/swop/swop-thumb-11.png",
  ],
  "ecommerce-platform": [
    "/images/projects/nazaara/nazaara-1.png",
    "/images/projects/nazaara/nazaara-2.png",
    "/images/projects/nazaara/nazaara-3.png",
  ],
  "erp-system": [
    "/images/projects/erp/erp1.webp",
    "/images/projects/erp/erp2.webp",
    "/images/projects/erp/erp3.webp",
  ],
};

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDb()) {
    return NextResponse.json(
      { error: "Database not configured. Set MONGODB_URI." },
      { status: 503 },
    );
  }

  await dbConnect();
  let postsInserted = 0;
  let projectsInserted = 0;

  for (const p of blogPosts) {
    const { id: _id, ...doc } = p;
    const res = await PostModel.updateOne(
      { slug: p.slug },
      { $setOnInsert: { ...doc, published: true } },
      { upsert: true },
    );
    if (res.upsertedCount) postsInserted++;
  }

  for (const [i, p] of staticProjects.entries()) {
    const { id: _id, images: _images, ...doc } = p;
    const res = await ProjectModel.updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          ...doc,
          images: projectImages[p.slug] ?? [],
          sortOrder: i,
          published: true,
        },
      },
      { upsert: true },
    );
    if (res.upsertedCount) projectsInserted++;
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/projects");

  return NextResponse.json({
    success: true,
    postsInserted,
    projectsInserted,
    message: `Imported ${postsInserted} posts and ${projectsInserted} projects.`,
  });
}
