"use client";

import {
  useState, useEffect, useRef, useCallback, useReducer,
} from "react";
import {
  motion, AnimatePresence, useReducedMotion, LayoutGroup,
} from "framer-motion";
import {
  Lightbulb, Search, BarChart3, Target, Map,
  LayoutDashboard, PenTool, Palette, MousePointerClick, Layers,
  Code2, Server, ShoppingCart, Database, Gauge,
  ShieldCheck, HardDrive, Bug, FilePenLine, LifeBuoy,
  TrendingUp, Megaphone, Filter, PieChart, Zap,
} from "lucide-react";

/* ── Icon map: string name → component ─────────────────────────────────── */
const ICON_MAP = {
  Lightbulb, Search, BarChart3, Target, Map,
  LayoutDashboard, PenTool, Palette, MousePointerClick, Layers,
  Code2, Server, ShoppingCart, Database, Gauge,
  ShieldCheck, HardDrive, Bug, FilePenLine, LifeBuoy,
  TrendingUp, Megaphone, Filter, PieChart, Zap,
};

/* ── Animation variants ─────────────────────────────────────────────────── */
const descVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: "easeOut" } },
  exit:    { opacity: 0,        transition: { duration: 0.2  } },
};

const itemsContainerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit:    {},
};

const itemVariants = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0,   transition: { duration: 0.35, ease: "easeOut" } },
  exit:    { opacity: 0,          transition: { duration: 0.15 } },
};

const illustrationVariants = {
  initial: { opacity: 0, scale: 0.94, y: 12 },
  animate: { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0,
    transition: { duration: 0.2 } },
};

