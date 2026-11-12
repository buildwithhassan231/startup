"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CountUp — animated number that counts from `start` to `end` once the
 * element scrolls into view.
 *
 * Props:
 *   end       number  — final value
 *   start     number  — initial visible value (default 1)
 *   duration  number  — animation length in ms (default 2000)
 *   suffix    string  — appended after the number (default "")
 */
export default function CountUp({ end, start = 1, duration = 2000, suffix = "" }) {
  // Server render + first client render both start at `start` — no mismatch.
  const [display, setDisplay] = useState(start);
  const [done, setDone]       = useState(false);
  const elRef  = useRef(null);
  const rafRef = useRef(null);
  const obsRef = useRef(null);

  // Format with thousand separators
  function fmt(n) {
    return Math.round(n).toLocaleString("en-US");
  }

  useEffect(() => {
    // Reduced-motion: skip animation entirely
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function runAnimation() {
      if (prefersReduced) {
        setDisplay(end);
        setDone(true);
        return;
      }

      const startTime = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function tick(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = easeOutCubic(progress);
        const current  = start + (end - start) * eased;

        setDisplay(current);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Guarantee last frame lands exactly on end
          setDisplay(end);
          setDone(true);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    // IntersectionObserver — start once at threshold 0.4
    obsRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obsRef.current.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.4 }
    );

    if (elRef.current) obsRef.current.observe(elRef.current);

    // If the element is already visible when the hook runs (page loaded
    // with section in viewport), the observer fires immediately — covered.

    return () => {
      obsRef.current?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, start, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  const finalText = fmt(end) + suffix;
  const displayText = fmt(display) + suffix;

  return (
    <span
      ref={elRef}
      className="relative inline-block"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {/* Hidden real final value for screen readers + crawlers */}
      <span className="sr-only">{finalText}</span>

      {/*
       * Width anchor — invisible, always shows final text so the element
       * never changes width while counting (no layout shift).
       */}
      <span aria-hidden="true" className="invisible select-none">
        {finalText}
      </span>

      {/* Animated visible number — absolutely positioned over the anchor */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center"
      >
        {displayText}
      </span>
    </span>
  );
}
