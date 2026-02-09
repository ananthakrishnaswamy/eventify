import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const session = req.cookies.get("admin_session")?.value;

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const expected = crypto
      .createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
      .update(process.env.ADMIN_USERNAME!)
      .digest("hex");

    if (session !== expected) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

