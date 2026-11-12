/**
 * heroSlides.js — content for the home-page hero slider.
 *
 * Shape of each slide:
 * {
 *   id:               string   — unique key
 *   image:            string   — path relative to /public
 *   imageAlt:         string   — alt text for the image
 *   headingStart:     string   — plain text before the highlight
 *   headingHighlight: string   — word(s) rendered in the accent colour
 *   headingEnd:       string   — plain text after the highlight (can be "")
 *   accent:           string   — hex colour for highlight + badge + active dot
 *   text:             string   — supporting paragraph
 *   primaryCta:  { label, href }
 *   secondaryCta: { label, href }
 * }
 *
 * To replace with CMS/API data later: export an async function
 * getHeroSlides() that fetches from your backend and returns the
 * same shape — no component changes needed.
 */

export const heroSlides = [
  {
    id: "digital-marketing",
    image: "/digitalimg.png",
    imageAlt: "Digital marketing strategy illustration",
    headingStart: "Grow your brand with",
    headingHighlight: "Digital Marketing",
    headingEnd: "that gets results",
    accent: "#C8643B",
    text: "Social media, content and email campaigns that keep your business in front of the right customers.",
    primaryCta:   { label: "Get a Free Quote",    href: "/contact"                   },
    secondaryCta: { label: "View Our Services",   href: "/services/digital-marketing" },
  },
  {
    id: "video-editing",
    image: "/editing.png",
    imageAlt: "Video editing workspace",
    headingStart: "Videos and reels that",
    headingHighlight: "make people stop scrolling",
    headingEnd: "",
    accent: "#F36F00",
    text: "Professional video editing for reels, YouTube and ads, delivered fast and ready to post.",
    primaryCta:   { label: "Get a Free Quote", href: "/contact"   },
    secondaryCta: { label: "View Our Work",    href: "/our-work"  },
  },
  {
    id: "web-development",
    image: "/coding.png",
    imageAlt: "Web development code on screen",
    headingStart: "Fast websites that rank and",
    headingHighlight: "bring in customers",
    headingEnd: "",
    accent: "#2563EB",
    text: "Modern web development, SEO and Google Ads working together to turn visitors into clients.",
    primaryCta:   { label: "Get a Free Quote",          href: "/contact"                  },
    secondaryCta: { label: "Explore Web Development",   href: "/services/web-development" },
  },
];
