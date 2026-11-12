/**
 * navHelpers.js — utilities that read data/nav.js.
 * Pure functions, no side-effects, safe to call in Server Components.
 */

import { navServices, navLinks } from "@/data/nav";

/**
 * Find a top-level category by its slug.
 * Returns the category object or undefined.
 */
export function findCategory(slug) {
  return navServices.categories.find((c) => c.slug === slug);
}

/**
 * Find a subcategory child inside a given category slug.
 * Returns the child object or undefined.
 */
export function findSubcategory(categorySlug, subSlug) {
  const cat = findCategory(categorySlug);
  if (!cat) return undefined;
  return cat.children.find((c) => c.slug === subSlug);
}

/**
 * Returns every {category, slug} pair for generateStaticParams on the
 * /services/[category]/[slug] route.
 */
export function getAllServicePaths() {
  const paths = [];
  for (const cat of navServices.categories) {
    for (const child of cat.children) {
      paths.push({ category: cat.slug, slug: child.slug });
    }
  }
  return paths;
}

/**
 * Returns every {category} slug for generateStaticParams on the
 * /services/[category] route.
 */
export function getAllCategoryPaths() {
  return navServices.categories.map((c) => ({ category: c.slug }));
}

/**
 * Convert a URL slug to a human-readable label.
 * "about-us"  →  "About Us"
 * "our-work"  →  "Our Work"
 * First checks navLinks for an exact href match, then falls back
 * to capitalising each word.
 */
export function humanize(slug) {
  // Check navLinks first (href is "/slug")
  const link = navLinks.find((l) => l.href === `/${slug}`);
  if (link) return link.label;

  // Fallback: capitalise each word
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
