import Link from "next/link";
import FloatingPhotos from "@/components/FloatingPhotos";
import MobilePhotoGrid from "@/components/MobilePhotoGrid";
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
  Sparkles,
  ChevronDown,
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

  return (
    <div className="relative w-full">
      <FloatingPhotos />
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6">
        {/* Hero */}
        <div className="mb-2 text-center">
          <div className="relative mx-auto mb-3 max-w-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt="WeirdWallace.com"
              className="w-full rounded-2xl border border-dmt-glass-border shadow-2xl shadow-dmt-purple/10"
            />
          </div>

          <MobilePhotoGrid />

          <p
            className="mx-auto mb-2 max-w-2xl px-2 text-sm leading-relaxed text-white sm:text-base"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            The images you see depict statements and beliefs shared by Robert
            Wallace in his Spiritual Realities videos on YouTube. Click the
            images and titles below to hear directly from Robert Wallace himself
            talk about how he has &quot;Traveled to Different Dimensions&quot;
            and seen &quot;Hallucinations of Teletubbie &amp; Lizard-Like
            Beings&quot;. Robert also believes to be a &quot;Reincarnated Black
            Gangbanger&quot; and is haunted by &quot;Bathroom Spirits&quot;.
            These are just a few of the many Wacky &amp; Bizarre Beliefs you
            will hear him talking about. After watching these videos, I&apos;m
            sure you will see Robert Wallace has no business running for any
            public office.
          </p>
        </div>

        {/* See for yourself */}
        <div className="mt-1 mb-2 flex flex-col items-center sm:mt-2">
          <p
            className="mb-2 text-xs uppercase tracking-[0.3em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            See for yourself
          </p>
          <ChevronDown
            className="h-5 w-5 animate-bounce text-dmt-purple"
            strokeWidth={1.5}
          />
        </div>

        {/* Category grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <Icon
                  className={`mb-3 h-8 w-8 ${vibe.color} transition-all group-hover:animate-float`}
                  strokeWidth={1.5}
                />
                <h2
                  className="mb-1 text-base font-bold tracking-wide"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {category.name}
                </h2>
                <p
                  className="mb-4 text-xs italic text-white"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  &quot;{vibe.quip}&quot;
                </p>
                <div
                  className="flex flex-wrap gap-3 text-[10px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {counts.videos > 0 && (
                    <span className="badge-video rounded-full px-2 py-0.5">
                      {counts.videos} video{counts.videos !== 1 ? "s" : ""}
                    </span>
                  )}
                  {counts.images > 0 && (
                    <span className="badge-image rounded-full px-2 py-0.5">
                      {counts.images} image{counts.images !== 1 ? "s" : ""}
                    </span>
                  )}
                  {counts.pdfs > 0 && (
                    <span className="badge-pdf rounded-full px-2 py-0.5">
                      {counts.pdfs} PDF{counts.pdfs !== 1 ? "s" : ""}
                    </span>
                  )}
                  <span className="text-white">{formatSize(catSize)}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Warning footer */}
        <p
          className="mx-auto mt-16 max-w-md text-center text-[10px] text-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          WARNING: Side effects may include interdimensional travel, spontaneous
          enlightenment, and an overwhelming desire for Taco Bell sauce packets.
          Consult your local shaman before proceeding.
        </p>
      </main>
    </div>
  );
}
