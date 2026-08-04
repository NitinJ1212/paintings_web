import type { EmotionRating, SessionSummary } from "@/types";

export interface RatingRepository {
  save(rating: EmotionRating): Promise<void>;
  getByPainting(paintingId: string): Promise<EmotionRating[]>;
  getSessionSummary(sessionId: string): Promise<SessionSummary>;
  toggleFavorite(paintingId: string): Promise<boolean>;
  isFavorite(paintingId: string): Promise<boolean>;
}
