import React, { useEffect, useRef, useState } from "react";
import ListItem from "../components/ListItem";
import CreateNewList from "./CreateNewList";
import { ListData } from "@/utils/utils";

const popularLists: ListData[] = [
    {
        // 1. Core List Data
        id: "3f625e23-6eb1-4f1d-a440-f1054b428bd3",
        name: "My Favorite Horror Movies", // 🎯 REQUIRED
        description: "A list of classic and modern horror gems.", // 🎯 REQUIRED
        isPublic: true, // 🎯 REQUIRED
        createdAt: "2025-10-01T10:00:00.000Z", // 🎯 REQUIRED
        updatedAt: "2025-10-01T10:00:00.000Z", // 🎯 REQUIRED
        
        // 2. User Data (matches ListUser interface)
        user: { 
            id: "u1", 
            userName: "Jonathan Fujii", 
            displayPictureUrl: "/images/reviews-image.svg" // Use your default image
        }, // 🎯 REQUIRED
        
        // 3. Film Data (matches ListFilm[] interface)
        films: [
            {
                id: "f1",
                title: "The First Degree Burn",
                posterUrl: "https://image.tmdb.org/t/p/w500/1A1soJ8AdidthMgR3s4pSfzThC3.jpg",
                likedCount: 200,
                reviewCount: 15,
                averageRating: "8.50"
            },
            {
                id: "f2",
                title: "Silent Scream",
                posterUrl: "https://image.tmdb.org/t/p/w500/oIOGN22bpebsZF3sJD7neONpKzG.jpg",
                likedCount: 100,
                reviewCount: 5,
                averageRating: "7.00"
            },
            {
                id: "f3",
                title: "The Void",
                posterUrl: "https://image.tmdb.org/t/p/w500/kSnoT0Wn0t1L0sYm1kM8O0Z0sT8.jpg",
                likedCount: 50,
                reviewCount: 2,
                averageRating: "6.80"
            },
        ],
        
        // 4. Calculated/Optional Fields (Optional, but often useful)
        likes: 350, // Sum of film likes
        comments: 22, // Sum of film comments
        total: 3, // films.length
    },
    // ... define your other mock lists here ...
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
