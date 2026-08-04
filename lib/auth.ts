export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

const AUTH_USER_KEY = "art-gallery-user";
const AUTH_USERS_DB_KEY = "art-gallery-registered-users";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
  // Dispatch custom event for real-time auth state updates across components
  window.dispatchEvent(new Event("auth-state-change"));
}

export function getRegisteredUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(AUTH_USERS_DB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function signUp(name: string, email: string): { success: boolean; error?: string; user?: User } {
  const users = getRegisteredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return { success: false, error: "An account with this email already exists." };
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(AUTH_USERS_DB_KEY, JSON.stringify(users));
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function signIn(email: string): { success: boolean; error?: string; user?: User } {
  const users = getRegisteredUsers();
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!found) {
    // Demo mode fallback: If not found, automatically register user for demo convenience
    const demoName = email.split("@")[0].replace(/[^a-zA-Z]/g, " ");
    const formattedName = demoName ? demoName.charAt(0).toUpperCase() + demoName.slice(1) : "Art Patron";
    return signUp(formattedName, email);
  }

  setCurrentUser(found);
  return { success: true, user: found };
}

export function signOut(): void {
  setCurrentUser(null);
}
