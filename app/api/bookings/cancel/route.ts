import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { bookingId } = await req.json();

  if (!bookingId) {
    return NextResponse.json(
      { error: "bookingId is required" },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Fetch booking
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      if (booking.status === "CANCELLED") {
        throw new Error("Booking already cancelled");
      }

      // 2️⃣ Cancel booking
      const cancelledBooking = await tx.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
      });

      // 3️⃣ Free availability
      await tx.vendorAvailability.updateMany({
        where: {
          vendorId: booking.vendorId,
          date: booking.date,
        },
        data: { isBooked: false },
      });

      return cancelledBooking;
    });

    return NextResponse.json({
      success: true,
      booking: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}

