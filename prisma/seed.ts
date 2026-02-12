import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Generate availability rows for next N days
 */
function generateAvailability(days: number) {
  const rows = [];

  for (let i = 0; i < days; i++) {
    const d = new Date();

    // move forward i days
    d.setUTCDate(d.getUTCDate() + i);

    // normalize to midnight UTC (important for matching in API)
    d.setUTCHours(0, 0, 0, 0);

    rows.push({ date: new Date(d), isBooked: false });
  }

  return rows;
}

async function main() {
  console.log("🌱 Seeding database...");

  // ⚠️ Clear existing demo data
  await prisma.booking.deleteMany();
  await prisma.vendorAvailability.deleteMany();
  await prisma.hall.deleteMany();
  await prisma.vendor.deleteMany();

  // generate next 120 days availability
  const availabilityRows = generateAvailability(120);

  // -----------------------------
  // Hall 1
  // -----------------------------
  await prisma.vendor.create({
    data: {
      name: "Sri Ganesh Community Hall",
      type: "HALL",
      location: "Bangalore",
      basePrice: 50000,
      halls: {
        create: {
          capacity: 300,
          amenities: ["Parking", "Power Backup", "AC"],
        },
      },
      availability: {
        createMany: {
          data: availabilityRows,
        },
      },
    },
  });

  // -----------------------------
  // Hall 2
  // -----------------------------
  await prisma.vendor.create({
    data: {
      name: "Lakshmi Convention Center",
      type: "HALL",
      location: "Bangalore",
      basePrice: 75000,
      halls: {
        create: {
          capacity: 500,
          amenities: ["Parking", "Generator", "Stage"],
        },
      },
      availability: {
        createMany: {
          data: availabilityRows,
        },
      },
    },
  });

  console.log("✅ Seed completed with 120 days of availability");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

