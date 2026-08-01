import { NextResponse } from "next/server";
import { dbConnect, hasDb } from "@/lib/db";
import { MessageModel } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";

// Messages are private — even reading requires the admin session.
export async function GET() {
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
  const messages = await MessageModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(messages);
}
