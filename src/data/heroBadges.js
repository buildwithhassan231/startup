/**
 * heroBadges.js — award / recognition badges shown in the strip
 * that sits half over the hero video and half below it.
 *
 * Shape: [{ id, label, sublabel? }]
 * No image paths needed — badges are rendered as stylised text/icon tiles.
 * Replace with real badge images later by adding an `image` field and
 * rendering <Image> inside the card without touching layout.
 */

export const heroBadges = [
  {
    id: "w3",
    icon: "W³",
    iconStyle: "circle", // renders icon inside a circular border
    label: "Best Tech Websites",
    sublabel: "2026 Silver Winner",
  },
  {
    id: "entrepreneur",
    icon: "★9★",
    iconStyle: "badge",
    label: "Top Marketing Supplier",
    sublabel: "Top Franchise Supplier",
  },
  {
    id: "clutch",
    icon: "Clutch",
    iconStyle: "text",
    label: "#1 Digital Marketing Agency in USA",
    sublabel: "",
  },
  {
    id: "omma",
    icon: "OMMA",
    iconStyle: "badge",
    label: "Best SEO Campaign",
    sublabel: "Online Media Marketing & Advertising",
  },
  {
    id: "netty",
    icon: "</winner>",
    iconStyle: "text",
    label: "Most Innovative AI Marketing Campaign",
    sublabel: "The Netty Awards",
  },
];
