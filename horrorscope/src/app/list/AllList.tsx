
"use client";

import React from "react";
import ListItem from "../components/ListItem";
import ShimmerListItem from "../components/ShimmerListItem"; // <--- Import Shimmer
import { usePublicLists } from "@/hooks/useAllListHooks";


const AllList = () => {
  const { data: lists, isLoading, isError } = usePublicLists();

  // Filter lists to simulate "Popular" (e.g., top 2) and "Other" lists
  const popularLists = lists ? lists.slice(0, 2) : [];
  const otherLists = lists ? lists.slice(2) : [];
  
  // Render Shimmer effect while loading
  const renderShimmer = () => (
    <div className="flex flex-col sm:flex-row sm:justify-between mt-6 sm:mt-[40px] gap-4 sm:gap-0">
        {/* Map twice for the two-column layout */}
        {Array(2).fill(0).map((_, i) => (
            <div key={`shimmer-popular-${i}`} className="w-full sm:w-auto">
                <ShimmerListItem />
            </div>
        ))}
    </div>
  );

  // Render actual lists
  const renderLists = (listArray: typeof lists) => (
    <div className="flex flex-col sm:flex-row sm:justify-between mt-6 sm:mt-[40px] gap-4 sm:gap-0">
        {/* Use the first two for the first column (assuming 2 columns max) */}
        <div className="w-full sm:w-auto">
            {listArray?.slice(0, Math.ceil(listArray?.length / 2)).map((list) => (
                <ListItem key={list.id} list={list} />
            ))}
        </div>
        {/* Use the rest for the second column */}
        <div className="w-full sm:w-auto">
            {listArray?.slice(Math.ceil(listArray?.length / 2)).map((list) => (
                <ListItem key={list.id} list={list} />
            ))}
        </div>
    </div>
  );


  if (isError) {
    return <div className="text-red-500 mt-6">Failed to load public lists.</div>;
  }
  
  return (
    <div className="mt-6 sm:mt-[40px]">
      {/* --- Popular Lists --- */}
      <h1 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
        Popular list this week
      </h1>
      
      {isLoading ? renderShimmer() : renderLists(popularLists)}

      {/* --- Other Lists --- */}
      {otherLists.length > 0 && (
        <div className="mt-8 sm:mt-[80px] pb-8 sm:pb-[150px]">
          <h2 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
            Other lists
          </h2>
          {isLoading ? renderShimmer() : renderLists(otherLists)}
        </div>
      )}
      
      {!isLoading && lists && lists.length === 0 && (
          <p className="text-gray-400 mt-6">No public lists found.</p>
      )}

    </div>
  );
};

export default AllList;