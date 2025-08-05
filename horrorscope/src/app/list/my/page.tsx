"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { formatNumber } from "@/utils/utils";
import MovieList from "@/app/components/MovieList";

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

const reviews = [
  {
    id: "r1",
    name: "Victoria Chad",
    text: "Third episode one of the most astonishing hours of television I’ve ever seen in my life",
    likes: 2000,
    comments: 4700,
    hasDots: true,
  },
  {
    id: "r2",
    name: "Jenny Wilson",
    text: "Third episode one of the most astonishing hours of television I’ve ever seen in my life",
    likes: 2000,
    comments: 4700,
    hasDots: false,
  },
  {
    id: "r3",
    name: "Jenny Wilson",
    text: "Third episode one of the most astonishing hours of television I’ve ever seen in my life",
    likes: 2000,
    comments: 4700,
    hasDots: false,
  },
];

const Page = () => {
  return (
    <section className="header h-full w-full pt-8 sm:pt-[120px] px-4 sm:px-[97px] pb-8 sm:pb-20">
      <div>
        <Link href="/list" className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 rounded-[4px] bg-white border border-[#E4E7EC]">
            <Icon
              icon="flowbite:arrow-left-outline"
              className="w-3 sm:w-4 h-3 sm:h-4 text-black cursor-pointer hover:text-gray-400"
            />
          </div>
          <span className="text-[#F8F8FF] text-xs sm:text-sm font-opensans font-medium">
            Go back
          </span>
        </Link>
      </div>

      <div className="mt-6 sm:mt-[48px] flex flex-col sm:flex-row sm:items-center gap-2">
        <h1 className="text-[#F1F5F9] text-[24px] sm:text-[36px] font-semibold font-opensans">
          Ayodeji’s Specials
        </h1>
        <div className="flex items-center gap-2">
          <Icon icon="ph:dot" className="text-2xl sm:text-3xl text-[#F8F8FF]" />
          <Icon icon="meteor-icons:share" className="text-2xl sm:text-3xl text-[#F8F8FF]" />
          <span className="text-[#F6F8F9] text-[18px] sm:text-[24px] font-normal font-opensans">
            Share
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Image
            src="/images/reviews-image.svg"
            width={20}
            height={20}
            alt="Avatar"
            className="rounded-full w-[16px] h-[16px] sm:w-6 sm:h-6"
          />
          <span className="uppercase text-gray-200 text-[10px] sm:text-[12px] font-bevietnampro font-medium">
            jonathan fujii
          </span>
          <div className="text-[#D1D5DB] flex items-center">
            <Icon icon="ph:dot" className="text-2xl sm:text-3xl" />
            <span className="text-[10px] sm:text-[12px] font-opensans font-normal">
              Published 6 months ago
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Icon
              icon="weui:like-outlined"
              className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#F8F8FF]"
            />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(2000)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              icon="hugeicons:message-02"
              className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#F8F8FF]"
            />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(4700)}
            </span>
          </div>
          <span className="text-[#E5E7EB] text-xs sm:text-sm font-bevietnampro font-medium">
            Add a comment?
          </span>
        </div>
      </div>

      <div className="pt-4 sm:pt-6 border-t border-t-[#475569] pb-4 sm:pb-6">
        <span className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-normal">
          I asked reddit whats one movie everyone should watch at least once in
          their lifetime to create a list of movies that everyone should watch.
        </span>
      </div>

      <div className="flex justify-end gap-4 sm:gap-6">
        <div className="text-[#F8F8FF] flex items-center gap-1">
          <Icon
            icon="ic:baseline-search"
            className="w-5 sm:w-6 h-5 sm:h-6 md:w-5 md:h-5"
          />
          <span className="text-xs sm:text-sm font-medium font-opensans">Search</span>
        </div>
        <div className="text-[#F8F8FF] flex items-center gap-1">
          <Icon
            icon="proicons:filter"
            className="w-5 sm:w-6 h-5 sm:h-6 md:w-5 md:h-5"
          />
          <span className="text-xs sm:text-sm font-medium font-opensans">Filter</span>
        </div>
        <div className="text-[#F8F8FF] flex items-center gap-1">
          <Icon
            icon="garden:sort-stroke-16"
            className="w-5 sm:w-6 h-5 sm:h-6 md:w-5 md:h-5"
          />
          <span className="text-xs sm:text-sm font-medium font-opensans">Sort</span>
        </div>
      </div>
      <div className="flex gap-2 flex-col mt-4 sm:mt-6 mb-8 sm:mb-[76px]">
        <MovieList movies={recommendedMovies} />
        <MovieList movies={recommendedMovies} />
        <MovieList movies={recommendedMovies} />
      </div>

      <div className="border-t border-t-[#475569]">
        {reviews.map((review) => (
          <div key={review.id} className="mt-4 sm:mt-[20px] border-t border-t-[#475569] pt-4 sm:pt-[20px]">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3 sm:gap-4">
                <div>
                  <Image
                    src="/images/reviews-image.svg"
                    width={20}
                    height={20}
                    alt="Avatar"
                    className="rounded-full w-[16px] h-[16px] sm:w-[48px] sm:h-[48px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-200 text-[10px] sm:text-[18px] font-opensans font-semibold">
                      {review.name}
                    </span>
                    <div className="text-[#D1D5DB] flex items-center">
                      <Icon icon="ph:dot" className="text-2xl sm:text-3xl" />
                      <span className="text-[10px] sm:text-sm font-opensans font-semibold">
                        Streamed on Netflix
                      </span>
                    </div>
                    <div className="text-[#D1D5DB] flex items-center">
                      <Icon icon="ph:dot" className="text-2xl sm:text-3xl" />
                      <span className="text-[10px] sm:text-sm font-opensans font-normal">
                        5:45 pm / 12 July 2023
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-opensans font-normal text-[#D1D5DB]">
                      {review.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 sm:gap-8">
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="mdi:heart"
                        className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-[#E52E2E]"
                      />
                      <span className="text-[10px] sm:text-[19px] font-medium text-gray-200">
                        {formatNumber(review.likes)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="mi:message"
                        className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-[#F8F8FF]"
                      />
                      <span className="text-[10px] sm:text-[19px] font-medium text-gray-200">
                        {formatNumber(review.comments)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {review.hasDots && (
                <div>
                  <Icon icon="tabler:dots" className="text-2xl sm:text-3xl text-[#D1D5DB]" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;