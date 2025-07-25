import React from "react";
import MovieCard from "./MovieCards";

interface Movie {
  id: string;
  imageSrc: string;
  title: string;
  reviews: number;
  likes: number;
  comments: number;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          imageSrc={movie.imageSrc}
          title={movie.title}
          reviews={movie.reviews}
          likes={movie.likes}
          comments={movie.comments}
        />
      ))}
    </div>
  );
};

export default MovieList;
