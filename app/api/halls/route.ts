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

  // ✅ FORCE UTC DATE (this is the key)
  const [year, month, day] = dateParam.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  const availabilities = await prisma.vendorAvailability.findMany({
    where: {
      isBooked: false,
      date: date,
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

