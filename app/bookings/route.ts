import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vendor: {
        select: {
          name: true,
          location: true,
        },
      },
    },
  });

  return NextResponse.json(bookings);
}

