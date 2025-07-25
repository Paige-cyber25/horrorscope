// components/Dropdown.tsx
"use client";

import React, { useRef } from "react";
import type { RefObject } from "react";
import Link from "next/link";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface DropdownProps {
    onClose: () => void;
    top: number;
    left: number;
  }

const MovieCardsDropdown = ({ onClose, top, left }: DropdownProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef as RefObject<HTMLElement>, onClose);

  return (
    <div
      ref={modalRef}
      className="absolute w-[160px] bg-white shadow-lg z-[600] rounded-[2px] p-[15px] animate-fadeIn"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div className="flex flex-col gap-[10px] items-start">
        <button className="text-ferry-blue text-sm font-opensans font-normal">
        Review movie
        </button>
        <Link href="/notifications" className="text-ferry-blue text-sm font-opensans font-normal">
        Share
        </Link>
        <Link href="/notifications" className="text-ferry-blue text-sm font-opensans font-normal">
        Add to watchlist
        </Link>
        <Link href="/notifications" className="text-ferry-blue text-sm font-opensans font-normal">
        Add to list
        </Link>
      </div>
    </div>
  );
};

export default MovieCardsDropdown;