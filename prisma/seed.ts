import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.vendorAvailability.deleteMany();
  await prisma.hall.deleteMany();
  await prisma.vendor.deleteMany();

  // Create Hall 1
  const hall1 = await prisma.vendor.create({
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
          data: [
            { date: new Date("2026-02-10") },
            { date: new Date("2026-02-11") },
          ],
        },
      },
    },
  });

  // Create Hall 2
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
          data: [
            { date: new Date("2026-02-11") },
            { date: new Date("2026-02-12") },
          ],
        },
      },
    },
  });

  console.log("Seed data created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

