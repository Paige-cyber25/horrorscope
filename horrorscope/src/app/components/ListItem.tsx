// components/ListItem.tsx

"use client";

import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { capitalizeFirstLetter, formatNumber, ListData } from "@/utils/utils"; 
import PopularListDropdown from "../list/PopularListDropdown";

const ListItem = ({ list }: { list: ListData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // --- DATA DERIVATION ---
  
  // 1. Get up to 4 films with poster URLs
  const filmsToDisplay = list.films
    .filter(f => f.posterUrl)
    .slice(0, 4);

  const title = list.name;
  const total = list.films.length;
  const reviewer = list.user.userName;
  const publishedDate = list.createdAt;

  // 2. Aggregate counts from ALL films in the list
  const totalLikes = list.films.reduce((sum, film) => sum + film.likedCount, 0);
  const totalComments = list.films.reduce((sum, film) => sum + film.reviewCount, 0);
  
  // Simple published date formatter
  const published = publishedDate ? new Date(publishedDate).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
  }) : 'N/A';
  // -------------------------

  useOnClickOutside(dropdownRef, () => setShowDropdown(false), dotsRef);

  const handleDotsClick = () => {
    if (dotsRef.current && cardRef.current) {
      const rect = dotsRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom - cardRect.top + 5, 
        left: rect.right - cardRect.left - 160, 
      });
    }
    setShowDropdown(!showDropdown);
  };

  return (
    <div key={list.id} className="flex flex-col gap-2 relative" ref={cardRef}>
      
      {/* --- Film Images Display --- */}
      <div className="flex overflow-x-auto sm:overflow-x-visible">
        {/* Only maps the available films (1 to 4) and stops */}
        {filmsToDisplay.map((film) => (
          <div
            key={film.id}
            className="relative w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex-shrink-0 mr-2 rounded-lg overflow-hidden" 
          >
            <Image
              src={film.posterUrl!}
              alt={`${film.title} poster`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
        {/* Removed: Fill remaining slots with placeholder divs up to 4 */}
      </div>
      
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex justify-between items-center text-[#F8F8FF]">
          <span className="text-sm sm:text-[20px] font-opensans font-semibold">
            {title}
          </span>
          <Icon
            icon="mage:dots"
            className="w-3 h-3 cursor-pointer"
            onClick={handleDotsClick}
            ref={dotsRef}
          />
        </div>
        <span className="uppercase text-[#E5E7EB] text-[12px] font-medium font-bevietnampro">
          {total} films
        </span>
        
        {/* --- Stats (Likes & Comments) --- */}
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="flex items-center gap-1">
            <Icon icon="weui:like-outlined" className="w-3 h-3 text-[#F8F8FF]" />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(totalLikes)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="hugeicons:message-02" className="w-3 h-3 text-[#F8F8FF]" />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(totalComments)}
            </span>
          </div>
        </div>
        
        {/* --- Reviewer and Published Date --- */}
        <div className="flex items-center gap-2">
          {/* Use the user's displayPictureUrl if available, otherwise use a default */}
          <Image
            src={list.user.displayPictureUrl || "/images/reviews-image.svg"} 
            width={20}
            height={20}
            alt={`${reviewer} avatar`}
            className="rounded-full sm:w-6 sm:h-6 object-cover"
          />
          <span className="text-gray-200 text-[10px] sm:text-[12px] font-opensans font-medium">
            {capitalizeFirstLetter(reviewer)}
          </span>
          <div className="text-[#D1D5DB] flex items-center">
            <Icon icon="ph:dot" className="text-3xl" />
            <span className="text-[12px] font-opensans font-normal">
              Published {published}
            </span>
          </div>
        </div>
      </div>
      
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <PopularListDropdown onClose={() => setShowDropdown(false)} />
        </div>
      )}
    </div>
  );
};

export default ListItem;