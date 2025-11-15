// ShimmerWatchPartyList.tsx

import React from "react";
import ShimmerWatchPartyCard from "./ShimmerWatchPartyCard";

interface ShimmerWatchPartyListProps {
  count?: number; // Number of shimmer items to render, defaults to 8
}

const ShimmerWatchPartyList: React.FC<ShimmerWatchPartyListProps> = ({
  count = 8,
}) => {
  // Create an array of size 'count' to map over
  const shimmerItems = Array.from({ length: count }, (_, index) => (
    <ShimmerWatchPartyCard key={index} />
  ));

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {shimmerItems}
      </div>
    </div>
  );
};

export default ShimmerWatchPartyList;