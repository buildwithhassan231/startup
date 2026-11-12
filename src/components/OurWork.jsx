"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";

/**
 * OurWork — masonry gallery.
 * • Cards are NOT links — clicking opens a full-screen lightbox.
 * • Text (title, category, tag) is hidden by default, shown only on hover.
 * • Lightbox has left/right arrows + keyboard nav + Escape to close.
 *
 * Props:
 *   projects — array from data/ourWork.js
 *   limit    — max cards to show (6 for home, omit for full page)
 */
export default function OurWork({ projects, limit }) {
  const visible = limit ? projects.slice(0, limit) : projects;
  const [lightbox, setLightbox] = useState(null); // index of open image

  /* Keyboard: Escape = close, ArrowLeft/Right = prev/next */
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e) {
      if (e.key === "Escape")      setLightbox(null);
      if (e.key === "ArrowLeft")   setLightbox(i => (i - 1 + visible.length) % visible.length);
      if (e.key === "ArrowRight")  setLightbox(i => (i + 1) % visible.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, visible.length]);

  /* Prevent body scroll when lightbox open */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const prev = useCallback(() => setLightbox(i => (i - 1 + visible.length) % visible.length), [visible.length]);
  const next = useCallback(() => setLightbox(i => (i + 1) % visible.length), [visible.length]);

  return (
    <>
      <section aria-label="Our Work" className="relative w-full overflow-hidden py-24 sm:py-32">

        {/* Background */}
        <Image src="/gallerybg.jpg" alt="" fill sizes="100vw"
          className="object-cover object-center" aria-hidden="true" priority={false} />
        <div aria-hidden="true" className="absolute inset-0 bg-white/90" />

        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">

          {/* Header */}
          <div className="mb-14 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-hero mb-4 inline-block rounded-full border border-[#FDDCCA] bg-[#FFF1E8] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#F36F00]">
                Portfolio
              </span>
              <h2 className="font-hero text-[#0F172A]"
                style={{ fontWeight: 800, fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
               Explore Our{" "}
                <span style={{ color: "#F36F00" }}> Recent Work</span>
              </h2>
            </div>
            {limit && (
              <Link href="/our-work"
                className="font-body group hidden shrink-0 items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-[#F36F00] hover:text-[#F36F00] sm:flex">
                View All Work
                <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Grid */}
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gridAutoRows: "260px" }}
          >
            {visible.map((project, i) => {
              const colSpan = project.span === "wide" ? "sm:col-span-2 lg:col-span-2" : "col-span-1";
              const rowSpan = project.span === "tall" ? "lg:row-span-2" : "";
              return (
                <GalleryCard
                  key={project.id}
                  project={project}
                  index={i}
                  colSpan={colSpan}
                  rowSpan={rowSpan}
                  onClick={() => setLightbox(i)}
                />
              );
            })}
          </div>

          {limit && (
            <div className="mt-10 flex justify-center sm:hidden">
              <Link href="/our-work"
                className="font-body inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-600">
                View All Work <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" />

            {/* Image container — stop propagation so clicking image doesn't close */}
            <motion.div
              className="relative z-10 flex max-h-[90vh] max-w-[92vw] items-center justify-center"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.92,    opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl"
                style={{ width: "min(900px, 90vw)", height: "min(600px, 80vh)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightbox}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0  }}
                    exit={{    opacity: 0, x: -40 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    {visible[lightbox].image ? (
                      <Image
                        src={visible[lightbox].image}
                        alt={visible[lightbox].title}
                        fill
                        sizes="90vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full"
                        style={{ background: visible[lightbox].placeholder }} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Bottom info bar inside image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                  <span className="font-hero mb-1 inline-block rounded-full bg-[#F36F00] px-3 py-1 text-xs font-bold text-white">
                    {visible[lightbox].tag}
                  </span>
                  <h3 className="font-hero mt-1 text-lg font-bold text-white">
                    {visible[lightbox].title}
                  </h3>
                  <p className="font-body text-sm text-white/70">{visible[lightbox].category}</p>
                </div>
              </div>

              {/* Counter */}
              <div className="absolute -top-9 left-0 font-body text-sm text-white/60">
                {lightbox + 1} / {visible.length}
              </div>

              {/* Left arrow */}
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute -left-14 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>

              {/* Right arrow */}
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute -right-14 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Single gallery card ─────────────────────────────────────────────────── */
function GalleryCard({ project, index, colSpan, rowSpan, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden rounded-2xl ${colSpan} ${rowSpan}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      {/* Image / placeholder */}
      <div className="absolute inset-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            className="object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-700 ease-out"
            style={{
              background: `linear-gradient(135deg,${project.placeholder} 0%,${project.placeholder}99 100%)`,
              transform:   hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        )}
      </div>

      {/* Permanent light overlay at bottom (gradient) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
          opacity:     hovered ? 1 : 0.4,
        }}
      />

      {/* Text — hidden by default, fades in on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 p-5"
        initial={false}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <span
          className="font-hero mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ background: "#F36F00" }}
        >
          {project.tag}
        </span>
        <h3 className="font-hero text-white"
          style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p className="font-body mt-0.5 text-sm text-white/75">{project.category}</p>
      </motion.div>
    </motion.div>
  );
}
