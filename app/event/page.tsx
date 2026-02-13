"use client";

import { useState } from "react";

export default function EventPage() {
  const [date, setDate] = useState("");
  const [hall, setHall] = useState<any>(null);
  const [caterer, setCaterer] = useState<any>(null);
  const [purohit, setPurohit] = useState<any>(null);

  const total =
    (hall?.basePrice || 0) +
    (caterer?.basePrice || 0) +
    (purohit?.basePrice || 0);

  async function bookEvent() {
    const res = await fetch("/api/event-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        hallId: hall?.id,
        catererId: caterer?.id,
        purohitId: purohit?.id,
      }),
    });

    if (!res.ok) {
      alert("Booking failed");
      return;
    }

    alert("Event booked successfully 🎉");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Event Booking</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <h3>Total: ₹{total}</h3>

      <button onClick={bookEvent}>
        Confirm Event Booking
      </button>
    </div>
  );
}

