"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  async function loadBookings() {
    try {
      const res = await fetch("/api/bookings", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed");

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
    const confirmCancel = window.confirm(
      "Cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      setCancellingId(id);

      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Cancel failed");

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

  if (loading)
    return <p className="p-6 text-center">Loading…</p>;

return (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-blue-700 mb-4">
      My Bookings
    </h1>

    {bookings.length === 0 && (
      <p className="text-gray-500">No bookings yet</p>
    )}

    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white rounded-xl shadow p-5"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              {b.vendor.name}
            </h2>

            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                b.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {b.status}
            </span>
          </div>

          <p className="text-gray-600 text-sm">
            📍 {b.vendor.location}
          </p>

          <p className="mt-2 text-sm">
            📅 {new Date(b.date).toDateString()}
          </p>

          <p className="mt-2 font-bold text-green-600">
            ₹{b.amount}
          </p>
        </div>
      ))}
    </div>
  </div>
);
}
