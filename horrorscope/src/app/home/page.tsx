"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import MovieList from "../components/MovieList";
import ReviewMovie from "../components/ReviewMovie";
import WatchPartyList from "../components/WatchPartyList";
import { formatNumber } from "@/utils/utils";

// Sample movie data
const recommendedMovies = [
  {
    id: "1",
    imageSrc: "/images/bagman.png",
    title: "Bagman (2024)",
    reviews: 120,
    likes: 1500,
    comments: 2300,
  },
  {
    id: "2",
    imageSrc: "/images/halloween.png",
    title: "The Halloween (2022)",
    reviews: 85,
    likes: 1000000,
    comments: 500,
  },
  {
    id: "3",
    imageSrc: "/images/trick-r-treat.png",
    title: "Trick 'r Treat (2024)",
    reviews: 200,
    likes: 25000,
    comments: 1500000,
  },
  {
    id: "4",
    imageSrc: "/images/omen.png",
    title: "The First Omen (2025)",
    reviews: 150,
    likes: 999,
    comments: 100,
  },
];

const trendingMovies = [
  {
    id: "5",
    imageSrc: "/images/bagman.png",
    title: "Bagman (2024)",
    reviews: 120,
    likes: 5000,
    comments: 1200,
  },
  {
    id: "6",
    imageSrc: "/images/halloween.png",
    title: "The Halloween (2022)",
    reviews: 85,
    likes: 2000000,
    comments: 750,
  },
  {
    id: "7",
    imageSrc: "/images/trick-r-treat.png",
    title: "Trick 'r Treat (2024)",
    reviews: 200,
    likes: 300,
    comments: 4500,
  },
  {
    id: "8",
    imageSrc: "/images/omen.png",
    title: "The First Omen (2025)",
    reviews: 150,
    likes: 12500,
    comments: 1000000,
  },
];

// Sample watch party data
const trendingWatchParties = [
  {
    id: "wp1",
    imageSrc: "/images/bagman.png",
    title: "Bagman Watch Party",
    time: "9pm WAT",
    date: "23-09-2025",
    participants: [
      "John Doe",
      "Jane Smith",
      "Alex Brown",
      "Mike Wilson",
      "Sara Lee",
    ],
    host: "Toba109",
  },
  {
    id: "wp2",
    imageSrc: "/images/halloween.png",
    title: "Halloween Watch Party",
    time: "7pm WAT",
    date: "25-09-2025",
    participants: ["Emma Taylor", "Liam Johnson"],
    host: "HorrorHost",
  },
  {
    id: "wp3",
    imageSrc: "/images/trick-r-treat.png",
    title: "Trick 'r Treat Watch Party",
    time: "6pm WAT",
    date: "24-09-2025",
    participants: ["Olivia Davis", "Noah Miller"],
    host: "TreatMaster",
  },
  {
    id: "wp4",
    imageSrc: "/images/omen.png",
    title: "Omen Watch Party",
    time: "8pm WAT",
    date: "26-09-2025",
    participants: ["Sophia Wilson", "Ethan Anderson"],
    host: "OmenMaster",
  },
];

// Sample review data
const popularReviews = [
  {
    id: "r1",
    imageSrc: "/images/bagman.png",
    title: "The Halloween (2002)",
    likes: 2000,
    comments: 1500,
    reviewer: "Jonathan Fujii",
  },
  {
    id: "r2",
    imageSrc: "/images/halloween.png",
    title: "Bagman (2024)",
    likes: 1000,
    comments: 500,
    reviewer: "Jonathan Fujii",
  },
  {
    id: "r3",
    imageSrc: "/images/trick-r-treat.png",
    title: "The Halloween (2002)",
    likes: 100,
    comments: 200,
    reviewer: "Jonathan Fujii",
  },
  {
    id: "r4",
    imageSrc: "/images/omen.png",
    title: "The Halloween (2002)",
    likes: 500000,
    comments: 2,
    reviewer: "Jonathan Fujii",
  },
];

