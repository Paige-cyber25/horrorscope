// src/hooks/useUser.ts
import { useState, useEffect } from "react";

type UserData = {
  id: string;
  email: string;
  userName: string;
  displayPictureUrl: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

// The exact shape that comes out of localStorage (you probably store the whole auth response)
interface StoredUser {
  id: string;
  email: string;
  userName: string;
  displayPictureUrl: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  accessToken?: string;      // optional – we don’t want it in the hook result
  passwordHash?: string;     // optional – definitely don’t want this in the hook result
  [key: string]: unknown;    // in case your auth response has extra fields
}

export const useUser = (): UserData | null => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as StoredUser;

      // Explicitly pick only the fields we want to expose
      const {
        id,
        email,
        userName,
        displayPictureUrl,
        isEmailVerified,
        createdAt,
        updatedAt,
      } = parsed;

      setUser({
        id,
        email,
        userName,
        displayPictureUrl,
        isEmailVerified,
        createdAt,
        updatedAt,
      });
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      localStorage.removeItem("user");
    }
  }, []);

  return user;
};