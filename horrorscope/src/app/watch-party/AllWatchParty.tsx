import React from "react";
import WatchPartyList from "../components/WatchPartyList";

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

const AllWatchParty = () => {
  return (
    <div className="mt-6">
      <h1 className="text-[#F8F8FF] text-[18px] sm:text-[24px] font-opensans font-bold">
        Popular watch this week
      </h1>
      <div className="mt-4 pb-[50px] sm:pb-[116px]">
        <div className="flex flex-col gap-6">
          <WatchPartyList parties={trendingWatchParties} />
          <WatchPartyList parties={trendingWatchParties} />
        </div>
      </div>
    </div>
  );
};

export default AllWatchParty;
