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

  const start = new Date(`${dateParam}T00:00:00.000Z`);
  const end = new Date(`${dateParam}T23:59:59.999Z`);

  const halls = await prisma.vendorAvailability.findMany({
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

  return NextResponse.json(halls);
}

