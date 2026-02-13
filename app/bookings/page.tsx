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

      // Instant UI update
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

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className={`bg-white rounded-xl shadow p-5 transition ${
              b.status === "CANCELLED" ? "opacity-60" : ""
            }`}
          >
            <h2 className="text-lg font-semibold">
              {b.vendor.name}
            </h2>

            <p className="text-gray-600">
              📍 {b.vendor.location}
            </p>

            <p className="mt-2 text-sm">
              📅 {new Date(b.date).toDateString()}
            </p>

            <p className="mt-1 font-medium">
              ₹{b.amount}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span
                className={`font-semibold ${
                  b.status === "CONFIRMED"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {b.status}
              </span>
            </p>

            {b.status === "CONFIRMED" && (
              <button
                onClick={() => cancelBooking(b.id)}
                disabled={cancellingId === b.id}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold active:scale-95 transition disabled:opacity-50"
              >
                {cancellingId === b.id
                  ? "Cancelling..."
                  : "Cancel Booking"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

