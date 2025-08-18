import React from "react";
import ActivityItem from "./ActivityItem";

const activities = [
  {
    id: "1",
    imageSrc: "/images/bagman.png",
    platform: "Netflix",
    title: "The Great Movie",
    content: "A thrilling movie about adventure and mystery.",
    reviews: 1200,
    likes: 4500,
    comments: 320,
  },
  {
    id: "2",
    imageSrc: "/images/bagman.png",
    platform: "YouTube",
    title: "Tech Tutorial",
    content: "Learn the latest in web development with this tutorial.",
    reviews: 850,
    likes: 2300,
    comments: 150,
  },
];

const activity = {
  id: "3",
  imageSrc: "/images/bagman.png",
  platform: "Amazon prime",
  title: "The Great Movie",
  content: "A thrilling movie about adventure and mystery.",
  reviews: 1200,
  likes: 4500,
  comments: 320,
};
const MyActivities = () => {
  return (
    <>
      <div className="mt-4 sm:mt-[20px] flex flex-col gap-4">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            id={activity.id}
            imageSrc={activity.imageSrc}
            platform={activity.platform}
            title={activity.title}
            content={activity.content}
            reviews={activity.reviews}
            likes={activity.likes}
            comments={activity.comments}
          />
        ))}
      </div>

      <div className="flex sm:flex-row flex-col gap-4 sm:justify-between items-start sm:items-center py-[20px] border-b border-b-[rgba(248,248,255,0.2)]">
        <div className="text-[#E5E7EB] text-sm sm:text-base font-normal font-opensans">
          you added <span className="font-bold">TOP SECRET!</span> to his
          watchlist
        </div>
        <div className="text-[#F8F8FF] text-sm font-semibold font-opensans">
          5 days ago
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 sm:justify-between items-start sm:items-center py-[20px] border-b border-b-[rgba(248,248,255,0.2)]">
        <div className="text-[#E5E7EB] text-sm sm:text-base font-normal font-opensans">
          you liked <span className="font-bold">ROBIN’S REVIEW!️</span> 4.7️⭐️
          of A Minecraft Movie
        </div>
        <div className="text-[#F8F8FF] text-sm font-semibold font-opensans">
          5 days ago
        </div>
      </div>

      <div>
        <ActivityItem
          id={activity.id}
          imageSrc={activity.imageSrc}
          platform={activity.platform}
          title={activity.title}
          content={activity.content}
          reviews={activity.reviews}
          likes={activity.likes}
          comments={activity.comments}
        />
      </div>

      <div className="pb-10 sm:pb-[580px]">
        <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4 sm:justify-between mt-[20px] border-b border-b-[rgba(248,248,255,0.2)] pb-[20px]">
          <div className="flex flex-col gap-3">
            <div className="text-[#E5E7EB] text-sm sm:text-base font-normal font-opensans">
              Ayodeji oloruntoba is asking to join your{" "}
              <span className="font-bold">
                Trick ‘r Treat (2024) on Netflix
              </span>{" "}
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-[rgba(255,255,255,0.1)] rounded-[8px] py-1 px-2 text-[#F8F8FF] text-base sm:text-[20px] font-semibold font-opensans cursor-pointer">
                Approve
              </button>
              <button className="bg-[rgba(255,255,255,0.1)] rounded-[8px] py-1 px-2 text-[#F97316] text-base sm:text-[20px] font-semibold font-opensans cursor-pointer">
                Reject
              </button>
            </div>
          </div>
          <div className="text-[#F8F8FF] text-sm font-semibold font-opensans">
            5 days ago
          </div>
        </div>
      </div>
    </>
  );
};

export default MyActivities;
