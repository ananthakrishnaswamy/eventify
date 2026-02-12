import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Next.js 16 requires awaiting params
    const { id: bookingId } = await context.params;

    // 1️⃣ Find booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // 2️⃣ Free the availability slot again
    await prisma.vendorAvailability.updateMany({
      where: {
        vendorId: booking.vendorId,
        date: booking.date,
      },
      data: {
        isBooked: false,
      },
    });

    // 3️⃣ Delete booking record
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    console.log("✅ Booking cancelled:", bookingId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Cancel error:", err);
    return NextResponse.json({ error: "Cancel failed" }, { status: 500 });
  }
}

