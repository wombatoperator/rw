export type FloatingPhotoSlot = {
  src: string;
  category: string;
  side: "left" | "right";
  top: string;
  size: number;
  rotate: number;
  drift: string;
  duration: number;
  delay: number;
};

export const FLOATING_PHOTO_LABELS: Record<string, string> = {
  dmt: "DMT",
  hallucinations: "Hallucinations",
  "interdimensional-travel": "Interdimensional Travel",
};

export const FLOATING_PHOTO_SLOTS: FloatingPhotoSlot[] = [
  {
    src: "/photos/img_0015.png",
    category: "dmt",
    side: "left",
    top: "2%",
    size: 212,
    rotate: -4,
    drift: "drift-a",
    duration: 18,
    delay: 0,
  },
  {
    src: "/photos/img_1463.png",
    category: "hallucinations",
    side: "right",
    top: "5%",
    size: 205,
    rotate: 5,
    drift: "drift-d",
    duration: 19,
    delay: 1,
  },
  {
    src: "/photos/img_4689.png",
    category: "hallucinations",
    side: "left",
    top: "28%",
    size: 199,
    rotate: 3,
    drift: "drift-b",
    duration: 22,
    delay: 2,
  },
  {
    src: "/photos/img_4666.png",
    category: "dmt",
    side: "right",
    top: "32%",
    size: 219,
    rotate: -3,
    drift: "drift-e",
    duration: 24,
    delay: 3.5,
  },
  {
    src: "/photos/img_8886.png",
    category: "interdimensional-travel",
    side: "left",
    top: "62%",
    size: 212,
    rotate: -5,
    drift: "drift-c",
    duration: 20,
    delay: 5,
  },
  {
    src: "/photos/img_9165.png",
    category: "interdimensional-travel",
    side: "right",
    top: "58%",
    size: 199,
    rotate: 4,
    drift: "drift-f",
    duration: 17,
    delay: 6,
  },
];
