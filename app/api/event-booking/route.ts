import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      date,
      hallId,
      catererId,
      purohitId,
      customerName,
      customerPhone,
    } = body;

    if (!date || !hallId || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Example total calculation (you can improve later)
    const hall = await prisma.vendor.findUnique({
      where: { id: hallId },
    });

    const caterer = catererId
      ? await prisma.vendor.findUnique({ where: { id: catererId } })
      : null;

    const purohit = purohitId
      ? await prisma.vendor.findUnique({ where: { id: purohitId } })
      : null;

    const total =
      (hall?.basePrice || 0) +
      (caterer?.basePrice || 0) +
      (purohit?.basePrice || 0);

    const event = await prisma.eventBooking.create({
      data: {
        date: new Date(date),

        hall: {
          connect: { id: hallId },
        },

        caterer: catererId
          ? { connect: { id: catererId } }
          : undefined,

        purohit: purohitId
          ? { connect: { id: purohitId } }
          : undefined,

        totalAmount: total,
        customerName,
        customerPhone,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Event booking error:", error);
    return NextResponse.json(
      { error: "Event booking failed" },
      { status: 500 }
    );
  }
}

