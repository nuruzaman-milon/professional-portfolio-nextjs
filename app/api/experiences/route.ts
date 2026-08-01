import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { dbConnect, hasDb } from "@/lib/db";
import { ExperienceModel } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!hasDb()) {
    return NextResponse.json(
      { error: "Database not configured. Set MONGODB_URI." },
      { status: 503 },
    );
  }
  await dbConnect();
  const experiences = await ExperienceModel.find()
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean();
  return NextResponse.json(experiences);
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
    const experience = await ExperienceModel.create(body);
    revalidatePath("/");
    return NextResponse.json(experience, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Failed to create experience" },
      { status: 400 },
    );
  }
}
