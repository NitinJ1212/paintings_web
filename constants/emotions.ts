import type { Emotion } from "@/types";

export interface EmotionOption {
  id: Emotion;
  label: string;
  color: string;
  border: string;
  selectedBorder: string;
}

export const emotions: EmotionOption[] = [
  {
    id: "peace",
    label: "Peace",
    color: "text-emerald-400",
    border: "border-emerald-500/35",
    selectedBorder: "border-emerald-400",
  },
  {
    id: "wonder",
    label: "Wonder",
    color: "text-sky-400",
    border: "border-sky-500/35",
    selectedBorder: "border-sky-400",
  },
  {
    id: "joy",
    label: "Joy",
    color: "text-amber-400",
    border: "border-amber-500/35",
    selectedBorder: "border-amber-400",
  },
  {
    id: "nostalgia",
    label: "Nostalgia",
    color: "text-rose-400",
    border: "border-rose-500/35",
    selectedBorder: "border-rose-400",
  },
  {
    id: "stillness",
    label: "Stillness",
    color: "text-teal-400",
    border: "border-teal-500/35",
    selectedBorder: "border-teal-400",
  },
  {
    id: "curiosity",
    label: "Curiosity",
    color: "text-violet-400",
    border: "border-violet-500/35",
    selectedBorder: "border-violet-400",
  },
];
