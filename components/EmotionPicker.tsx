"use client";

import { EmotionIcon } from "@/components/EmotionIcon";
import { emotions } from "@/constants/emotions";
import type { Emotion } from "@/types";

interface EmotionPickerProps {
  selected: Emotion | null;
  onSelect: (emotion: Emotion) => void;
  compact?: boolean;
}

export function EmotionPicker({ selected, onSelect, compact = false }: EmotionPickerProps) {
  return (
    <div className={`grid gap-2 ${compact ? "grid-cols-3" : "grid-cols-3"}`}>
      {emotions.map((emotion) => {
        const isSelected = selected === emotion.id;
        return (
          <button
            key={emotion.id}
            type="button"
            onClick={() => onSelect(emotion.id)}
            className={`flex items-center gap-1.5 rounded-full border bg-transparent px-2.5 py-1.5 transition-all ${
              isSelected
                ? `${emotion.selectedBorder} bg-white/5 ${emotion.color}`
                : `${emotion.border} text-cream/75 hover:bg-white/5 ${emotion.color}`
            } ${compact ? "justify-center" : ""}`}
          >
            <EmotionIcon emotion={emotion.id} />
            <span className={`font-body ${compact ? "text-[10px]" : "text-[11px]"}`}>
              {emotion.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
