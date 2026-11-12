/**
 * strategySteps.js — content for the Strategy tab-slider section.
 *
 * Shape of each step:
 * {
 *   id:          string               — unique React key
 *   number:      string               — display number e.g. "01"
 *   label:       string               — tab label (Sora heading)
 *   description: string               — body paragraph
 *   items: [{
 *     label: string,                  — service item label
 *     icon:  string,                  — lucide-react icon name (mapped in component)
 *   }]
 *   image:      string                — /public path to the SVG illustration
 *   imageAlt:   string                — meaningful alt text
 *   accent:     string                — active hex colour (badge bg, label, chips)
 *   accentSoft: string                — light tint for frame bg, chip bg
 *   hue:        number                — hue-rotate degrees to tint the orange SVG
 * }
 *
 * To load from a CMS later: export an async getStrategySteps() that returns
 * the same shape — no component changes needed.
 */

export const strategySteps = [
  {
    id: "strategy",
    number: "01",
    label: "Strategy",
    description:
      "We don't take a transactional approach to our engagements. We strive to deeply understand your business challenges and apply the right strategy to solve them.",
    items: [
      { label: "Business Consulting",  icon: "Lightbulb"  },
      { label: "Market Research",      icon: "Search"     },
      { label: "Competitor Analysis",  icon: "BarChart3"  },
      { label: "Goal Planning",        icon: "Target"     },
      { label: "Growth Roadmap",       icon: "Map"        },
    ],
    image:      "/Strategy.svg",
    imageAlt:   "Strategy illustration showing analytics and planning",
    accent:     "#F05A28",
    accentSoft: "#FDE3DA",
    hue:        0,
  },
  {
    id: "design",
    number: "02",
    label: "Design",
    description:
      "Great design is clear, fast and built around your customers. We turn ideas into interfaces people enjoy using and remember.",
    items: [
      { label: "UI/UX Design",          icon: "LayoutDashboard"   },
      { label: "Wireframing",           icon: "PenTool"           },
      { label: "Brand Identity",        icon: "Palette"           },
      { label: "Prototyping",           icon: "MousePointerClick" },
      { label: "Design Systems",        icon: "Layers"            },
    ],
    image:      "/Design.svg",
    imageAlt:   "Design illustration showing UI wireframes and colour palettes",
    accent:     "#7C3AED",
    accentSoft: "#E9DDFD",
    hue:        246,
  },
  {
    id: "development",
    number: "03",
    label: "Development",
    description:
      "Clean, modern code that loads fast, ranks well and grows with your business, from simple sites to full web applications.",
    items: [
      { label: "Frontend Development",      icon: "Code2"        },
      { label: "Backend and APIs",          icon: "Server"       },
      { label: "E-commerce Builds",         icon: "ShoppingCart" },
      { label: "CMS Integration",           icon: "Database"     },
      { label: "Performance Optimization",  icon: "Gauge"        },
    ],
    image:      "/Development.svg",
    imageAlt:   "Development illustration showing code editor and browser",
    accent:     "#2563EB",
    accentSoft: "#DBE7FE",
    hue:        205,
  },
  {
    id: "maintain",
    number: "04",
    label: "Maintain",
    description:
      "Launch is only the beginning. We keep your website secure, fast and up to date so you can focus on running your business.",
    items: [
      { label: "Security Updates",       icon: "ShieldCheck" },
      { label: "Backups and Monitoring", icon: "HardDrive"   },
      { label: "Bug Fixes",              icon: "Bug"         },
      { label: "Content Updates",        icon: "FilePenLine" },
      { label: "Uptime Support",         icon: "LifeBuoy"    },
    ],
    image:      "/Maintain.svg",
    imageAlt:   "Maintain illustration showing server uptime and security shield",
    accent:     "#0D9488",
    accentSoft: "#D3F2EE",
    hue:        159,
  },
  {
    id: "scale",
    number: "05",
    label: "Scale",
    description:
      "Once the foundation is solid, we grow your reach with search, ads and content that bring in more of the right customers.",
    items: [
      { label: "SEO Growth",               icon: "TrendingUp" },
      { label: "Google Ads",               icon: "Megaphone"  },
      { label: "Conversion Optimization",  icon: "Filter"     },
      { label: "Analytics Reporting",      icon: "PieChart"   },
      { label: "Automation",               icon: "Zap"        },
    ],
    image:      "/Scale.svg",
    imageAlt:   "Scale illustration showing growth charts and rocket launch",
    accent:     "#DB2777",
    accentSoft: "#FBDDEA",
    hue:        320,
  },
];
