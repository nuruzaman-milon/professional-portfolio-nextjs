import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConnect, hasDb } from "@/lib/db";
import { ProjectModel } from "@/lib/models";
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
  const project = await ProjectModel.findById(id).lean();
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
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
    const project = await ProjectModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!project)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${(project as any).slug}`);
    return NextResponse.json(project);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Failed to update project" },
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
  const project = await ProjectModel.findByIdAndDelete(id).lean();
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  revalidatePath("/projects");
  return NextResponse.json({ success: true });
}
