"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getFlatCategory, getFlatFile, formatSize } from "@/lib/manifest";
import { getMediaUrl } from "@/lib/media-url";
import { CircleOff } from "lucide-react";

export default function FileViewerPage() {
  const params = useParams<{ category: string; fileId: string }>();

  const category = getFlatCategory(params.category);
  const file = getFlatFile(params.category, params.fileId);

  if (!category || !file) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <CircleOff className="w-16 h-16 text-dmt-purple/50 mx-auto mb-4" strokeWidth={1} />
          <h1 className="text-2xl font-bold glow-purple mb-2" style={{ fontFamily: "var(--font-display)" }}>
            LOST IN THE VOID
          </h1>
          <p className="text-white text-sm" style={{ fontFamily: "var(--font-mono)" }}>
            This artifact has slipped between dimensions.
          </p>
          <Link href="/" className="inline-block mt-6 text-dmt-purple text-sm hover:underline" style={{ fontFamily: "var(--font-mono)" }}>
            &larr; Return to known reality
          </Link>
        </div>
      </main>
    );
  }

  const url = getMediaUrl(file);
  const fileIndex = category.files.findIndex((f) => f.id === file.id);
  const prevFile = fileIndex > 0 ? category.files[fileIndex - 1] : null;
  const nextFile = fileIndex < category.files.length - 1 ? category.files[fileIndex + 1] : null;

  return (
    <main className="flex flex-1 flex-col px-4 sm:px-6 py-6 sm:py-12 max-w-6xl mx-auto w-full">
      <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white mb-6 sm:mb-8" style={{ fontFamily: "var(--font-mono)" }}>
        <Link href="/" className="hover:text-dmt-purple transition-colors">the void</Link>
        <span>/</span>
        <Link href={`/browse/${params.category}`} className="hover:text-dmt-purple transition-colors">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-dmt-pink truncate max-w-[120px] sm:max-w-[200px]">{file.name}</span>
      </div>

      <h1 className="text-base sm:text-2xl font-bold tracking-wide mb-1 glow-pink" style={{ fontFamily: "var(--font-display)" }}>
        {file.name}
      </h1>
      <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs text-white mb-6 sm:mb-8" style={{ fontFamily: "var(--font-mono)" }}>
        <span className={`px-2 py-0.5 rounded-full ${file.type === "video" ? "badge-video" : file.type === "image" ? "badge-image" : "badge-pdf"}`}>
          {file.extension.toUpperCase()}
        </span>
        <span>{formatSize(file.size)}</span>
        {file.date && <span>{file.date}</span>}
        <span className="text-white hidden sm:inline">{file.filename}</span>
      </div>

      <div className="neon-card rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
        {file.type === "video" && (
          <video
            controls
            playsInline
            className="w-full max-h-[50vh] sm:max-h-[70vh] bg-black"
            preload="metadata"
          >
            <source src={url} type="video/mp4" />
            Your browser doesn&apos;t support interdimensional video playback.
          </video>
        )}
        {file.type === "image" && (
          <div className="flex items-center justify-center bg-dmt-darker p-2 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={file.name} className="max-w-full max-h-[50vh] sm:max-h-[70vh] object-contain rounded-lg" />
          </div>
        )}
        {file.type === "pdf" && (
          <iframe src={url} className="w-full h-[50vh] sm:h-[70vh]" title={file.name} />
        )}
      </div>

      <div className="flex justify-between items-start gap-4" style={{ fontFamily: "var(--font-mono)" }}>
        {prevFile ? (
          <Link href={`/browse/${params.category}/${prevFile.id}`} className="text-[10px] sm:text-xs text-white hover:text-dmt-purple active:text-dmt-purple transition-colors min-h-[44px] flex items-center">
            &larr; {prevFile.name.slice(0, 20)}{prevFile.name.length > 20 ? "..." : ""}
          </Link>
        ) : <div />}
        {nextFile ? (
          <Link href={`/browse/${params.category}/${nextFile.id}`} className="text-[10px] sm:text-xs text-white hover:text-dmt-cyan active:text-dmt-cyan transition-colors text-right min-h-[44px] flex items-center">
            {nextFile.name.slice(0, 20)}{nextFile.name.length > 20 ? "..." : ""} &rarr;
          </Link>
        ) : <div />}
      </div>

    </main>
  );
}
