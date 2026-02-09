"use client";

import { useState } from "react";
import Link from "next/link";

export default function HallsPage() {
  const [date, setDate] = useState("");
  const [halls, setHalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search() {
    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHalls([]);

      const res = await fetch(`/api/halls?date=${date}`);

      if (!res.ok) {
        throw new Error("Failed to fetch halls");
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response from server");
      }

      setHalls(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!loading && halls.length === 0 && date && (
        <p>No halls available for the selected date.</p>
      )}

      <div className="space-y-4">
        {halls.map((hall) => (
          <div key={hall.id} className="border p-4 rounded">
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

