"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut, User } from "@/lib/auth";

interface GalleryHeaderProps {
  collectionName: string;
  viewedCount: number;
  totalCount: number;
  onClose: () => void;
  onToggleInfo: () => void;
  showInfo: boolean;
  onShowShortcuts?: () => void;
  variant: "desktop" | "mobile";
}

export function GalleryHeader({
  collectionName,
  viewedCount,
  totalCount,
  onClose,
  onToggleInfo,
  showInfo,
  onShowShortcuts,
  variant,
}: GalleryHeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    const handleAuthChange = () => setUser(getCurrentUser());
    window.addEventListener("auth-state-change", handleAuthChange);
    return () => window.removeEventListener("auth-state-change", handleAuthChange);
  }, []);

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  if (variant === "mobile") {
    return (
      <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4">
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-10 w-10 items-center justify-center text-cream/80"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 py-1 px-3 backdrop-blur-md">
                <span className="font-body text-xs text-cream/90">{user.name.split(" ")[0]}</span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="font-body text-[10px] text-muted hover:text-gold"
                >
                  Exit
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="rounded-lg border border-white/10 bg-black/50 px-3 py-1 font-body text-xs text-gold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        <div className="mt-1 px-1">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold">
            {collectionName}
          </p>
          <p className="mt-0.5 font-body text-sm text-cream/90">
            Artwork {viewedCount} of {totalCount}
          </p>
        </div>
      </header>
    );
  }

  return (
    <header className="shrink-0 border-b border-white/5 px-6 py-4 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onClose}
            className="group flex flex-col items-center gap-1 text-cream/60 transition-colors hover:text-cream"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span className="font-body text-[10px]">Close</span>
          </button>

          <div className="border-l border-white/10 pl-5">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold">
              {collectionName}
            </p>
            <p className="mt-0.5 font-body text-sm text-cream/80">
              Artwork {viewedCount} of {totalCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {onShowShortcuts && (
            <button
              type="button"
              onClick={onShowShortcuts}
              className="flex items-center gap-2 font-body text-xs text-cream/60 transition-colors hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
              </svg>
              Shortcuts
            </button>
          )}

          <button
            type="button"
            onClick={onToggleInfo}
            className="flex items-center gap-2 font-body text-xs text-cream/60 transition-colors hover:text-cream"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            {showInfo ? "Hide Info" : "Show Info"}
          </button>

          <div className="border-l border-white/10 pl-4">
            {user ? (
              <div className="flex items-center gap-2.5">
                <div className="h-6 w-6 rounded-full bg-gold-btn flex items-center justify-center text-xs font-semibold text-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-body text-xs text-cream/90">{user.name}</span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="font-body text-xs text-muted hover:text-gold transition-colors ml-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="font-body text-xs text-gold hover:text-gold-light transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
