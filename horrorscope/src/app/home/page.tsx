"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import MovieList from "../components/MovieList";
import WatchPartyList from "../components/WatchPartyList";
import { capitalizeFirstLetter, formatNumber, PopularReview } from "@/utils/utils";
import { useUser } from "@/hooks/useUser";
import ReviewMovie from "../components/ReviewMovie";
import { useRecommendedMovies } from "@/hooks/useRecommendedMovies";
import ShimmerListItem from "../components/ShimmerListItem";
import { usePopularReviewsThisWeek } from "@/hooks/usePopularReviewsThisWeek";
import ShimmerPopularReview from "../components/ShimmerPopularReview";


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
  const user = useUser();
  const [showReviewMovieModal, setShowReviewMovieModal] = useState(false);
  const reviewButtonRef = useRef<HTMLButtonElement>(null);

  const { data: recommendedMovies, isLoading: recLoading, isError: recError } = useRecommendedMovies();

  const {
    data: popularReviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = usePopularReviewsThisWeek();

  useEffect(() => {
    if (showReviewMovieModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [showReviewMovieModal]);

  return (
    <section className="header h-full w-full">
      {/* HERO SECTION */}
      <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden rounded-[24px] sm:rounded-[48px] px-4 sm:px-[56px]">
        <Image
          src="/images/horrorscope-hero-bg.png"
          alt="HorrorScope Background"
          width={1920}
          height={600}
          className="object-contain w-full h-auto"
          priority
        />

        <div className="absolute top-1/2 sm:top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center px-4 space-y-4 sm:space-y-6">
          <div className="text-white text-[12px] sm:text-[24px] md:text-[36px] font-opensans font-extrabold max-w-[100%] sm:max-w-[700px] md:max-w-[1019px] leading-tight">
            Welcome back, {capitalizeFirstLetter(user?.userName ?? "User")}. Your HorrorScope feed gets spookier as you follow members and rate films.
          </div>
          <button
            onClick={() => setShowReviewMovieModal(true)}
            ref={reviewButtonRef}
            className="bg-[#F8F8FF] py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-[93px] text-midnight-black text-xs sm:text-sm md:text-base font-opensans font-semibold rounded-[24px]"
          >
            Review a movie
          </button>
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

      {showReviewMovieModal && <ReviewMovie onClose={() => setShowReviewMovieModal(false)} />}

      {/* RECOMMENDED FOR YOU */}
      <div className="mt-6 sm:mt-10 px-4 sm:px-[56px]">
        <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-opensans font-bold text-[#F8F8FF] mb-4">
          Recommended for you
        </h1>

        {recLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {Array(8).fill(0).map((_, i) => <ShimmerListItem key={i} />)}
          </div>
        ) : recError ? (
          <p className="text-red-400">Failed to load recommendations</p>
        ) : recommendedMovies?.length ? (
          <MovieList movies={recommendedMovies} />
        ) : (
          <p className="text-gray-400">No recommendations yet</p>
        )}
      </div>

      {/* TRENDING FILMS & WATCH PARTIES (dummy for now) */}
      <div className="mt-12 sm:mt-[70px] px-4 sm:px-[56px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[18px] sm:text-[24px] font-bold text-[#F8F8FF]">Trending films today</h1>
          <button className="text-lg font-semibold">See more</button>
        </div>
        <MovieList movies={trendingMovies} />
      </div>

      <div className="mt-12 sm:mt-[70px] px-4 sm:px-[56px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[18px] sm:text-[24px] font-bold text-[#F8F8FF]">Trending Watch Parties</h1>
          <button className="text-lg font-semibold">See more</button>
        </div>
        <WatchPartyList parties={trendingWatchParties} />
      </div>

      {/* MAIN SECTION: Popular Reviews + Sidebar */}
      <div className="mt-16 sm:mt-[124px] text-[#F8F8FF] px-4 sm:px-[56px] pb-20 sm:pb-[210px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[80px]">
          {/* LEFT: Popular Reviews This Week */}
          <div className="flex-[3] w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[18px] sm:text-[24px] font-bold">Popular reviews this week</h1>
              <button className="text-lg font-semibold cursor-pointer">See more</button>
            </div>

            <div className="flex flex-col gap-8">
              {reviewsLoading ? (
                Array(4)
                  .fill(0)
                  .map((_, i) => <ShimmerPopularReview key={i} />)
              ) : reviewsError ? (
                <p className="text-red-400">Failed to load reviews</p>
              ) : popularReviews.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No popular reviews this week yet.</p>
              ) : (
                popularReviews.map((review: PopularReview) => (
                  <div
                    key={review.id}
                    className="flex flex-col sm:flex-row gap-4 bg-[#111111] p-4 rounded-xl"
                  >
                    <div className="relative w-full sm:w-[266px] h-[200px] sm:h-[266px] flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={review.imageSrc || "/images/fallback.jpg"}
                        alt={review.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                      <h2 className="text-[18px] sm:text-[20px] font-semibold">
                        {review.title}
                      </h2>

                      <p className="text-[#CBD5E1] text-sm sm:text-base line-clamp-3">
                        {review.reviewText || "Write and share bone-chilling reviews..."}
                      </p>

                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/reviews-image.svg"
                          width={28}
                          height={28}
                          alt="avatar"
                          className="rounded-full"
                        />
                        <span className="text-gray-300 font-medium">{review.reviewer}</span>
                      </div>

                      <div className="flex items-center gap-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Icon icon="weui:like-outlined" className="w-5 h-5" />
                          <span>{formatNumber(review.likes)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="hugeicons:message-02" className="w-5 h-5" />
                          <span>{formatNumber(review.comments)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="flex-[1] flex flex-col gap-12">
            {/* Popular Lists */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[18px] sm:text-[24px] font-bold">Popular lists</h1>
                <button className="text-lg font-semibold">See more</button>
              </div>
              <div className="flex flex-col gap-6">
                {popularLists.map((list) => (
                  <div key={list.id} className="bg-[#111111] p-4 rounded-xl">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {list.images.map((img, i) => (
                        <div key={i} className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image src={img} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Image src="/images/reviews-image.svg" width={20} height={20} alt="avatar" className="rounded-full" />
                        <span>{list.reviewer}</span>
                      </div>
                      <div className="flex gap-4">
                        <span>{formatNumber(list.likes)} likes</span>
                        <span>{formatNumber(list.comments)} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviewer Highlights */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[18px] sm:text-[24px] font-bold">Reviewer highlights</h1>
                <button className="text-lg font-semibold">See more</button>
              </div>
              <div className="space-y-6">
                {["Jonathan Fujii", "Sarah Killer", "Mike Slasher", "Emma Ghost"].map((name, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Image
                      src="/images/reviews-image.svg"
                      width={54}
                      height={54}
                      alt={name}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-lg font-semibold">{name}</p>
                      <p className="text-sm text-gray-400">2,191 films • 1,432 reviews</p>
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
