import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">

        {/* Main Content */}
        <div className="pb-20">
          {children}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-3 text-sm font-semibold">
          <Link href="/" className="text-blue-600">
            🏠 Home
          </Link>

          <Link href="/halls" className="text-blue-600">
            🏛 Book
          </Link>

          <Link href="/bookings" className="text-blue-600">
            📋 My Bookings
          </Link>
        </nav>

      </body>
    </html>
  );
}

