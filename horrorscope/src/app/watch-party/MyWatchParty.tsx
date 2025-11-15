
import React, { useState, useMemo } from "react";
import WatchPartyList from "../components/WatchPartyList";
import ShimmerWatchPartyList from "../components/ShimmerWatchPartyList"; // Assuming you have this
import { WatchParty } from "@/utils/utils"; // Import the base type
import { useMyWatchParties } from "@/hooks/useWatchParty";

type Tab = "Public Watch Party" | "Private Watch Party";

// Define the extended type for the transformed data
type FilterableWatchParty = WatchParty & { isPrivate: boolean };

const MyWatchParty = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Public Watch Party");

  // Fetch the data
  const {
    data: myWatchParties,
    isLoading,
    isError,
    error,
  } = useMyWatchParties();

  // Filter the data based on the active tab using useMemo for performance
  const filteredParties = useMemo(() => {
    if (!myWatchParties) return [];

    const parties = myWatchParties as FilterableWatchParty[];

    return parties.filter((party) => {
      if (activeTab === "Public Watch Party") {
        return party.isPrivate === false;
      }
      if (activeTab === "Private Watch Party") {
        return party.isPrivate === true;
      }
      return false;
    });
  }, [myWatchParties, activeTab]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="flex items-center gap-3">
          {/* Render the buttons normally even during loading */}
          <button
            className="py-[10px] px-3 rounded-[24px] text-sm font-opensans text-[#0A0A0A] bg-white font-semibold"
            disabled
          >
            Public Watch Party
          </button>
          <button
            className="py-[10px] px-3 rounded-[24px] text-sm font-opensans border border-[#D0D5DD] text-[#F8F8FF] font-normal"
            disabled
          >
            Private Watch Party
          </button>
        </div>
        <div className="mt-8 pb-[50px] sm:pb-[575px]">
          <ShimmerWatchPartyList count={4} />
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="mt-6 text-red-400">
        Error loading your watch parties: {error.message}
      </div>
    );
  }

  // --- Data State ---
  const displayParties: WatchParty[] = filteredParties.map(p => {
    // Cast back to the original WatchParty type for the component
    const { isPrivate, ...rest } = p;
    return rest as WatchParty;
  });

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <button
          className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "Public Watch Party"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
          onClick={() => handleTabClick("Public Watch Party")}
        >
          Public Watch Party
        </button>
        <button
          className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "Private Watch Party"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
          onClick={() => handleTabClick("Private Watch Party")}
        >
          Private Watch Party
        </button>
      </div>
      <div className="mt-8 pb-[50px] sm:pb-[575px]">
        {displayParties.length > 0 ? (
          <WatchPartyList parties={displayParties} />
        ) : (
          <p className="text-white">
            You currently have no {activeTab.toLowerCase()} scheduled.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyWatchParty;