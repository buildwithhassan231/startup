/**
 * heroContent.js — content for the full-screen video hero on the home page.
 *
 * Shape:
 * {
 *   desktopVideo:  string  — /public path for desktop (≥768px) video
 *   mobileVideo:   string  — /public path for mobile  (<768px) video
 *   desktopPoster: string  — poster image for desktop video (empty = none)
 *   mobilePoster:  string  — poster image for mobile  video (empty = none)
 *   headingStart:     string  — plain text before the highlight
 *   headingHighlight: string  — text rendered in the accent colour
 *   headingEnd:       string  — plain text after the highlight (can be "")
 *   text:          string  — supporting paragraph
 *   primaryCta:  { label, href }
 *   secondaryCta: { label, href }
 * }
 *
 * To pull from a CMS later: export an async getHeroContent() that returns
 * the same shape — no component changes needed.
 */

export const heroContent = {
  desktopVideo:  "/fullscreen.mp4",
  mobileVideo:   "/responsive.mp4",
  desktopPoster: "",
  mobilePoster:  "",

 headingStart:     "Grow Your Business with Powerful",
headingHighlight: "Powerful Digital Solutions",
headingEnd:       "That Deliver Real Results",

  text: "We build fast websites, rank them on Google, run profitable ad campaigns and edit videos that sell. One team, one goal: your growth.",

  primaryCta:   { label: "Get a Free Quote", href: "/contact"   },
  secondaryCta: { label: "View Our Work",    href: "/our-work"  },
};
