"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

type Availability = {
  id: string;
  date: string;
  vendor: {
    id: string;
    name: string;
    location: string;
    basePrice: number;
  };
};

export default function ConfirmBookingPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const availabilityId = params.id as string;
  const date = searchParams.get("date");

  const [slot, setSlot] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/halls/${availabilityId}?date=${date}`
        );
        if (!res.ok) throw new Error("Failed to load slot");

        const data = await res.json();
        setSlot(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (availabilityId && date) {
      load();
    }
  }, [availabilityId, date]);

  async function confirmBooking() {
    try {
      setConfirming(true);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availabilityId,
          customerName: "Test User",
          customerPhone: "9999999999",
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      router.push("/bookings");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setConfirming(false);
    }
  }

  if (loading)
    return <p className="p-6 text-center">Loading…</p>;

  if (!slot)
    return <p className="p-6 text-center">Slot not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-indigo-600 font-semibold hover:underline"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">
        Confirm Booking
      </h1>

      {/* Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">
          {slot.vendor.name}
        </h2>

        <p className="text-gray-600 mb-1">
          📍 {slot.vendor.location}
        </p>

        <p className="mb-1">
          📅 {new Date(slot.date).toDateString()}
        </p>

        <p className="mt-3 text-lg font-bold text-green-600">
          ₹{slot.vendor.basePrice}
        </p>
      </div>

      {/* Sticky Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <button
          onClick={confirmBooking}
          disabled={confirming}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold active:scale-95 transition disabled:opacity-60"
        >
          {confirming ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

