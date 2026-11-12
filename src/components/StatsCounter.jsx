/**
 * StatsCounter — animated stats row section.
 * Server component (no "use client" needed — CountUp is client-only).
 *
 * Props:
 *   stats — array from data/stats.js
 */

import CountUp from "@/components/CountUp";

export default function StatsCounter({ stats }) {
  return (
    <section
      aria-label="Our numbers"
      className="w-full"
      style={{ background: "#F8FAFC", padding: "72px 0" }}
    >
      <style>{`
        /* ── Entrance animation per stat item ──────────────────────── */
        @media (prefers-reduced-motion: no-preference) {
          .stat-item {
            opacity: 0;
            transform: translateY(12px);
            animation: statRise 0.5s ease forwards;
          }
          @keyframes statRise {
            to { opacity: 1; transform: translateY(0); }
          }
        }
        /* Mobile padding */
        @media (max-width: 639px) {
          .stats-section-inner { padding: 48px 0 !important; }
        }
        /* Remove dividers on tablet/mobile */
        @media (max-width: 1023px) {
          .stat-divider { display: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">
        <dl
          className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-0"
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className="stat-item relative lg:px-8"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Vertical divider — desktop only, between columns */}
              {idx > 0 && (
                <div
                  aria-hidden="true"
                  className="stat-divider absolute inset-y-0 left-0 w-px"
                  style={{ background: "#E2E8F0" }}
                />
              )}

              {/* Number */}
              <dd
                className="font-hero m-0 leading-none"
                style={{
                  fontWeight:    800,
                  fontSize:      "clamp(40px, 5vw, 64px)",
                  lineHeight:    1,
                  letterSpacing: "-0.02em",
                  color:         "#F36F00",
                }}
              >
                <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
              </dd>

              {/* Label */}
              <dt
                className="font-body m-0 text-[#475569]"
                style={{ fontSize: "16px", fontWeight: 500, marginTop: "12px" }}
              >
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
