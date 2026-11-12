/**
 * ServiceCard — presentational component.
 * Receives: id, icon (string), title, description, href, index (for stagger delay).
 * All colors defined as CSS variables on the card root for easy theming.
 */

import Link from "next/link";
import {
  Code2, Search, MousePointerClick, TrendingUp,
  Clapperboard, Share2, ShieldCheck, Megaphone, Video,
} from "lucide-react";

const iconMap = {
  Code2, Search, MousePointerClick, TrendingUp,
  Clapperboard, Share2, ShieldCheck, Megaphone, Video,
};

export default function ServiceCard({ icon, title, description, href, index }) {
  const Icon = iconMap[icon] ?? Code2;
  const delay = `${index * 70}ms`;

  return (
    <li
      className="service-card-li"
      style={{ "--stagger-delay": delay }}
    >
      {/* Card root — CSS variables for theming */}
      <div
        className="service-card group relative flex min-h-[490px] flex-col overflow-hidden rounded-[40px] bg-[#F1F5F9] p-[44px] focus-within:outline-none sm:rounded-[40px]"
        style={{
          "--card-from":  "#02538F",
          "--card-to":    "#0A78BF",
          "--card-title": "#0A5A8F",
        }}
      >

        {/* ── Gradient hover layer (opacity transitions, gradient cannot) ── */}
        <div
          aria-hidden="true"
          className="service-card-gradient pointer-events-none absolute inset-0 rounded-[40px] opacity-0 transition-opacity duration-[350ms] ease-in-out"
          style={{
            background: "linear-gradient(120deg, var(--card-from) 0%, var(--card-to) 100%)",
          }}
        />

        {/* ── Content (above gradient layer) ─────────────────────────── */}
        <div className="relative z-10 flex flex-1 flex-col">

          {/* Icon circle */}
          <div
            className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-white"
            style={{ boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}
            aria-hidden="true"
          >
            <Icon size={36} color="#0A5A8F" strokeWidth={1.75} />
          </div>

          {/* Title */}
          <p
            className="service-card-title font-hero mt-8 leading-[1.25] text-[#0A5A8F] transition-colors duration-[350ms]"
            style={{ fontSize: "24px", fontWeight: 700 }}
          >
            {title}
          </p>

          {/* Description — flex-grow so it fills space and pushes Learn More down */}
          <p
            className="service-card-desc font-body mt-4 flex-grow text-[#334155] transition-colors duration-[350ms]"
            style={{ fontSize: "17px", lineHeight: 1.9 }}
          >
            {description}
          </p>

          {/* Learn More — mt-auto pins it to the bottom */}
          <div className="mt-auto pt-7">
            {/*
             * This Link is the ONLY interactive element in the card.
             * The ::after pseudo-element (via .service-card-link-stretch)
             * stretches it to cover the entire card, making the whole
             * card clickable while screen readers see just one link.
             */}
            <Link
              href={href}
              aria-label={`Learn more about ${title}`}
              className="service-card-link font-body relative inline-block pb-1 text-[17px] font-medium text-[#1E293B] transition-colors duration-[350ms]"
              style={{
                borderBottom: "3px solid #CBD5E1",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Entrance animation ─────────────────────────────────────────── */
        @media (prefers-reduced-motion: no-preference) {
          .service-card-li {
            opacity: 0;
            transform: translateY(16px);
            animation: cardRise 0.5s ease forwards;
            animation-delay: var(--stagger-delay, 0ms);
          }
          @keyframes cardRise {
            to { opacity: 1; transform: translateY(0); }
          }
        }

        /* ── Hover / focus-within: show gradient ────────────────────────── */
        .service-card:hover .service-card-gradient,
        .service-card:focus-within .service-card-gradient {
          opacity: 1;
        }

        /* ── Hover: lift card ───────────────────────────────────────────── */
        @media (prefers-reduced-motion: no-preference) {
          .service-card:hover,
          .service-card:focus-within {
            transform: translateY(-4px);
            box-shadow: 0 24px 48px -16px rgba(2,83,143,0.35);
            transition: transform 350ms ease, box-shadow 350ms ease;
          }
        }

        /* ── Hover: text colors ─────────────────────────────────────────── */
        .service-card:hover .service-card-title,
        .service-card:focus-within .service-card-title {
          color: #ffffff;
        }
        .service-card:hover .service-card-desc,
        .service-card:focus-within .service-card-desc {
          color: rgba(255,255,255,0.9);
        }
        .service-card:hover .service-card-link,
        .service-card:focus-within .service-card-link {
          color: #ffffff;
          border-bottom-color: #ffffff;
        }

        /* ── Stretch link over entire card ──────────────────────────────── */
        .service-card-link::after {
          content: "";
          position: absolute;
          inset: 0;
          /* Pull outward to fill the card padding */
          margin: calc(-44px);
        }

        /* ── Focus ring on the card via the link ────────────────────────── */
        .service-card-link:focus-visible {
          outline: none;
        }
        .service-card:focus-within {
          outline: 3px solid #0A78BF;
          outline-offset: 3px;
        }

        /* ── Mobile adjustments ─────────────────────────────────────────── */
        @media (max-width: 639px) {
          .service-card {
            border-radius: 28px !important;
            padding: 28px !important;
          }
          .service-card-gradient {
            border-radius: 28px !important;
          }
          .service-card-link::after {
            margin: calc(-28px);
          }
        }
      `}</style>
    </li>
  );
}
