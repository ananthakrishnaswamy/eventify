"use client";

import { useState } from "react";
import Link from "next/link";

type HallAvailability = {
  id: string;
  date: string;
  vendorId: string;
  vendor: {
    name: string;
    location: string;
    basePrice: number;
  };
};

export default function HallsPage() {
  const [date, setDate] = useState("");
  const [halls, setHalls] = useState<HallAvailability[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!date) {
      alert("Please select a date");
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/halls?date=${date}`, {
      cache: "no-store",
    });

    const data = await res.json();
    setHalls(data);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Find Available Halls</h1>

      {/* Date Picker */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: 8 }}
        />
        <button
          onClick={search}
          style={{
            marginLeft: 10,
            padding: "8px 16px",
            background: "black",
            color: "white",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {halls.length === 0 && !loading && <p>No halls available</p>}

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
            <strong>{item.vendor.name}</strong>
            <br />
            Location: {item.vendor.location}
            <br />
            Price: ₹{item.vendor.basePrice}
            <br />
            Date: {new Date(item.date).toDateString()}
            <br />

            <Link
              href={`/halls/${item.vendorId}?date=${item.date}`}
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

