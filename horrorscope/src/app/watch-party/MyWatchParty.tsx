import React, { useState } from "react";
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

const MyWatchParty = () => {
  const [activeTab, setActiveTab] = useState("Public Watch Party");

  const handleTabClick = (
    tab: "Public Watch Party" | "Private Watch Party"
  ) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <button
          className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "Public Watch Party"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
          onClick={() => handleTabClick("Public Watch Party")}
        >
          Public Watch Party
        </button>
        <button
          className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "Private Watch Party"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
          onClick={() => handleTabClick("Private Watch Party")}
        >
          Private Watch Party
        </button>
      </div>
      <div className="mt-8 pb-[50px] sm:pb-[575px]">
        <WatchPartyList parties={trendingWatchParties} />
      </div>
    </div>
  );
};

export default MyWatchParty;
