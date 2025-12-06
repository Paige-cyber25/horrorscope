// hooks/usePopularReviewsThisWeek.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const usePopularReviewsThisWeek = () => {
  return useQuery({
    queryKey: ["popularReviews", "week"],
    queryFn: async () => {
      const { data } = await api.get("/reviews/popular/week");
      return data; // assuming your API returns { success: true, data: [...] }
    },
    select: (response) => {
      // Adjust this based on your actual API response shape
      // Most likely: response.data is the array of reviews
      return response.data || response.reviews || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};