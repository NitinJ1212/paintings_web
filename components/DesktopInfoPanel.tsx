"use client";

import { EmotionPicker } from "@/components/EmotionPicker";
import { artistName } from "@/data/paintings";
import type { Emotion, Painting } from "@/types";

interface DesktopInfoPanelProps {
  painting: Painting;
  selectedEmotion: Emotion | null;
  onSelectEmotion: (emotion: Emotion) => void;
  onContinue: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  visible: boolean;
}

export function DesktopInfoPanel({
  painting,
  selectedEmotion,
  onSelectEmotion,
  onContinue,
  isFavorite,
  onToggleFavorite,
  visible,
}: DesktopInfoPanelProps) {
  if (!visible) return null;

  return (
    <aside className="hidden min-h-0 w-[var(--gallery-sidebar-width)] shrink-0 items-center justify-center border-l border-white/5 lg:flex">
      <div className="flex w-full max-w-[19rem] flex-col px-6 py-4 xl:px-8">
        <h2 className="font-display text-[1.75rem] leading-tight text-cream xl:text-3xl">
          {painting.title}
        </h2>
        <p className="mt-1.5 font-body text-xs text-muted">
          {painting.year}
          {painting.medium ? ` • ${painting.medium}` : ""}
        </p>

        <div className="mt-5 border-t border-white/5 pt-4">
          <p className="font-body text-xs text-gold">Artist</p>
          <p className="mt-0.5 font-body text-sm text-cream">{artistName}</p>
        </div>

        {painting.artistNote && (
          <div className="mt-4 border-t border-white/5 pt-4">
            <p className="font-body text-xs text-gold">Artist&apos;s Note</p>
            <p className="mt-1.5 font-body text-xs leading-relaxed text-cream/65">
              {painting.artistNote}
            </p>
          </div>
        )}

        <div className="mt-4 border-t border-white/5 pt-4">
          <p className="font-body text-xs text-cream/85">
            What emotion did this evoke for you?
          </p>
          <div className="mt-3">
            <EmotionPicker selected={selectedEmotion} onSelect={onSelectEmotion} />
          </div>
          <p className="mt-2.5 font-body text-[10px] leading-relaxed text-muted/60">
            Your response is private and helps us understand what moves our community.
          </p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gold-btn py-3 font-body text-sm font-medium text-black transition-colors hover:bg-gold-light"
        >
          Continue Journey
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onToggleFavorite}
          className="mt-4 flex items-center justify-center gap-1.5 font-body text-[11px] text-muted transition-colors hover:text-gold"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-3.5 w-3.5 ${isFavorite ? "fill-gold text-gold" : "fill-none"}`}
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {isFavorite ? "Added to Favorites" : "Add to Favorites"}
        </button>
      </div>
    </aside>
  );
}
