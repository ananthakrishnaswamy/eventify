import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Get vendor price
      const vendor = await tx.vendor.findUnique({
  where: { id: vendorId },
});

if (!vendor) {
  throw new Error("Vendor not found");
}

if (vendor.basePrice === null) {
  throw new Error("Vendor price not configured");
}

      // 2️⃣ Check availability
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

      // 3️⃣ Create booking (✅ REQUIRED FIELDS)
      const booking = await tx.booking.create({
        data: {
          vendorId: vendor.id,
          date: bookingDate,
          customerName,
          customerPhone,
          amount: vendor.basePrice,
          status: "CONFIRMED",
        },
      });

      // 4️⃣ Mark availability as booked
      await tx.vendorAvailability.update({
        where: { id: availability.id },
        data: { isBooked: true },
      });

      return booking;
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}

