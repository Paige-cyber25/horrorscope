// hooks/useUser.ts (new file)
import { useState, useEffect } from "react";

type UserData = {
  id: string;
  email: string;
  userName: string;
  displayPictureUrl: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed, excluding sensitive ones like passwordHash or accessToken
};

export const useUser = (): UserData | null => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Filter out sensitive data if needed (e.g., accessToken, passwordHash)
        const { accessToken, passwordHash, ...userData } = parsedUser;
        setUser(userData as UserData);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return user;
};