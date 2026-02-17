import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
        Eventify
      </h1>

      <p className="text-gray-600 mb-6">
        Book halls, caterers, purohits & more — all in one place.
      </p>

      <div className="grid grid-cols-2 gap-4">

        <a
          href="/halls"
          className="bg-white rounded-xl shadow p-5 text-center active:scale-95 transition"
        >
          <div className="text-3xl mb-2">🏛</div>
          <p className="font-semibold">Book Halls</p>
        </a>

        <a
          href="/bookings"
          className="bg-white rounded-xl shadow p-5 text-center active:scale-95 transition"
        >
          <div className="text-3xl mb-2">📋</div>
          <p className="font-semibold">My Bookings</p>
        </a>

        <a
          href="/vendor/dashboard"
          className="bg-white rounded-xl shadow p-5 text-center active:scale-95 transition"
        >
          <div className="text-3xl mb-2">🏢</div>
          <p className="font-semibold">Vendor Dashboard</p>
        </a>

        <a
          href="/admin/vendors"
          className="bg-white rounded-xl shadow p-5 text-center active:scale-95 transition"
        >
          <div className="text-3xl mb-2">⚙️</div>
          <p className="font-semibold">Admin</p>
        </a>

      </div>
    </div>
  );
}