// Sample list data
const popularLists = [
  {
    id: "l1",
    images: [
      "/images/bagman.png",
      "/images/trick-r-treat.png",
      "/images/halloween.png",
      "/images/omen.png",
    ],
    likes: 500000,
    comments: 2,
    reviewer: "Jonathan Fujii",
  },
  {
    id: "l2",
    images: [
      "/images/bagman.png",
      "/images/trick-r-treat.png",
      "/images/halloween.png",
      "/images/omen.png",
    ],
    likes: 500000,
    comments: 2,
    reviewer: "Jonathan Fujii",
  },
  {
    id: "l3",
    images: [
      "/images/bagman.png",
      "/images/trick-r-treat.png",
      "/images/halloween.png",
      "/images/omen.png",
    ],
    likes: 500000,
    comments: 2,
    reviewer: "Jonathan Fujii",
  },
];

const Page = () => {
  const [showReviewDropdown, setShowReviewDropdown] = useState(false);
  const reviewButtonRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleReviewButtonClick = () => {
    if (reviewButtonRef.current && imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 700;
      let leftPosition = viewportWidth * 0.24;

      if (viewportWidth < 640) {
        leftPosition = (viewportWidth - dropdownWidth) / 2;
      } else if (leftPosition + dropdownWidth > viewportWidth) {
        leftPosition = viewportWidth - dropdownWidth - 16;
      } else if (leftPosition < 16) {
        leftPosition = 16;
      }

      setDropdownPosition({
        top: rect.top + window.scrollY,
        left: leftPosition,
      });
    }
    setShowReviewDropdown(!showReviewDropdown);
  };

  return (
    <section className="header h-full w-full">
      <div
        ref={imageContainerRef}
        className="relative w-full max-w-[1920px] mx-auto overflow-hidden rounded-[24px] sm:rounded-[48px] px-4 sm:px-[56px]"
      >
        <Image
          src="/images/horrorscope-hero-bg.png"
          alt="HorrorScope Background"
          width={1920}
          height={600}
          className="object-contain w-full h-auto"
          priority
        />

        <div className="absolute top-1/2 sm:top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center px-4 space-y-4 sm:space-y-6">
          <div className="text-white text-[12px] sm:text-[24px] md:text-[36px] font-opensans font-extrabold max-w-[100%] sm:max-w-[700px] md:max-w-[1019px] leading-tight sm:leading-normal">
            Welcome back, Toba. Your HorrorScope feed gets spookier as you
            follow members and rate films.
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-[#F8F8FF] py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-[93px] text-midnight-black text-xs sm:text-sm md:text-base font-opensans font-semibold rounded-[24px] cursor-pointer"
              onClick={handleReviewButtonClick}
              ref={reviewButtonRef}
            >
              Review a movie
            </button>
          </div>
        </div>

        <div className="hidden sm:flex absolute sm:bottom-[85px] left-1/2 transform -translate-x-1/2 z-10 flex-col items-center text-center">
          <span className="text-[16px] sm:text-[28px] md:text-[36px] font-opensans font-bold text-[rgba(248,248,255,0.5)]">
            The Blood Sucker
          </span>
          <span className="text-[12px] sm:text-[16px] md:text-[18px] font-opensans font-normal text-[rgba(248,248,255,0.5)]">
            2022
          </span>
        </div>
      </div>

      {showReviewDropdown && (
        <ReviewMovie
          onClose={() => setShowReviewDropdown(false)}
          top={dropdownPosition.top}
          left={dropdownPosition.left}
        />
      )}

      <div className="mt-6 sm:mt-10 px-4 sm:px-[56px]">
        <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-opensans font-bold text-[#F8F8FF] mb-2">
          Recommended for you
        </h1>
        <MovieList movies={recommendedMovies} />
      </div>

      <div className="mt-12 sm:mt-[70px] px-4 sm:px-[56px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[#F8F8FF] gap-3 sm:gap-0 mb-2">
          <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-opensans font-bold">
            Trending films today
          </h1>
          <button className="text-[14px] sm:text-[16px] md:text-[18px] font-opensans font-semibold cursor-pointer">
            See more
          </button>
        </div>
        <MovieList movies={trendingMovies} />
      </div>

      <div className="mt-12 sm:mt-[70px] px-4 sm:px-[56px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[#F8F8FF] gap-3 sm:gap-0 mb-2">
          <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-opensans font-bold">
            Trending Watch Parties
          </h1>
          <button className="text-[14px] sm:text-[16px] md:text-[18px] font-opensans font-semibold cursor-pointer">
            See more
          </button>
        </div>
        <WatchPartyList parties={trendingWatchParties} />
      </div>

      <div className="mt-16 sm:mt-[124px] text-[#F8F8FF] px-4 sm:px-[56px] pb-20 sm:pb-[210px]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-[80px]">
          <div className="flex-[3] w-full">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-opensans font-bold">
                Popular reviews this week
              </h1>
              <button className="text-[14px] sm:text-[16px] md:text-[18px] font-opensans font-semibold cursor-pointer">
                See more
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {popularReviews.map((review) => (
                <div key={review.id} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative w-full sm:w-[266px] h-[200px] sm:h-[266px] flex-shrink-0">
                    <Image
                      src={review.imageSrc}
                      alt={review.title}
                      fill
                      className="object-cover rounded-[5px]"
                      priority
                    />
                  </div>
                  <div className="flex flex-col gap-[14px] flex-1">
                    <h1 className="text-[16px] sm:text-[18px] md:text-[20px] text-[#F8F8FF] font-opensans font-semibold">
                      {review.title}
                    </h1>
                    <span className="text-[#CBD5E1] text-sm sm:text-base font-opensans font-normal line-clamp-3 sm:line-clamp-none">
                      Write and share bone-chilling reviews. Curate your own
                      killer horror lists. Document your life in horror cinema.
                    </span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/reviews-image.svg"
                        width={20}
                        height={20}
                        alt="Avatar"
                        className="rounded-full sm:w-6 sm:h-6"
                      />
                      <span className="text-gray-200 text-[10px] sm:text-[12px] font-opensans font-medium">
                        {review.reviewer}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-2">
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="weui:like-outlined"
                          className="w-3 h-3 text-[#F8F8FF]"
                        />
                        <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
                          {formatNumber(review.likes)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="hugeicons:message-02"
                          className="w-3 h-3 text-[#F8F8FF]"
                        />
                        <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
                          {formatNumber(review.comments)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-[1] w-full lg:w-auto flex flex-col gap-8 lg:gap-[48px]">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-opensans font-bold">
                  Popular lists
                </h1>
                <button className="text-[14px] sm:text-[16px] md:text-[18px] font-opensans font-semibold cursor-pointer">
                  See more
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {popularLists.map((list) => (
                  <div key={list.id} className="flex flex-col gap-2">
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
                    <div className="flex flex-col sm:flex-row gap-2">
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
                      </div>
                      <div className="flex items-center gap-4 sm:gap-2">
                        <div className="flex items-center gap-1">
                          <Icon
                            icon="weui:like-outlined"
                            className="w-3 h-3 text-[#F8F8FF]"
                          />
                          <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
                            {formatNumber(list.likes)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon
                            icon="hugeicons:message-02"
                            className="w-3 h-3 text-[#F8F8FF]"
                          />
                          <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
                            {formatNumber(list.comments)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-opensans font-bold">
                  Reviewer highlights
                </h1>
                <button className="text-[14px] sm:text-[16px] md:text-[18px] font-opensans font-semibold cursor-pointer">
                  See more
                </button>
              </div>
              <div className="flex flex-col gap-6 sm:gap-8 mt-4">
                {[
                  "Jonathan Fujii",
                  "Jonathan Fujii",
                  "Jonathan Fujii",
                  "Jonathan Fujii",
                ].map((reviewer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Image
                      src="/images/reviews-image.svg"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full sm:w-[54px] sm:h-[54px]"
                    />
                    <div className="flex flex-col">
                      <span className="text-[#F8F8FF] text-[16px] sm:text-[18px] md:text-[20px] font-opensans font-semibold">
                        {reviewer}
                      </span>
                      <span className="text-gray-400 text-sm sm:text-base font-opensans font-normal">
                        2,191 films, 1,432 reviews
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;