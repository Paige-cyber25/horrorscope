"use client";

import React from "react";
import ListItem from "../components/ListItem";

const popularLists = [
  {
    id: "l1",
    images: [
      "/images/bagman.png",
      "/images/trick-r-treat.png",
      "/images/halloween.png",
      "/images/omen.png",
    ],
    title: "Ayodeji’s Specials",
    likes: 500000,
    comments: 2,
    total: 20,
    reviewer: "Jonathan Fujii",
    published: "6 months ago",
  },
];

const AllList = () => {
  return (
    <div className="mt-6 sm:mt-[40px]">
      <h1 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
        Popular list this week
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-between mt-6 sm:mt-[40px] gap-4 sm:gap-0">
        <div className="w-full sm:w-auto">
          {popularLists.map((list) => (
            <ListItem key={list.id} list={list} />
          ))}
        </div>
        <div className="w-full sm:w-auto">
          {popularLists.map((list) => (
            <ListItem key={list.id} list={list} />
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mt-[80px] pb-8 sm:pb-[150px]">
        <h2 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
          Other lists
        </h2>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-6 sm:mt-[40px] gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            {popularLists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
          <div className="w-full sm:w-auto">
            {popularLists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllList;