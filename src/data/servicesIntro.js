/**
 * servicesIntro.js — content for the ServicesIntro section.
 *
 * Shape:
 * {
 *   label:            string  — small pill label above the heading
 *   headingStart:     string  — plain dark text before the highlight
 *   headingHighlight: string  — brand-orange text with underline treatment
 *   text:             string  — body paragraph
 *   cta: { label, href }      — primary CTA button
 * }
 *
 * To load from a CMS later: export async getServicesIntro() returning
 * the same shape — no component changes needed.
 */

export const servicesIntro = {
  label: "Our Services",

  headingStart: "Everything You Need to",
  headingHighlight: "Grow Your Business Online.",

  text: "We help businesses around the world grow online with web development, SEO, Google Ads, digital marketing and video editing, all under one roof. We start by learning your business, your customers and your competitors, then build a clear plan to reach the right people at the right time. From a fast, search-friendly website to ad campaigns and videos that get attention, we track every result so you always know what is working and where your growth is coming from.",

  cta: { label: "Get a Free Quote", href: "/contact" },
};
