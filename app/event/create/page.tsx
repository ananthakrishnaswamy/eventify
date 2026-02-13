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

  // Load vendors when date changes
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
      alert("Select date and hall");
      return;
    }

    const res = await fetch("/api/event-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    <div style={{ padding: 40 }}>
      <h1>Create Event Bundle</h1>

      {/* Date Selection */}
      <div style={{ marginBottom: 20 }}>
        <label>Select Date: </label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      {loading && <p>Loading vendors…</p>}

      {/* HALLS */}
      {date && (
        <>
          <h2>Select Hall</h2>
          {halls.map(v => (
            <VendorCard
              key={v.id}
              vendor={v}
              selected={selectedHall === v.id}
              onSelect={() => setSelectedHall(v.id)}
            />
          ))}

          <h2>Select Caterer</h2>
          {caterers.map(v => (
            <VendorCard
              key={v.id}
              vendor={v}
              selected={selectedCaterer === v.id}
              onSelect={() => setSelectedCaterer(v.id)}
            />
          ))}

          <h2>Select Purohit</h2>
          {purohits.map(v => (
            <VendorCard
              key={v.id}
              vendor={v}
              selected={selectedPurohit === v.id}
              onSelect={() => setSelectedPurohit(v.id)}
            />
          ))}

          {/* Total */}
          <div style={{ marginTop: 30 }}>
            <h3>Total: ₹{calculateTotal()}</h3>

            <button
              onClick={confirmEvent}
              style={{
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Confirm Full Event
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function VendorCard({
  vendor,
  selected,
  onSelect,
}: {
  vendor: Vendor;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      style={{
        border: selected ? "2px solid blue" : "1px solid #ddd",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        maxWidth: 400,
      }}
    >
      <strong>{vendor.name}</strong>
      <br />
      Location: {vendor.location}
      <br />
      Price: ₹{vendor.basePrice || 0}
      <br />

      <button
        onClick={onSelect}
        style={{
          marginTop: 10,
          padding: "6px 12px",
          backgroundColor: selected ? "blue" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {selected ? "Selected" : "Select"}
      </button>
    </div>
  );
}

