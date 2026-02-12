import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/halls/[id]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }   // ✅ Next.js 16 requires Promise
) {
  const { id } = await params;

  try {
    const availability = await prisma.vendorAvailability.findUnique({
      where: { id },
      include: {
        vendor: true,
      },
    });

    if (!availability) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(availability);
  } catch (err) {
    console.error("Fetch slot error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

