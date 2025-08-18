import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { formatNumber } from "@/utils/utils";

interface ActivityItemProps {
  id: string;
  imageSrc: string;
  platform: string;
  title: string;
  content: string;
  reviews: number;
  likes: number;
  comments: number;
}

const ActivityItem = ({
  id,
  imageSrc,
  platform,
  title,
  content,
  reviews,
  likes,
  comments,
}: ActivityItemProps) => {
  return (
    <div
      key={id}
      className="flex flex-col sm:flex-row gap-3 border-b border-b-[rgba(248,248,255,0.2)] py-[20px]"
    >
      <div className="relative w-full sm:w-[266px] h-[200px] sm:h-[266px] flex-shrink-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover rounded-[5px]"
          priority
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1">
        <p className="text-[#F8F8FF] text-sm font-semibold font-opensans">
          you <span className="!font-normal">watched on {platform}</span>
        </p>
        <div className="flex items-center gap-1">
          <h1 className="text-[16px] sm:text-[18px] md:text-[20px] text-[#F8F8FF] font-opensans font-semibold">
            {title}
          </h1>
          <Icon icon="ph:dot" className="text-3xl text-[#F8F8FF]" />
          <span className="text-[12px] font-medium text-gray-200">
            {reviews}
          </span>
          <Icon
            icon="material-symbols:star"
            className="w-3 h-3 text-[#F8F8FF]"
          />
        </div>

        <span className="text-[#CBD5E1] text-sm sm:text-base font-opensans font-normal line-clamp-3 sm:line-clamp-none w-full sm:max-w-[500px]">
          {content}
        </span>
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="flex items-center gap-1">
            <Icon
              icon="weui:like-outlined"
              className="w-3 h-3 text-[#F8F8FF]"
            />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(likes)}
            </span>
            <span className="text-[10px] sm:text-[12px] font-medium text-[#E5E7EB]">
              Likes
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              icon="hugeicons:message-02"
              className="w-3 h-3 text-[#F8F8FF]"
            />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(comments)}
            </span>
            <span className="text-[10px] sm:text-[12px] font-medium text-[#E5E7EB]">
              Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
