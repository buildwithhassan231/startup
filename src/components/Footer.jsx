import Link from "next/link";
import { navServices, navLinks, phone } from "@/data/nav";
import { Phone, Mail, MapPin, Share2, Globe, AtSign, Tv2, Film } from "lucide-react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      style={{
        /* Gradient: fully transparent white at top → warm cream at bottom */
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFAF5 18%, #FFF5EC 60%, #FEF0E3 100%)",
      }}
    >
      {/* ── Main footer body ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-screen-2xl px-6 pb-12 pt-20 sm:px-10 lg:px-16">

        {/* Top row: brand + columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Home">
              <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-hidden="true">
                <rect width="16" height="16" rx="8" fill="#F36F00" />
                <rect x="10" y="4" width="16" height="16" rx="8" fill="#F36F00" opacity="0.55" />
              </svg>
              <span className="font-hero text-lg font-bold tracking-tight text-[#0F172A]">
                AgencyName
              </span>
            </Link>

            <p className="font-body mt-5 max-w-[26ch] text-sm leading-relaxed text-[#64748B]">
              Web development, SEO, Google Ads, digital marketing and video editing — all under one roof.
            </p>

            {/* Contact */}
            <ul className="mt-6 space-y-3" role="list">
              <li>
                <a href={phone.href}
                  className="font-body flex items-center gap-2 text-sm text-[#475569] hover:text-[#F36F00] transition-colors">
                  <Phone size={15} className="shrink-0 text-[#F36F00]" aria-hidden="true" />
                  {phone.display}
                </a>
              </li>
              <li>
                <a href="mailto:hello@agencyname.com"
                  className="font-body flex items-center gap-2 text-sm text-[#475569] hover:text-[#F36F00] transition-colors">
                  <Mail size={15} className="shrink-0 text-[#F36F00]" aria-hidden="true" />
                  hello@agencyname.com
                </a>
              </li>
              <li>
                <span className="font-body flex items-start gap-2 text-sm text-[#475569]">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[#F36F00]" aria-hidden="true" />
                  Riyadh, Saudi Arabia
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">
              {[
                { Icon: AtSign,  label: "Instagram", href: "#" },
                { Icon: Share2,  label: "Facebook",  href: "#" },
                { Icon: Globe,   label: "Twitter",   href: "#" },
                { Icon: Tv2,     label: "LinkedIn",  href: "#" },
                { Icon: Film,    label: "YouTube",   href: "#" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] transition-all hover:border-[#F36F00] hover:text-[#F36F00]">
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">

            {/* Services — one column per category */}
            {navServices.categories.map((cat) => (
              <div key={cat.slug}>
                <h3 className="font-hero mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                  {cat.label}
                </h3>
                <ul role="list" className="space-y-2.5">
                  {cat.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        href={`/services/${cat.slug}/${child.slug}`}
                        className="font-body text-sm text-[#64748B] transition-colors hover:text-[#F36F00]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Company column */}
            <div>
              <h3 className="font-hero mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Company
              </h3>
              <ul role="list" className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-[#64748B] transition-colors hover:text-[#F36F00]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact"
                    className="font-body text-sm text-[#64748B] transition-colors hover:text-[#F36F00]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#F0E6D8] pt-7 sm:flex-row">
          <p className="font-body text-xs text-[#94A3B8]">
            © {year} AgencyName. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { label: "Privacy Policy",    href: "/privacy"  },
              { label: "Terms of Service",  href: "/terms"    },
              { label: "Cookie Policy",     href: "/cookies"  },
            ].map(({ label, href }) => (
              <Link key={href} href={href}
                className="font-body text-xs text-[#94A3B8] transition-colors hover:text-[#F36F00]">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
