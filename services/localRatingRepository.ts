import type { EmotionRating, SessionSummary } from "@/types";
import type { RatingRepository } from "./ratingRepository";

const RATINGS_KEY = "art-gallery-ratings";
const FAVORITES_KEY = "art-gallery-favorites";

function readAll(): EmotionRating[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RATINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EmotionRating[];
  } catch {
    return [];
  }
}

function writeAll(ratings: EmotionRating[]): void {
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export class LocalRatingRepository implements RatingRepository {
  async save(rating: EmotionRating): Promise<void> {
    const all = readAll();
    all.push(rating);
    writeAll(all);
  }

  async getByPainting(paintingId: string): Promise<EmotionRating[]> {
    return readAll().filter((r) => r.paintingId === paintingId);
  }

  async getSessionSummary(sessionId: string): Promise<SessionSummary> {
    const ratings = readAll().filter((r) => r.sessionId === sessionId);
    const uniquePaintings = new Set(ratings.map((r) => r.paintingId));
    return {
      sessionId,
      totalViewed: uniquePaintings.size,
      totalRated: ratings.length,
      ratings,
    };
  }

  async toggleFavorite(paintingId: string): Promise<boolean> {
    const favorites = readFavorites();
    const exists = favorites.includes(paintingId);
    const next = exists
      ? favorites.filter((id) => id !== paintingId)
      : [...favorites, paintingId];
    writeFavorites(next);
    return !exists;
  }

  async isFavorite(paintingId: string): Promise<boolean> {
    return readFavorites().includes(paintingId);
  }
}

export const localRatingRepository = new LocalRatingRepository();
