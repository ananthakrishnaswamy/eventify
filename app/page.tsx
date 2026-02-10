import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Eventify</h1>

      <p style={{ marginBottom: 30 }}>
        Book community halls easily and manage your bookings.
      </p>

      <div style={{ display: "flex", gap: 20 }}>
        <Link
          href="/halls"
          style={{
            padding: "12px 20px",
            background: "black",
            color: "white",
            textDecoration: "none",
          }}
        >
          Find Halls
        </Link>

        <Link
          href="/bookings"
          style={{
            padding: "12px 20px",
            border: "1px solid black",
            textDecoration: "none",
          }}
        >
          My Bookings
        </Link>
      </div>
    </main>
  );
}

