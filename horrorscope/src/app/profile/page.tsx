"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import Films from "./Films";
import Activity from "./Activity";
import Reviews from "./Reviews";
import WatchList from "./WatchList";
import List from "./List";
import WatchParty from "./WatchParty";
import { TabCounts, TabName } from "@/utils/utils";

const Page = () => {
  const [showEditProfileDropdown, setShowEditProfileDropdown] = useState(false);
  const [showChangePasswordDropdown, setShowChangePasswordDropdown] =
    useState(false);
  const editProfileButtonRef = useRef<HTMLButtonElement>(null);
  const changePasswordButtonRef = useRef<HTMLButtonElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabName>("Films");
  // Use TabCounts interface for tabCounts state
  const [tabCounts] = useState<TabCounts>({
    Films: 3,
    Activity: 5,
    Reviews: 2,
    Watchlist: 10,
    List: 4,
    "Watch party": 1,
  });

  useEffect(() => {
    if (showEditProfileDropdown || showChangePasswordDropdown) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showEditProfileDropdown, showChangePasswordDropdown]);

  const handleEditProfileButtonClick = () => {
    setShowEditProfileDropdown(!showEditProfileDropdown);
  };

  const handleChangePasswordButtonClick = () => {
    setShowChangePasswordDropdown(!showChangePasswordDropdown);
  };

  const handleTabClick = (tab: TabName) => {
    setActiveTab(tab);
  };

  // Use TabName type for the tab parameter
  const getTabTitle = (tab: TabName) => {
    return activeTab === tab ? `${tab}(${tabCounts[tab]})` : tab;
  };

  const tabs: TabName[] = [
    "Films",
    "Activity",
    "Reviews",
    "Watchlist",
    "List",
    "Watch party",
  ];

  return (
    <section className="header h-full w-full pt-8 sm:pt-[75px]">
      <div className="mx-6 sm:mx-[97px]">
        <div className="flex flex-col sm:flex-row gap-6 sm:justify-between pb-6 sm:pb-[50px] sm:items-start items-center">
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={240}
                height={172}
                quality={100}
                className="w-full h-auto sm:w-[240px] sm:h-[172px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-[#F1F5F9] text-[24px] font-semibold font-opensans sm:text-[36px]">
                Ayodeji Oloruntoba Victor
              </span>
              <div className="flex gap-2 items-center text-[#D1D5DB]">
                <Icon icon="mi:location" className="text-xl sm:text-2xl" />
                <span className="text-sm font-normal font-opensans">
                  Lagos, Nigeria.
                </span>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-[35px] items-center">
                <div className="flex flex-col gap-[.2px] items-start">
                  <span className="text-[#D1D5DB] text-sm font-normal font-opensans">
                    Films
                  </span>
                  <span className="text-[#F1F5F9] text-[20px] font-bold font-opensans sm:text-[30px]">
                    1,153
                  </span>
                </div>
                <div className="flex flex-col gap-[.2px] items-start">
                  <span className="text-[#D1D5DB] text-sm font-normal font-opensans">
                    This Year
                  </span>
                  <span className="text-[#F1F5F9] text-[20px] font-bold font-opensans sm:text-[30px]">
                    678
                  </span>
                </div>
                <div className="flex flex-col gap-[.2px] items-start">
                  <span className="text-[#D1D5DB] text-sm font-normal font-opensans">
                    Watchlist
                  </span>
                  <span className="text-[#F1F5F9] text-[20px] font-bold font-opensans sm:text-[30px]">
                    80
                  </span>
                </div>
                <div className="flex flex-col gap-[.2px] items-start">
                  <span className="text-[#D1D5DB] text-sm font-normal font-opensans">
                    Following
                  </span>
                  <span className="text-[#F1F5F9] text-[20px] font-bold font-opensans sm:text-[30px]">
                    180
                  </span>
                </div>
                <div className="flex flex-col gap-[.2px] items-start">
                  <span className="text-[#D1D5DB] text-sm font-normal font-opensans">
                    Followers
                  </span>
                  <span className="text-[#F1F5F9] text-[20px] font-bold font-opensans sm:text-[30px]">
                    8,980
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto"
            ref={buttonContainerRef}
          >
            <button
              onClick={handleEditProfileButtonClick}
              ref={editProfileButtonRef}
              className="text-[#121212] text-base font-semibold font-opensans rounded-[24px] py-4 px-6 bg-[#F8F8FF] cursor-pointer w-full sm:w-auto"
            >
              Edit profile details
            </button>
            <button
              onClick={handleChangePasswordButtonClick}
              ref={changePasswordButtonRef}
              className="text-[#F8F8FF] text-base font-semibold font-opensans rounded-[24px] py-4 px-6 border border-[#F8F8FF] cursor-pointer w-full sm:w-auto"
            >
              Change Password
            </button>
          </div>
          {showEditProfileDropdown && (
            <EditProfile onClose={() => setShowEditProfileDropdown(false)} />
          )}
          {showChangePasswordDropdown && (
            <ChangePassword
              onClose={() => setShowChangePasswordDropdown(false)}
            />
          )}
        </div>

        <div className="mt-8 sm:mt-[50px]">
          <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-2 sm:space-y-0 border-b border-[rgba(255,255,255,0.1)] overflow-x-auto whitespace-nowrap sm:whitespace-normal">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-xs sm:text-sm font-semibold cursor-pointer ${
                  activeTab === tab
                    ? "border-b-1 border-[#F8F8FF] text-[#F8F8FF]"
                    : "border-b-1 border-transparent text-gray-700"
                } sm:min-w-0 min-w-[100px]`}
                onClick={() => handleTabClick(tab)}
              >
                {getTabTitle(tab)}
              </button>
            ))}
          </div>
          {activeTab === "Films" && <Films />}
          {activeTab === "Activity" && <Activity />}
          {activeTab === "Reviews" && <Reviews />}
          {activeTab === "Watchlist" && <WatchList />}
          {activeTab === "List" && <List />}
          {activeTab === "Watch party" && <WatchParty />}
        </div>
      </div>
    </section>
  );
};

export default Page;
