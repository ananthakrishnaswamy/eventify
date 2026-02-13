import Link from "next/link";

export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif" }}>
      {/* HERO SECTION */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "linear-gradient(to right, #1e3a8a, #2563eb)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 20 }}>
          Eventify
        </h1>
        <p style={{ fontSize: 20, maxWidth: 600, margin: "0 auto 30px" }}>
          Book Halls, Caterers, Pandits and complete event bundles —
          all in one place.
        </p>

        <Link
          href="/halls"
          style={{
            background: "white",
            color: "#2563eb",
            padding: "12px 24px",
            borderRadius: 8,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Browse Halls
        </Link>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, marginBottom: 40 }}>
          Everything You Need For Your Event
        </h2>

        <div
          style={{
            display: "grid",
            gap: 30,
            maxWidth: 900,
            margin: "0 auto",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <Feature
            title="Community Halls"
            description="Search and book available halls based on date and budget."
          />

          <Feature
            title="Catering Services"
            description="Choose menus and pricing from verified caterers."
          />

          <Feature
            title="Purohit / Pandit"
            description="Book experienced purohits for your ceremonies."
          />

          <Feature
            title="Full Event Bundles"
            description="Book hall + caterer + pandit together in one flow."
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "#f3f4f6",
        }}
      >
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>
          Ready to plan your event?
        </h2>

        <Link
          href="/halls"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Start Booking
        </Link>
      </section>
    </main>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        padding: 24,
        borderRadius: 12,
      }}
    >
      <h3 style={{ fontSize: 20, marginBottom: 10 }}>{title}</h3>
      <p style={{ color: "#6b7280" }}>{description}</p>
    </div>
  );
}

