/**
 * PageBanner — server component, reusable.
 * Renders the full-width dark hero banner with title, accent bar,
 * optional subtitle and breadcrumbs.
 *
 * Props:
 *   title        string               — page heading (h1)
 *   breadcrumbs  [{ label, href? }]   — trail passed to Breadcrumbs
 *   subtitle     string (optional)    — rendered between title and crumbs
 */

import Breadcrumbs from "@/components/Breadcrumbs";

export default function PageBanner({ title, breadcrumbs, subtitle }) {
  return (
    <>
      {/* ── Entrance animation styles (CSS-only) ───────────────────── */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .banner-title {
            opacity: 0;
            transform: translateY(16px);
            animation: bannerRise 0.5s ease forwards;
          }
          .banner-bar {
            width: 0;
            animation: barGrow 0.5s ease forwards 150ms;
          }
          .breadcrumb-entrance {
            opacity: 0;
            animation: bcFade 0.5s ease forwards 250ms;
          }
          @keyframes bannerRise {
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes barGrow {
            to { width: 56px; }
          }
          @keyframes bcFade {
            to { opacity: 1; }
          }
        }
        /* When reduced motion is set — show immediately */
        @media (prefers-reduced-motion: reduce) {
          .banner-title    { opacity: 1; transform: none; }
          .banner-bar      { width: 56px; }
          .breadcrumb-entrance { opacity: 1; }
        }
      `}</style>

      <section
        aria-label={`${title} page banner`}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "240px",
          display:   "flex",
          alignItems:    "center",
          justifyContent: "center",
        }}
      >
        {/* ── Background layers ────────────────────────────────────── */}

        {/* 1. Base dark gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0A1226 0%, #0F2A4D 55%, #14407A 100%)",
          }}
        />

        {/* 2. Brand-orange glow — top right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 85% 0%, rgba(243,111,0,0.28), transparent 45%)",
          }}
        />

        {/* 3. Blue glow — bottom left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 10% 100%, rgba(37,99,235,0.25), transparent 40%)",
          }}
        />

        {/* 4. Dot grid fading toward bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
          }}
        />

        {/* 5. Bottom edge line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "rgba(255,255,255,0.10)" }}
        />

        {/* ── Content ─────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-col items-center justify-center px-5 py-16 text-center"
          style={{ width: "100%", minHeight: "inherit" }}
        >

          {/* Title — the ONE h1 on the page */}
          <h1
            className="banner-title font-hero max-w-4xl text-white text-balance"
            style={{
              fontWeight:    800,
              fontSize:      "clamp(34px, 5vw, 60px)",
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          {/* Accent bar */}
          <div
            className="banner-bar rounded-full"
            style={{
              height:     "4px",
              background: "#F36F00",
              margin:     "20px 0 24px",
              /* width animated from 0 → 56px via CSS keyframe */
            }}
          />

          {/* Optional subtitle */}
          {subtitle && (
            <p
              className="font-body mb-6 max-w-2xl"
              style={{
                fontSize:   "18px",
                lineHeight: 1.7,
                color:      "rgba(255,255,255,0.75)",
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Breadcrumbs */}
          <Breadcrumbs crumbs={breadcrumbs} />
        </div>
      </section>
    </>
  );
}
