
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const items = [
  "Professional Website Development",
  "Search Engine Optimization (SEO)",
  "Google Ads & PPC Campaigns",
  "Social Media Marketing",
  "Content Creation & Video Editing",
  "Lead Generation",
  "Digital Brand Growth",
];

export default function Grow() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-10">

          {/* LEFT - TEXT CONTENT */}
          <div className="mx-auto w-full max-w-xl">

            {/* Eyebrow */}
            <span
              className="font-hero mb-5 inline-block rounded-full font-semibold uppercase"
              style={{
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "#F36F00",
                background: "#FFF1E8",
                padding: "7px 15px",
              }}
            >
              What We Offer
            </span>

            {/* Heading */}
            <h2
              className="font-hero mt-2 text-balance text-[#0F172A]"
              style={{
                fontWeight: 800,
                fontSize: "clamp(32px, 3.5vw, 48px)",
                lineHeight: 1.12,
                letterSpacing: "-0.035em",
              }}
            >
              Grow Your Business{" "}
              <span style={{ color: "#F36F00" }}>
                Online
              </span>
            </h2>

            {/* Description */}
            <p className="font-body mt-4 max-w-lg text-[15px] leading-7 text-slate-500 sm:text-base">
              Everything you need to build your online presence,
              attract more customers, and grow your business with
              effective digital solutions.
            </p>

            {/* Divider */}
            <div
              className="my-6 h-[3px] w-12 rounded-full"
              style={{ background: "#F36F00" }}
            />

            {/* Services List */}
            <ul className="flex flex-col gap-3.5" role="list">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={19}
                    className="shrink-0"
                    style={{ color: "#F36F00" }}
                    aria-hidden="true"
                  />

                  <span
                    className="font-body text-[#334155]"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/services"
              className="group font-body mt-8 inline-flex items-center gap-2 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36F00] focus-visible:ring-offset-2"
              style={{
                background: "#F36F00",
                padding: "13px 27px",
                fontSize: "14px",
              }}
            >
              Learn More

              <ArrowRight
                size={16}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="flex w-full items-center justify-center">
            <Image
              src="/grow.png"
              alt="Grow your business online with digital services"
              width={520}
              height={560}
              className="h-auto w-full max-w-[400px] object-contain sm:max-w-[440px] lg:max-w-[500px]"
              priority={false}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
