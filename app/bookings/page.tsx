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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-indigo-600 font-semibold hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-indigo-700">
        My Bookings
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">
          No bookings found
        </p>
      )}

      <div className="space-y-5">
        {bookings.map((b) => (
          <div
            key={b.id}
            className={`p-5 rounded-2xl shadow-md bg-white ${
              b.status === "CANCELLED"
                ? "opacity-60"
                : ""
            }`}
          >
            <h2 className="text-lg font-semibold">
              {b.vendor.name}
            </h2>

            <p className="text-gray-600">
              📍 {b.vendor.location}
            </p>

            <p className="mt-1">
              📅 {new Date(b.date).toDateString()}
            </p>

            <p className="mt-2 font-bold">
              ₹{b.amount}
            </p>

            <p
              className={`mt-2 font-semibold ${
                b.status === "CONFIRMED"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {b.status}
            </p>

            {b.status === "CONFIRMED" && (
              <button
                onClick={() => cancelBooking(b.id)}
                disabled={cancellingId === b.id}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-xl font-semibold active:scale-95 transition disabled:opacity-60"
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

