import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <main className="bg-white py-[64px] px-[24px] sm:px-[40px] md:px-[64px] lg:px-[112px] w-full">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* About */}
        <div className="flex flex-col gap-3">
          <h1 className="text-gray-900 text-[30px] font-opensans font-extrabold">
            About HorrorScope
          </h1>
          <span className="text-gray-500 text-base font-opensans font-normal max-w-[457px]">
            Welcome to HorrorScope—the ultimate destination for horror movie
            enthusiasts. Dive into chilling discussions, curated
            recommendations, and an immersive horror community like no other.
          </span>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2 w-full lg:max-w-[581px]">
          <span className="text-gray-500 text-base font-opensans font-normal">
            Get the latest horror news, exclusive content, and eerie
            recommendations straight to your inbox. Sign up—if you dare!
          </span>
          <div className="relative w-full mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2 pl-4 pr-24 text-base h-[69px] font-opensans font-normal text-[#667185] border-[2px] border-red-900 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 gradient-button text-white font-opensans font-semibold text-base px-[37px] py-4 rounded-[12px] cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-[64px] bg-gray-50 rounded-[10px] py-[28px] px-[20px] lg:px-[32px] flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Social Icons */}
        <div className="flex gap-4">
          {[
            "ic:baseline-facebook",
            "mdi:twitter",
            "hugeicons:instagram",
            "ri:linkedin-fill",
          ].map((icon, index) => (
            <div
              key={index}
              className="rounded-full bg-[#0A0A0A] w-6 h-6 flex items-center justify-center"
            >
              <Icon icon={icon} className="text-white w-4 h-4" />
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-gray-800 text-sm font-opensans font-normal flex items-center gap-1 text-center">
          <Icon icon="ic:baseline-copyright" />
          {new Date().getFullYear()} Horroscope. All rights reserved.
        </div>

        {/* Logo */}
        <div>
          <Image
            src="/images/red-horrorscope.svg"
            alt="Horroscope Logo"
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </main>
  );
};

export default Footer;
