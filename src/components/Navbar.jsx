"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { navServices, navLinks, phone } from "@/data/nav";

/* ─────────────────────────────────────────────────────────────────────────────
   Navbar
   - Services mega-menu opens on CLICK, not hover
   - Category accordion: click toggles subcategory panel
   - Mobile: hamburger + nested accordion built from same data
   - Close on outside click or Escape
   - aria-expanded / aria-controls on every interactive trigger
   - Keyboard: Tab, Enter, Arrow keys navigate categories
───────────────────────────────────────────────────────────────────────────── */

export default function Navbar() {
  /* ── state ──────────────────────────────────────────────────────────────── */
  const [menuOpen, setMenuOpen]           = useState(false); // services mega-menu
  const [activeCategory, setActiveCategory] = useState(null); // slug of open category
  const [mobileOpen, setMobileOpen]       = useState(false); // hamburger
  const [mobileCatOpen, setMobileCatOpen] = useState(null);  // mobile accordion category

  const navRef    = useRef(null);
  const triggerRef = useRef(null); // "Services" button — focus returns here on close

  /* ── close on outside click ─────────────────────────────────────────────── */
  useEffect(() => {
    function handlePointerDown(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setActiveCategory(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  /* ── close on Escape ────────────────────────────────────────────────────── */
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActiveCategory(null);
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ── helpers ────────────────────────────────────────────────────────────── */
  const toggleServices = useCallback(() => {
    setMenuOpen((prev) => {
      if (prev) setActiveCategory(null);
      return !prev;
    });
  }, []);

  const toggleCategory = useCallback((slug) => {
    setActiveCategory((prev) => (prev === slug ? null : slug));
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setActiveCategory(null);
    setMobileOpen(false);
    setMobileCatOpen(null);
  }, []);

  /* ── keyboard navigation inside category list ───────────────────────────── */
  function handleCategoryKeyDown(e, slug, index) {
    const cats = navServices.categories;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCategory(slug);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cats[(index + 1) % cats.length];
      document.getElementById(`cat-btn-${next.slug}`)?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = cats[(index - 1 + cats.length) % cats.length];
      document.getElementById(`cat-btn-${prev.slug}`)?.focus();
    }
  }

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full border-b border-[#1e2d3d] bg-[#1a2b3c] backdrop-blur-sm"
    >
      <div className="mx-auto flex h-20 max-w-screen-full items-center justify-between gap-4 px-4 sm:px-40">

        {/* ── Logo ────────────────────────────────────────────────────────── */}
        <Link
          href="/"
          onClick={closeAll}
          className="flex shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
          aria-label="Home"
        >
          <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-hidden="true">
            <rect width="16" height="16" rx="8" fill="var(--brand)" />
            <rect x="10" y="4" width="16" height="16" rx="8" fill="var(--brand)" opacity="0.55" />
          </svg>
          <span className="hidden text-lg font-bold tracking-tight text-white sm:block">
            AgencyName
          </span>
          {/* <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 hidden sm:block">
            builders of better
          </span> */}
        </Link>

        {/* ── Desktop nav ─────────────────────────────────────────────────── */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">

          {/* Services trigger */}
          <div className="relative">
            <button
              ref={triggerRef}
              id="services-menu-btn"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-controls="services-dropdown"
              onClick={toggleServices}
              className={`nav-link-dark flex items-center gap-1 ${menuOpen ? "text-[var(--brand)]" : ""}`}
            >
              Services
              <ChevronIcon open={menuOpen} />
            </button>

            {/* ── Mega dropdown ─────────────────────────────────────────── */}
            {menuOpen && (
              <div
                id="services-dropdown"
                role="region"
                aria-label="Services menu"
                className="fixed left-0 right-0 top-16 z-50 border-t border-zinc-700 bg-[#1a2b3c] shadow-2xl"
              >
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
                  {/* "SERVICES" label — mimics the reference */}
                  <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Services
                  </p>

                  {/* All 5 categories as columns, side by side */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                    {navServices.categories.map((cat) => (
                      <div key={cat.slug}>  
                        {/* Category heading — links to the category page */}
                        <Link
                          href={`/services/${cat.slug}`}
                          onClick={closeAll}
                          className="mb-3 flex items-center gap-1.5 text-15 font-bold uppercase tracking-widest text-white hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                        >
                          <CategoryIcon slug={cat.slug} />
                          {cat.label}
                        </Link>

                        {/* Children */}
                        <ul role="list" className="space-y-2">
                          {cat.children.map((child) => (
                            <li key={child.slug}>
                              <Link
                                href={`/services/${cat.slug}/${child.slug}`}
                                onClick={closeAll}
                                className="block text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAll}
              className="nav-link-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right side: phone + CTA + hamburger ─────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Phone — hidden on small screens */}
          <a
            href={phone.href}
            className="hidden items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-[var(--brand)] xl:flex"
            aria-label={`Call us at ${phone.display}`}
          >
            <PhoneIcon />
            {phone.display}
          </a>

          {/* CTA button */}
          <Link
            href="/contact"
            onClick={closeAll}
            className="hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--brand-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 sm:block"
          >
            Get a Free Quote
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-zinc-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:hidden"
        >
          <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6">

            {/* Services accordion */}
            <div className="mb-1">
              <button
                aria-expanded={mobileCatOpen === "__services"}
                aria-controls="mobile-services-panel"
                onClick={() =>
                  setMobileCatOpen((p) =>
                    p === "__services" ? null : "__services"
                  )
                }
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-800"
              >
                Services
                <ChevronIcon open={mobileCatOpen === "__services"} size={14} />
              </button>

              {mobileCatOpen === "__services" && (
                <div id="mobile-services-panel" className="ml-3 mt-1 space-y-1">
                  {navServices.categories.map((cat) => (
                    <div key={cat.slug}>
                      <button
                        aria-expanded={mobileCatOpen === cat.slug}
                        aria-controls={`mobile-cat-${cat.slug}`}
                        onClick={() =>
                          setMobileCatOpen((p) =>
                            p === cat.slug ? "__services" : cat.slug
                          )
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        {cat.label}
                        <ChevronIcon
                          open={mobileCatOpen === cat.slug}
                          size={12}
                        />
                      </button>

                      {mobileCatOpen === cat.slug && (
                        <ul
                          id={`mobile-cat-${cat.slug}`}
                          className="ml-3 mt-1 space-y-0.5"
                        >
                          <li>
                            <Link
                              href={`/services/${cat.slug}`}
                              onClick={closeAll}
                              className="block rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand)] hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            >
                              View all {cat.label} →
                            </Link>
                          </li>
                          {cat.children.map((child) => (
                            <li key={child.slug}>
                              <Link
                                href={`/services/${cat.slug}/${child.slug}`}
                                onClick={closeAll}
                                className="block rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-800"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile phone + CTA */}
            <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <a
                href={phone.href}
                className="flex items-center gap-2 px-3 text-sm font-medium text-zinc-600 hover:text-[var(--brand)] dark:text-zinc-400"
              >
                <PhoneIcon />
                {phone.display}
              </a>
              <Link
                href="/contact"
                onClick={closeAll}
                className="block rounded-full bg-[var(--brand)] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--brand-dark)]"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Category icon (small emoji-style indicator per category) ────────────── */

function CategoryIcon({ slug }) {
  const map = {
    "web-development":  "💻",
    "seo":              "📈",
    "google-ads":       "📣",
    "digital-marketing":"📱",
    "video-editing":    "🎬",
  };
  return (
    <span aria-hidden="true" className="text-[13px]">
      {map[slug] ?? "→"}
    </span>
  );
}

/* ── Icon helpers ─────────────────────────────────────────────────────────── */

function ChevronIcon({ open, size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 5l4.5 4 4.5-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1C9.61 20 4 14.39 4 7.5a1 1 0 0 1 1-1H8.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.02L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M5 5l12 12M17 5 5 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
