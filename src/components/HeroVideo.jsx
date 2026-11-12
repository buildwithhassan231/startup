
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroVideo({
  desktopVideo,
  mobileVideo,
  desktopPoster,
  mobilePoster,
  headingStart,
  headingHighlight,
  headingEnd,
  text,
  primaryCta,
  secondaryCta,
}) {
  const [isMobile, setIsMobile] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const videoRef = useRef(null);
  const mqRef = useRef(null);

  // Detect mobile, reduced motion and data saver
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dataSaver =
      typeof navigator !== "undefined" &&
      navigator.connection?.saveData;

    setShouldPlay(!prefersReduced && !dataSaver);

    mqRef.current = window.matchMedia("(max-width: 767px)");
    setIsMobile(mqRef.current.matches);

    const handleMqChange = (e) => {
      setIsMobile(e.matches);
    };

    mqRef.current.addEventListener("change", handleMqChange);

    return () => {
      mqRef.current?.removeEventListener("change", handleMqChange);
    };
  }, []);

  // Manage video playback
  useEffect(() => {
    const video = videoRef.current;

    if (!video || isMobile === null) return;

    if (shouldPlay) {
      video.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }

    return () => {
      video.pause();
    };
  }, [isMobile, shouldPlay]);

  // Video source
  const src =
    isMobile === null
      ? desktopVideo
      : isMobile
        ? mobileVideo
        : desktopVideo;

  const poster =
    isMobile === null
      ? desktopPoster
      : isMobile
        ? mobilePoster
        : desktopPoster;

  // Play / pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      className="relative isolate flex w-full items-center justify-center overflow-hidden bg-slate-950"
      style={{
        minHeight: "600px",
        height: "calc(100svh - 68px)",
        maxHeight: "850px",
      }}
      aria-label="Hero"
    >
      {/* Background Video */}
      {isMobile !== null && (
        <video
          ref={videoRef}
          key={src}
          src={src}
          poster={poster || undefined}
          autoPlay={shouldPlay}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Premium Dark Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-slate-950/45"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,25,0.60) 0%, rgba(8,12,25,0.35) 45%, rgba(8,12,25,0.75) 100%)",
        }}
      />

      {/* Subtle Brand Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]"
        style={{ background: "var(--brand)" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-12">

        {/* Small Label */}
        {/* <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--brand)" }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
            Digital Solutions That Move Business Forward
          </span>
        </div> */}

        {/* Main Heading - Exactly 2 Lines */}
        <h1
          className="font-hero mx-auto mb-7 max-w-6xl text-white"
          style={{
            fontWeight: 800,
            fontSize: "clamp(36px, 5.8vw, 76px)",
            lineHeight: 1.12,
            letterSpacing: "-0.045em",
          }}
        >
          <span className="block">
            {headingStart}
          </span>

          <span
            className="mt-1 block"
            style={{ color: "var(--brand)" }}
          >
            {headingHighlight}
          </span>

          {headingEnd && (
            <span className="sr-only">
              {" "}{headingEnd}
            </span>
          )}
        </h1>

        {/* Description */}
        <p
          className="font-body mx-auto mb-10 max-w-2xl text-base font-normal text-white/80 sm:text-lg lg:text-xl"
          style={{ lineHeight: 1.8 }}
        >
          {text}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            href={primaryCta.href}
            className="group flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-9"
            style={{ background: "var(--brand)" }}
          >
            {primaryCta.label}

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href={secondaryCta.href}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:w-auto sm:px-9"
          >
            {secondaryCta.label}
          </Link>

        </div>

        {/* Trust Text */}
        <p className="mt-9 text-xs font-medium tracking-wide text-white/60 sm:text-sm">
          {/* Strategy • Creativity • Technology • Growth */}
        </p>

      </div>

      {/* Video Play / Pause Control */}
      {/* {isMobile !== null && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {playing ? (
            <span className="text-xs font-bold">Ⅱ</span>
          ) : (
            <Play size={17} fill="currentColor" />
          )}
        </button>
      )} */}

    </section>
  );
}
