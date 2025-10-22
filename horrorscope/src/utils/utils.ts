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

export interface FormData {
  platform: string;
  watchDate: string;
  description: string;
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

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

