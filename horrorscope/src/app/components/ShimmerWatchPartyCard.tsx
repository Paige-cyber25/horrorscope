// ShimmerWatchPartyCard.tsx

import React from "react";

const ShimmerWatchPartyCard: React.FC<{ className?: string }> = ({
  className,
}) => (
  // Apply the base gradient for the shimmer effect and pass custom classes
  <div
    className={`flex flex-col gap-2 relative animate-pulse w-full ${className}`}
  >
    {/* 1. Image Placeholder (Mimics w-full h-[225px] sm:h-[366px]) */}
    <div className="relative w-full h-[225px] sm:h-[366px] bg-gray-700 rounded-[12px]"></div>

    {/* 2. Title & Button Row (Mimics lg:flex-row justify-between items-start) */}
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
      {/* Title Placeholder */}
      <div className="h-4 bg-gray-700 rounded w-3/4 sm:w-1/2"></div>

      {/* Button Placeholder (Mimics the button styling) */}
      <div className="h-7 bg-gray-700 rounded-[8px] px-2 py-1 w-[80px]"></div>
    </div>

    {/* 3. Time/Date Placeholder (Mimics the <p> element) */}
    <div className="h-3 bg-gray-700 rounded w-2/5 sm:w-1/3"></div>

    {/* 4. Participants Placeholder (Mimics the row of avatars) */}
    <div className="flex items-center gap-2">
      {/* 3 Avatar Placeholders */}
      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      {/* "and X others" Placeholder */}
      <div className="h-3 bg-gray-700 rounded w-1/4 sm:w-[100px]"></div>
    </div>

    {/* 5. Host Placeholder (Mimics the final <p> element) */}
    <div className="h-3 bg-gray-700 rounded w-1/3 sm:w-1/4"></div>
  </div>
);

export default ShimmerWatchPartyCard;