/**
 * servicesList.js — service cards data derived from nav.js categories.
 * href and labels match exactly what is in data/nav.js.
 *
 * Shape of each item:
 * { id, icon, title, description, href }
 * - icon: lucide-react icon name (mapped in ServiceCard via iconMap)
 */

export const servicesList = [
  {
    id:          "web-development",
    icon:        "Code2",
    title:       "Web Development",
    description: "Fast, SEO-ready websites that turn visitors into customers",
    href:        "/services/web-development",
  },
  {
    id:          "seo",
    icon:        "Search",
    title:       "SEO",
    description: "Rank higher on Google and get found by the right customers",
    href:        "/services/seo",
  },
  {
    id:          "google-ads",
    icon:        "Megaphone",
    title:       "Google Ads",
    description: "Paid campaigns that bring ready-to-buy customers",
    href:        "/services/google-ads",
  },
  {
    id:          "digital-marketing",
    icon:        "TrendingUp",
    title:       "Digital Marketing",
    description: "Grow your brand online across every channel",
    href:        "/services/digital-marketing",
  },
  {
    id:          "video-editing",
    icon:        "Video",
    title:       "Video Editing",
    description: "Reels, YouTube and ad videos that grab attention",
    href:        "/services/video-editing",
  },
];
