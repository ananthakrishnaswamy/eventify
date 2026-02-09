import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  let availabilityFilter: any = {
    some: {
      isBooked: false,
    },
  };

  if (dateParam) {
    const start = new Date(dateParam);
    start.setHours(0, 0, 0, 0);

    const end = new Date(dateParam);
    end.setHours(23, 59, 59, 999);

    availabilityFilter = {
      some: {
        isBooked: false,
        date: {
          gte: start,
          lte: end,
        },
      },
    };
  }

  const halls = await prisma.vendor.findMany({
    where: {
      type: "HALL",
      availability: availabilityFilter,
    },
    include: {
      halls: true,
      availability: true,
    },
  });

  return NextResponse.json(halls);
}

