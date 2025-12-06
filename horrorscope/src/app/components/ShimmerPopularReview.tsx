// components/ShimmerPopularReview.tsx
import React from "react";

const ShimmerPopularReview: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
      {/* Poster Placeholder */}
      <div className="relative w-full sm:w-[266px] h-[200px] sm:h-[266px] bg-gray-800 rounded-lg" />

      {/* Content Placeholder */}
      <div className="flex-1 space-y-4">
        {/* Title */}
        <div className="h-7 bg-gray-800 rounded w-4/5" />

        {/* Review text (3 lines) */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded w-11/12" />
          <div className="h-4 bg-gray-800 rounded w-9/12" />
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-800 rounded-full" />
          <div className="h-4 bg-gray-800 rounded w-32" />
        </div>

        {/* Likes + Comments */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-800 rounded" />
            <div className="h-4 bg-gray-800 rounded w-12" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-800 rounded" />
            <div className="h-4 bg-gray-800 rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerPopularReview;