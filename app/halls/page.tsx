"use client";

import { useState } from "react";
import Link from "next/link";

export default function HallsPage() {
  const [date, setDate] = useState("");
  const [halls, setHalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!date) return alert("Select a date");

    setLoading(true);
    const res = await fetch(`/api/halls?date=${date}`);
    const data = await res.json();
    setHalls(data);
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find a Community Hall</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="date"
          className="border p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={search}
          className="bg-black text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="space-y-4">
        {halls.map((hall) => (
          <div key={hall.id} className="border p-4">
            <h2 className="font-bold text-lg">{hall.name}</h2>
            <p>Location: {hall.location}</p>
            <p>Price: ₹{hall.basePrice}</p>

            <Link
              href={`/halls/${hall.id}?date=${date}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              View & Book
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

