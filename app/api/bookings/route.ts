import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vendorId, date, customerName, customerPhone } = body;

    if (!vendorId || !date || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingDate = new Date(date);
    bookingDate.setUTCHours(0, 0, 0, 0);

    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Find availability
      const availability = await tx.vendorAvailability.findFirst({
        where: {
          vendorId,
          date: bookingDate,
          isBooked: false,
        },
      });

      if (!availability) {
        throw new Error("Hall not available for selected date");
      }

      // 2️⃣ Mark availability as booked
      await tx.vendorAvailability.update({
        where: { id: availability.id },
        data: { isBooked: true },
      });

      // 3️⃣ Create booking
      const booking = await tx.booking.create({
        data: {
          vendorId,
          date: bookingDate,
          customerName,
          customerPhone,
        },
      });

      return booking;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Booking failed" },
      { status: 500 }
    );
  }
}

