"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import MovieList from "../components/MovieList";
import Radio from "../components/input/Radio";
import { IMovie } from "@/utils/utils";
import { BrowseOption } from "../components/BrowseOption";

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

const Page = () => {
  // Explicitly typing the state to be of type string
  const [selectedYear, setSelectedYear] = useState<string>("All");

  const filteredMovies = recommendedMovies.filter((movie: IMovie) => {
    if (selectedYear === "All") {
      return true;
    }
    // Filter logic for decades (e.g., '2020s' filters years '2020' through '2029')
    // We check if the movie's year starts with the first three digits of the selected decade.
    const selectedDecadePrefix = selectedYear.substring(0, 3);
    return movie.year.startsWith(selectedDecadePrefix);
  });

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <section className="header h-screen w-full pt-8 sm:pt-[75px] overflow-hidden">
      <div className="flex gap-[48px] items-start mx-4 sm:mx-[77px] h-full">
        {/*
          SOLUTION: Hide the sidebar on mobile and only show it on screens
          that are 'sm' or larger.
        */}
        <div className="hidden sm:block sm:w-[281px] h-full sticky top-0 overflow-y-auto no-scrollbar">
          <h1 className="text-[#F8F8FF] text-base sm:text-[20px] font-opensans font-bold">
            Browse by
          </h1>
          <div className="mt-3">
            <BrowseOption title="Rating" defaultOpen>
              <div className="flex flex-col gap-3">
                <Radio label="Highest first" name="rating" value="highest" />
                <Radio label="Lowest first" name="rating" value="lowest" />
              </div>
            </BrowseOption>

            <BrowseOption title="Popular">
              {/* Add popular options here */}
            </BrowseOption>

            <BrowseOption title="Year" defaultOpen>
              <div className="flex flex-col gap-3">
                <Radio
                  label="All"
                  name="year"
                  value="All"
                  onChange={() => setSelectedYear("All")}
                  checked={selectedYear === "All"}
                />
                <Radio
                  label="2020s"
                  name="year"
                  value="2020s"
                  onChange={() => setSelectedYear("2020s")}
                  checked={selectedYear === "2020s"}
                />
                <Radio
                  label="2010s"
                  name="year"
                  value="2010s"
                  onChange={() => setSelectedYear("2010s")}
                  checked={selectedYear === "2010s"}
                />
                <Radio
                  label="2000s"
                  name="year"
                  value="2000s"
                  onChange={() => setSelectedYear("2000s")}
                  checked={selectedYear === "2000s"}
                />
              </div>
            </BrowseOption>

            <BrowseOption title="Genre">
              {/* Add genre options here */}
            </BrowseOption>

            <BrowseOption title="Country">
              {/* Add country options here */}
            </BrowseOption>

            <div className="mt-6 mb-8">
              <span className="text-[#F8F8FF] text-[12px] sm:text-base font-opensans font-semibold">
                Film names (A-Z)
              </span>
              <div className="mt-3 flex flex-col gap-3">
                {alphabet.map((letter) => (
                  <span
                    key={letter}
                    className="text-[#CBD5E1] text-[12px] sm:text-base font-opensans font-normal"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The main content area now takes up full width on mobile */}
        <div className="flex-1 overflow-y-auto h-full pr-4">
          <div>
            <h1 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
              Popular films this week
            </h1>
            <div className="mt-4">
              <MovieList movies={filteredMovies} />
            </div>
          </div>
          <div className="mt-8 sm:mt-[60px]">
            <div className="flex w-full">
              <div className="flex-1 bg-white p-4 rounded-s-lg">
                <div className="flex flex-col gap-6 text-red-900 ">
                  <span className="text-sm sm:text-[18px] font-opensans font-semibold">
                    Early Access to Horror Lists: Get curated horror
                    recommendations based on your watch <br /> history.
                  </span>
                  <button className="flex items-center gap-1 cursor-pointer">
                    <span className="text-sm font-opensans font-normal">
                      Upgrade to pro
                    </span>
                    <Icon
                      icon="uil:arrow-up-right"
                      className="text-sm font-semibold"
                    />
                  </button>
                </div>
              </div>
              <div>
                <Image
                  src="/images/witch.png"
                  width={250}
                  height={130}
                  alt="witch"
                  className="w-[250px] h-[130px] rounded-e-lg object-cover flex-shrink-0"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-[60px] pb-8 sm:pb-[240px]">
            <h1 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
              Recommended for you
            </h1>
            <div className="mt-4">
              <MovieList movies={recommendedMovies} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;