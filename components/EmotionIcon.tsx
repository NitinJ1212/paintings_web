import type { Emotion } from "@/types";

interface EmotionIconProps {
  emotion: Emotion;
  className?: string;
}

export function EmotionIcon({ emotion, className = "h-3.5 w-3.5" }: EmotionIconProps) {
  switch (emotion) {
    case "peace":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 3c-1 4-4 6-4 10a4 4 0 008 0c0-4-3-6-4-10z" />
          <path d="M12 13v8" />
        </svg>
      );
    case "wonder":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 3l1.2 3.6L17 8l-3.8 1.4L12 13l-1.2-3.6L7 8l3.8-1.4L12 3z" />
          <path d="M5 16l.8 2.4L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.6L5 16z" />
        </svg>
      );
    case "joy":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case "nostalgia":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "stillness":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M4 8h16M4 12h16M4 16h10" />
        </svg>
      );
    case "curiosity":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
  }
}
