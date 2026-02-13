import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date required" }, { status: 400 });
  }

  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);

  const vendors = await prisma.vendor.findMany({
    where: {
      availability: {
        some: {
          date: {
            gte: start,
            lte: end,
          },
          isBooked: false,
        },
      },
    },
  });

  return NextResponse.json(vendors);
}

