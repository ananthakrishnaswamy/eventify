import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function HallsPage() {
  const start = new Date(Date.UTC(2026, 1, 15, 0, 0, 0));
  const end = new Date(Date.UTC(2026, 1, 15, 23, 59, 59));

  const halls = await prisma.vendorAvailability.findMany({
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

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Halls</h1>

      {halls.length === 0 && <p>No halls available</p>}

      <ul>
        {halls.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: 24,
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 8,
              maxWidth: 420,
            }}
          >
            <strong style={{ fontSize: 18 }}>{item.vendor.name}</strong>
            <br />
            Location: {item.vendor.location}
            <br />
            Price: ₹{item.vendor.basePrice}
            <br />
            Date: {new Date(item.date).toDateString()}
            <br />

            {/* ✅ This is how navigation works in Server Components */}
            <Link
              href={`/halls/${item.vendorId}?date=${item.date.toISOString()}`}
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "#fff",
                borderRadius: 6,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Book Now →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

