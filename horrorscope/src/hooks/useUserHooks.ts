// hooks/useUserHooks.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "@/utils/api"; 
import { AllUsersApiResponse, SelectOption, WatchPartyApiResponse, WatchPartyPayload } from "@/utils/utils"; 
import toast from "react-hot-toast";

// Custom hook to fetch all users for the participants list
export const useAllUsers = () => {
  return useQuery<SelectOption[], AxiosError>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      // NOTE: Assuming your API defaults to returning all users or you want to pass query params for filtering/pagination
      const { data } = await api.get<AllUsersApiResponse>("/auth/users");
      
      // Transform the API response into the format needed for SearchableSelect
      const options: SelectOption[] = data.data.data.map(user => ({
        value: user.id, // The ID is sent to the BE
        label: user.userName, // The username is displayed to the user
      }));
      
      return options;
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache, as the user list probably doesn't change often
  });
};

// Custom hook for creating a watch party
export const useCreateWatchParty = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    // The generic type TData is now correctly specified as WatchPartyApiResponse
    return useMutation<WatchPartyApiResponse, AxiosError, WatchPartyPayload>({
        mutationFn: (payload: WatchPartyPayload) => {
            return api.post("/watch-parties", payload);
        },
        onSuccess: () => {
            toast.success("Watch party created successfully!");
            queryClient.invalidateQueries({ queryKey: ['upcomingWatchParties'] });
            queryClient.invalidateQueries({ queryKey: ['myWatchParties'] });
            onSuccess();
        },
        onError: (error) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || "Failed to create watch party.";
            toast.error(errorMessage);
        },
    });
};