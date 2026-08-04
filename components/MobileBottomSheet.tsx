"use client";

import { useState } from "react";
import { EmotionPicker } from "@/components/EmotionPicker";
import { artistName } from "@/data/paintings";
import type { Emotion, Painting } from "@/types";

interface MobileBottomSheetProps {
  painting: Painting;
  selectedEmotion: Emotion | null;
  onSelectEmotion: (emotion: Emotion) => void;
  onContinue: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  dotCount: number;
  activeDot: number;
}

export function MobileBottomSheet({
  painting,
  selectedEmotion,
  onSelectEmotion,
  onContinue,
  isFavorite,
  onToggleFavorite,
  dotCount,
  activeDot,
}: MobileBottomSheetProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="animate-slide-up fixed inset-x-0 bottom-0 z-30 lg:hidden">
      <div className="rounded-t-2xl border-t border-white/10 bg-panel px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gold/40" />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-2xl leading-tight text-cream">
              {painting.title}
            </h2>
            <p className="mt-1 font-body text-xs text-muted">
              {painting.year}
              {painting.medium ? ` • ${painting.medium}` : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label="Toggle favorite"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 ${isFavorite ? "fill-gold text-gold" : "text-gold"}`}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 border-y border-white/5 py-3">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex flex-col items-center gap-1 px-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="font-body text-[10px] text-muted">Artist</span>
            <span className="font-body text-[10px] text-gold">{artistName}</span>
          </button>

          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex flex-col items-center gap-1 px-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-cream/70" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
            <span className="font-body text-[10px] text-muted">Artist&apos;s</span>
            <span className="font-body text-[10px] text-cream/70">Note</span>
          </button>

          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex flex-col items-center gap-1 px-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-cream/70" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 3l1.5 4.5H18l-3.5 2.5 1.5 4.5L12 12l-4 2.5 1.5-4.5L6 7.5h4.5L12 3z" />
            </svg>
            <span className="font-body text-[10px] text-muted">Emotions</span>
          </button>
        </div>

        {expanded && (
          <div className="mt-4 animate-fade-in">
            {painting.artistNote && (
              <p className="mb-4 font-body text-xs leading-relaxed text-cream/70">
                {painting.artistNote}
              </p>
            )}
            <p className="mb-3 font-body text-xs text-cream/80">
              What emotion did this evoke for you?
            </p>
            <EmotionPicker
              selected={selectedEmotion}
              onSelect={onSelectEmotion}
              compact
            />
            <p className="mt-2.5 font-body text-[10px] text-muted/60">
              Your response is private and helps us understand what moves our community.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => (expanded ? onContinue() : setExpanded(true))}
          className={`mt-4 flex w-full items-center justify-between bg-gold-btn px-5 py-3.5 font-body text-sm font-medium text-black transition-colors hover:bg-gold-light ${
            expanded ? "rounded-full justify-center gap-2" : "rounded-xl"
          }`}
        >
          {expanded ? "Continue Journey" : "View Details"}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <div className="mt-3 flex justify-center gap-1.5">
          {Array.from({ length: dotCount }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                i === activeDot ? "bg-gold" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
