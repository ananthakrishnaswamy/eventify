"use client";

import { useState } from "react";

export default function AdminVendorsPage() {
  const [form, setForm] = useState<any>({
    type: "HALL",
    amenities: "",
    availabilityDates: "",
  });

  async function submit() {
    const res = await fetch("/api/admin/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amenities: form.amenities.split(",").map((a: string) => a.trim()),
        availabilityDates: form.availabilityDates
          .split(",")
          .map((d: string) => d.trim()),
      }),
    });

    if (res.ok) alert("Vendor created");
    else alert("Error creating vendor");
  }

  return (
    <div className="p-6 max-w-xl">
    <button
    onClick={async () => {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    }}
    className="text-sm underline mb-4"
    >
    Logout
    </button>
      <h1 className="text-xl font-bold mb-4">Create Vendor</h1>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="HALL">Hall</option>
        <option value="CATERER">Caterer</option>
        <option value="PANDIT">Pandit</option>
      </select>

      <input
        placeholder="Location"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        placeholder="Base Price"
        type="number"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
      />

      {form.type === "HALL" && (
        <>
          <input
            placeholder="Capacity"
            type="number"
            className="border p-2 w-full mb-2"
            onChange={(e) =>
              setForm({ ...form, capacity: Number(e.target.value) })
            }
          />

          <input
            placeholder="Amenities (comma separated)"
            className="border p-2 w-full mb-2"
            onChange={(e) =>
              setForm({ ...form, amenities: e.target.value })
            }
          />
        </>
      )}

      <input
        placeholder="Availability dates (YYYY-MM-DD, comma separated)"
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({ ...form, availabilityDates: e.target.value })
        }
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2"
      >
        Create Vendor
      </button>
    </div>
  );
}

