// Assuming this is in your hooks file, e.g., 'src/hooks/useWatchParties.ts'

import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "@/utils/api";
import {
  WatchPartiesApiResponse, // Reuse the response type from before
  WatchParty, // Reuse the component interface
} from "@/utils/utils"; // Import the required types

// Custom hook to fetch the current user's watch parties
export const useMyWatchParties = () => {
  return useQuery<WatchParty[], AxiosError>({
    queryKey: ["myWatchParties"],
    queryFn: async () => {
      const { data } = await api.get<WatchPartiesApiResponse>(
        "/watch-parties/user/me"
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
        const [hours, minutes] = party.time.split(':');
        const timeString = `${hours}:${minutes} WAT`;

        // Map participants' usernames
        const participantsUserNames = party.participants.map(
          (p) => p.userName
        );

        // Include the isPrivate flag to enable filtering in the component
        // Note: The WatchParty interface should be extended to include this, or
        // we pass the full transformed object and filter based on the original data.
        // For simplicity, let's keep the WatchParty interface as is and filter in the component.
        return {
          id: party.id,
          imageSrc: party.film.posterUrl,
          title: party.film.title,
          time: timeString,
          date: dateString,
          participants: participantsUserNames,
          host: party.host.userName,
          isPrivate: party.isPrivate, // Temporarily include for filtering
        } as WatchParty & { isPrivate: boolean }; // Type assertion for internal use
      });

      // Filter out the temporary isPrivate key before returning to fit the component's type (optional but clean)
      // Since the filtering happens in the component, we'll return the array as is, 
      // but ensure the component knows how to handle the filtering.
      return watchParties as (WatchParty & { isPrivate: boolean })[];
    },
    staleTime: 1000 * 60, // 1 minute cache, slightly less stale for user-specific data
  });
};