import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConnect, hasDb } from "@/lib/db";
import { PostModel } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!hasDb()) {
    return NextResponse.json(
      { error: "Database not configured. Set MONGODB_URI." },
      { status: 503 },
    );
  }
  await dbConnect();
  const posts = await PostModel.find().sort({ date: -1 }).lean();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDb()) {
    return NextResponse.json(
      { error: "Database not configured. Set MONGODB_URI." },
      { status: 503 },
    );
  }
  const body = await req.json();
  await dbConnect();
  try {
    const post = await PostModel.create(body);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json(post, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Failed to create post" },
      { status: 400 },
    );
  }
}
