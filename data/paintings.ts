import type { Painting } from "@/types";

export const collectionName = "WHISPERING WOODS";
export const artistName = "Ananya Sharma";
export const artistTagline = "Step inside. Let the colors find you.";

export const paintings: Painting[] = [
  {
    id: "p1",
    title: "Sunlit Trunk",
    src: "/paintings/IMG_0110.jpg",
    year: 2025,
    medium: "Watercolor on paper",
    artistNote:
      "A study in texture and light — the rough bark catching the morning sun while leaves drift lazily above.",
  },
  {
    id: "p2",
    title: "Dappled Street",
    src: "/paintings/IMG_0111.jpg",
    year: 2025,
    medium: "Watercolor on paper",
    artistNote:
      "Painted on a quiet afternoon when shadows stretched long across the road and the world felt perfectly still.",
  },
  {
    id: "p3",
    title: "Courtyard Afternoon",
    src: "/paintings/IMG_0112.jpg",
    year: 2025,
    medium: "Watercolor on paper",
    artistNote:
      "The warmth of old walls and climbing vines — a memory of afternoons spent in sun-drenched courtyards.",
  },
  {
    id: "p4",
    title: "Under the Canopy",
    src: "/paintings/IMG_0113.jpg",
    year: 2025,
    medium: "Watercolor on paper",
    artistNote:
      "People resting in shade beneath ancient trees — a fleeting moment of everyday life caught in watercolor.",
  },
  {
    id: "p5",
    title: "Afternoon Shade",
    src: "/paintings/IMG_0114.jpg",
    year: 2025,
    medium: "Watercolor on paper",
    artistNote:
      "Painted on a quiet afternoon when the banyan tree cast its generous shade over a forgotten corner of the parking lot.",
  },
  {
    id: "p6",
    title: "The Garden Gate",
    src: "/paintings/IMG_0115.jpg",
    year: 2025,
    medium: "Watercolor on paper",
    artistNote:
      "An open gate, two figures standing in golden light — the threshold between the known and the imagined.",
  },
];

export function getPaintingById(id: string): Painting | undefined {
  return paintings.find((p) => p.id === id);
}

export function getPaintingIndex(id: string): number {
  return paintings.findIndex((p) => p.id === id);
}
