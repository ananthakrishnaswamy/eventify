import { PrismaClient, BookingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { bookingId } = await req.json();

  if (!bookingId) {
    return NextResponse.json(
      { error: "bookingId is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1️⃣ Fetch booking
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      if (booking.status === BookingStatus.CANCELLED) {
        throw new Error("Booking already cancelled");
      }

      // 2️⃣ Cancel booking
      await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
        },
      });

      // 3️⃣ Release availability
      await tx.vendorAvailability.update({
        where: {
          vendorId_date: {
            vendorId: booking.vendorId,
            date: booking.date,
          },
        },
        data: {
          isBooked: false,
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Cancellation failed" },
      { status: 400 }
    );
  }
}

