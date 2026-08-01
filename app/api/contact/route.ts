import { Resend } from "resend";
import { NextResponse } from "next/server";
import { dbConnect, hasDb } from "@/lib/db";
import { MessageModel } from "@/lib/models";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, subject, message, website } = body;

  // Honeypot — real users never fill this hidden field
  if (website) return NextResponse.json({ success: true });

  if (
    !name?.trim() ||
    !email?.trim() ||
    !subject?.trim() ||
    !message?.trim()
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Message too long." }, { status: 400 });
  }

  let stored = false;
  let emailed = false;

  // 1) Store in the database → shows up in the admin Messages inbox
  if (hasDb()) {
    try {
      await dbConnect();
      await MessageModel.create({ name, email, subject, message });
      stored = true;
    } catch (e) {
      console.error("Failed to store contact message:", e);
    }
  }

  // 2) Email notification (optional — needs RESEND_API_KEY)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.CONTACT_EMAIL || "nuruzaman.milon@gmail.com";
      const { error } = await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <h3>New message from your portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
        `,
      });
      emailed = !error;
      if (error) console.error("Resend error:", error);
    } catch (e) {
      console.error("Failed to send contact email:", e);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      {
        error:
          "Could not deliver your message right now. Please email me directly at nuruzaman.milon@gmail.com.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
