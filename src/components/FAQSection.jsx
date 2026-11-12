"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

/**
 * FAQSection
 * Props:
 *   faqs — array from data/faqs.js [{ id, question, answer }]
 *
 * Layout matches the reference:
 *   Left column  — FAQ label + heading + "Still have a question?" CTA
 *   Right column — numbered accordion items
 */
export default function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[340px_1fr] lg:gap-20">

          {/* ── LEFT ──────────────────────────────────────────────────── */}
          <div className="flex flex-col justify-between gap-14 lg:gap-0">
            <div>
              {/* Label */}
              <div className="mb-5 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#F36F00" }}
                  aria-hidden="true"
                />
                <span
                  className="font-hero text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "#F36F00" }}
                >
                  FAQ
                </span>
              </div>

              {/* Heading */}
              <h2
                id="faq-heading"
                className="font-hero text-[#0F172A]"
                style={{
                  fontWeight:    800,
                  fontSize:      "clamp(28px, 3.6vw, 44px)",
                  lineHeight:    1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            {/* Still have a question? */}
            <div>
              <p
                className="font-hero mb-1 text-base font-bold text-[#0F172A]"
              >
                Still have a question?
              </p>
              <p className="font-body mb-5 max-w-[26ch] text-sm leading-relaxed text-[#64748B]">
                We&apos;re available for a free consultation — no commitment required.
              </p>
              <Link
                href="/contact"
                className="font-body inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36F00] focus-visible:ring-offset-2"
                style={{ background: "#F36F00" }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* ── RIGHT — accordion ─────────────────────────────────────── */}
          <div>
            <dl className="divide-y divide-[#F1F5F9]">
              {faqs.map((faq, idx) => {
                const isOpen = open === faq.id;
                const num    = String(idx + 1).padStart(2, "0");

                return (
                  <div key={faq.id} className="py-5">
                    <dt>
                      <button
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                        onClick={() => setOpen(isOpen ? null : faq.id)}
                        className="flex w-full items-start gap-5 text-left focus-visible:outline-none"
                      >
                        {/* Number */}
                        <span
                          className="font-hero shrink-0 text-sm font-semibold"
                          style={{ color: "#CBD5E1", minWidth: "28px" }}
                          aria-hidden="true"
                        >
                          {num}
                        </span>

                        {/* Question */}
                        <span
                          className="font-hero flex-1 text-base font-semibold text-[#0F172A] transition-colors"
                          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", lineHeight: 1.5 }}
                        >
                          {faq.question}
                        </span>

                        {/* Icon */}
                        <span
                          className="ml-4 mt-0.5 shrink-0 rounded-full border p-1 transition-colors"
                          style={{
                            borderColor:     isOpen ? "#F36F00" : "#E2E8F0",
                            color:           isOpen ? "#F36F00" : "#94A3B8",
                            backgroundColor: isOpen ? "#FFF1E8" : "transparent",
                          }}
                          aria-hidden="true"
                        >
                          {isOpen
                            ? <Minus size={14} strokeWidth={2.5} />
                            : <Plus  size={14} strokeWidth={2.5} />
                          }
                        </span>
                      </button>
                    </dt>

                    {/* Answer */}
                    <dd
                      id={`faq-answer-${faq.id}`}
                      hidden={!isOpen}
                      className="pl-[48px] pr-10 pt-3"
                    >
                      <p
                        className="font-body leading-relaxed text-[#64748B]"
                        style={{ fontSize: "15px" }}
                      >
                        {faq.answer}
                      </p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

        </div>
      </div>
    </section>
  );
}
