"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collectionName } from "@/data/paintings";
import { getCurrentUser, signOut, User } from "@/lib/auth";

interface WelcomeHeroProps {
  artistName: string;
  tagline: string;
}

export function WelcomeHero({ artistName, tagline }: WelcomeHeroProps) {
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

  return (
    <main className="gallery-bg relative flex min-h-dvh flex-col justify-between px-6 py-8">
      {/* Top Header Bar */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg tracking-widest text-gold uppercase">Atelier</span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-panel/80 border border-white/10 rounded-full py-1.5 px-4 backdrop-blur-md">
              <div className="h-6 w-6 rounded-full bg-gold-btn flex items-center justify-center text-xs font-semibold text-black">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-body text-xs text-cream/90 hidden sm:inline">{user.name}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="font-body text-[11px] text-muted hover:text-gold transition-colors pl-2 border-l border-white/10"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="font-body text-xs tracking-wider text-cream/80 hover:text-gold transition-colors py-2 px-3"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="font-body text-xs tracking-wider rounded-xl bg-white/10 border border-white/15 px-4 py-2 text-cream hover:bg-gold/20 hover:border-gold/40 transition-all"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="my-auto mx-auto max-w-lg text-center z-10 py-12">
        <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold sm:text-xs">
          {collectionName}
        </p>

        <h1 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
          {artistName}
        </h1>

        <div className="mx-auto mt-6 h-px w-12 bg-gold/30" />

        <p className="mt-6 font-body text-base leading-relaxed text-muted sm:text-lg">
          {tagline}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-btn px-8 py-4 font-body text-sm font-medium text-black transition-colors hover:bg-gold-light sm:text-base shadow-lg shadow-gold/10"
          >
            Begin Journey
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center font-body text-[10px] tracking-wide text-muted/50 z-10">
        One painting at a time · Share what moves you
      </footer>
    </main>
  );
}
