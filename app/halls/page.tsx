type Availability = {
  id: string;
  date: string;
  isBooked: boolean;
  vendor: {
    id: string;
    name: string;
    location: string;
    basePrice: number;
  };
};

async function getHalls(): Promise<Availability[]> {
  const res = await fetch(
    "https://eventify-self.vercel.app/api/halls?date=2026-02-15",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch halls");
  }

  return res.json();
}

export default async function HallsPage() {
  const halls = await getHalls();

  return (
    <div style={{ padding: 40 }}>
      <h1>Available Halls</h1>

      {halls.length === 0 && <p>No halls available</p>}

      <ul>
        {halls.map((item) => (
          <li key={item.id} style={{ marginBottom: 24 }}>
            <strong>{item.vendor.name}</strong>
            <br />
            Location: {item.vendor.location}
            <br />
            Price: ₹{item.vendor.basePrice}
            <br />
            Date: {new Date(item.date).toDateString()}
            <br />

            {/* ✅ BOOK BUTTON */}
            <form
              action={async () => {
                "use server";

                await fetch(
                  "https://eventify-self.vercel.app/api/bookings",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      vendorId: item.vendor.id,
                      date: "2026-02-15",
                      customerName: "Test User",
                      customerPhone: "9999999999",
                    }),
                  }
                );
              }}
            >
              <button type="submit" style={{ marginTop: 8 }}>
                Book
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

