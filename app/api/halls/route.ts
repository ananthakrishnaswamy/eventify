import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  console.log("➡️ dateParam:", dateParam);

  if (!dateParam) {
    return NextResponse.json(
      { error: "date query param required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const [year, month, day] = dateParam.split("-").map(Number);

  const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

  console.log("🕒 start UTC:", start.toISOString());
  console.log("🕒 end UTC:", end.toISOString());

  // 🔎 sanity check – fetch ALL availability
  const allAvail = await prisma.vendorAvailability.findMany({
    include: { vendor: true },
  });

  console.log("📦 TOTAL availability rows:", allAvail.length);
  console.log(
    "📦 SAMPLE availability dates:",
    allAvail.map(a => a.date.toISOString())
  );

  const availabilities = await prisma.vendorAvailability.findMany({
    where: {
      isBooked: false,
      date: {
        gte: start,
        lte: end,
      },
      vendor: {
        type: "HALL",
      },
    },
    include: {
      vendor: true,
    },
  });

  console.log("✅ MATCHED rows:", availabilities.length);

  return NextResponse.json(availabilities);
}

