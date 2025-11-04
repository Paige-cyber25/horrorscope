
"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { capitalizeFirstLetter, formatNumber } from "@/utils/utils";
import MovieList from "@/app/components/MovieList";
import React from "react";  
import { useMyLists } from "@/hooks/useMyLists";
import ShimmerListItem from "@/app/components/ShimmerListItem";

// --- TYPE DEFINITIONS ---
interface FilmProps {
  id: string;
  imageSrc: string;
  title: string;
  reviews: number; 
  likes: number;   
  comments: number; 
}


const Page = () => {
    
    const { data: allUserLists, isLoading, isError, error } = useMyLists();
    
   const currentList = allUserLists && allUserLists.length > 0 ? allUserLists[0] : undefined;

    if (isLoading) {
        return <div className="header h-full w-full pt-8 sm:pt-[120px] px-4 sm:px-[97px] pb-8 sm:pb-20 text-white"><ShimmerListItem /></div>;
    }

    if (isError) {
         return <div className="header h-full w-full pt-8 sm:pt-[120px] px-4 sm:px-[97px] pb-8 sm:pb-20 text-red-500">Error: {error?.message}</div>;
    }
    
    if (!currentList) {
         return <div className="header h-full w-full pt-8 sm:pt-[120px] px-4 sm:px-[97px] pb-8 sm:pb-20 text-white">List not found.</div>;
    }

    // --- DYNAMIC DATA MAPPING & AGGREGATION ---
    const listMovies: FilmProps[] = currentList.films
        .filter(film => film.posterUrl)
        .map(film => ({
            id: film.id,
            imageSrc: film.posterUrl!,
            title: capitalizeFirstLetter(film.title),
            // Use averageRating for 'reviews' score, convert to number
            reviews: parseFloat(film.averageRating) || 0,
            likes: film.likedCount || 0,
            comments: film.reviewCount || 0,
        }));

    const totalListLikes = listMovies.reduce((sum, movie) => sum + movie.likes, 0);
    const totalListComments = listMovies.reduce((sum, movie) => sum + movie.comments, 0);
    
    // Format the date dynamically
    const published = new Date(currentList.createdAt).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric'
    }).replace(/\./g, '');
    // ----------------------------


  return (
    <section className="header h-full w-full pt-8 sm:pt-[120px] px-4 sm:px-[97px] pb-8 sm:pb-20">
      <div>
        {/* Back Button Link */}
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
          {currentList.name} {/* DYNAMIC: List Name */}
        </h1>
        <div className="flex items-center gap-2">
          <Icon icon="ph:dot" className="text-2xl sm:text-3xl text-[#F8F8FF]" />
          <Icon
            icon="meteor-icons:share"
            className="text-2xl sm:text-3xl text-[#F8F8FF]"
          />
          <span className="text-[#F6F8F9] text-[18px] sm:text-[24px] font-normal font-opensans">
            Share
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4 sm:mb-6">
        {/* Reviewer Info: Remains hardcoded as data is unavailable in current API response */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/reviews-image.svg" // Hardcoded avatar
            width={20}
            height={20}
            alt="Avatar"
            className="rounded-full w-[16px] h-[16px] sm:w-6 sm:h-6"
          />
          <span className="uppercase text-gray-200 text-[10px] sm:text-[12px] font-bevietnampro font-medium">
            jonathan fujii {/* Hardcoded name */}
          </span>
          <div className="text-[#D1D5DB] flex items-center">
            <Icon icon="ph:dot" className="text-2xl sm:text-3xl" />
            <span className="text-[10px] sm:text-[12px] font-opensans font-normal">
              Published {published} {/* DYNAMIC: Date */}
            </span>
          </div>
        </div>

        {/* Dynamic List Stats (Aggregated) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Icon
              icon="weui:like-outlined"
              className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#F8F8FF]"
            />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(totalListLikes)} {/* DYNAMIC: Total Likes */}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              icon="hugeicons:message-02"
              className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#F8F8FF]"
            />
            <span className="text-[10px] sm:text-[12px] font-medium text-gray-200">
              {formatNumber(totalListComments)} {/* DYNAMIC: Total Comments */}
            </span>
          </div>
          <span className="text-[#E5E7EB] text-xs sm:text-sm font-bevietnampro font-medium">
            Add a comment?
          </span>
        </div>
      </div>

      <div className="pt-4 sm:pt-6 border-t border-t-[#475569] pb-4 sm:pb-6">
        <span className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-normal">
          { capitalizeFirstLetter(currentList.description)} {/* DYNAMIC: List Description */}
        </span>
      </div>

      <div className="flex justify-end gap-4 sm:gap-6">
        <div className="text-[#F8F8FF] flex items-center gap-1">
          <Icon
            icon="ic:baseline-search"
            className="w-5 sm:w-6 h-5 sm:h-6 md:w-5 md:h-5"
          />
          <span className="text-xs sm:text-sm font-medium font-opensans">
            Search
          </span>
        </div>
        <div className="text-[#F8F8FF] flex items-center gap-1">
          <Icon
            icon="proicons:filter"
            className="w-5 sm:w-6 h-5 sm:h-6 md:w-5 md:h-5"
          />
          <span className="text-xs sm:text-sm font-medium font-opensans">
            Filter
          </span>
        </div>
        <div className="text-[#F8F8FF] flex items-center gap-1">
          <Icon
            icon="garden:sort-stroke-16"
            className="w-5 sm:w-6 h-5 sm:h-6 md:w-5 md:h-5"
          />
          <span className="text-xs sm:text-sm font-medium font-opensans">
            Sort
          </span>
        </div>
      </div>
      
      {/* Dynamic Movie Cards */}
      <div className="flex gap-2 flex-col mt-4 sm:mt-6 mb-8 sm:mb-[76px]">
        {/* DYNAMIC: Renders films pulled from API response */}
        <MovieList movies={listMovies} /> 
      </div>


      {/* Comment Input Section (Static) */}
      <div className="border-t border-t-[#475569] mt-4 sm:mt-[20px] pt-4 sm:pt-[20px]">
        <div className="flex items-center gap-2 py-2 px-4 sm:py-4 sm:px-[46px] w-full rounded-lg sm:rounded-[12px] bg-[rgba(255,255,255,0.05)]">
          <Image
            src="/images/reviews-image.svg"
            width={100}
            height={100}
            alt="User Icon"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
          />
          <input
            type="text"
            placeholder="Post a comment"
            className="flex-1 border-none outline-none text-base sm:text-[18px] text-[#9A9EB2] bg-transparent"
          />
          <button className="px-4 py-2 sm:px-6 sm:py-4 rounded-lg sm:rounded-[16px] text-white custom-gradient cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;