import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/bookings  → list all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        vendor: {
          select: {
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(bookings);
  } catch (err) {
    console.error("Fetch bookings error:", err);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}

