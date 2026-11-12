/**
 * nav.js — single source of truth for navigation.
 * Shape: [{ label, slug, categories: [{ label, slug, children: [{ label, slug }] }] }]
 * Swap the export for an async API fetch later without touching any UI.
 */

export const navServices = {
  label: "Services",
  slug: "services",
  categories: [
    {
      label: "Web Development",
      slug: "web-development",
      children: [
        { label: "Business Websites",  slug: "business-websites"  },
        { label: "E-commerce Websites", slug: "ecommerce-websites" },
        { label: "React & Next.js Apps", slug: "react-nextjs-apps" },
        { label: "Website Redesign",   slug: "website-redesign"   },
        { label: "Website Maintenance", slug: "website-maintenance" },
      ],
    },
    {
      label: "SEO",
      slug: "seo",
      children: [
        { label: "Local SEO",              slug: "local-seo"              },
        { label: "Technical SEO",          slug: "technical-seo"          },
        { label: "On-Page SEO",            slug: "on-page-seo"            },
        { label: "Keyword Research",       slug: "keyword-research"       },
        { label: "Google Business Profile", slug: "google-business-profile" },
      ],
    },
    {
      label: "Google Ads",
      slug: "google-ads",
      children: [
        { label: "Search Ads",          slug: "search-ads"          },
        { label: "Local Service Ads",   slug: "local-service-ads"   },
        { label: "Display & Remarketing", slug: "display-remarketing" },
        { label: "Landing Pages",       slug: "landing-pages"       },
        { label: "Conversion Tracking", slug: "conversion-tracking" },
      ],
    },
    {
      label: "Digital Marketing",
      slug: "digital-marketing",
      children: [
        { label: "Social Media Management", slug: "social-media-management" },
        { label: "Content Marketing",       slug: "content-marketing"       },
        { label: "Email Marketing",         slug: "email-marketing"         },
        { label: "Brand Design",            slug: "brand-design"            },
      ],
    },
    {
      label: "Video Editing",
      slug: "video-editing",
      children: [
        { label: "Reels & Shorts",    slug: "reels-shorts"    },
        { label: "YouTube Videos",    slug: "youtube-videos"  },
        { label: "Ad Videos",         slug: "ad-videos"       },
        { label: "Corporate Videos",  slug: "corporate-videos" },
      ],
    },
  ],
};

/** Top-level links that are NOT the services mega-menu. */
export const navLinks = [
  { label: "Our Work", href: "/our-work" },
  { label: "Pricing",  href: "/pricing"  },
  { label: "About Us", href: "/about"    },
  { label: "Insights", href: "/insights" },
];

export const phone = {
  display: "+966 57 698 4355",
  href: "tel:+966576984355",
};
