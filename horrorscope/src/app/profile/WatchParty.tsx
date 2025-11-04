import React, { useEffect, useRef, useState } from 'react'
import ReviewMovie from '../components/CreateWatchParty';
import WatchPartyList from '../components/WatchPartyList';

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

const WatchParty = () => {
  const [activeTab, setActiveTab] = useState("Public Watch Party");
  const watchPartyContainerRef = useRef<HTMLDivElement>(null);
  const watchPartyButtonRef = useRef<HTMLButtonElement>(null);
  const [showWatchPartyDropdown, setShowWatchPartyDropdown] = useState(false);

  useEffect(() => {
    if (showWatchPartyDropdown) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showWatchPartyDropdown]);

  const handleWatchPartyButtonClick = () => {
    setShowWatchPartyDropdown(!showWatchPartyDropdown);
  };
  const handleTabClick = (tab: "Public Watch Party" | "Private Watch Party") => {
    setActiveTab(tab);
  };

  return (
    <section className='mt-10 sm:mt-[56px]' ref={watchPartyContainerRef}>
      <div className='flex sm:flex-row flex-col gap-4 sm:justify-between items-center'>
      <div className="flex sm:flex-row flex-col items-center gap-3">
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

      <div>
      <button
            onClick={handleWatchPartyButtonClick}
            ref={watchPartyButtonRef}
            className="bg-[#F8F8FF] py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-[81px] text-red-900 text-xs sm:text-sm md:text-base font-opensans font-semibold rounded-[24px] cursor-pointer"
          >
            Create a watch party
          </button>
      </div>

      {showWatchPartyDropdown && (
        <ReviewMovie onClose={() => setShowWatchPartyDropdown(false)} />
      )}
      </div>

    <div className='mt-4 sm:mt-8 pb-10 sm:pb-[404px]'>
    <WatchPartyList parties={trendingWatchParties} />

    </div>
    </section>
  )
}

export default WatchParty