const rowEntranceVariants = (i, reduced) => ({
  initial: reduced ? {} : { opacity: 0, y: 12 },
  animate: {
    opacity: 1, y: 0,
    transition: reduced ? {} : { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  },
});

const panelEntranceVariants = (reduced) => ({
  initial: reduced ? {} : { opacity: 0 },
  animate: {
    opacity: 1,
    transition: reduced ? {} : { duration: 0.5, ease: "easeOut", delay: 0.15 },
  },
});

/* ── Progress bar component ─────────────────────────────────────────────── */
function ProgressBar({ accent, duration, running, reduced }) {
  const [width, setWidth] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    setWidth(0);
    if (!running || reduced) return;

    function tick(ts) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setWidth(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [running, duration, reduced, accent]); // accent reset on step change

  return (
    <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-transparent">
      <div
        style={{ width: `${width}%`, backgroundColor: accent }}
        className="h-full rounded-full transition-none"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main Strategy component
═══════════════════════════════════════════════════════════════════════════ */

/**
 * Strategy
 * Props:
 *   steps — array from data/strategySteps.js
 */
export default function Strategy({ steps }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPicked, setUserPicked]   = useState(false);
  const [hovered, setHovered]         = useState(false);
  const [focused, setFocused]         = useState(false);
  const [inView, setInView]           = useState(false);
  const [entered, setEntered]         = useState(false);

  const sectionRef   = useRef(null);
  const tabRefs      = useRef([]);
  const autoplayRef  = useRef(null);
  const reduced      = useReducedMotion();
  const INTERVAL     = 6000;

  const active = steps[activeIndex];

  /* ── Intersection observer — entrance + autoplay gating ─────────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setEntered(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Autoplay ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (userPicked || reduced || hovered || focused || !inView) {
      clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, INTERVAL);
    return () => clearInterval(autoplayRef.current);
  }, [userPicked, reduced, hovered, focused, inView, steps.length]);

  /* ── Preload SVGs after mount ────────────────────────────────────────── */
  useEffect(() => {
    steps.forEach((step) => {
      const img = new Image();
      img.src = step.image;
    });
  }, [steps]);

  /* ── Keyboard nav ────────────────────────────────────────────────────── */
  function handleKeyDown(e, index) {
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next = (index + 1) % steps.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      next = (index - 1 + steps.length) % steps.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = steps.length - 1;
    } else {
      return;
    }
    setActiveIndex(next);
    setUserPicked(true);
    tabRefs.current[next]?.focus();
  }

  /* ── Mobile: scroll active tab into view ─────────────────────────────── */
  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  /* ── CSS variables for the active step ──────────────────────────────── */
  const cssVars = {
    "--accent":      active.accent,
    "--accent-soft": active.accentSoft,
  };

  /* ── Frame gradient ──────────────────────────────────────────────────── */
  const frameGradient = `linear-gradient(90deg, ${active.accentSoft}, white)`;

  return (
    <section
      ref={sectionRef}
      aria-label="Our process"
      className="w-full bg-white py-20 sm:py-28"
      style={cssVars}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!sectionRef.current?.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16">

        {/* ── DESKTOP: two-column grid ──────────────────────────────────── */}
        <div className="hidden lg:grid lg:items-center" style={{ gridTemplateColumns: "34% 1fr", gap: "48px" }}>

          {/* LEFT — tab list */}
          <LayoutGroup id="strategy-tabs">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Process steps"
              className="flex flex-col"
              style={{ gap: "28px" }}
            >
              {steps.map((step, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={step.id}
                    variants={rowEntranceVariants(i, reduced)}
                    initial="initial"
                    animate={entered ? "animate" : "initial"}
                    className="relative"
                  >
                    <button
                      ref={(el) => (tabRefs.current[i] = el)}
                      id={`tab-${step.id}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${step.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => {
                        setActiveIndex(i);
                        setUserPicked(true);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="group flex w-full items-center gap-4 text-left focus:outline-none"
                      style={{
                        transform: isActive ? "translateX(6px)" : "translateX(0)",
                        transition: "transform 300ms ease",
                      }}
                    >
                      {/* Badge with layoutId ring */}
                      <div className="relative shrink-0">
                        {isActive && (
                          <motion.div
                            layoutId="badge-ring"
                            className="absolute rounded-full"
                            style={{
                              inset: "-4px",
                              border: `2px solid ${active.accent}`,
                              borderRadius: "50%",
                            }}
                            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full font-hero text-sm font-semibold"
                          style={{
                            background:   isActive ? active.accent : "#F1F5F9",
                            color:        isActive ? "#fff" : "#0F172A",
                            transition:   "background-color 500ms ease, color 500ms ease",
                          }}
                        >
                          {step.number}
                        </div>
                      </div>

                      {/* Label */}
                      <span
                        className="font-hero group-hover:opacity-80"
                        style={{
                          fontWeight:   700,
                          fontSize:     "clamp(26px, 2.6vw, 36px)",
                          lineHeight:   1.1,
                          color:        isActive ? active.accent : "#0F172A",
                          transform:    isActive ? "translateX(0)" : undefined,
                          transition:   "color 500ms ease, transform 300ms ease",
                        }}
                      >
                        {step.label}
                      </span>
                    </button>

                    {/* Progress bar — only under active */}
                    {isActive && (
                      <ProgressBar
                        accent={active.accent}
                        duration={INTERVAL}
                        running={!userPicked && !hovered && !focused && inView}
                        reduced={reduced}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>

          {/* RIGHT — framed panel */}
          <motion.div
            variants={panelEntranceVariants(reduced)}
            initial="initial"
            animate={entered ? "animate" : "initial"}
          >
            <div
              className="rounded-[20px] p-7"
              style={{
                background:  frameGradient,
                transition:  "background 500ms ease",
              }}
            >
              <div
                className="rounded-lg bg-white"
                style={{ padding: "48px", minHeight: "440px" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    className="flex h-full gap-8"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* Text column */}
                    <div className="flex flex-1 flex-col justify-center" style={{ minWidth: 0 }}>
                      <motion.p
                        variants={reduced ? {} : descVariants}
                        className="font-body mb-8 text-[#0F172A]"
                        style={{ fontSize: "17px", lineHeight: 1.7, maxWidth: "36ch" }}
                      >
                        {active.description}
                      </motion.p>

                      <motion.ul
                        variants={reduced ? {} : itemsContainerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex flex-col"
                        style={{ gap: "14px" }}
                        role="list"
                      >
                        {active.items.map((item) => {
                          const Icon = ICON_MAP[item.icon] ?? Lightbulb;
                          return (
                            <motion.li
                              key={item.label}
                              variants={reduced ? {} : itemVariants}
                              className="flex items-center gap-3"
                            >
                              <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                                style={{
                                  background: active.accentSoft,
                                  transition: "background-color 500ms ease",
                                }}
                                aria-hidden="true"
                              >
                                <Icon size={18} style={{ color: active.accent }} strokeWidth={1.75} />
                              </span>
                              <span className="font-body text-base font-medium text-[#0F172A]">
                                {item.label}
                              </span>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    </div>

                    {/* Illustration column */}
                    <div className="flex flex-1 items-center justify-center">
                      <motion.div
                        variants={reduced ? {} : illustrationVariants}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={active.image}
                          alt={active.imageAlt}
                          width={320}
                          height={320}
                          style={{
                            maxHeight:  "320px",
                            width:      "100%",
                            objectFit:  "contain",
                            filter:     `hue-rotate(${active.hue}deg)`,
                            transition: "filter 600ms ease",
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE / TABLET: stacked layout ──────────────────────────── */}
        <div className="lg:hidden">

          {/* Horizontal scrollable tab bar */}
          <div
            role="tablist"
            aria-orientation="horizontal"
            aria-label="Process steps"
            className="mb-6 flex gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={step.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`tab-mob-${step.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${step.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => { setActiveIndex(i); setUserPicked(true); }}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold focus:outline-none"
                  style={{
                    background:  isActive ? active.accent : "#F1F5F9",
                    color:       isActive ? "#fff" : "#0F172A",
                    transition:  "background-color 500ms ease, color 500ms ease",
                    focusRing:   `2px solid ${active.accent}`,
                  }}
                >
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.25)" : "#E2E8F0",
                      color:      isActive ? "#fff" : "#0F172A",
                    }}
                  >
                    {step.number}
                  </span>
                  <span className="font-hero" style={{ fontSize: "18px" }}>{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Framed panel */}
          <div
            className="rounded-2xl"
            style={{ padding: "14px", background: frameGradient, transition: "background 500ms ease" }}
          >
            <div className="rounded-lg bg-white" style={{ padding: "24px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  {/* Illustration first on mobile */}
                  <motion.div
                    variants={reduced ? {} : illustrationVariants}
                    className="flex justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={active.image}
                      alt={active.imageAlt}
                      width={280}
                      height={220}
                      style={{
                        maxHeight:  "220px",
                        width:      "100%",
                        objectFit:  "contain",
                        filter:     `hue-rotate(${active.hue}deg)`,
                        transition: "filter 600ms ease",
                      }}
                    />
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    variants={reduced ? {} : descVariants}
                    className="font-body text-[#0F172A]"
                    style={{ fontSize: "16px", lineHeight: 1.7 }}
                  >
                    {active.description}
                  </motion.p>

                  {/* Items */}
                  <motion.ul
                    variants={reduced ? {} : itemsContainerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col"
                    style={{ gap: "12px" }}
                    role="list"
                  >
                    {active.items.map((item) => {
                      const Icon = ICON_MAP[item.icon] ?? Lightbulb;
                      return (
                        <motion.li
                          key={item.label}
                          variants={reduced ? {} : itemVariants}
                          className="flex items-center gap-3"
                        >
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                            style={{ background: active.accentSoft, transition: "background-color 500ms ease" }}
                            aria-hidden="true"
                          >
                            <Icon size={18} style={{ color: active.accent }} strokeWidth={1.75} />
                          </span>
                          <span className="font-body text-sm font-medium text-[#0F172A]">{item.label}</span>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      {/* Hide mobile scrollbar in webkit */}
      <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
