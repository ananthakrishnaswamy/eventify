import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Eventify",
  description: "Premium event booking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F1A] text-white">

        {/* Page Content */}
        <div className="min-h-screen pb-24">
          {children}
        </div>

        {/* Bottom Navigation */}
        <nav className="
          fixed bottom-0 left-0 right-0
          bg-black/40 backdrop-blur-xl
          border-t border-white/10
          flex justify-around
          py-3
          text-sm
          text-gray-300
        ">
          <Link href="/" className="flex flex-col items-center">
            🏠
            <span>Home</span>
          </Link>

          <Link href="/halls" className="flex flex-col items-center">
            🏛
            <span>Book</span>
          </Link>

          <Link href="/bookings" className="flex flex-col items-center">
            📋
            <span>Bookings</span>
          </Link>
        </nav>

      </body>
    </html>
  );
}

