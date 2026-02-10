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
      <strong style={{ fontSize: 18 }}>{item.vendor.name}</strong>
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
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#1e40af")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#2563eb")
        }
      >
        Book Now
      </button>
    </li>
  ))}
</ul>
    </div>
  );
}

