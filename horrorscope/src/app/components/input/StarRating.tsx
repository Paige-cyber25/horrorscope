"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface StarRatingProps {
  label: string;
  name: string;
  value: number; // The current rating value (1-5)
  onChange: (value: number) => void; // Function to update the rating value
  customClass?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  label,
  value,
  onChange,
  name,
  customClass = "",
}) => {
  const [hover, setHover] = useState(0); // State for hover effect

  return (
    <div className={`flex flex-col gap-2 ${customClass}`}>
      <label htmlFor={name} className="text-sm text-[#121212] font-opensans font-semibold">
        {label}
      </label>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={ratingValue}>
              <input
                type="radio"
                name={name}
                value={ratingValue}
                onClick={() => onChange(ratingValue)}
                className="hidden" // Hide the default radio button
              />
              <Icon
                icon="ic:baseline-star" // Use a filled star icon
                width={64}
                height={59}
                className={`cursor-pointer transition-colors duration-200 ${
                  ratingValue <= (hover || value) // Determine color based on hover or selected value
                    ? "text-[#FFC107]" // Gold color for selected/hovered stars
                    : "text-[#121212]" // Grey for unselected stars
                }`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
      {/* Optional: Display the selected rating number */}
      {value > 0 && (
        <span className="text-sm text-gray-600 mt-1">
          {value} out of 5 stars
        </span>
      )}
    </div>
  );
};

export default StarRating;