import { NextResponse } from "next/server";
import { dbConnect, hasDb } from "@/lib/db";
import { MessageModel } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

async function guard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDb()) {
    return NextResponse.json(
      { error: "Database not configured. Set MONGODB_URI." },
      { status: 503 },
    );
  }
  return null;
}

export async function PATCH(req: Request, { params }: Ctx) {
  const blocked = await guard();
  if (blocked) return blocked;
  const { id } = await params;
  const { read } = await req.json();
  await dbConnect();
  const message = await MessageModel.findByIdAndUpdate(
    id,
    { read: Boolean(read) },
    { new: true },
  ).lean();
  if (!message)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(message);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const blocked = await guard();
  if (blocked) return blocked;
  const { id } = await params;
  await dbConnect();
  const message = await MessageModel.findByIdAndDelete(id).lean();
  if (!message)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
