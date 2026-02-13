"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Vendor = {
  id: string;
  name: string;
  location: string;
  basePrice: number | null;
  type: string;
};

export default function CreateEventPage() {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedCaterer, setSelectedCaterer] = useState<string | null>(null);
  const [selectedPurohit, setSelectedPurohit] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;

    async function loadVendors() {
      setLoading(true);
      const res = await fetch(`/api/vendors?date=${date}`);
      const data = await res.json();
      setVendors(data);
      setLoading(false);
    }

    loadVendors();
  }, [date]);

  const halls = vendors.filter(v => v.type === "HALL");
  const caterers = vendors.filter(v => v.type === "CATERER");
  const purohits = vendors.filter(v => v.type === "PANDIT");

  function calculateTotal() {
    const selected = vendors.filter(v =>
      [selectedHall, selectedCaterer, selectedPurohit].includes(v.id)
    );
    return selected.reduce((sum, v) => sum + (v.basePrice || 0), 0);
  }

  async function confirmEvent() {
    if (!date || !selectedHall) {
      alert("Please select a date and hall");
      return;
    }

    const res = await fetch("/api/event-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        hallId: selectedHall,
        catererId: selectedCaterer,
        purohitId: selectedPurohit,
        customerName: "Test User",
        customerPhone: "9999999999",
      }),
    });

    if (!res.ok) {
      alert("Booking failed");
      return;
    }

    router.push("/bookings");
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Create Your Event Bundle</h1>

      {/* Date Selection */}
      <div style={sectionStyle}>
        <label style={{ fontWeight: 600 }}>Select Event Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={dateInputStyle}
        />
      </div>

      {loading && <p>Loading vendors...</p>}

      {date && (
        <div style={gridStyle}>
          <VendorSection
            title="Select Hall"
            vendors={halls}
            selectedId={selectedHall}
            onSelect={setSelectedHall}
          />

          <VendorSection
            title="Select Caterer"
            vendors={caterers}
            selectedId={selectedCaterer}
            onSelect={setSelectedCaterer}
          />

          <VendorSection
            title="Select Purohit"
            vendors={purohits}
            selectedId={selectedPurohit}
            onSelect={setSelectedPurohit}
          />
        </div>
      )}

      {date && (
        <div style={stickyTotalStyle}>
          <div>
            <strong>Total:</strong> ₹{calculateTotal()}
          </div>
          <button onClick={confirmEvent} style={confirmButtonStyle}>
            Confirm Full Event
          </button>
        </div>
      )}
    </div>
  );
}

function VendorSection({
  title,
  vendors,
  selectedId,
  onSelect,
}: {
  title: string;
  vendors: Vendor[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={sectionCardStyle}>
      <h2 style={{ marginBottom: 16 }}>{title}</h2>

      {vendors.length === 0 && <p>No vendors available</p>}

      {vendors.map(v => (
        <div
          key={v.id}
          style={{
            ...vendorCardStyle,
            border:
              selectedId === v.id
                ? "2px solid #2563eb"
                : "1px solid #e5e7eb",
          }}
        >
          <div>
            <strong>{v.name}</strong>
            <div style={{ fontSize: 14, color: "#555" }}>
              {v.location}
            </div>
            <div style={{ marginTop: 6 }}>
              ₹{v.basePrice || 0}
            </div>
          </div>

          <button
            onClick={() => onSelect(v.id)}
            style={{
              ...selectButtonStyle,
              backgroundColor:
                selectedId === v.id ? "#1e40af" : "#2563eb",
            }}
          >
            {selectedId === v.id ? "Selected" : "Select"}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------- STYLES ---------- */

const containerStyle = {
  maxWidth: 1100,
  margin: "40px auto",
  padding: 20,
};

const titleStyle = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 30,
};

const sectionStyle = {
  marginBottom: 30,
  display: "flex",
  flexDirection: "column" as const,
  gap: 8,
};

const dateInputStyle = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ddd",
  width: 200,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 24,
};

const sectionCardStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const vendorCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
};

const selectButtonStyle = {
  padding: "6px 14px",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600,
};

const stickyTotalStyle = {
  marginTop: 40,
  padding: 20,
  borderTop: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 18,
};

const confirmButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

