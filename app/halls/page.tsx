// app/halls/page.tsx
export const dynamic = "force-dynamic";

async function getHalls() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/halls?date=2026-02-15`,
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
        {halls.map((hall: any) => (
          <li key={hall.id}>
            <strong>{hall.name}</strong> — ₹{hall.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

