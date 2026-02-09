export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date"); // optional for now

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
      availability: true,
    },
  });

  return NextResponse.json(halls);
}

