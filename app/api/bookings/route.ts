export const runtime = "nodejs";

import { PrismaClient, BookingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    vendorId,
    date,
    amount,
    customerName,
    customerPhone,
  } = body;

  if (!vendorId || !date || !amount || !customerName || !customerPhone) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const booking = await prisma.$transaction(async (tx) => {
      // 1️⃣ Check availability
      const availability = await tx.vendorAvailability.findUnique({
        where: {
          vendorId_date: {
            vendorId,
            date: new Date(date),
          },
        },
      });

      if (!availability || availability.isBooked) {
        throw new Error("Vendor not available for selected date");
      }

      // 2️⃣ Create booking
      const booking = await tx.booking.create({
        data: {
          vendorId,
          date: new Date(date),
          amount,
          status: BookingStatus.CONFIRMED,
          customerName,
          customerPhone,
        },
      });

      // 3️⃣ Mark availability as booked
      await tx.vendorAvailability.update({
        where: {
          id: availability.id,
        },
        data: {
          isBooked: true,
        },
      });

      return booking;
    });

    return NextResponse.json(booking);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Booking failed" },
      { status: 400 }
    );
  }
}

