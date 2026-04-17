"use client";

import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  dmt: "DMT",
  hallucinations: "Hallucinations",
  "interdimensional-travel": "Interdimensional Travel",
};

/*
 * 6 photos pinned in the left/right viewport gutters (outside the
 * centered max-w-6xl content column). position: fixed keeps them
 * locked to the viewport while the page scrolls. They only render
 * on the homepage — browse pages are unaffected.
 *
 * Left/right positioning uses calc() so photos always sit in the
 * gutter: calc((100vw - 1152px) / 2) is the gutter width on each
 * side. We center each photo within that gutter.
 */
const SLOTS = [
  // ── left gutter, top → middle → bottom ──
  {
    src: "/photos/img_0015.png",
    category: "dmt",
    side: "left" as const,
    top: "3%",
    size: 240,
    rotate: -4,
    drift: "drift-a",
    duration: 18,
    delay: 0,
  },
  {
    src: "/photos/img_4689.png",
    category: "hallucinations",
    side: "left" as const,
    top: "37%",
    size: 220,
    rotate: 3,
    drift: "drift-b",
    duration: 22,
    delay: 2,
  },
  {
    src: "/photos/img_8886.png",
    category: "interdimensional-travel",
    side: "left" as const,
    top: "70%",
    size: 240,
    rotate: -5,
    drift: "drift-c",
    duration: 20,
    delay: 5,
  },
  // ── right gutter, top → middle → bottom ──
  {
    src: "/photos/img_1463.png",
    category: "hallucinations",
    side: "right" as const,
    top: "6%",
    size: 230,
    rotate: 5,
    drift: "drift-d",
    duration: 19,
    delay: 1,
  },
  {
    src: "/photos/img_4666.png",
    category: "dmt",
    side: "right" as const,
    top: "42%",
    size: 250,
    rotate: -3,
    drift: "drift-e",
    duration: 24,
    delay: 3.5,
  },
  {
    src: "/photos/img_9165.png",
    category: "interdimensional-travel",
    side: "right" as const,
    top: "74%",
    size: 230,
    rotate: 4,
    drift: "drift-f",
    duration: 17,
    delay: 6,
  },
];

export default function FloatingPhotos() {
  return (
    <div className="floating-photos-container">
      {SLOTS.map((slot, i) => {
        // Center each photo in its gutter:
        // gutter = (100vw - 1152px) / 2
        // center = gutter/2 - photoWidth/2 = (100vw - 1152px)/4 - size/2
        const posStyle =
          slot.side === "left"
            ? { left: `calc((100vw - 1152px) / 4 - ${slot.size / 2}px)` }
            : { right: `calc((100vw - 1152px) / 4 - ${slot.size / 2}px)` };

        return (
          <Link
            key={i}
            href={`/browse/${slot.category}`}
            className="floating-photo"
            style={{
              top: slot.top,
              ...posStyle,
              width: `${slot.size}px`,
              transform: `rotate(${slot.rotate}deg)`,
              animationName: slot.drift,
              animationDuration: `${slot.duration}s`,
              animationDelay: `${slot.delay}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slot.src}
              alt={CATEGORY_LABELS[slot.category] || slot.category}
              className="floating-photo-img"
              draggable={false}
            />
            <span className="floating-photo-label">
              {CATEGORY_LABELS[slot.category] || slot.category}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
