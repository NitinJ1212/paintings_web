const SESSION_KEY = "art-gallery-session-id";

export function getSessionId(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, id);
  return id;
}
