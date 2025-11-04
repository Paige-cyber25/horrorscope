// components/ShimmerListItem.tsx

import React from "react";

const ShimmerListItem = () => (
  // Apply a base gradient for the shimmer effect
  <div className="flex flex-col gap-2 relative animate-pulse w-full max-w-sm sm:max-w-md">
    {/* Images Placeholder */}
    <div className="flex overflow-x-auto sm:overflow-x-visible">
      <div className="relative w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex-shrink-0 bg-gray-700 mr-2 rounded"></div>
      <div className="relative w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex-shrink-0 bg-gray-700 mr-2 rounded hidden sm:block"></div>
    </div>

    <div className="flex flex-col gap-2 mt-6">
      {/* Title Placeholder */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
      </div>
      
      {/* Total Films Placeholder */}
      <div className="h-3 bg-gray-700 rounded w-1/4"></div>

      {/* Stats Placeholder (Likes/Comments) */}
      <div className="flex items-center gap-4 sm:gap-2">
        <div className="h-3 bg-gray-700 rounded w-1/6"></div>
        <div className="h-3 bg-gray-700 rounded w-1/6"></div>
      </div>

      {/* Reviewer/Published Placeholder */}
      <div className="flex items-center gap-2 mt-2">
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/6"></div>
      </div>
    </div>
  </div>
);

export default ShimmerListItem;