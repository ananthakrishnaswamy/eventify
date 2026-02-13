import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const bookings = await prisma.booking.findMany({
    where: {
      vendorId: id,
    },
    orderBy: {
      date: "asc",
    },
  });

  return NextResponse.json(bookings);
}

