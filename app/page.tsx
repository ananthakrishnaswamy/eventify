"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F1A] to-[#111827] text-white pb-24">

      {/* Top Section */}
      <div className="px-6 pt-12">
        <h1 className="text-4xl font-semibold tracking-tight">
          Eventify
        </h1>

        <p className="text-gray-400 mt-3 text-lg leading-relaxed max-w-sm">
          Premium event booking experience for halls, catering & rituals.
        </p>
      </div>

      {/* Card Grid */}
      <div className="px-6 mt-12 grid grid-cols-2 gap-5">

        <PremiumCard
          title="Book Halls"
          subtitle="Find & reserve venues"
          icon="🏛"
          href="/halls"
        />

        <PremiumCard
          title="My Bookings"
          subtitle="View & manage"
          icon="📋"
          href="/bookings"
        />

        <PremiumCard
          title="Vendor"
          subtitle="Manage listings"
          icon="🏢"
          href="/vendor"
        />

        <PremiumCard
          title="Admin"
          subtitle="Platform controls"
          icon="⚙️"
          href="/admin/vendors"
        />

      </div>
    </div>
  );
}

function PremiumCard({
  title,
  subtitle,
  icon,
  href,
}: {
  title: string;
  subtitle: string;
  icon: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-6
        shadow-xl
        active:scale-95
        transition-all
        duration-300
        hover:bg-white/10
      "
    >
      <div className="text-3xl mb-4">{icon}</div>

      <h2 className="text-lg font-semibold tracking-tight">
        {title}
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        {subtitle}
      </p>

      {/* subtle hover glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/5 to-white/0" />
    </Link>
  );
}

