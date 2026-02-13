"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorLoginPage() {
  const [vendorId, setVendorId] = useState("");
  const router = useRouter();

  function login() {
    if (!vendorId) return alert("Enter vendor ID");

    localStorage.setItem("vendorId", vendorId);
    router.push("/vendor/dashboard");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Vendor Login</h1>

      <input
        placeholder="Enter Vendor ID"
        value={vendorId}
        onChange={(e) => setVendorId(e.target.value)}
        style={{ padding: 10, marginTop: 10 }}
      />

      <br />

      <button
        onClick={login}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
      >
        Login
      </button>
    </div>
  );
}

