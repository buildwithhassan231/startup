"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroReviews from "@/components/HeroReviews";

/* ── Arrow button ─────────────────────────────────────────────────────────── */

function ArrowButton({ direction, onClick, accent }) {
  const label = direction === "prev" ? "Previous slide" : "Next slide";
  const icon =
    direction === "prev" ? (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="hidden md:flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2"
      style={{ "--tw-ring-color": accent }}
    >
      {icon}
    </button>
  );
}

/* ── Desktop slide text block ─────────────────────────────────────────────── */

function SlideText({ slide, isActive, reducedMotion }) {
  const {
    headingStart,
    headingHighlight,
    headingEnd,
    accent,
    text,
    primaryCta,
    secondaryCta,
  } = slide;

  const motionStyle = reducedMotion
    ? {}
    : { transform: isActive ? "translateY(0)" : "translateY(12px)" };

  const sharedClass = `flex flex-col justify-center transition-all duration-500 ${
    isActive ? "opacity-100" : "opacity-0 pointer-events-none select-none"
  }`;

  // All slides share grid-area 1/1 so they stack without shifting layout
  const gridStyle = { gridArea: "1 / 1", ...motionStyle };

  // Only the active slide renders an h1 — one h1 per page
  const HeadingTag = isActive ? "h1" : "div";

  return (
    <div className={sharedClass} style={gridStyle} aria-hidden={!isActive}>

      {/* Badge — white bg, accent border + text */}
      <div style={{ marginBottom: "16px" }}>
        <span
          className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent, border: `1px solid ${accent}` }}
        >
          {headingHighlight}
        </span>
      </div>

      {/* Heading */}
      <HeadingTag
        className="font-hero text-balance"
        style={{
          fontWeight: 800,
          fontSize: "clamp(30px, 3.6vw, 46px)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          color: "#0F172A",
          marginBottom: "16px",
        }}
      >
        {headingStart && <span style={{ color: "#0F172A" }}>{headingStart} </span>}
        <span
          style={{
            color: accent,
            whiteSpace: headingHighlight.length <= 22 ? "nowrap" : "normal",
          }}
        >
          {headingHighlight}
        </span>
        {headingEnd && <span style={{ color: "#0F172A" }}> {headingEnd}</span>}
      </HeadingTag>

      {/* Body text */}
      <p
        className="font-body text-base leading-relaxed sm:text-lg"
        style={{ color: "#334155", marginBottom: "28px" }}
      >
        {text}
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row" style={{ marginBottom: "24px" }}>
        <Link
          href={primaryCta.href}
          className="flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto"
          style={{ background: "var(--brand)" }}
          tabIndex={isActive ? 0 : -1}
        >
          {primaryCta.label}
        </Link>
        <Link
          href={secondaryCta.href}
          className="flex w-full items-center justify-center rounded-full border bg-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 sm:w-auto"
          style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
          tabIndex={isActive ? 0 : -1}
        >
          {secondaryCta.label}
        </Link>
      </div>

      <HeroReviews />
    </div>
  );
}

/* ── Mobile slide text (below image, white bg) ────────────────────────────── */

function SlideTextMobile({ slide, isActive, reducedMotion }) {
  const {
    headingStart,
    headingHighlight,
    headingEnd,
    accent,
    text,
    primaryCta,
    secondaryCta,
  } = slide;

  const motionStyle = reducedMotion
    ? {}
    : { transform: isActive ? "translateY(0)" : "translateY(10px)" };

  const gridStyle = { gridArea: "1 / 1", ...motionStyle };

  const sharedClass = `flex flex-col transition-all duration-500 ${
    isActive ? "opacity-100" : "opacity-0 pointer-events-none select-none"
  }`;

  const HeadingTag = isActive ? "h1" : "div";

  return (
    <div className={sharedClass} style={gridStyle} aria-hidden={!isActive}>

      {/* Badge */}
      <div style={{ marginBottom: "12px" }}>
        <span
          className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent, border: `1px solid ${accent}` }}
        >
          {headingHighlight}
        </span>
      </div>

      {/* Heading */}
      <HeadingTag
        className="font-hero text-balance"
        style={{
          fontWeight: 800,
          fontSize: "clamp(28px, 7vw, 34px)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          color: "#0F172A",
          marginBottom: "12px",
        }}
      >
        {headingStart && <span style={{ color: "#0F172A" }}>{headingStart} </span>}
        <span
          style={{
            color: accent,
            whiteSpace: headingHighlight.length <= 22 ? "nowrap" : "normal",
          }}
        >
          {headingHighlight}
        </span>
        {headingEnd && <span style={{ color: "#0F172A" }}> {headingEnd}</span>}
      </HeadingTag>

      {/* Body */}
      <p
        className="font-body text-base leading-relaxed"
        style={{ color: "#334155", marginBottom: "20px" }}
      >
        {text}
      </p>

      {/* Buttons — full width on mobile */}
      <div className="flex flex-col gap-3" style={{ marginBottom: "20px" }}>
        <Link
          href={primaryCta.href}
          className="flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ background: "var(--brand)" }}
          tabIndex={isActive ? 0 : -1}
        >
          {primaryCta.label}
        </Link>
        <Link
          href={secondaryCta.href}
          className="flex w-full items-center justify-center rounded-full border bg-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          style={{ borderColor: "#CBD5E1", color: "#0F172A" }}
          tabIndex={isActive ? 0 : -1}
        >
          {secondaryCta.label}
        </Link>
      </div>

      <HeroReviews />
    </div>
  );
}

