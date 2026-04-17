import type { MediaFile } from "@/types";

export function getMediaUrl(file: MediaFile): string {
  if (
    process.env.NEXT_PUBLIC_MEDIA_SOURCE === "blob" &&
    file.blobUrl
  ) {
    return file.blobUrl;
  }
  // Encode each path segment separately so slashes stay as real path separators
  const encodedPath = file.localPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/api/media/${encodedPath}`;
}

export function getThumbnailUrl(file: MediaFile): string | null {
  if (file.type !== "video") return null;
  // Match the slug logic from generate-thumbnails.sh:
  // replace / with __, spaces with _, strip .mp4 extension, add .jpg
  const slug = file.localPath
    .replace(/\//g, "__")
    .replace(/ /g, "_")
    .replace(/\.mp4$/i, ".jpg");
  return `/thumbs/${slug}`;
}
