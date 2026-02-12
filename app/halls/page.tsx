import { PrismaClient } from "@prisma/client";

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
              maxWidth: 400,
            }}
          >
            <strong style={{ fontSize: 18 }}>
              {item.vendor.name}
            </strong>
            <br />
            Location: {item.vendor.location}
            <br />
            Price: ₹{item.vendor.basePrice}
            <br />
            Date: {new Date(item.date).toDateString()}
            <br />

            <button
              style={{
                marginTop: 12,
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

