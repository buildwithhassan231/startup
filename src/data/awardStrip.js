/**
 * awardStrip.js — content for the AwardStrip section.
 *
 * Shape of each item:
 * {
 *   id:    string   — unique React key
 *   icon:  string   — lucide-react icon name (mapped in component via iconMap)
 *   label: string   — small uppercase label (Plus Jakarta Sans 600)
 *   title: string   — bold headline (Sora 700)
 *   href:  string   — next/link destination for the whole card
 * }
 *
 * To load from a CMS later: export async getAwardStrip() returning
 * the same shape — no component changes needed.
 */

export const awardStripItems = [
  {
    id:    "web-development",
    icon:  "Code2",
    label: "Web Development",
    title: "Fast, SEO-ready websites",
    href:  "/services/web-development",
  },
  {
    id:    "seo",
    icon:  "Search",
    label: "SEO",
    title: "Rank higher on Google",
    href:  "/services/seo",
  },
  {
    id:    "google-ads",
    icon:  "Megaphone",
    label: "Google Ads",
    title: "Clicks that become customers",
    href:  "/services/google-ads",
  },
  {
    id:    "digital-marketing",
    icon:  "TrendingUp",
    label: "Digital Marketing",
    title: "Grow your brand online",
    href:  "/services/digital-marketing",
  },
  {
    id:    "video-editing",
    icon:  "Video",
    label: "Video Editing",
    title: "Reels and videos that sell",
    href:  "/services/video-editing",
  },
];
