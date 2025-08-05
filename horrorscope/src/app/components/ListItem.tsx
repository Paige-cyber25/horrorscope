// components/ListItem.tsx (This code is already correct)
"use client";

import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { formatNumber, ListItemProps } from "@/utils/utils";
import PopularListDropdown from "../list/PopularListDropdown";

const ListItem = ({ list }: ListItemProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  
  // These useRef calls are now correctly typed and will work without errors.
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // This line is now valid because the hook accepts different ref types.
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
      <div className="flex overflow-x-auto sm:overflow-x-visible">
        {list.images.map((img, index) => (
          <div
            key={index}
            className="relative w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex-shrink-0"
          >
            <Image
              src={img}
              alt="List Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex justify-between items-center text-[#F8F8FF]">
          <span className="text-sm sm:text-[20px] font-opensans font-semibold">
            {list.title}
          </span>
          <Icon
            icon="mage:dots"
            className="w-3 h-3 cursor-pointer"
            onClick={handleDotsClick}
            ref={dotsRef}
          />
        </div>
        <span className="uppercase text-[#E5E7EB] text-[12px] font-medium font-bevietnampro">
          {list.total} films
        </span>
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="flex items-center gap-1">
            <Icon icon="weui:like-outlined" className="w-3 h-3 text-[#F8F8FF]" />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(list.likes)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="hugeicons:message-02" className="w-3 h-3 text-[#F8F8FF]" />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(list.comments)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/reviews-image.svg"
            width={20}
            height={20}
            alt="Avatar"
            className="rounded-full sm:w-6 sm:h-6"
          />
          <span className="text-gray-200 text-[10px] sm:text-[12px] font-opensans font-medium">
            {list.reviewer}
          </span>
          <div className="text-[#D1D5DB] flex items-center">
            <Icon icon="ph:dot" className="text-3xl" />
            <span className="text-[12px] font-opensans font-normal">
              Published {list.published}
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