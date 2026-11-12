/**
 * Breadcrumbs — server component.
 * Renders an accessible breadcrumb trail + JSON-LD BreadcrumbList.
 *
 * Props:
 *   crumbs — [{ label: string, href?: string }]
 *            Last item has no href (current page).
 *
 * Set NEXT_PUBLIC_SITE_URL in your .env.local to your real domain,
 * e.g. NEXT_PUBLIC_SITE_URL=https://agencyname.com
 */

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function Breadcrumbs({ crumbs }) {
  /* JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ label, href }, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       label,
      item:       href ? `${SITE_URL}${href}` : undefined,
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Visual breadcrumb pill */}
      <nav
        aria-label="Breadcrumb"
        className="breadcrumb-entrance"
        style={{ animationDelay: "250ms" }}
      >
        <div
          className="inline-flex flex-wrap items-center gap-1 rounded-full px-[18px] py-2 backdrop-blur-sm"
          style={{
            background:   "rgba(255,255,255,0.08)",
            border:       "1px solid rgba(255,255,255,0.15)",
            fontSize:     "14px",
            fontWeight:   500,
            fontFamily:   "var(--font-plus-jakarta, sans-serif)",
          }}
        >
          <ol className="flex flex-wrap items-center gap-1" role="list">
            {crumbs.map(({ label, href }, i) => {
              const isLast  = i === crumbs.length - 1;
              const isFirst = i === 0;

              return (
                <li key={i} className="flex items-center gap-1">
                  {!isLast ? (
                    <>
                      <Link
                        href={href}
                        className="flex items-center gap-1 text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1"
                        style={{ maxWidth: "60vw" }}
                      >
                        {isFirst && (
                          <Home
                            size={13}
                            aria-hidden="true"
                            className="shrink-0"
                          />
                        )}
                        <span className="truncate">{label}</span>
                      </Link>
                      <ChevronRight
                        size={14}
                        aria-hidden="true"
                        className="shrink-0"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      />
                    </>
                  ) : (
                    <span
                      aria-current="page"
                      className="truncate font-semibold"
                      style={{
                        color:    "#FF8A3D",
                        maxWidth: "60vw",
                      }}
                    >
                      {label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
