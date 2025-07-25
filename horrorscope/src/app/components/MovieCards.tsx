// components/MovieCard.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import MovieCardsDropdown from "./MovieCardDropdown";
import { formatNumber } from "@/utils/utils";

interface MovieCardProps {
  imageSrc: string;
  title: string;
  reviews: number;
  likes: number;
  comments: number;
}

const MovieCard = ({
  imageSrc,
  title,
  reviews,
  likes,
  comments,
}: MovieCardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setShowDropdown(false));

  // Calculate dropdown position when dots are clicked
  const handleDotsClick = () => {
    if (dotsRef.current && cardRef.current) {
      const rect = dotsRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      // Position dropdown below dots icon, relative to card
      setDropdownPosition({
        top: rect.bottom - cardRect.top + 5, // 5px gap below dots, relative to card
        left: rect.right - cardRect.left - 160, // Align dropdown's right edge with dots' right edge
      });
    }
    setShowDropdown(!showDropdown);
  };

  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  return (
    <div className="flex flex-col gap-2 relative" ref={cardRef}>
      {/* Movie Image */}
      <div className="relative w-full h-[225px] sm:h-[366px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full h-full"
        />
      </div>
      {/* Movie Info */}
      <div className="flex items-center justify-between gap-4 font-opensans text-[#F8F8FF]">
        <span className="text-sm sm:text-base font-medium">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-gray-200">
            {reviews}
          </span>
          <Icon icon="material-symbols:star" className="w-3 h-3" />
          <Icon
            icon="mage:dots"
            className="w-3 h-3 cursor-pointer"
            onClick={handleDotsClick}
            ref={dotsRef}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Icon icon="weui:like-outlined" className="w-3 h-3 text-[#F8F8FF]" />
          <span className="text-[12px] font-medium text-gray-200">
            {formatNumber(likes)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Icon
            icon="hugeicons:message-02"
            className="w-3 h-3 text-[#F8F8FF]"
          />
          <span className="text-[12px] font-medium text-gray-200">
            {formatNumber(comments)}
          </span>
        </div>
      </div>

      {showDropdown && (
        <div ref={dropdownRef}>
          <MovieCardsDropdown
            onClose={() => setShowDropdown(false)}
            top={dropdownPosition.top}
            left={dropdownPosition.left}
          />
        </div>
      )}
    </div>
  );
};

export default MovieCard;