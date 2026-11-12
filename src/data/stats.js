/**
 * stats.js — content for the StatsCounter section.
 *
 * Shape of each item:
 * {
 *   id:     string  — unique React key
 *   value:  number  — final count-up target
 *   suffix: string  — appended after the number (e.g. "+" or "%")
 *   label:  string  — descriptor shown below the number
 * }
 *
 * To load from a CMS later: export async getStats() returning
 * the same shape — no component changes needed.
 */

export const stats = [
  { id: "projects",    value: 50,  suffix: "+", label: "Projects Delivered"  },
  { id: "clients",     value: 30,  suffix: "+", label: "Happy Clients"       },
  { id: "experience",  value: 3,   suffix: "+", label: "Years of Experience" },
  { id: "services",    value: 5,   suffix: "",  label: "Core Services"       },
];
