"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function HallDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const hallId = params.id as string;
  const date = searchParams.get("date");

  const [hall, setHall] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!date) return;

      const res = await fetch(`/api/halls?date=${date}`);
      const halls = await res.json();
      const selected = halls.find((h: any) => h.id === hallId);
      setHall(selected);
    }

    load();
  }, [hallId, date]);

  async function book() {
    if (!date) {
      alert("Date missing");
      return;
    }

    if (!name || !phone) {
      alert("Enter name and phone");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendorId: hallId,
        date,
        amount: hall.basePrice,
        customerName: name,
        customerPhone: phone,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setBookingId(data.id);
      alert("Booking confirmed!");
    } else {
      alert(data.error || "Booking failed");
    }
  }

  async function cancelBooking() {
    if (!bookingId) return;

    const res = await fetch("/api/bookings/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booking cancelled");
      setBookingId(null);
    } else {
      alert(data.error || "Cancellation failed");
    }
  }

  if (!hall) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{hall.name}</h1>
      <p>Location: {hall.location}</p>
      <p>Capacity: {hall.halls.capacity}</p>
      <p className="mb-4">Price: ₹{hall.basePrice}</p>

      <h2 className="font-bold mb-2">Book this hall</h2>

      <input
        placeholder="Your name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Phone number"
        className="border p-2 w-full mb-4"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={book}
        disabled={loading || !!bookingId}
        className="bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

      {bookingId && (
        <button
          onClick={cancelBooking}
          className="block mt-4 text-red-600 underline"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}

