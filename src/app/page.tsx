import Link from "next/link";
import FloatingPhotos from "@/components/FloatingPhotos";
import { getAllCategories, getCategoryFileCount, formatSize } from "@/lib/manifest";
import {
  Smartphone,
  Atom,
  Ghost,
  Rocket,
  Skull,
  Church,
  Flame,
  Globe,
  Wind,
  FileStack,
  Layers,
  HardDrive,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CATEGORY_VIBES: Record<string, { icon: LucideIcon; quip: string; color: string }> = {
  "charlie-kirk-conspiracy-facebook-posts": {
    icon: Smartphone,
    quip: "Facebook was a mistake. Exhibit A.",
    color: "text-blue-400",
  },
  dmt: {
    icon: Atom,
    quip: "The molecule that started it all. Buckle up.",
    color: "text-dmt-purple",
  },
  hallucinations: {
    icon: Ghost,
    quip: "Are the bathroom spirits real? Robert says yes.",
    color: "text-dmt-pink",
  },
  "interdimensional-travel": {
    icon: Rocket,
    quip: "TSA can't stop you when you travel between dimensions.",
    color: "text-dmt-cyan",
  },
  "reincarnation-and-necromancy": {
    icon: Skull,
    quip: "Dead people inside you? Robert has thoughts.",
    color: "text-emerald-400",
  },
  scientology: {
    icon: Church,
    quip: "He worked there, loved it, and then... didn't.",
    color: "text-orange-400",
  },
  "taco-bell-sauce-incident": {
    icon: Flame,
    quip: "The incident. You know the one.",
    color: "text-taco-red",
  },
  "the-world-is-flat": {
    icon: Globe,
    quip: "It's a drop of quicksilver, apparently.",
    color: "text-sky-400",
  },
  breatharianism: {
    icon: Wind,
    quip: "Who needs food when you have... air?",
    color: "text-teal-400",
  },
};

export default function Home() {
  const categories = getAllCategories();
  const totalFiles = categories.reduce((s, c) => s + c.files.length, 0);
  const totalSize = categories.reduce(
    (s, c) => s + c.files.reduce((a, f) => a + f.size, 0),
    0
  );

  return (
    <main className="flex flex-1 flex-col px-6 py-12 max-w-6xl mx-auto w-full">
      <FloatingPhotos />
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="relative max-w-2xl mx-auto mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt="WeirdWallace.com"
            className="w-full rounded-2xl border border-dmt-glass-border shadow-2xl shadow-dmt-purple/10"
          />
        </div>

        <p
          className="text-sm text-white/40 max-w-xl mx-auto mb-2 leading-relaxed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          LD3 State Senate candidate Robert Wallace wants to be the voice of
          normal, everyday Arizonans — but he&apos;s said some very interesting
          things. Things we think everyone should know about.
        </p>

        <div className="flex justify-center gap-8 text-white/20 text-xs mt-6" style={{ fontFamily: "var(--font-mono)" }}>
          <div className="text-center">
            <FileStack className="w-4 h-4 text-dmt-purple mx-auto mb-1" strokeWidth={1.5} />
            <div className="text-dmt-purple text-lg font-bold">{totalFiles}</div>
            <div>artifacts</div>
          </div>
          <div className="text-center">
            <Layers className="w-4 h-4 text-dmt-cyan mx-auto mb-1" strokeWidth={1.5} />
            <div className="text-dmt-cyan text-lg font-bold">{categories.length}</div>
            <div>dimensions</div>
          </div>
          <div className="text-center">
            <HardDrive className="w-4 h-4 text-dmt-pink mx-auto mb-1" strokeWidth={1.5} />
            <div className="text-dmt-pink text-lg font-bold">{formatSize(totalSize)}</div>
            <div>of truth</div>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const vibe = CATEGORY_VIBES[category.id] || {
            icon: Sparkles,
            quip: "A mystery folder. How exciting.",
            color: "text-white/60",
          };
          const Icon = vibe.icon;
          const counts = getCategoryFileCount(category);
          const catSize = category.files.reduce((s, f) => s + f.size, 0);
          const isTaco = category.id === "taco-bell-sauce-incident";

          return (
            <Link
              key={category.id}
              href={`/browse/${category.id}`}
              className={`neon-card rounded-xl p-6 group ${isTaco ? "taco-card" : ""}`}
            >
              <Icon className={`w-8 h-8 mb-3 ${vibe.color} group-hover:animate-float transition-all`} strokeWidth={1.5} />
              <h2
                className="text-base font-bold tracking-wide mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {category.name}
              </h2>
              <p className="text-white/30 text-xs mb-4 italic" style={{ fontFamily: "var(--font-mono)" }}>
                &quot;{vibe.quip}&quot;
              </p>
              <div className="flex flex-wrap gap-3 text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>
                {counts.videos > 0 && (
                  <span className="badge-video px-2 py-0.5 rounded-full">
                    {counts.videos} video{counts.videos !== 1 ? "s" : ""}
                  </span>
                )}
                {counts.images > 0 && (
                  <span className="badge-image px-2 py-0.5 rounded-full">
                    {counts.images} image{counts.images !== 1 ? "s" : ""}
                  </span>
                )}
                {counts.pdfs > 0 && (
                  <span className="badge-pdf px-2 py-0.5 rounded-full">
                    {counts.pdfs} PDF{counts.pdfs !== 1 ? "s" : ""}
                  </span>
                )}
                <span className="text-white/20">{formatSize(catSize)}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Warning footer */}
      <p className="text-center text-[10px] text-white/10 mt-16 max-w-md mx-auto" style={{ fontFamily: "var(--font-mono)" }}>
        WARNING: Side effects may include interdimensional travel, spontaneous
        enlightenment, and an overwhelming desire for Taco Bell sauce packets.
        Consult your local shaman before proceeding.
      </p>
    </main>
  );
}
