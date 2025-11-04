// hooks/useMovieHooks.ts (or similar file)

import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { api } from "@/utils/api"; // Assuming your API instance is here
import { Movie, ReviewPayload, ErrorResponse, SelectOption } from "@/utils/utils"; 
// Assuming you have defined Movie, ReviewPayload, and SelectOption types

// --- 1. Fetch Movies Hook ---
interface MovieApiResponse {
  success: boolean;
  message: string;
  data: {
    movies: Movie[];
    total: number;
    totalPages: number;
  };
}

// Custom hook to fetch the popular horror movies
export const usePopularHorrorMovies = () => {
  return useQuery<SelectOption[], AxiosError>({
    queryKey: ['popularHorrorMovies'],
    queryFn: async () => {
      const { data } = await api.get<MovieApiResponse>("/movies/horror/popular?page=1");
      
      // Transform the API response into the format needed for SearchableSelect
      const options: SelectOption[] = data.data.movies.map(movie => ({
        value: movie.id, // The ID is sent to the BE
        label: movie.title, // The title is displayed to the user
      }));
      
      return options;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};


// --- 2. Submit Review Hook ---
// Assuming ReviewPayload is: { filmId: string; rating: number; reviewText: string; streamingPlatform: string; }
// And the BE response is similar to the login response structure.
interface ReviewResponse {
  success: boolean;
  message: string;
}

export const useReviewMovieMutation = (onSuccessCallback: () => void) => {
  return useMutation<ReviewResponse, AxiosError, ReviewPayload>({
    mutationFn: async (payload: ReviewPayload) => {
      // The API endpoint for reviewing a movie is /reviews
      const { data } = await api.post("/reviews", payload);
      return data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Review submitted successfully!");
      onSuccessCallback(); // Close modal, clear form, etc.
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || "Failed to submit review.";
      toast.error(errorMessage);
    },
  });
};