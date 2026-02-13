import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎉 Eventify
      </h1>

      <div className="grid gap-4">
        <Link
          href="/halls"
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          🏛️ Book Halls
        </Link>

        <Link
          href="/bookings"
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          📖 My Bookings
        </Link>

        <Link
          href="/event"
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          🎊 Event Bundle
        </Link>

        <Link
          href="/vendor"
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          🏢 Vendor Dashboard
        </Link>
      </div>
    </div>
  );
}

