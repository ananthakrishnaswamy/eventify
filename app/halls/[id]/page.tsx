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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/halls/${availabilityId}`);
      const data = await res.json();
      setSlot(data);
      setLoading(false);
    }

    if (availabilityId) {
      load();
    }
  }, [availabilityId]);

  async function confirmBooking() {
    if (!name || !phone) {
      alert("Please enter your details");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availabilityId,
          customerName: name,
          customerPhone: phone,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      router.push("/bookings");
    } catch (err) {
      alert("Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="p-6">Loading…</p>;
  if (!slot) return <p className="p-6">Slot not found</p>;

  const price = slot.vendor.basePrice || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-28">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 font-semibold"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-5">
        Confirm Your Booking
      </h1>

      {/* Hall Summary */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">
        <h2 className="text-xl font-semibold">
          {slot.vendor.name}
        </h2>

        <p className="text-gray-600 mt-1">
          📍 {slot.vendor.location}
        </p>

        <p className="mt-2">
          📅 {new Date(slot.date).toDateString()}
        </p>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">
        <h3 className="font-semibold mb-4">
          Your Details
        </h3>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Pricing Summary */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">
        <div className="flex justify-between mb-2">
          <span>Base Price</span>
          <span>₹{price}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{price}</span>
        </div>
      </div>

      {/* Sticky Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <button
          onClick={confirmBooking}
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold active:scale-95 transition disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

