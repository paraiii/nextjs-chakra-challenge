export type UserProfile = { username: string; jobTitle: string };

const KEY = "leo-user";

export const getUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as UserProfile) : null;
};

export const setUser = (u: UserProfile): void => {
  localStorage.setItem(KEY, JSON.stringify(u));
};
