
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api"; 
import { ListData } from "@/utils/utils"; // Import the defined type

interface FetchListsResponse {
    success: boolean;
    message: string;
    data: ListData[];
}

export const usePublicLists = () => {
    return useQuery<ListData[], Error>({
        queryKey: ['publicLists'],
        queryFn: async () => {
            const { data } = await api.get<FetchListsResponse>("/lists/public");
            return data.data; // Return the array of list objects
        },
        // Optional: time to keep data fresh/stale
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};