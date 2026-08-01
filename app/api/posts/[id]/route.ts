import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConnect, hasDb } from "@/lib/db";
import { PostModel } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

function guard() {
  if (!hasDb()) {
    return NextResponse.json(
      { error: "Database not configured. Set MONGODB_URI." },
      { status: 503 },
    );
  }
  return null;
}

export async function GET(_req: Request, { params }: Ctx) {
  const blocked = guard();
  if (blocked) return blocked;
  const { id } = await params;
  await dbConnect();
  const post = await PostModel.findById(id).lean();
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const blocked = guard();
  if (blocked) return blocked;
  const { id } = await params;
  const body = await req.json();
  await dbConnect();
  try {
    const post = await PostModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!post)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${(post as any).slug}`);
    return NextResponse.json(post);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Failed to update post" },
      { status: 400 },
    );
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const blocked = guard();
  if (blocked) return blocked;
  const { id } = await params;
  await dbConnect();
  const post = await PostModel.findByIdAndDelete(id).lean();
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  revalidatePath("/blog");
  return NextResponse.json({ success: true });
}
