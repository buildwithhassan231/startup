import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesIntro } from "@/data/servicesIntro";

/**
 * Wedeliver
 * Full-width section with overly.jpg background + white overlay.
 * Content comes from data/servicesIntro.js.
 */
export default function Wedeliver() {
  const { label, headingStart, headingHighlight, text, cta } = servicesIntro;

  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-32">

      {/* ── Background image ──────────────────────────────────────────── */}
      <Image
        src="/overly.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
        priority={false}
      />

      {/* ── White overlay ─────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 bg-white/80" />

      {/* ── Text content ──────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-10 lg:grid lg:items-start lg:gap-16"
          style={{ gridTemplateColumns: "45% 1fr" }}
        >

          {/* LEFT — label + heading */}
          <div className="text-left">
            <span
              className="font-hero mb-5 inline-block rounded-full font-semibold uppercase"
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

            <h2
              className="font-hero "
              style={{
                fontWeight:    800,
                fontSize:      "clamp(28px, 3.5vw, 48px)",
                lineHeight:    1.1,
                letterSpacing: "-0.02em",
                color:         "#0F172A",
                marginTop:     "13px",
              }}
            >
              {headingStart}{" "}
              <span
                style={{
                  color:              "#F36F00",
                //   backgroundImage:    "linear-gradient(0deg,#F36F00 0%,#F36F00 100%)",
                  backgroundRepeat:   "no-repeat",
                  backgroundSize:     "100% 4px",
                  backgroundPosition: "0 100%",
                  paddingBottom:      "3px",
                }}
              >
                {headingHighlight}
              </span>
            </h2>
          </div>

          {/* RIGHT — divider, body, CTA */}
          <div className="text-left">
            <div className="mb-8 h-[3px] w-14 rounded-full bg-[#F36F00]" />

            <p
              className="font-body mb-10 text-slate-600"
              style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.8 }}
            >
              {text}
            </p>

            <Link
              href={cta.href}
              className="group font-body inline-flex items-center gap-2 rounded-full font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36F00] focus-visible:ring-offset-2"
              style={{ background: "#F36F00", padding: "13px 28px", fontSize: "15px" }}
            >
              {cta.label}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
