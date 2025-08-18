import React, { useState } from "react";
import MyActivities from "./MyActivities";
import OtherActivities from "./OtherActivities";

const Activity = () => {
  const [activeTab, setActiveTab] = useState("My activities");
  const handleTabClick = (tab: "My activities" | "Other activities") => {
    setActiveTab(tab);
  };

  return (
    <section className="mt-10 sm:mt-[56px]">
      <div>
        <div className="flex items-center gap-3">
          <button
            className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "My activities"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
            onClick={() => handleTabClick("My activities")}
          >
            My activities
          </button>
          <button
            className={`py-[10px] px-3 rounded-[24px] text-sm font-opensans
            ${
              activeTab === "Other activities"
                ? "text-[#0A0A0A] bg-white font-semibold "
                : "border border-[#D0D5DD] text-sm text-[#F8F8FF] font-normal"
            }`}
            onClick={() => handleTabClick("Other activities")}
          >
            Other activities
          </button>
        </div>

        {activeTab === "My activities" && <MyActivities />}
        {activeTab === "Other activities" && <OtherActivities />}
      </div>
    </section>
  );
};

export default Activity;
