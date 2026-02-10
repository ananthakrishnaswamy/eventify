import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    return NextResponse.json(
      { error: "date query param required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const [year, month, day] = dateParam.split("-").map(Number);

  // ✅ UTC DAY RANGE (this is the fix)
  const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

  const availabilities = await prisma.vendorAvailability.findMany({
    where: {
      isBooked: false,
      date: {
        gte: start,
        lte: end,
      },
      vendor: {
        type: "HALL",
      },
    },
    include: {
      vendor: true,
    },
  });

  return NextResponse.json(availabilities);
}

