"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function HallsPage() {
  const router = useRouter();
  const [halls, setHalls] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "/api/halls?date=2026-02-15",
          { cache: "no-store" }
        );
        const data = await res.json();
        setHalls(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

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
        Available Halls
      </h1>

      {halls.length === 0 && (
        <p className="text-gray-500">No halls available</p>
      )}

      <div className="space-y-5">
        {halls.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow-md"
          >
            <h2 className="text-lg font-semibold mb-1">
              {item.vendor.name}
            </h2>

            <p className="text-gray-600">
              📍 {item.vendor.location}
            </p>

            <p className="mt-1">
              📅 {new Date(item.date).toDateString()}
            </p>

            <p className="mt-2 text-green-600 font-bold">
              ₹{item.vendor.basePrice}
            </p>

            <button
              onClick={() =>
                router.push(
                  `/halls/${item.id}?date=${item.date}`
                )
              }
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold active:scale-95 transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

