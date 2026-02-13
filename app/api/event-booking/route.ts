import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { date, hallId, catererId, purohitId } = await req.json();

  try {
    const hall = await prisma.vendor.findUnique({
      where: { id: hallId },
    });

    if (!hall) {
      return NextResponse.json({ error: "Hall required" }, { status: 400 });
    }

    const total =
      (hall.basePrice || 0);

    const event = await prisma.eventBooking.create({
      data: {
        date: new Date(date),
        hallId,
        catererId,
        purohitId,
        totalAmount: total,
      },
    });

    return NextResponse.json(event);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

