// utils/data-transformer.ts

import { ApiMovie, ComponentMovie } from "./utils";

/**
 * Transforms an array of API Movie objects to the format expected by the MovieCard component.
 * @param apiMovies The array of movies returned from the backend API.
 * @returns An array of ComponentMovie objects.
 */
export const transformApiMoviesToComponentMovies = (apiMovies: ApiMovie[]): ComponentMovie[] => {
  return apiMovies.map((movie) => ({
    id: movie.id,
    
    // 1. Map API posterUrl to component imageSrc
    imageSrc: movie.posterUrl || '/images/default-movie-poster.png',
    
    // 2. Combine title and year (from releaseDate)
    // Note: The original Card component only shows 'title', so we'll adjust the component or keep only the title.
    // For now, let's keep only the title as per your component, but you can add the year if needed.
    title: movie.title,
    
    // 3. Map API rating/review counts to component fields
    // I'm using 'averageRating' for the 'reviews' field in your component since it's displayed next to the star icon.
    // NOTE: Your MovieCard shows a single number next to a star, which typically means a rating (e.g., 4.5/5). 
    // The API field `averageRating` is a better fit for this slot than a count of reviews.
    reviews: parseFloat(movie.averageRating), 
    
    // 4. Map API likedCount to component likes
    likes: movie.likedCount,
    
    // 5. Map API reviewCount (actual written reviews) to component comments
    comments: movie.reviewCount,
  }));
};