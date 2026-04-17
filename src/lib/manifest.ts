import manifestData from "@/data/manifest.json";
import type { Manifest, Category, MediaFile } from "@/types";

const manifest = manifestData as Manifest;

/**
 * Merges categories across all collections.
 * Duplicates (e.g. "Hallucinations" in RW2 and RW3) get their files combined.
 */
export function getAllCategories(): Category[] {
  const merged = new Map<string, Category>();

  for (const collection of manifest.collections) {
    for (const category of collection.categories) {
      const existing = merged.get(category.id);
      if (existing) {
        existing.files = [...existing.files, ...category.files];
      } else {
        merged.set(category.id, { ...category, files: [...category.files] });
      }
    }
  }

  const CATEGORY_ORDER = [
    "interdimensional-travel",
    "dmt",
    "hallucinations",
    "scientology",
    "reincarnation-and-necromancy",
    "charlie-kirk-conspiracy-facebook-posts",
    "taco-bell-sauce-incident",
    "the-world-is-flat",
    "breatharianism",
  ];

  const categories = Array.from(merged.values());
  categories.sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.id);
    const bi = CATEGORY_ORDER.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return categories;
}

export function getFlatCategory(categoryId: string): Category | undefined {
  return getAllCategories().find((c) => c.id === categoryId);
}

export function getFlatFile(
  categoryId: string,
  fileId: string
): MediaFile | undefined {
  const category = getFlatCategory(categoryId);
  return category?.files.find((f) => f.id === fileId);
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function getCategoryFileCount(category: Category): {
  videos: number;
  images: number;
  pdfs: number;
} {
  return {
    videos: category.files.filter((f) => f.type === "video").length,
    images: category.files.filter((f) => f.type === "image").length,
    pdfs: category.files.filter((f) => f.type === "pdf").length,
  };
}
