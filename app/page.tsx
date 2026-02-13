import Link from "next/link";

export default function HomePage() {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Eventify Dashboard</h1>
      <p style={subtitleStyle}>
        Manage halls, vendors and complete event bookings
      </p>

      <div style={gridStyle}>
        <NavCard
          title="Browse Halls"
          description="Search and book available halls"
          href="/halls"
        />

        <NavCard
          title="My Bookings"
          description="View & cancel your bookings"
          href="/bookings"
        />

        <NavCard
          title="Create Event Bundle"
          description="Book hall + caterer + purohit together"
          href="/event/create"
        />

        <NavCard
          title="Admin Vendors"
          description="Add & manage vendors"
          href="/admin/vendors"
        />

        <NavCard
          title="Vendor Dashboard"
          description="Vendor availability & bookings"
          href="/vendor/dashboard"
        />
      </div>
    </div>
  );
}

function NavCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} style={cardStyle}>
      <h2 style={{ marginBottom: 10 }}>{title}</h2>
      <p style={{ color: "#555" }}>{description}</p>
    </Link>
  );
}

/* ---------- STYLES ---------- */

const containerStyle = {
  maxWidth: 1100,
  margin: "60px auto",
  padding: 20,
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 10,
};

const subtitleStyle = {
  marginBottom: 40,
  color: "#555",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
};

const cardStyle = {
  display: "block",
  padding: 24,
  borderRadius: 12,
  textDecoration: "none",
  background: "#ffffff",
  border: "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
};

