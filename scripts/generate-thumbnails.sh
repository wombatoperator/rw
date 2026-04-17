#!/bin/bash
# Generate thumbnail images from all MP4 videos in rw_full/
# Captures a frame at 3 seconds into each video

MEDIA_ROOT="$(cd "$(dirname "$0")/.." && pwd)/rw_full"
THUMB_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/thumbs"

mkdir -p "$THUMB_DIR"

find "$MEDIA_ROOT" -type f -iname "*.mp4" | while read -r video; do
  # Build a slug from the relative path
  rel="${video#$MEDIA_ROOT/}"
  # Create a safe filename: replace / and spaces
  slug=$(echo "$rel" | sed 's|/|__|g' | sed 's/ /_/g' | sed 's/\.mp4$/.jpg/i')

  out="$THUMB_DIR/$slug"

  if [ -f "$out" ]; then
    echo "SKIP $slug (exists)"
    continue
  fi

  echo "THUMB $slug"
  ffmpeg -y -ss 3 -i "$video" -frames:v 1 -vf "scale=640:-2" -q:v 4 "$out" 2>/dev/null

  # If seeking to 3s failed (video shorter than 3s), try 0s
  if [ ! -f "$out" ] || [ ! -s "$out" ]; then
    ffmpeg -y -ss 0 -i "$video" -frames:v 1 -vf "scale=640:-2" -q:v 4 "$out" 2>/dev/null
  fi
done

echo ""
echo "Done! $(ls "$THUMB_DIR" | wc -l | tr -d ' ') thumbnails generated."
