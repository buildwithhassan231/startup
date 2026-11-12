// Replace with real client reviews before launch

import { Star } from "lucide-react";

const DEFAULT_REVIEWS = {
  rating: 5.0,
  label: "Rated 5.0 by our clients",
  sub: "Trusted by growing businesses",
};

export default function HeroReviews({ reviews = DEFAULT_REVIEWS }) {
  return (
    <div className="flex items-center gap-3 border-t pt-4 mt-4" style={{ borderColor: "#E2E8F0" }}>
      {/* Five filled amber stars */}
      <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={15}
            className="fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Text */}
      <div className="leading-tight">
        <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>
          {reviews.label}
        </span>
        <span className="ml-2 text-xs" style={{ color: "#475569" }}>{reviews.sub}</span>
      </div>
    </div>
  );
}
