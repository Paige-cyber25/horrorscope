
import React from "react";

const ShimmerListItem: React.FC<{ className?: string }> = ({ className }) => (
  // Apply the base gradient for the shimmer effect and pass custom classes
  <div className={`flex flex-col gap-2 relative animate-pulse w-full ${className}`}>
    
    {/* 1. Image Placeholder (Mimics the w-full h-[225px] sm:h-[366px] of MovieCard) */}
    <div className="relative w-full h-[225px] sm:h-[366px] bg-gray-700 rounded-[6px]">
    </div>

    {/* 2. Movie Info - Title and Star/Review Count */}
    <div className="flex items-center justify-between gap-4">
      {/* Title Placeholder */}
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      
      {/* Star/Review Placeholder */}
      <div className="flex items-center gap-2">
         <div className="h-3 bg-gray-700 rounded w-4"></div> {/* Review Count Text */}
         <div className="w-3 h-3 bg-gray-700 rounded-full"></div> {/* Star Icon */}
         <div className="w-3 h-3 bg-gray-700 rounded-full"></div> {/* Dots Icon */}
      </div>
    </div>
    
    {/* 3. Likes and Comments Placeholder */}
    <div className="flex items-center gap-4">
      {/* Likes */}
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-gray-700 rounded-full"></div> {/* Icon */}
        <div className="h-3 bg-gray-700 rounded w-8"></div> {/* Count */}
      </div>
      
      {/* Comments */}
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 bg-gray-700 rounded-full"></div> {/* Icon */}
        <div className="h-3 bg-gray-700 rounded w-8"></div> {/* Count */}
      </div>
    </div>
  </div>
);

export default ShimmerListItem;