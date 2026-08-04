"use client";

import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="gallery-bg flex min-h-dvh flex-col lg:flex-row">
      {/* Back to Home Header for mobile */}
      <div className="flex items-center justify-between p-6 lg:hidden">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-body text-xs tracking-wider text-cream/70 transition-colors hover:text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </Link>
        <span className="font-display text-sm tracking-widest text-gold uppercase">The Atelier</span>
      </div>

      {/* Visual Showcase Side Panel (Desktop) */}
      <div className="relative hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between border-r border-white/10 p-12 overflow-hidden bg-radial from-white/5 to-transparent">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-panel to-black opacity-90 -z-10" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-body text-xs tracking-widest text-cream/70 transition-colors hover:text-gold uppercase"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return to Gallery
          </Link>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/80">Private Collection</span>
        </div>

        {/* Middle Artwork Feature & Quote */}
        <div className="my-auto py-12 max-w-lg mx-auto text-center z-10">
          <div className="relative mx-auto mb-8 w-48 h-64 rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-panel group transition-all duration-700 hover:border-gold/40 hover:shadow-gold/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
            {/* Visual Decorative Frame Pattern */}
            <div className="absolute inset-2 border border-gold/20 rounded-xl z-20 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <span className="block font-display text-2xl text-cream/90 italic">“Art washes away from the soul the dust of everyday life.”</span>
                <span className="block mt-3 font-body text-[11px] tracking-widest text-gold uppercase">— Pablo Picasso</span>
              </div>
            </div>
          </div>

          <h2 className="font-display text-3xl text-cream font-light tracking-wide">
            Immerse Yourself in Fine Art
          </h2>
          <p className="mt-4 font-body text-sm text-muted leading-relaxed max-w-md mx-auto">
            Unlock tailored curations, save your favorite masterpieces, and experience artwork with high-definition emotion and provenance.
          </p>
        </div>

        {/* Bottom Footer Info */}
        <div className="flex items-center justify-between text-[11px] font-body text-muted/60 z-10 border-t border-white/5 pt-6">
          <span>© {new Date().getFullYear()} Art Gallery Atelier</span>
          <span>Curated for Collectors</span>
        </div>
      </div>

      {/* Form Container Side */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Header text */}
          <div className="mb-8 text-center lg:text-left">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Welcome to the Gallery
            </p>
            <h1 className="mt-2 font-display text-3xl font-normal text-cream sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 font-body text-sm text-muted">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="rounded-2xl border border-white/10 bg-panel/80 p-6 sm:p-8 backdrop-blur-md shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
