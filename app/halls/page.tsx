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
  <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0f172a] p-6 pb-24">

    <h1 className="text-3xl font-bold text-blue-400 mb-6">
      Available Halls
    </h1>

    {halls.length === 0 && (
      <p className="text-gray-400">No halls available</p>
    )}

    <div className="space-y-6">
      {halls.map((item) => (
        <a
          key={item.id}
          href={`/halls/${item.id}?date=${item.date}`}
          className="
            block
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            rounded-2xl
            p-6
            shadow-lg
            hover:shadow-blue-500/20
            active:scale-95
            transition
          "
        >
          <h2 className="text-lg font-semibold text-white">
            {item.vendor.name}
          </h2>

          <p className="text-gray-400 mt-2">
            📍 {item.vendor.location}
          </p>

          <p className="text-gray-400">
            📅 {new Date(item.date).toDateString()}
          </p>

          <p className="mt-4 text-2xl font-bold text-green-400">
            ₹{item.vendor.basePrice}
          </p>

          <div className="mt-5">
            <div
              className="
                bg-gradient-to-r
                from-blue-600
                to-blue-500
                text-white
                text-center
                py-3
                rounded-xl
                font-semibold
                shadow-md
              "
            >
              Book Now →
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);
}
