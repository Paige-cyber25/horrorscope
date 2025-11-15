
import React from "react";
import WatchPartyList from "../components/WatchPartyList";
import ShimmerWatchPartyList from "../components/ShimmerWatchPartyList";
import { WatchParty } from "@/utils/utils";
import { useUpcomingWatchParties } from "@/hooks/useAllWatchParties";

const AllWatchParty = () => {
  const {
    data: upcomingWatchParties,
    isLoading,
    isError,
    error,
  } = useUpcomingWatchParties();

  const title = (
    <h1 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
      Popular watch this week
    </h1>
  );

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="mt-6">
        {title}
        <div className="mt-4 pb-[50px] sm:pb-[116px]">
          <div className="flex flex-col gap-6">
            {/* Display enough shimmers to fill a few rows, e.g., 8 items */}
            <ShimmerWatchPartyList count={8} /> 
          </div>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="mt-6">
        {title}
        <div className="mt-4 pb-[50px] sm:pb-[116px] text-red-400">
          Error fetching watch parties: {error.message}
        </div>
      </div>
    );
  }

  // --- Data State ---
  const parties: WatchParty[] = upcomingWatchParties || [];

  return (
    <div className="mt-6">
      {title}
      <div className="mt-4 pb-[50px] sm:pb-[116px]">
        <div className="flex flex-col gap-6">
          {parties.length === 0 ? (
            <p className="text-white">No upcoming watch parties found.</p>
          ) : (
            // Pass the entire array to a single WatchPartyList
            <WatchPartyList parties={parties} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllWatchParty;