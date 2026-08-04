"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DesktopInfoPanel } from "@/components/DesktopInfoPanel";
import { GalleryHeader } from "@/components/GalleryHeader";
import { MobileBottomSheet } from "@/components/MobileBottomSheet";
import { PaintingNav } from "@/components/PaintingNav";
import { PaintingStage } from "@/components/PaintingStage";
import { ShortcutsModal } from "@/components/ShortcutsModal";
import {
  collectionName,
  getPaintingById,
  getPaintingIndex,
  paintings,
} from "@/data/paintings";
import { getSessionId } from "@/lib/session";
import { PaintingQueue } from "@/lib/shuffleQueue";
import { localRatingRepository } from "@/services/localRatingRepository";
import type { Emotion, Painting } from "@/types";

function catalogNumber(id: string): number {
  return getPaintingIndex(id) + 1;
}

export function GalleryExperience() {
  const router = useRouter();
  const queue = useMemo(
    () => new PaintingQueue(paintings.map((p) => p.id)),
    [],
  );

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [paintingKey, setPaintingKey] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const advancingRef = useRef(false);

  const painting: Painting | undefined = currentId
    ? getPaintingById(currentId)
    : undefined;

  useEffect(() => {
    setCurrentId(queue.next());
  }, [queue]);

  useEffect(() => {
    if (!currentId) return;
    localRatingRepository.isFavorite(currentId).then(setIsFavorite);
    setSelectedEmotion(null);
    advancingRef.current = false;
  }, [currentId]);

  const advance = useCallback(() => {
    if (advancingRef.current || !currentId) return;
    advancingRef.current = true;

    const nextId = queue.next();
    setHistory((h) => [...h, currentId]);
    setCurrentId(nextId);
    setPaintingKey((k) => k + 1);
  }, [queue, currentId]);

  const goBack = useCallback(() => {
    if (history.length === 0) return;
    const prevId = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prevId);
    setPaintingKey((k) => k + 1);
  }, [history]);

  const handleEmotionSelect = useCallback(async (emotion: Emotion) => {
    if (!painting) return;
    setSelectedEmotion(emotion);
    await localRatingRepository.save({
      paintingId: painting.id,
      emotion,
      sessionId: getSessionId(),
      createdAt: new Date().toISOString(),
    });
  }, [painting]);

  const handleContinue = useCallback(() => {
    advance();
  }, [advance]);

  const handleSkip = useCallback(() => {
    advance();
  }, [advance]);

  const handleToggleFavorite = useCallback(async () => {
    if (!currentId) return;
    const fav = await localRatingRepository.toggleFavorite(currentId);
    setIsFavorite(fav);
  }, [currentId]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.push("/");
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleSkip();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, handleSkip, goBack]);

  useEffect(() => {
    if (!currentId) return;
    const nextPainting = getPaintingById(queue.peek());
    if (nextPainting) {
      const img = new window.Image();
      img.src = nextPainting.src;
    }
  }, [currentId, queue]);

  if (!painting || !currentId) {
    return (
      <div className="gallery-bg flex h-dvh items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gold/20" />
      </div>
    );
  }

  const currentNumber = catalogNumber(currentId);
  const prevLabel =
    history.length > 0
      ? `Previous (${catalogNumber(history[history.length - 1])}/${queue.total})`
      : undefined;
  const nextLabel = `Next (${catalogNumber(queue.peek())}/${queue.total})`;

  return (
    <div className="gallery-bg flex h-dvh flex-col overflow-hidden">
      {/* <ShortcutsModal
        open={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      /> */}

      {/* Desktop layout */}
      {/* <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        <GalleryHeader
          variant="desktop"
          collectionName={collectionName}
          viewedCount={currentNumber}
          totalCount={queue.total}
          onClose={() => router.push("/")}
          onToggleInfo={() => setShowInfo((v) => !v)}
          showInfo={showInfo}
          onShowShortcuts={() => setShowShortcuts(true)}
        />

        <div className="flex min-h-0 flex-1">
          <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
            <PaintingStage
              painting={painting}
              paintingKey={String(paintingKey)}
              variant="desktop"
            />
            <PaintingNav
              variant="desktop"
              onPrev={goBack}
              onNext={handleSkip}
              canPrev={history.length > 0}
              prevLabel={prevLabel}
              nextLabel={nextLabel}
            />
          </div>

          <DesktopInfoPanel
            painting={painting}
            selectedEmotion={selectedEmotion}
            onSelectEmotion={handleEmotionSelect}
            onContinue={handleContinue}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            visible={showInfo}
          />
        </div>
      </div> */}

      {/* Mobile layout */}
      {/* <div className="relative min-h-0 flex-1 lg:hidden">
        <PaintingStage
          painting={painting}
          paintingKey={String(paintingKey)}
          variant="mobile"
        />

        <GalleryHeader
          variant="mobile"
          collectionName={collectionName}
          viewedCount={currentNumber}
          totalCount={queue.total}
          onClose={() => router.push("/")}
          onToggleInfo={() => {}}
          showInfo
        />

        <PaintingNav
          variant="mobile"
          onPrev={goBack}
          onNext={handleSkip}
          canPrev={history.length > 0}
        />

        <div className="absolute inset-x-0 bottom-[13.5rem] z-20 flex flex-col items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 font-body text-[10px] text-cream/80 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            Tap to zoom
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: queue.total }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === currentNumber - 1 ? "bg-gold" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        <MobileBottomSheet
          painting={painting}
          selectedEmotion={selectedEmotion}
          onSelectEmotion={handleEmotionSelect}
          onContinue={handleContinue}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          dotCount={queue.total}
          activeDot={currentNumber - 1}
        />
      </div> */}
    </div>
  );
}
