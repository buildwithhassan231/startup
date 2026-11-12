/**
 * ourWork.js — portfolio projects for the Our Work gallery.
 *
 * Shape:
 * {
 *   id:          string
 *   title:       string
 *   category:    string
 *   tag:         string
 *   image:       string  — path in /public
 *   placeholder: string  — fallback CSS color
 *   span:        "normal" | "wide" | "tall"
 * }
 */

export const ourWork = [
  { id: "brandwave",  title: "BrandWave Agency",       category: "Web Development",  tag: "+240% Traffic",   image: "/gallery1.jpg", placeholder: "#1E3A5F", span: "wide"   },
  { id: "greenpeak",  title: "GreenPeak Store",         category: "SEO & Google Ads", tag: "3× Revenue",      image: "/gallery2.jpg", placeholder: "#134E3A", span: "normal" },
  { id: "lumina",     title: "Lumina Skincare",         category: "Digital Marketing",tag: "50K Followers",   image: "/gallery3.jpg", placeholder: "#4A1040", span: "tall"   },
  { id: "steelcraft", title: "SteelCraft Fabrication",  category: "Google Ads",       tag: "4.8× ROAS",       image: "/gallery4.jpg", placeholder: "#3B2000", span: "normal" },
  { id: "vortex",     title: "Vortex Apparel",          category: "Video Editing",    tag: "12M Views",       image: "/gallery5.jpg", placeholder: "#1E1B4B", span: "normal" },
  { id: "nexatech",   title: "NexaTech SaaS",           category: "Web Dev + SEO",    tag: "#1 on Google",    image: "/gallery6.png", placeholder: "#0C2D3F", span: "wide"   },
  { id: "solarcity",  title: "SolarCity Installs",      category: "Lead Generation",  tag: "+320 Leads/mo",   image: "",              placeholder: "#3D1A00", span: "normal" },
  { id: "fithub",     title: "FitHub Gym Chain",        category: "Social Media",     tag: "2× Memberships",  image: "",              placeholder: "#3B0A1E", span: "normal" },
  { id: "origio",     title: "Origio Real Estate",      category: "Website Redesign", tag: "+180% Enquiries", image: "",              placeholder: "#0A1F3F", span: "normal" },
];
