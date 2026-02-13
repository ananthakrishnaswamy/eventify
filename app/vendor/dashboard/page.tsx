"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  date: string;
  amount: number;
  status: string;
};

export default function VendorDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vendorId, setVendorId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("vendorId");
    if (!id) return;

    setVendorId(id);

    fetch(`/api/vendor/${id}/bookings`)
      .then((res) => res.json())
      .then(setBookings);
  }, []);

  const totalRevenue = bookings
    .filter((b) => b.status === "CONFIRMED")
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div style={{ padding: 40 }}>
      <h1>Vendor Dashboard</h1>

      <p><b>Vendor ID:</b> {vendorId}</p>
      <p><b>Total Bookings:</b> {bookings.length}</p>
      <p><b>Total Revenue:</b> ₹{totalRevenue}</p>

      <h2 style={{ marginTop: 30 }}>Upcoming Bookings</h2>

      {bookings.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}>
          Date: {new Date(b.date).toDateString()}
          <br />
          Amount: ₹{b.amount}
          <br />
          Status: {b.status}
        </div>
      ))}
    </div>
  );
}

