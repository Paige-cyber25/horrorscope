import React from 'react';
import ActivityItem from './ActivityItem';

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
  {
    id: "3",
    imageSrc: "/images/bagman.png",
    platform: "Amazon prime",
    title: "The Great Movie",
    content: "A thrilling movie about adventure and mystery.",
    reviews: 1200,
    likes: 4500,
    comments: 320,
  },
  {
    id: "4",
    imageSrc: "/images/bagman.png",
    platform: "Netflix",
    title: "The Great Movie",
    content: "A thrilling movie about adventure and mystery.",
    reviews: 1200,
    likes: 4500,
    comments: 320,
  },
  {
    id: "5",
    imageSrc: "/images/bagman.png",
    platform: "Netflix",
    title: "The Great Movie",
    content: "A thrilling movie about adventure and mystery.",
    reviews: 1200,
    likes: 4500,
    comments: 320,
  }
];

const Reviews = () => {
  return (
    <div className="mt-4 sm:mt-[20px] flex flex-col gap-4 pb-10 sm:pb-[400px]">
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
  )
}

export default Reviews