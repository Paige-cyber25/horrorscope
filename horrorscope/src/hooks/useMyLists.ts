
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api"; 
import { ListData } from "@/utils/utils"; 

interface FetchListsResponse {
    success: boolean;
    message: string;
    data: ListData[]; // Array of the user's lists
}

export const useMyLists = () => {
    return useQuery<ListData[], Error>({ 
        queryKey: ['myLists'],
        queryFn: async () => {
            const { data } = await api.get<FetchListsResponse>("/lists/my-lists"); 
            
            if (!data.success) {
                throw new Error(data.message || "Failed to fetch user lists.");
            }
            return data.data; // Now 'data' is correctly defined
        },
        // Temporary change to test caching
        staleTime: 0, 
    });
};