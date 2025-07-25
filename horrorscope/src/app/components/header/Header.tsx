"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Dropdown from "./Dropdown";

const Header = () => {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isCurrent = (path: string) => isHydrated && pathname === path;

  const handleProfileClick = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      // Position dropdown below profile element, aligned to its right edge
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5, // 5px gap below profile
        left: rect.right + window.scrollX - 160, // Align dropdown's right edge with profile's right edge (dropdown width is 160px)
      });
    }
    setShowDropdown(!showDropdown);
  };

  return (
    <main className="relative pt-[54px] px-[56px] pb-[38px] w-full text-white header w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/white-horrorscope.svg"
            alt="Horroscope Logo"
            width={100}
            height={100}
            className="object-contain w-full h-full"
            priority
          />
        </div>

        {/* Navigation */}
        <nav>
          <ul className="inline-flex gap-4 flex-wrap">
            {[
              { href: "/home", label: "Home" },
              { href: "/films", label: "Films" },
              { href: "/list", label: "List" },
              { href: "/watch-party", label: "Watch party" },
            ].map(({ href, label }) => (
              <li key={href} className="text-base font-opensans font-normal">
                <Link
                  href={href}
                  className={`active-link focus:font-semibold active:font-semibold ${
                    isCurrent(href) ? "font-semibold current" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search and Profile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full max-w-[215px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-[6px] pl-[14px] pr-20 text-base font-opensans font-normal text-gray-600 border-none bg-white rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-900">
              <Icon
                icon="ic:baseline-search"
                className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4"
              />
            </span>
          </div>

          {/* Profile */}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleProfileClick}
            ref={profileRef}
          >
            <Icon
              icon="tdesign:user-filled"
              className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4"
            />
            <span className="text-ghost-white text-base font-opensans font-semibold">
              Toba109
            </span>
            <Icon icon="ep:arrow-down-bold" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {showDropdown && (
        <Dropdown
          onClose={() => setShowDropdown(false)}
          top={dropdownPosition.top}
          left={dropdownPosition.left}
        />
      )}
    </main>
  );
};

export default Header;