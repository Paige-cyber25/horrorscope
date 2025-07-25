import React from "react";
import WatchPartyCard from "./WatchPartyCard";

interface WatchParty {
  id: string;
  imageSrc: string;
  title: string;
  time: string;
  date: string;
  participants: string[]; // Array of participant names or initials
  host: string; // Host's name
}

interface WatchPartyListProps {
  parties: WatchParty[];
}

const WatchPartyList: React.FC<WatchPartyListProps> = ({ parties }) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {parties.map((party) => (
          <WatchPartyCard
            key={party.id}
            id={party.id}
            imageSrc={party.imageSrc}
            title={party.title}
            time={party.time}
            date={party.date}
            participants={party.participants}
            host={party.host}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchPartyList;