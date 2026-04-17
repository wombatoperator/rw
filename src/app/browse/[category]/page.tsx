import Link from "next/link";
import { notFound } from "next/navigation";
import { getFlatCategory, formatSize } from "@/lib/manifest";
import { getMediaUrl, getThumbnailUrl } from "@/lib/media-url";
import { Play, FileText } from "lucide-react";
import type { MediaFile } from "@/types";

function FileCard({
  file,
  categoryId,
}: {
  file: MediaFile;
  categoryId: string;
}) {
  const url = getMediaUrl(file);

  return (
    <Link
      href={`/browse/${categoryId}/${file.id}`}
      className="neon-card rounded-xl overflow-hidden group"
    >
      <div className="relative aspect-video bg-dmt-darker flex items-center justify-center overflow-hidden">
        {file.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={file.name}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
        )}
        {file.type === "video" && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getThumbnailUrl(file) || ""}
              alt={file.name}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/50 border border-dmt-purple/50 flex items-center justify-center group-hover:border-dmt-purple group-hover:bg-black/70 transition-all backdrop-blur-sm">
                <Play className="w-5 h-5 text-dmt-purple ml-0.5" strokeWidth={2} />
              </div>
            </div>
          </>
        )}
        {file.type === "pdf" && (
          <div className="flex flex-col items-center gap-2">
            <FileText className="w-10 h-10 text-dmt-green/60" strokeWidth={1.5} />
            <span className="text-[10px] text-dmt-green/60" style={{ fontFamily: "var(--font-mono)" }}>
              PDF Document
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`text-[9px] px-2 py-0.5 rounded-full ${
              file.type === "video" ? "badge-video" : file.type === "image" ? "badge-image" : "badge-pdf"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {file.extension.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3
          className="text-xs font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2 mb-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {file.name}
        </h3>
        <div className="flex justify-between items-center text-[10px] text-white/30" style={{ fontFamily: "var(--font-mono)" }}>
          {file.date && <span>{file.date}</span>}
          <span>{formatSize(file.size)}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = getFlatCategory(categoryId);

  if (!category) return notFound();

  const totalSize = category.files.reduce((s, f) => s + f.size, 0);

  return (
    <main className="flex flex-1 flex-col px-6 py-12 max-w-6xl mx-auto w-full">
      <div className="flex flex-wrap gap-2 text-xs text-white/30 mb-8" style={{ fontFamily: "var(--font-mono)" }}>
        <Link href="/" className="hover:text-dmt-purple transition-colors">the void</Link>
        <span>/</span>
        <span className="text-dmt-cyan">{category.name}</span>
      </div>

      <h1
        className="glitch text-xl sm:text-3xl font-bold tracking-wider mb-2 glow-cyan"
        data-text={category.name.toUpperCase()}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {category.name.toUpperCase()}
      </h1>
      <p className="text-white/30 text-sm mb-8" style={{ fontFamily: "var(--font-mono)" }}>
        {category.files.length} artifact{category.files.length !== 1 ? "s" : ""} &middot; {formatSize(totalSize)} of
        interdimensional evidence
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.files.map((file) => (
          <FileCard key={file.id} file={file} categoryId={categoryId} />
        ))}
      </div>

      <p className="text-center text-[10px] text-white/10 mt-16" style={{ fontFamily: "var(--font-mono)" }}>
        &quot;Every file in this folder is 100% real. We think. Probably. Don&apos;t quote us on that.&quot;
      </p>
    </main>
  );
}
