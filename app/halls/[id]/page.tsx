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
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const availabilityId = params.id as string;
  const date = searchParams.get("date");

  const [slot, setSlot] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load selected availability
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/halls/${availabilityId}?date=${date}`);
      const data = await res.json();
      setSlot(data);
      setLoading(false);
    }

    load();
  }, [availabilityId, date]);

  // ✅ Create booking
  async function confirmBooking() {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>;
  if (!slot) return <p style={{ padding: 40 }}>Slot not found</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Confirm Booking</h1>

      <h2>{slot.vendor.name}</h2>
      <p>Location: {slot.vendor.location}</p>
      <p>Date: {new Date(slot.date).toDateString()}</p>
      <p>Amount: ₹{slot.vendor.basePrice}</p>

      <button
        onClick={confirmBooking}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}

