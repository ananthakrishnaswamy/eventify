import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
        Eventify
      </h1>
      <p className="text-gray-600 mb-8">
        Book halls, caterers, purohits & manage your events easily.
      </p>

      {/* Navigation Cards */}
      <div className="grid gap-5 max-w-md">

        <Link
          href="/halls"
          className="bg-indigo-600 text-white p-5 rounded-xl shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
        >
          <h2 className="text-xl font-bold">🏛 Book Halls</h2>
          <p className="text-indigo-100 mt-1">
            Browse available halls & confirm booking
          </p>
        </Link>

        <Link
          href="/bookings"
          className="bg-green-600 text-white p-5 rounded-xl shadow-md hover:bg-green-700 transition transform hover:scale-105"
        >
          <h2 className="text-xl font-bold">📖 My Bookings</h2>
          <p className="text-green-100 mt-1">
            View and cancel your bookings
          </p>
        </Link>

        <Link
          href="/event"
          className="bg-purple-600 text-white p-5 rounded-xl shadow-md hover:bg-purple-700 transition transform hover:scale-105"
        >
          <h2 className="text-xl font-bold">🎉 Event Bundle</h2>
          <p className="text-purple-100 mt-1">
            Book hall + caterer + purohit together
          </p>
        </Link>

        <Link
          href="/vendor"
          className="bg-orange-500 text-white p-5 rounded-xl shadow-md hover:bg-orange-600 transition transform hover:scale-105"
        >
          <h2 className="text-xl font-bold">🛠 Vendor Dashboard</h2>
          <p className="text-orange-100 mt-1">
            Manage vendor availability & bookings
          </p>
        </Link>

        <Link
          href="/admin/vendors"
          className="bg-gray-800 text-white p-5 rounded-xl shadow-md hover:bg-black transition transform hover:scale-105"
        >
          <h2 className="text-xl font-bold">⚙ Admin Panel</h2>
          <p className="text-gray-300 mt-1">
            Add and manage vendors
          </p>
        </Link>

      </div>
    </div>
  );
}

