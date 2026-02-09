export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // expires immediately
  });

  return res;
}

