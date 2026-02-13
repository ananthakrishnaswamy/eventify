import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function HallsPage() {
  const start = new Date(Date.UTC(2026, 1, 15, 0, 0, 0));
  const end = new Date(Date.UTC(2026, 1, 15, 23, 59, 59));

  const halls = await prisma.vendorAvailability.findMany({
    where: {
      isBooked: false,
      date: { gte: start, lte: end },
      vendor: { type: "HALL" },
    },
    include: { vendor: true },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Available Halls</h1>

      {halls.length === 0 && (
        <p className="text-gray-500">No halls available</p>
      )}

      <div className="space-y-4">
        {halls.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <h2 className="text-lg font-semibold">
              {item.vendor.name}
            </h2>

            <p className="text-gray-600">
              📍 {item.vendor.location}
            </p>

            <p className="font-medium mt-1">
              ₹{item.vendor.basePrice}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(item.date).toDateString()}
            </p>

            <Link
              href={`/halls/${item.id}?date=${item.date}`}
              className="block mt-3 text-center bg-blue-600 text-white py-2 rounded-lg font-semibold active:scale-95 transition"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

