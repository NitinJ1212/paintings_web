"use client";

interface PaintingNavProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  prevLabel?: string;
  nextLabel?: string;
  variant: "desktop" | "mobile";
}

export function PaintingNav({
  onPrev,
  onNext,
  canPrev,
  prevLabel,
  nextLabel,
  variant,
}: PaintingNavProps) {
  if (variant === "mobile") {
    const btnClass =
      "flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-black/30 text-gold backdrop-blur-sm transition-colors hover:border-gold/70 hover:bg-black/50";

    return (
      <>
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous painting"
          className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 ${btnClass} ${
            !canPrev ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next painting"
          className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 ${btnClass}`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous painting"
        className={`group absolute left-6 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-1.5 xl:left-10 ${
          !canPrev ? "pointer-events-none opacity-30" : ""
        }`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-cream/70 transition-colors group-hover:border-gold/40 group-hover:text-gold">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
        {prevLabel && (
          <span className="font-body text-[10px] text-muted">{prevLabel}</span>
        )}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next painting"
        className="group absolute right-6 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-1.5 xl:right-10"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-cream/70 transition-colors group-hover:border-gold/40 group-hover:text-gold">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
        {nextLabel && (
          <span className="font-body text-[10px] text-muted">{nextLabel}</span>
        )}
      </button>
    </>
  );
}