/* ── HeroSlider (main export) ─────────────────────────────────────────────── */

/**
 * Props:
 *   slides   — array matching the heroSlides shape from data/heroSlides.js
 *   interval — autoplay delay in ms (default 6000)
 */
export default function HeroSlider({ slides, interval = 6000 }) {
  const [active, setActive]             = useState(0);
  const [paused, setPaused]             = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef   = useRef(null);
  const regionRef  = useRef(null);
  const touchStartX = useRef(null);

  const total = slides.length;

  /* ── detect prefers-reduced-motion once on mount ─────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── autoplay ─────────────────────────────────────────────────────────── */
  const scheduleNext = useCallback(() => {
    clearTimeout(timerRef.current);
    if (paused || reducedMotion) return;
    timerRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % total);
    }, interval);
  }, [paused, reducedMotion, interval, total]);

  useEffect(() => {
    scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [active, scheduleNext]);

  /* ── keyboard navigation ─────────────────────────────────────────────── */
  function handleRegionKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((prev) => (prev + 1) % total);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((prev) => (prev - 1 + total) % total);
    }
  }

  /* ── touch swipe ─────────────────────────────────────────────────────── */
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setActive((prev) =>
        diff > 0 ? (prev + 1) % total : (prev - 1 + total) % total
      );
    }
    touchStartX.current = null;
  }

  const current = slides[active];

  return (
    <section
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured services"
      tabIndex={0}
      onKeyDown={handleRegionKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget)) setPaused(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full bg-white py-4 focus-visible:outline-none md:py-6"
    >
      <div className="mx-auto max-w-screen-full px-4 sm:px-6">

        {/* ══════════════════════════════════════════════════════════════
            MOBILE (< md): image on top, text block below on white
        ══════════════════════════════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Image */}
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "2/1" }}>
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                aria-label={`${idx + 1} of ${total}`}
                aria-hidden={idx !== active}
                className="absolute inset-0 transition-opacity duration-[600ms]"
                style={{ opacity: idx === active ? 1 : 0 }}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover object-right-center"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Text block — grid so slides stack in same cell */}
          <div className="bg-white px-1 pt-5 pb-4" style={{ display: "grid" }}>
            {slides.map((slide, idx) => (
              <SlideTextMobile
                key={slide.id}
                slide={slide}
                isActive={idx === active}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 pb-3">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActive(idx)}
                className="rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  width:      idx === active ? "28px" : "8px",
                  height:     "8px",
                  background: idx === active ? slide.accent : "#cbd5e1",
                }}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            DESKTOP (md+): fixed-height frame, left gradient overlay
        ══════════════════════════════════════════════════════════════ */}
        <div
          className="relative hidden w-full overflow-hidden rounded-2xl md:block"
          style={{ minHeight: "560px", height: "clamp(560px, 42vw, 600px)" }}
        >
          {/* Slide images */}
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              aria-label={`${idx + 1} of ${total}`}
              aria-hidden={idx !== active}
              className="absolute inset-0 transition-opacity duration-[600ms]"
              style={{ opacity: idx === active ? 1 : 0 }}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-right-center"
                priority={idx === 0}
              />
            </div>
          ))}

          {/* Left-only white gradient — right side stays fully clear */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.80) 60%, transparent 100%)",
            }}
          />

          {/* Text overlay — left half */}
          <div className="absolute inset-0 flex items-center px-8 sm:px-10">
            <div className="w-full max-w-[540px]" style={{ display: "grid" }}>
              {slides.map((slide, idx) => (
                <SlideText
                  key={slide.id}
                  slide={slide}
                  isActive={idx === active}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>

          {/* Dots + arrows */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
            <ArrowButton
              direction="prev"
              onClick={() => setActive((prev) => (prev - 1 + total) % total)}
              accent={current.accent}
            />
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActive(idx)}
                className="rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  width:      idx === active ? "28px" : "8px",
                  height:     "8px",
                  background: idx === active ? slide.accent : "#cbd5e1",
                }}
              />
            ))}
            <ArrowButton
              direction="next"
              onClick={() => setActive((prev) => (prev + 1) % total)}
              accent={current.accent}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
