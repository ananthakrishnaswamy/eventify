import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  const whereAvailability = dateParam
    ? {
        some: {
          date: new Date(dateParam),
          isBooked: false,
        },
      }
    : {
        some: {
          isBooked: false,
        },
      };

  const halls = await prisma.vendor.findMany({
    where: {
      type: "HALL",
      availability: whereAvailability,
    },
    include: {
      halls: true,
      availability: true,
    },
  });

  return NextResponse.json(halls);
}

