"use client";

import Image from "next/image";
import type { Painting } from "@/types";

interface PaintingStageProps {
  painting: Painting;
  paintingKey: string;
  variant: "desktop" | "mobile";
}

export function PaintingStage({ painting, paintingKey, variant }: PaintingStageProps) {
  if (variant === "mobile") {
    return (
      <div className="absolute inset-0">
        <Image
          key={paintingKey}
          src={painting.src}
          alt={painting.title}
          fill
          priority
          sizes="100vw"
          className="animate-fade-in object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 items-center justify-center px-14 pb-6 xl:px-20">
      <div
        key={paintingKey}
        className="animate-fade-in gallery-artwork-desktop relative overflow-hidden rounded-md"
      >
        <Image
          src={painting.src}
          alt={painting.title}
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 900px"
          className="object-contain"
        />
      </div>

      <p className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 font-body text-[10px] text-muted/70">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
        </svg>
        Click or scroll to zoom
      </p>
    </div>
  );
}
