export const formatNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1).replace(".0", "")}M`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1).replace(".0", "")}K`;
    }
    return num.toString();
};

// Helper function to generate time options every 30 minutes
export const generateTimeOptions = (): SelectOption[] => {
  const options: SelectOption[] = [];
  
  // Iterate through all 24 hours (0 to 23)
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      // Create a Date object for formatting, using a dummy date
      const date = new Date(2000, 0, 1, h, m);
      
      // Format time as 'H:MM AM/PM' (e.g., 1:30 AM, 12:00 PM, 8:00 PM)
      // We use narrow hour representation ('numeric') to match "8:00 PM" instead of "08:00 PM"
      const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric', // Use 'numeric' for 1-12 hour format without leading zero (e.g., 8 instead of 08)
        minute: '2-digit',
        hour12: true
      });
      
      // Use the 12-hour formatted string for both label and value
      options.push({ value: timeString, label: timeString });
    }
  }
  
  return options;
};

// Helper function to find the currently selected SelectOption object based on its value (used for Controller/SearchableSelect)
export const findOptionByValue = (options: SelectOption[] | undefined, value: string | undefined): SelectOption | undefined => {
  if (!options || !value) return undefined;
  return options.find(opt => opt.value === value);
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
   streamingPlatform: string;
   scheduledAt: string;
   description: string;
   filmId: string;
   time: string;
   participants: SelectOption[]; // Array of selected user options (for react-hook-form)
}

export interface WatchPartyPayload {
    filmId: string;
    description: string;
    scheduledAt: string;
    time: string; // This needs to match the format expected by the BE (e.g., "8:00 PM")
    streamingPlatform: string;
    isPrivate: boolean; // Derived from the component's state
    participants: string[]; // Array of User IDs
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

export interface ApiMovie {
  id: string;
  title: string;
  posterUrl: string; // Used for image
  releaseDate: string; // Used to get the year
  averageRating: string; // Used for the "reviews" display in your card
  ratingCount: number; // The number of people who rated it (can be used for 'reviews' or combined with reviewCount)
  likedCount: number; // Used for 'likes'
  reviewCount: number; // The actual number of written reviews (can be used for 'comments')
  // ... other fields (overview, backdropUrl, etc.)
}

// components/types.ts (or use the Movie interface you provided)
export interface ComponentMovie {
  id: string;
  imageSrc: string;
  title: string;
  reviews: number; // Mapped from averageRating or ratingCount/reviewCount
  likes: number;
  comments: number;
}

export interface MovieApiResponse {
  success: boolean;
  message: string;
  data: {
    movies: ApiMovie[];
    total: number;
    totalPages: number;
  };
}


// utils/utils or types.ts (Update this file with the new types)

// Existing types (for context, assuming they are defined elsewhere)
// type SelectOption = { value: string; label: string; };
// type ErrorResponse = { message: string };
// type MovieApiResponse = { success: boolean; data: { movies: Array<{ id: string; title: string; ... }> } };

// New types for Watch Party data
export interface WatchPartyParticipant {
  id: string;
  email: string;
  userName: string;
  displayPictureUrl: string | null;
}

export interface WatchPartyHost {
  id: string;
  email: string;
  userName: string;
  displayPictureUrl: string | null;
  // Other host details...
}

export interface WatchPartyFilm {
  id: string;
  title: string;
  posterUrl: string;
  // Other film details...
}

export interface WatchPartyApiItem {
  id: string;
  description: string;
  scheduledAt: string; // "2025-12-25T00:00:00.000Z"
  time: string; // "20:00:00"
  streamingPlatform: string;
  isPrivate: boolean;
  hostId: string;
  filmId: string;
  host: WatchPartyHost;
  film: WatchPartyFilm;
  participants: WatchPartyParticipant[]; // The participants array from the API
}

export interface WatchPartiesApiResponse {
  success: boolean;
  message: string;
  data: WatchPartyApiItem[];
}

// Your existing WatchParty interface (the one used in components)
export interface WatchParty {
  id: string;
  imageSrc: string;
  title: string;
  time: string;
  date: string;
  participants: string[]; // Array of participant names or initials
  host: string; // Host's name
  isPrivate?: boolean;
}

export const refreshToken = async () => {
  localStorage.clear();
  window.location.href = "/auth/login"; // This redirects the user
};

export interface UserApiItem {
  id: string;
  email: string;
  userName: string;
  displayPictureUrl: string | null;
  // ... other user fields you don't need for the select
}

export interface AllUsersApiResponse {
  success: boolean;
  message: string;
  data: {
    data: UserApiItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}


export interface WatchPartyHost {
    id: string;
    email: string;
    userName: string;
    displayPictureUrl: string | null;
    isEmailVerified: boolean;
}

export interface WatchPartyFilm {
    id: string;
    title: string;
    originalTitle: string;
    overview: string;
    releaseDate: string; // "YYYY-MM-DD"
    runtime: number | null;
    posterUrl: string ;
    backdropUrl: string | null;
    averageRating: string;
}

export interface WatchPartyParticipant {
    id: string;
    email: string;
    userName: string;
}

export interface WatchPartyData {
    id: string;
    description: string;
    scheduledAt: string; // ISO Date string (e.g., "2025-12-25T00:00:00.000Z")
    time: string; // Time string (e.g., "20:00:00")
    streamingPlatform: string;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
    hostId: string;
    filmId: string;
    host: WatchPartyHost;
    film: WatchPartyFilm;
    participants: WatchPartyParticipant[];
}

// --- Main API Response Interface ---

export interface WatchPartyApiResponse {
    success: boolean;
    message: string;
    data: WatchPartyData;
}

// types/review.ts or inside the hook file
export interface PopularReview {
  id: string;
  title: string;
  imageSrc: string; // poster URL
  likes: number;
  comments: number;
  reviewer: string;
  reviewText?: string;
  // add more if needed: reviewText, filmId, etc.
}
