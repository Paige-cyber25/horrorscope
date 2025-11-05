// components/Dropdown.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import Link from "next/link";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { DropdownProps } from "@/utils/utils";
import ReviewMovie from "./ReviewMovie";
import CreateNewList from "./CreateNewList";



const MovieCardsDropdown = ({ onClose, top, left }: DropdownProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showReviewMovieModal, setShowReviewMovieModal] = useState(false);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const handleReviewMovieClick = () => {
    setShowReviewMovieModal(true); 
  };
    const handleListButtonClick = () => {
    setShowListDropdown(!showListDropdown);
  };
  useOnClickOutside(modalRef as RefObject<HTMLElement>, onClose);

   useEffect(() => {
      if (showReviewMovieModal || showListDropdown) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
      // Cleanup on unmount or when modal closes
      return () => {
        document.body.classList.remove("modal-open");
      };
    }, [showReviewMovieModal, showListDropdown]);

  return (
    <div
      ref={modalRef}
      className="absolute w-[160px] bg-white shadow-lg z-[600] rounded-[2px] p-[15px] animate-fadeIn"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div className="flex flex-col gap-[10px] items-start">
        <button onClick={handleReviewMovieClick} className="text-ferry-blue text-sm font-opensans font-normal cursor-pointer">
        Review movie
        </button>
        <Link href="" className="text-ferry-blue text-sm font-opensans font-normal">
        Share
        </Link>
        <Link href="/notifications" className="text-ferry-blue text-sm font-opensans font-normal">
        Add to watchlist
        </Link>
        <button onClick={handleListButtonClick} className="text-ferry-blue text-sm font-opensans font-normal cursor-pointer">
        Add to list
        </button>
      </div>
        {showReviewMovieModal && (
        <ReviewMovie onClose={() => setShowReviewMovieModal(false)} />
      )}
       {showListDropdown && (
        <CreateNewList onClose={() => setShowListDropdown(false)} />
      )}
    </div>
  );
};

export default MovieCardsDropdown;