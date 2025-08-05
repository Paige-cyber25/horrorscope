"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CreateNewList from "../components/CreateNewList";
import AllList from "./AllList";

const ListPage = () => {
  const router = useRouter();
  const listContainerRef = useRef<HTMLDivElement>(null);
  const listButtonRef = useRef<HTMLButtonElement>(null);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("All list");

  useEffect(() => {
    if (showListDropdown) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showListDropdown]);

  const handleListButtonClick = () => {
    setShowListDropdown(!showListDropdown);
  };

  const handleTabClick = (tab: "All list" | "My list") => {
    if (tab === "My list") {
      router.push("/list/my");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <section className="header h-full w-full pt-8 sm:pt-[120px]">
      <div className="flex flex-col justify-center items-center" ref={listContainerRef}>
        <span className="text-white text-[24px] sm:text-[36px] font-opensans font-extrabold text-center">
          Group your favorite horror films into custom Lists—<br />
          <span className="font-semibold">
            from bone-chilling classics to new nightmare fuel.
          </span>
        </span>
        <div className="flex justify-center items-center mt-4 sm:mt-8 mb-8 sm:mb-[60px]">
          <button
            onClick={handleListButtonClick}
            ref={listButtonRef}
            className="bg-[#F8F8FF] py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-[81px] text-red-900 text-xs sm:text-sm md:text-base font-opensans font-semibold rounded-[24px] cursor-pointer"
          >
            Start your own list
          </button>
        </div>
      </div>

      {showListDropdown && (
        <CreateNewList onClose={() => setShowListDropdown(false)} />
      )}

      <div className="mt-6 sm:mt-[40px] mx-4 sm:mx-[97px]">
        <div className="flex space-x-4 border-b border-[rgba(255,255,255,0.1)]">
          <button
            className={`py-2 px-4 text-xs sm:text-sm font-semibold ${
              activeTab === "All list"
                ? "border-b-1 border-[#F8F8FF] text-[#F8F8FF]"
                : "border-b-1 border-transparent text-gray-700"
            }`}
            onClick={() => handleTabClick("All list")}
          >
            All list
          </button>
          <button
            className={`py-2 px-4 text-xs sm:text-sm font-semibold ${
              activeTab === "My list"
                ? "border-b-1 border-[#F8F8FF] text-[#F8F8FF]"
                : "border-b-1 border-transparent text-gray-700"
            }`}
            onClick={() => handleTabClick("My list")}
          >
            My list
          </button>
        </div>

        {activeTab === "All list" && <AllList />}
      </div>
    </section>
  );
};

export default ListPage;