"use client";

import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  dmt: "DMT",
  hallucinations: "Hallucinations",
  "interdimensional-travel": "Interdimensional Travel",
};

/*
 * 6 photos pinned to the far left/right edges of the viewport,
 * outside the centered max-w-6xl (1152px) content column.
 * position: fixed keeps them locked while scrolling.
 * Only rendered on the homepage.
 */
const SLOTS = [
  // ── left edge, top → middle → bottom ──
  {
    src: "/photos/img_0015.png",
    category: "dmt",
    side: "left" as const,
    top: "2%",
    size: 212,
    rotate: -4,
    drift: "drift-a",
    duration: 18,
    delay: 0,
  },
  {
    src: "/photos/img_4689.png",
    category: "hallucinations",
    side: "left" as const,
    top: "28%",
    size: 199,
    rotate: 3,
    drift: "drift-b",
    duration: 22,
    delay: 2,
  },
  {
    src: "/photos/img_8886.png",
    category: "interdimensional-travel",
    side: "left" as const,
    top: "62%",
    size: 212,
    rotate: -5,
    drift: "drift-c",
    duration: 20,
    delay: 5,
  },
  // ── right edge, top → middle → bottom ──
  {
    src: "/photos/img_1463.png",
    category: "hallucinations",
    side: "right" as const,
    top: "5%",
    size: 205,
    rotate: 5,
    drift: "drift-d",
    duration: 19,
    delay: 1,
  },
  {
    src: "/photos/img_4666.png",
    category: "dmt",
    side: "right" as const,
    top: "32%",
    size: 219,
    rotate: -3,
    drift: "drift-e",
    duration: 24,
    delay: 3.5,
  },
  {
    src: "/photos/img_9165.png",
    category: "interdimensional-travel",
    side: "right" as const,
    top: "58%",
    size: 199,
    rotate: 4,
    drift: "drift-f",
    duration: 17,
    delay: 6,
  },
];

export default function FloatingPhotos() {
  return (
    <div className="floating-photos-container">
      {SLOTS.map((slot, i) => (
        <Link
          key={i}
          href={`/browse/${slot.category}`}
          className="floating-photo"
          style={{
            top: slot.top,
            ...(slot.side === "left"
              ? { left: "8vw" }
              : { right: "8vw" }),
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
      ))}
    </div>
  );
}
