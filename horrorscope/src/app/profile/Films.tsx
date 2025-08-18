import React from 'react';
import { Icon } from "@iconify/react";
import { IMovie } from '@/utils/utils';
import MovieList from '../components/MovieList';

// Sample movie data with IMovie type
const recommendedMovies: IMovie[] = [
    {
      id: "1",
      imageSrc: "/images/bagman.png",
      title: "Bagman (2024)",
      reviews: 120,
      likes: 1500,
      comments: 2300,
      year: "2024",
    },
    {
      id: "2",
      imageSrc: "/images/halloween.png",
      title: "The Halloween (2022)",
      reviews: 85,
      likes: 1000000,
      comments: 500,
      year: "2022",
    },
    {
      id: "3",
      imageSrc: "/images/trick-r-treat.png",
      title: "Trick 'r Treat (2024)",
      reviews: 200,
      likes: 25000,
      comments: 1500000,
      year: "2024",
    },
    {
      id: "4",
      imageSrc: "/images/omen.png",
      title: "The First Omen (2025)",
      reviews: 150,
      likes: 999,
      comments: 100,
      year: "2025",
    },
  ];

const Films = () => {
  return (
    <div className="pb-8 sm:pb-[160px] mt-8 sm:mt-[42px]">
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
      <div className='flex flex-col gap-2 mt-4 sm:mt-8'>
      <MovieList movies={recommendedMovies} />
          <MovieList movies={recommendedMovies} />
          <MovieList movies={recommendedMovies} />
          <MovieList movies={recommendedMovies} />
      </div>
          
        </div>
  )
}

export default Films