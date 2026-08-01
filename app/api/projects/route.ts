import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConnect, hasDb } from "@/lib/db";
import { ProjectModel } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!hasDb()) {
    return NextResponse.json(
      { error: "Database not configured. Set MONGODB_URI." },
      { status: 503 },
    );
  }
  await dbConnect();
  const projects = await ProjectModel.find()
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean();
  return NextResponse.json(projects);
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
    const project = await ProjectModel.create(body);
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    return NextResponse.json(project, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Failed to create project" },
      { status: 400 },
    );
  }
}
