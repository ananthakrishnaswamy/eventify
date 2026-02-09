import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(username)
    .digest("hex");

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_session", session, {
    httpOnly: true,
    path: "/",
  });

  return res;
}

