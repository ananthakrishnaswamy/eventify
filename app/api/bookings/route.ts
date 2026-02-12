import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/bookings  → list all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        vendor: {
          select: {
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(bookings);
  } catch (err) {
    console.error("Fetch bookings error:", err);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}

// POST /api/bookings → create a booking
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { availabilityId, customerName, customerPhone } = body;

    if (!availabilityId) {
      return NextResponse.json(
        { error: "availabilityId required" },
        { status: 400 }
      );
    }

    // 1️⃣ Find availability slot
    const availability = await prisma.vendorAvailability.findUnique({
      where: { id: availabilityId },
      include: { vendor: true },
    });

    if (!availability) {
      return NextResponse.json(
        { error: "Availability not found" },
        { status: 404 }
      );
    }

    if (availability.isBooked) {
      return NextResponse.json(
        { error: "Already booked" },
        { status: 400 }
      );
    }

    // 2️⃣ Create booking
    const booking = await prisma.booking.create({
      data: {
        vendorId: availability.vendorId,
        date: availability.date,
        customerName: customerName || "Guest",
        customerPhone: customerPhone || "NA",
        amount: availability.vendor.basePrice ?? 0,
        status: "CONFIRMED",
      },
    });

    // 3️⃣ Mark slot as booked
    await prisma.vendorAvailability.update({
      where: { id: availabilityId },
      data: { isBooked: true },
    });

    return NextResponse.json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

