"use client";

import Link from "next/link";
import {
  FLOATING_PHOTO_LABELS,
  FLOATING_PHOTO_SLOTS,
} from "@/lib/floating-photos";

/*
 * 6 photos pinned to the far left/right edges of the viewport,
 * outside the centered max-w-6xl (1152px) content column.
 * position: fixed keeps them locked while scrolling.
 * Only rendered on the homepage.
 */

export default function FloatingPhotos() {
  return (
    <div className="floating-photos-container">
      {FLOATING_PHOTO_SLOTS.map((slot, i) => (
        <Link
          key={i}
          href={`/browse/${slot.category}`}
          className="floating-photo"
          style={{
            top: slot.top,
            ...(slot.side === "left"
              ? { left: slot.offset ?? "8vw" }
              : { right: slot.offset ?? "8vw" }),
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
            alt={FLOATING_PHOTO_LABELS[slot.category] || slot.category}
            className="floating-photo-img"
            draggable={false}
          />
          <span className="floating-photo-label">
            {FLOATING_PHOTO_LABELS[slot.category] || slot.category}
          </span>
        </Link>
      ))}
    </div>
  );
}
