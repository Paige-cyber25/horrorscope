import React, { RefObject, useRef } from "react";
import Link from "next/link";
import { DropdownProps } from "@/utils/utils";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const PopularListDropdown = ({ onClose }: DropdownProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef as RefObject<HTMLElement>, onClose);

  return (
    <div
      ref={modalRef}
      className="absolute w-[160px] bg-white shadow-lg z-[600] rounded-[2px] p-[15px] animate-fadeIn"
    >
      <div className="flex flex-col gap-[10px] items-start">
        <Link
          href="/notifications"
          className="text-ferry-blue text-sm font-opensans font-normal"
        >
          Clone list
        </Link>
        <Link
          href="/notifications"
          className="text-ferry-blue text-sm font-opensans font-normal"
        >
          Share
        </Link>
      </div>
    </div>
  );
};

export default PopularListDropdown;