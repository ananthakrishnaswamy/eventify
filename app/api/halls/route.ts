import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * Prevent multiple Prisma instances in dev / serverless
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "date query param required (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    // Create UTC date range for the full day
    const start = new Date(dateParam);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(dateParam);
    end.setUTCHours(23, 59, 59, 999);

    const halls = await prisma.vendor.findMany({
      where: {
        type: "HALL",
        availability: {
          some: {
            isBooked: false,
            date: {
              gte: start,
              lte: end,
            },
          },
        },
      },
      include: {
        availability: true,
      },
    });

    return NextResponse.json(halls);
  } catch (error) {
    console.error("GET /api/halls error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

