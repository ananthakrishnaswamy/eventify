"use client";

import { useState } from "react";

export default function VendorAvailabilityPage() {
  const [date, setDate] = useState("");

  async function addAvailability() {
    const vendorId = localStorage.getItem("vendorId");

    await fetch("/api/vendor/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vendorId, date }),
    });

    alert("Availability added");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Manage Availability</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        onClick={addAvailability}
        style={{
          marginLeft: 10,
          padding: "8px 16px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Add Date
      </button>
    </div>
  );
}

