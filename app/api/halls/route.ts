import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    return NextResponse.json(
      { error: "date query param required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const date = new Date(dateParam);

  const halls = await prisma.vendor.findMany({
    where: {
      type: "HALL",
      availability: {
        some: {
          date,
          isBooked: false,
        },
      },
    },
    include: {
      halls: true,
    },
  });

  return NextResponse.json(halls);
}

