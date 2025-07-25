"use client";

import React from "react";
import Image from "next/image";

interface WatchPartyCardProps {
  id: string;
  imageSrc: string;
  title: string;
  time: string;
  date: string;
  participants: string[];
  host: string;
}

const WatchPartyCard = ({
  id,
  imageSrc,
  title,
  time,
  date,
  participants,
  host,
}: WatchPartyCardProps) => {
  return (
    <div id={`watch-party-${id}`} className="flex flex-col gap-2">
      <div className="relative w-full h-[225px] sm:h-[366px]">
        <Image
          src={imageSrc}
          alt={`${title} Watch Party`}
          fill
          className="object-cover w-full h-full rounded-[12px]"
        />
      </div>
      <div className="flex justify-between items-center gap-2 font-opensans text-[#F8F8FF]">
        <h2 className="text-sm sm:text-base font-bold whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-[60%]">
          {title}
        </h2>
        <button className="cursor-pointer text-base font-semibold text-white bg-[rgba(255,255,255,0.1)] rounded-[8px] px-2 py-1">
          Ask to Join
        </button>
      </div>
      <p className="text-[12px] sm:text-[14px] font-bevietnampro font-medium text-gray-200">
        Watch on {time}, {date}
      </p>
      <div className="flex items-center gap-2">
        <div className="flex overflow-x-auto">
          {participants.slice(0, 3).map((participant, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-[#E7E7E7] border border-white text-gray-900 rounded-full flex items-center justify-center text-[#121212] text-sm font-opensans font-semibold"
            >
              {participant.slice(0, 2).toUpperCase()}
            </div>
          ))}
        </div>
        {participants.length > 3 && (
          <span className="text-[#F8F8FF] pl-[2px] text-sm font-opensans font-semibold">
            and {participants.length - 3} other{participants.length - 3 === 1 ? "" : "s"}
          </span>
        )}
      </div>
      <p className="text-[12px] sm:text-[14px] font-opensans font-semibold text-gray-200">
        Hosted by {host}
      </p>
    </div>
  );
};

export default WatchPartyCard;