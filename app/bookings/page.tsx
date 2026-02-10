"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  date: string;
  amount: number;
  status: "CONFIRMED" | "CANCELLED";
  vendor: {
    name: string;
    location: string;
  };
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    const res = await fetch("/api/bookings", { cache: "no-store" });
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  }

  async function cancelBooking(id: string) {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    const res = await fetch("/api/bookings/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: id }),
    });

    if (!res.ok) {
      alert("Failed to cancel booking");
      return;
    }

    await loadBookings();
  }

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            padding: 16,
            marginBottom: 16,
          }}
        >
          <strong>{b.vendor.name}</strong>
          <br />
          {b.vendor.location}
          <br />
          Date: {new Date(b.date).toDateString()}
          <br />
          Amount: ₹{b.amount}
          <br />
          Status: <b>{b.status}</b>
          <br />

          {b.status === "CONFIRMED" && (
            <button
              onClick={() => cancelBooking(b.id)}
              style={{
                marginTop: 8,
                background: "red",
                color: "white",
                padding: "6px 12px",
              }}
            >
              Cancel Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

