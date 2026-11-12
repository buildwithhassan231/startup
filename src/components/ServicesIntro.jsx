"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * ServicesIntro
 * Props match the servicesIntro shape from data/servicesIntro.js:
 *   label, headingStart, headingHighlight, text, cta
 */
export default function ServicesIntro({
  label,
  headingStart,
  headingHighlight,
  text,
  cta,
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  /* ── IntersectionObserver — run entrance animation once ─────────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-intro-heading"
      className="w-full bg-white"
      style={{ padding: "96px 0" }}
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .si-col {
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.55s ease, transform 0.55s ease;
          }
          .si-col.si-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .si-col-right {
            transition-delay: 120ms;
          }
        }
        @media (max-width: 1023px) {
          .si-section-inner { padding-top: 64px !important; padding-bottom: 64px !important; }
        }
        .si-cta-arrow { transition: transform 200ms ease; }
        .si-cta:hover .si-cta-arrow,
        .si-cta:focus-visible .si-cta-arrow { transform: translateX(4px); }
      `}</style>

      <div
        className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        {/* Desktop: two columns; mobile: single column */}
        <div className="flex flex-col gap-8 lg:grid lg:items-start lg:gap-16"
          style={{ gridTemplateColumns: "45% 1fr" }}
        >

          {/* ── LEFT column ─────────────────────────────────────────────── */}
          <div className={`si-col${visible ? " si-visible" : ""}`}>

            {/* Label pill */}
            <span
              className="font-hero inline-block rounded-full font-semibold uppercase"
              style={{
                fontSize:      "13px",
                letterSpacing: "0.12em",
                color:         "#F36F00",
                background:    "#FFF1E8",
                padding:       "6px 14px",
              }}
            >
              {label}
            </span>

            {/* Heading */}
            <h2
              id="services-intro-heading"
              className="font-hero text-balance"
              style={{
                fontWeight:    800,
                fontSize:      "clamp(32px, 3.8vw, 52px)",
                lineHeight:    1.1,
                letterSpacing: "-0.02em",
                color:         "#0F172A",
                marginTop:     "20px",
              }}
            >
              {headingStart}{" "}
              {/* Highlight span with soft underline via background-image */}
              <span
                style={{
                  color:               "#F36F00",
                  backgroundImage:     "linear-gradient(0deg, #F36F00 0%, #F36F00 100%)",
                  backgroundRepeat:    "no-repeat",
                  backgroundSize:      "100% 5px",
                  backgroundPosition:  "0 100%",
                  paddingBottom:       "4px",
                }}
              >
                {headingHighlight}
              </span>
            </h2>
          </div>

          {/* ── RIGHT column ────────────────────────────────────────────── */}
          <div
            className={`si-col si-col-right flex flex-col${visible ? " si-visible" : ""}`}
            /* Align first line with h2 top on desktop by adding top padding
               equal to label height (approx 34px) + gap (20px) */
            style={{ paddingTop: 0 }}
          >
            {/* Paragraph with left orange rule */}
            <div
              style={{
                borderLeft:  "3px solid #F36F00",
                paddingLeft: "28px",
              }}
            >
              <p
                className="font-body text-[#334155]"
                style={{
                  fontSize:   "18px",
                  lineHeight: 1.85,
                  maxWidth:   "62ch",
                }}
              >
                {text}
              </p>
            </div>

            {/* CTA button */}
            <div style={{ marginTop: "32px" }}>
              <Link
                href={cta.href}
                className="si-cta font-body inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36F00] focus-visible:ring-offset-2 lg:w-auto lg:justify-start"
                style={{
                  background: "#F36F00",
                  padding:    "14px 28px",
                  fontSize:   "15px",
                }}
              >
                {cta.label}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="si-cta-arrow shrink-0"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
