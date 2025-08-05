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
    reviewer: string;
    published: string;
  };
}

export interface ReviewDropdownProps {
  onClose: () => void;
}

export interface FormData {
  platform: string;
  watchDate: string;
  description: string;
}