"use client";

import React, { useEffect, useRef, useState } from "react";
import ReviewMovie from "../components/ReviewMovie";
import AllWatchParty from "./AllWatchParty";
import MyWatchParty from "./MyWatchParty";

const Page = () => {
  const watchPartyContainerRef = useRef<HTMLDivElement>(null);
  const watchPartyButtonRef = useRef<HTMLButtonElement>(null);
  const [showWatchPartyDropdown, setShowWatchPartyDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("All watch party");

  useEffect(() => {
    if (showWatchPartyDropdown) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showWatchPartyDropdown]);

  const handleWatchPartyButtonClick = () => {
    setShowWatchPartyDropdown(!showWatchPartyDropdown);
  };

  const handleTabClick = (tab: "All watch party" | "My watch party") => {
    setActiveTab(tab);
  };

  return (
    <section className="header h-full w-full pt-8 sm:pt-[120px]">
      <div
        className="flex flex-col justify-center items-center mb-[24px] sm:mb-[60px]"
        ref={watchPartyContainerRef}
      >
        <span className="text-white text-[18px] sm:text-[24px] font-opensans font-semibold text-center">
          A spooky virtual watch party where Horrorscope fans come together to
          stream horror <br /> films, react in real time, and connect over their
          shared love of all things eerie and <br /> unsettling.
        </span>
        <div className="flex justify-center items-center mt-4 sm:mt-8 mb-8 sm:mb-[60px]">
          <button
            onClick={handleWatchPartyButtonClick}
            ref={watchPartyButtonRef}
            className="bg-[#F8F8FF] py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-[81px] text-red-900 text-xs sm:text-sm md:text-base font-opensans font-semibold rounded-[24px] cursor-pointer"
          >
            Create a watch party
          </button>
        </div>
      </div>

      {showWatchPartyDropdown && (
        <ReviewMovie onClose={() => setShowWatchPartyDropdown(false)} />
      )}

      <div className="mt-[30px] sm:mt-[88px] mx-4 sm:mx-[97px]">
        <div className="flex space-x-4 border-b border-[rgba(255,255,255,0.1)]">
          <button
            className={`py-2 px-4 text-xs sm:text-sm font-semibold cursor-pointer ${
              activeTab === "All watch party"
                ? "border-b-1 border-[#F8F8FF] text-[#F8F8FF]"
                : "border-b-1 border-transparent text-gray-700"
            }`}
            onClick={() => handleTabClick("All watch party")}
          >
            All watch party
          </button>
          <button
            className={`py-2 px-4 text-xs sm:text-sm font-semibold cursor-pointer ${
              activeTab === "My watch party"
                ? "border-b-1 border-[#F8F8FF] text-[#F8F8FF]"
                : "border-b-1 border-transparent text-gray-700"
            }`}
            onClick={() => handleTabClick("My watch party")}
          >
            My Watch party
          </button>
        </div>

        {activeTab === "All watch party" && <AllWatchParty />}
        {activeTab === "My watch party" && <MyWatchParty />}
      </div>
    </section>
  );
};

export default Page;
