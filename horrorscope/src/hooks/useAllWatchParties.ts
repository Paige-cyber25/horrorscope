// Assuming this is in your hooks file, e.g., 'src/hooks/useMovies.ts'

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "@/utils/api";
import {
  WatchPartiesApiResponse,
  WatchParty, // Import your component interface
} from "@/utils/utils"; // Import the new types

// Custom hook to fetch all upcoming watch parties
export const useUpcomingWatchParties = () => {
  return useQuery<WatchParty[], AxiosError>({
    queryKey: ["upcomingWatchParties"],
    queryFn: async () => {
      const { data } = await api.get<WatchPartiesApiResponse>(
        "/watch-parties/upcoming"
      );

      // Transform the API response into the WatchParty format
      const watchParties: WatchParty[] = data.data.map((party) => {
        // Parse scheduledAt to get date and time
        const scheduledDate = new Date(party.scheduledAt);
        const dateString = scheduledDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\//g, '-'); // Format: DD-MM-YYYY

        // Extract time (assuming the time from the API is UTC and the component needs a simple display)
        // Note: You might need more sophisticated timezone handling here in a real app.
        const [hours, minutes] = party.time.split(':');
        const timeString = `${hours}:${minutes} WAT`;


        // Map participants' usernames
        const participantsUserNames = party.participants.map(
          (p) => p.userName
        );

        return {
          id: party.id,
          imageSrc: party.film.posterUrl, // Use the film's poster URL
          title: party.film.title, // Use the film's title
          time: timeString, // e.g., "20:00 WAT"
          date: dateString, // e.g., "25-12-2025"
          participants: participantsUserNames,
          host: party.host.userName, // Use the host's username
        };
      });

      return watchParties;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};