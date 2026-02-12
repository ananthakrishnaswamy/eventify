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
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  async function loadBookings() {
    try {
      const res = await fetch("/api/bookings", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  async function cancelBooking(id: string) {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    try {
      setCancellingId(id);

      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Cancel failed");

      // ✅ Update UI instantly (no reload needed)
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "CANCELLED" } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
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
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
            marginBottom: 20,
            maxWidth: 420,
            background: b.status === "CANCELLED" ? "#f9f9f9" : "#fff",
            opacity: b.status === "CANCELLED" ? 0.7 : 1,
          }}
        >
          <strong style={{ fontSize: 18 }}>{b.vendor.name}</strong>
          <br />
          {b.vendor.location}
          <br />
          Date: {new Date(b.date).toDateString()}
          <br />
          Amount: ₹{b.amount}
          <br />
          Status:{" "}
          <b style={{ color: b.status === "CONFIRMED" ? "green" : "gray" }}>
            {b.status}
          </b>
          <br />

          {b.status === "CONFIRMED" && (
            <button
              onClick={() => cancelBooking(b.id)}
              disabled={cancellingId === b.id}
              style={{
                marginTop: 12,
                padding: "8px 16px",
                backgroundColor: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                opacity: cancellingId === b.id ? 0.6 : 1,
              }}
            >
              {cancellingId === b.id ? "Cancelling..." : "Cancel Booking"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

