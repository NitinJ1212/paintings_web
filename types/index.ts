export type Emotion =
  | "peace"
  | "wonder"
  | "joy"
  | "nostalgia"
  | "stillness"
  | "curiosity";

export interface Painting {
  id: string;
  title: string;
  src: string;
  year: number;
  medium?: string;
  artistNote?: string;
}

export interface EmotionRating {
  paintingId: string;
  emotion: Emotion;
  sessionId: string;
  createdAt: string;
}

export interface SessionSummary {
  sessionId: string;
  totalViewed: number;
  totalRated: number;
  ratings: EmotionRating[];
}
