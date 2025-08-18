import React, { useEffect, useRef, useState } from "react";
import ListItem from "../components/ListItem";
import CreateNewList from "./CreateNewList";

const popularLists = [
  {
    id: "l1",
    images: [
      "/images/bagman.png",
      "/images/trick-r-treat.png",
      "/images/halloween.png",
      "/images/omen.png",
    ],
    title: "Ayodeji’s Specials",
    likes: 500000,
    comments: 2,
    total: 20,
    reviewer: "Jonathan Fujii",
    published: "6 months ago",
  },
];

const List = () => {
  const [activeTab, setActiveTab] = useState("Public list");
  const newListContainerRef = useRef<HTMLDivElement>(null);
  const newListButtonRef = useRef<HTMLButtonElement>(null);
  const [showNewListDropdown, setShowNewListDropdown] = useState(false);

  useEffect(() => {
    if (showNewListDropdown) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showNewListDropdown]);

  const handleNewListButtonClick = () => {
    setShowNewListDropdown(!showNewListDropdown);
  };

  const handleTabClick = (tab: "Public list" | "Private list") => {
    setActiveTab(tab);
  };

  return (
    <section className="mt-10 sm:mt-[56px]" ref={newListContainerRef}>
      <div className="flex sm:flex-row flex-col gap-4 sm:justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          <button
            className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "Public list"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
            onClick={() => handleTabClick("Public list")}
          >
            Public list
          </button>
          <button
            className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "Private list"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
            onClick={() => handleTabClick("Private list")}
          >
            Private list
          </button>
        </div>

        <div>
          <button
            onClick={handleNewListButtonClick}
            ref={newListButtonRef}
            className="bg-[#F8F8FF] py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-[81px] text-red-900 text-xs sm:text-sm md:text-base font-opensans font-semibold rounded-[24px] cursor-pointer"
          >
            Create a list
          </button>
        </div>

        {showNewListDropdown && (
          <CreateNewList onClose={() => setShowNewListDropdown(false)} />
        )}
      </div>

      <div className="mt-6 sm:mt-[40px]">
        <div className="flex flex-col sm:flex-row sm:justify-between mt-6 sm:mt-[40px] gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            {popularLists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
          <div className="w-full sm:w-auto">
            {popularLists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-[40px] border-t border-t-[rgba(248,248,255,0.2)] pt-10 sm:pt-[40px]">
        <div className="flex flex-col sm:flex-row sm:justify-between mt-8 gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            {popularLists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
          <div className="w-full sm:w-auto">
            {popularLists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-[40px] border-t border-t-[rgba(248,248,255,0.2)] pt-10 sm:pt-[40px] pb-10 sm:pb-[220px]">
        <div className="flex flex-col sm:flex-row sm:justify-between mt-8 gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            {popularLists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default List;
