"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function ConfirmBookingPage() {

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const availabilityId = params.id as string;
  const date = searchParams.get("date");

  const [slot, setSlot] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/halls/${availabilityId}?date=${date}`);
      const data = await res.json();
      setSlot(data);
      setLoading(false);
    }

    if (availabilityId && date) {
      load();
    }
  }, [availabilityId, date]);

  async function confirmBooking() {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        availabilityId,
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

  if (loading) return <p className="p-6">Loading…</p>;
  if (!slot) return <p className="p-6">Slot not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">Confirm Booking</h1>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold">
          {slot.vendor.name}
        </h2>

        <p className="text-gray-600">
          📍 {slot.vendor.location}
        </p>

        <p className="mt-2">
          📅 {new Date(slot.date).toDateString()}
        </p>

        <p className="mt-2 font-semibold">
          ₹{slot.vendor.basePrice}
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <button
          onClick={confirmBooking}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold active:scale-95 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

