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
  offset?: string;
};

export const FLOATING_PHOTO_LABELS: Record<string, string> = {
  dmt: "DMT",
  hallucinations: "Hallucinations",
  "interdimensional-travel": "Interdimensional Travel",
  "reincarnation-and-necromancy": "Reincarnation",
  scientology: "Scientology",
  "the-world-is-flat": "The World Is Flat",
  "taco-bell-sauce-incident": "Taco Bell Sauce Incident",
};

export const FLOATING_PHOTO_SLOTS: FloatingPhotoSlot[] = [
  // Top left — Robert on DMT w/ teletubbies
  {
    src: "/photos/img_0015.png",
    category: "dmt",
    side: "left",
    top: "2vh",
    size: 212,
    rotate: -4,
    drift: "drift-a",
    duration: 18,
    delay: 0,
  },
  // Top right — gangbanger teletubbie tattoos
  {
    src: "/photos/img_7536.jpeg",
    category: "reincarnation-and-necromancy",
    side: "right",
    top: "5vh",
    size: 205,
    rotate: 5,
    drift: "drift-d",
    duration: 19,
    delay: 1,
  },
  // Middle left — bathroom spirits
  {
    src: "/photos/img_8462.jpeg",
    category: "hallucinations",
    side: "left",
    top: "28vh",
    size: 199,
    rotate: 3,
    drift: "drift-b",
    duration: 22,
    delay: 2,
  },
  // Middle right — Breaking Bad DMT synthesis
  {
    src: "/photos/img_2867.jpeg",
    category: "dmt",
    side: "right",
    top: "32vh",
    size: 219,
    rotate: -3,
    drift: "drift-e",
    duration: 24,
    delay: 3.5,
  },
  // Bottom left — psychedelic teletubbie/lizard forest
  {
    src: "/photos/img_1463.png",
    category: "hallucinations",
    side: "left",
    top: "62vh",
    size: 212,
    rotate: -5,
    drift: "drift-c",
    duration: 20,
    delay: 5,
  },
  // Bottom right — Church of Scientology
  {
    src: "/photos/img_6254.jpeg",
    category: "scientology",
    side: "right",
    top: "58vh",
    size: 199,
    rotate: 4,
    drift: "drift-f",
    duration: 17,
    delay: 6,
  },
  // Extra — flat earth, left of tile grid
  {
    src: "/photos/img_0349.jpeg",
    category: "the-world-is-flat",
    side: "left",
    top: "82vh",
    size: 150,
    rotate: -3,
    drift: "drift-a",
    duration: 21,
    delay: 2.5,
    offset: "2vw",
  },
  // Extra — Taco Bell sauce, right of tile grid
  {
    src: "/photos/img_7449.jpeg",
    category: "taco-bell-sauce-incident",
    side: "right",
    top: "88vh",
    size: 150,
    rotate: 4,
    drift: "drift-e",
    duration: 23,
    delay: 4,
    offset: "2vw",
  },
];
