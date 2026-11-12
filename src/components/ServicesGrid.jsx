/**
 * ServicesGrid — reusable section component.
 * Props:
 *   services     — array matching servicesList shape
 *   title        — heading text
 *   subtitle     — subheading text
 *   headingLevel — "h1" | "h2" (default "h2")
 */

import ServiceCard from "@/components/ServiceCard";

export default function ServicesGrid({
  services,
  title,
  subtitle,
  headingLevel = "h2",
}) {
  const Heading = headingLevel;
  const headingId = "services-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-white"
      style={{ padding: "96px 0" }}
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">

        {/* ── Page heading block ─────────────────────────────────────── */}
        <div
          className="mx-auto mb-14 flex flex-col items-center text-center"
          style={{ maxWidth: "60ch" }}
        >
          {/* Label pill */}
      
          {/* Heading */}
          <Heading
            id={headingId}
            className="font-hero text-balance"
            style={{
              fontWeight:    800,
              fontSize:      "clamp(32px, 4vw, 52px)",
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
              color:         "#0F172A",
              marginTop:     "16px",
            }}
          >
            {title}
          </Heading>

          {/* Subtitle */}
          <p
            className="font-body text-[#475569]"
            style={{
              fontSize:   "18px",
              lineHeight: 1.7,
              marginTop:  "16px",
              maxWidth:   "60ch",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* ── Cards — flex-wrap so last odd card centers ─────────────── */}
        <ul
          role="list"
          className="flex flex-wrap justify-center"
          style={{ gap: "32px" }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              index={index}
              style={{
                width: "100%",
                /* 3-per-row ≥1024px, 2-per-row ≥640px, 1-per-row below */
              }}
            />
          ))}
        </ul>

      </div>

      {/* Responsive card width via a scoped style tag — avoids Tailwind
          arbitrary-value complexity with calc() across breakpoints */}
      <style>{`
        /* Mobile: full width */
        .service-card-li {
          width: 100%;
        }
        /* Tablet (640px+): 2 per row */
        @media (min-width: 640px) {
          .service-card-li {
            width: calc((100% - 32px) / 2);
          }
        }
        /* Desktop (1024px+): 3 per row */
        @media (min-width: 1024px) {
          .service-card-li {
            width: calc((100% - 64px) / 3);
          }
        }

        /* Mobile section padding */
        @media (max-width: 639px) {
          section[aria-labelledby="services-heading"] {
            padding: 64px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
