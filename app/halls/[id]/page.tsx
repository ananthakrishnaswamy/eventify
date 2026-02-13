return (
  <div className="min-h-screen bg-gray-50 p-6 pb-24">
    <h1 className="text-2xl font-bold mb-4">Confirm Booking</h1>

    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-xl font-semibold">
        {slot.vendor.name}
      </h2>

      <p className="text-gray-600">
        📍 {slot.vendor.location}
      </p>

      <p className="mt-2">
        📅 {new Date(slot.date).toDateString()}
      </p>

      <p className="mt-2 font-semibold">
        ₹{slot.vendor.basePrice}
      </p>
    </div>

    {/* Sticky bottom button */}
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <button
        onClick={confirmBooking}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-bold active:scale-95 transition"
      >
        Confirm Booking
      </button>
    </div>
  </div>
);

