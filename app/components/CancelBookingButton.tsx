"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const cancelBooking = async () => {
    if (!confirm("Cancel this booking?")) return;

    setLoading(true);

    await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    });

    setLoading(false);

    // Refresh server component data
    router.refresh();
  };

  return (
    <button
      onClick={cancelBooking}
      disabled={loading}
      style={{
        marginTop: 10,
        padding: "6px 14px",
        backgroundColor: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}

