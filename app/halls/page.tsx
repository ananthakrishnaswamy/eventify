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
      const res = await fetch("/api/halls?date=2026-02-15", {
        cache: "no-store",
      });
      const data = await res.json();
      setHalls(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

return (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-blue-700 mb-4">
      Available Halls
    </h1>

    {halls.length === 0 && (
      <p className="text-gray-500">No halls available</p>
    )}

    <div className="space-y-4">
      {halls.map((item) => (
        <a
          key={item.id}
          href={`/halls/${item.id}?date=${item.date}`}
          className="block bg-white rounded-xl shadow p-5 active:scale-95 transition"
        >
          <h2 className="text-lg font-semibold">
            {item.vendor.name}
          </h2>

          <p className="text-gray-600 text-sm">
            📍 {item.vendor.location}
          </p>

          <p className="mt-2 text-sm">
            📅 {new Date(item.date).toDateString()}
          </p>

          <p className="mt-2 font-bold text-green-600">
            ₹{item.vendor.basePrice}
          </p>

          <div className="mt-3 bg-blue-600 text-white py-2 text-center rounded-lg font-semibold">
            Book Now →
          </div>
        </a>
      ))}
    </div>
  </div>
);
}
