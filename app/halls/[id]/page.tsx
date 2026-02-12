"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

type HallDetails = {
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

  const [hall, setHall] = useState<HallDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load hall info
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/halls/${availabilityId}`);
      const data = await res.json();
      setHall(data);
      setLoading(false);
    }

    load();
  }, [availabilityId]);

  // 🔹 Create booking
  async function confirmBooking() {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availabilityId,
        date,
        customerName: "Test User",
        customerPhone: "9999999999",
      }),
    });

    if (!res.ok) {
      alert("Booking failed");
      return;
    }

    router.push("/bookings"); // ✅ go to bookings page
  }

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>;
  if (!hall) return <p style={{ padding: 40 }}>Hall not found</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Confirm Booking</h1>

      <h2>{hall.vendor.name}</h2>
      <p>Location: {hall.vendor.location}</p>
      <p>Date: {new Date(hall.date).toDateString()}</p>
      <p>Amount: ₹{hall.vendor.basePrice}</p>

      <button
        onClick={confirmBooking}
        style={{
          marginTop: 20,
          padding: "10px 18px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}

