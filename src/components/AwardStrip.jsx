import Link from "next/link";
import {
  Code2, Search, Megaphone, TrendingUp, Video,
} from "lucide-react";

/**
 * AwardStrip
 * Sits at the bottom of the hero — half overlapping the video, half below.
 *
 * Overlap mechanism (UNCHANGED):
 *   New strip height ≈ 240px (py-11 = 44px × 2 + content).
 *   Half of 240px = 120px = 7.5rem → -mt-[7.5rem].
 *   relative z-10 keeps it above the section below.
 *
 * Props:
 *   items — array from data/awardStrip.js
 */

/* ── Icon map ────────────────────────────────────────────────────────────── */
const iconMap = { Code2, Search, Megaphone, TrendingUp, Video };

export default function AwardStrip({ items }) {
  return (
    <div className="relative z-10 -mt-[7.5rem] px-4 sm:px-6 lg:px-16">

      {/* ── DESKTOP (lg+): 5-column grid, no scroll ──────────────────── */}
      <div
        className="mx-auto hidden max-w-screen-2xl overflow-hidden rounded-xl lg:grid sm:mt-10"
        style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      >
        {items.map((item, idx) => (
          <DesktopCard
            key={item.id}
            item={item}
            isLast={idx === items.length - 1}
          />
        ))}
      </div>

      {/* ── MOBILE / TABLET (<lg): horizontal swipe slider ───────────── */}
      <div
        role="region"
        aria-label="Our services"
        tabIndex={0}
        className="mx-auto max-w-screen-2xl overflow-hidden rounded-xl lg:hidden"
      >
        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain"
          style={{
            padding:                  "20px",
            scrollPadding:            "20px",
            scrollbarWidth:           "none",
            msOverflowStyle:          "none",
            WebkitOverflowScrolling:  "touch",
          }}
        >
          {items.map((item) => (
            <MobileCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Hide webkit scrollbar on mobile */}
      <style>{`
        .award-scroll::-webkit-scrollbar { display: none; }
      `}</style>

    </div>
  );
}

/* ── Desktop card ─────────────────────────────────────────────────────────── */
function DesktopCard({ item, isLast }) {
  const { icon, label, title, href } = item;
  const Icon = iconMap[icon] ?? Code2;

  return (
    <Link
      href={href}
      className={`
        group flex flex-col items-center justify-center bg-[#1e3a52] px-6 text-center
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F36F00]
        ${!isLast ? "border-r border-[#2a4d6a]" : ""}
      `}
      style={{ paddingTop: "44px", paddingBottom: "44px" }}
    >
      {/* Icon chip */}
      <div
        className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/20 bg-white/5 transition-colors duration-200 group-hover:bg-[#F36F00] @media(prefers-reduced-motion:reduce):transition-none"
        aria-hidden="true"
      >
        <Icon size={32} className="text-white" strokeWidth={1.75} />
      </div>

      {/* Label */}
      <p
        className="font-body mt-5 uppercase text-white/65"
        style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.14em" }}
      >
        {label}
      </p>

      {/* Title */}
      <p
        className="font-hero mt-2 text-white transition-transform duration-200 group-hover:-translate-y-0.5"
        style={{
          fontSize:   "20px",
          fontWeight: 700,
          lineHeight: 1.3,
          maxWidth:   "16ch",
        }}
      >
        {title}
      </p>
    </Link>
  );
}

/* ── Mobile card ──────────────────────────────────────────────────────────── */
function MobileCard({ item }) {
  const { icon, label, title, href } = item;
  const Icon = iconMap[icon] ?? Code2;

  return (
    <Link
      href={href}
      className="
        group flex shrink-0 snap-start flex-col items-center justify-center rounded-2xl
        border border-white/10 bg-[#1e3a52] p-6 text-center
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36F00]
      "
      style={{
        width:     "78%",
        minWidth:  "200px",
        minHeight: "200px",
        /* from sm (640px): show ~2 cards */
      }}
    >
      {/* Icon chip */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 transition-colors duration-200 group-hover:bg-[#F36F00]"
        aria-hidden="true"
      >
        <Icon size={28} className="text-white" strokeWidth={1.75} />
      </div>

      {/* Label */}
      <p
        className="font-body mt-4 uppercase text-white/65"
        style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.14em" }}
      >
        {label}
      </p>

      {/* Title */}
      <p
        className="font-hero mt-2 text-white"
        style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1.3 }}
      >
        {title}
      </p>
    </Link>
  );
}
