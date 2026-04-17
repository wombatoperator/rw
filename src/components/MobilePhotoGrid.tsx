import Link from "next/link";
import {
  FLOATING_PHOTO_LABELS,
  FLOATING_PHOTO_SLOTS,
} from "@/lib/floating-photos";

export default function MobilePhotoGrid() {
  return (
    <div className="sm:hidden mb-6">
      <div className="grid grid-cols-2 gap-3">
        {FLOATING_PHOTO_SLOTS.map((slot) => (
          <Link
            key={`${slot.category}-${slot.src}`}
            href={`/browse/${slot.category}`}
            className="neon-card overflow-hidden rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slot.src}
              alt={FLOATING_PHOTO_LABELS[slot.category] || slot.category}
              className="h-36 w-full object-cover"
              draggable={false}
            />
            <div
              className="border-t border-white/8 px-3 py-2 text-center text-[10px] uppercase tracking-[0.18em] text-white/65"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {FLOATING_PHOTO_LABELS[slot.category] || slot.category}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
