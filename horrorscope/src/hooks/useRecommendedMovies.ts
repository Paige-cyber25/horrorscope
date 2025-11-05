

import { api } from '@/utils/api';
import { transformApiMoviesToComponentMovies } from '@/utils/data-transformer';
import { ComponentMovie, MovieApiResponse } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios'; 


// The final type returned by the hook should be the ComponentMovie array
export const useRecommendedMovies = () => {
  return useQuery<ComponentMovie[], AxiosError>({
    queryKey: ['recommendedMovies'],
    queryFn: async () => {
      // 1. Fetch the raw API data
      const { data } = await api.get<MovieApiResponse>("/movies/horror/popular?page=1");
      
      // 2. Transform the raw API array (data.data.movies) before returning
      return transformApiMoviesToComponentMovies(data.data.movies);
    },
    staleTime: 1000 * 60 * 5,
  });
};