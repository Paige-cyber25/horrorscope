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

const Dropdown = ({ onClose, top, left }: DropdownProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef as RefObject<HTMLElement>, onClose);

  return (
    <div
      ref={modalRef}
      className="absolute w-[160px] bg-white z-50 rounded-[2px] p-[15px] shadow-lg animate-fadeIn"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div className="flex flex-col gap-[10px]">
        <Link
          href="/profile"
          className="text-[#14213D] text-sm font-opensans font-normal"
        >
          Profile
        </Link>
        <Link
          href="/notifications"
          className="text-[#14213D] text-sm font-opensans font-normal"
        >
          Notifications
        </Link>
      </div>
      <div className="border-t border-t-[rgba(158,158,158,0.25)] mt-[10px] pt-[10px]">
        <Link
          href="/login"
          className="text-red-900 text-sm font-opensans font-normal"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;