export const formatNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1).replace(".0", "")}M`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1).replace(".0", "")}K`;
    }
    return num.toString();
};

export interface DropdownProps {
  onClose: () => void;
  top?: number;
  left?: number;
}

export interface ListItemProps {
  list: {
    id: string;
    images: string[];
    title: string;
    likes: number;
    comments: number;
    total: number;
    reviewer?: string;
    published?: string;
  };
}

export interface SelectOption {
  value: string; // The ID
  label: string; // The Title
}

export interface Movie {
  id: string;
  title: string;
}

// The complete form data structure
export interface FormData {
  filmId: string; // This holds the movie ID selected from SearchableSelect
  rating: number; 
  reviewText: string;
  streamingPlatform: string;
}

export interface CreatePartyFormData {
   platform: string;
   watchDate: string;
   description: string;
}

// The payload sent to the /reviews API
export interface ReviewPayload {
  filmId: string;
  rating: number;
  reviewText: string;
  streamingPlatform: string;
}

// Define the type for a movie object for type safety
export interface IMovie {
  id: string;
  imageSrc: string;
  title: string;
  reviews: number;
  likes: number;
  comments: number;
  year: string;
}

// Define the props for the BrowseOption component
export interface BrowseOptionProps {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

// Define the tab names as a union type
export type TabName = "Films" | "Activity" | "Reviews" | "Watchlist" | "List" | "Watch party";

// Define the type for tabCounts
export interface TabCounts {
  Films: number;
  Activity: number;
  Reviews: number;
  Watchlist: number;
  List: number;
  "Watch party": number;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginData = {
  id: string;
  email: string;
  passwordHash: string;
  userName: string;
  displayPictureUrl: string | null;
  isEmailVerified: boolean;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: LoginData;
};

export type SignupPayload = {
  userName: string;
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type SignupData = {
  id: string;
  email: string;
  passwordHash: string;
  userName: string;
  displayPictureUrl: string | null;
  isEmailVerified: boolean;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
};

export interface ErrorResponse {
  message: string;
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export interface Option { 
  value: string;
  label: string;
  metaData?: unknown;
}

export interface ListFormData {
  name: string;
  description: string;
  filmId: string; 
  isPublic: string; 
}

// utils/utils.ts (Update or add these interfaces)

// Type for the film object within a list
export interface ListFilm {
  id: string;
  title: string;
  posterUrl: string | null;
  likedCount: number;
  reviewCount: number;
  averageRating: string;
  // ... other film properties you might use
}

// Type for the user object within a list
export interface ListUser {
  id: string;
  userName: string;
  displayPictureUrl: string | null;
}

// Type for the main list object
export interface ListData {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  films: ListFilm[];
  user: ListUser;
  likes?: number;
  comments?: number;
  total?: number; // Total films, can be films.length
}

export interface MyListData {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  films: ListFilm[];
}

