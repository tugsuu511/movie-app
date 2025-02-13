import React, { FC } from "react";
import Link from "next/link";
import { MovieCard } from "./Card";
import Nexticon from "@/icons/Nexticon";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface SeemoreProps {
  movies: Movie[];
  title: string;
  loading: boolean;
  link: string;
}

const Seemore: FC<SeemoreProps> = ({ movies, title, loading, link }) => {
  return (
    <div className="w-full sm:w-[1440px] h-auto sm:h-[978px] px-5 sm:px-20 flex justify-between items-center flex-col">
      <div className="w-full sm:w-[1277px] h-[36px] flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-semibold leading-24">
          {title}
        </h1>
        <Link href={link}>
          <button className="w-[120px] h-[36px] px-4 py-2 flex justify-between items-center font-medium border rounded-sm">
            See more
            <Nexticon />
          </button>
        </Link>
      </div>
      <div className="w-[350px] sm:w-[1277px] h-auto sm:h-[910px] flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px]">
        {movies.slice(0, 10).map((movie) => (
          <Link href={`/detail/${movie.id}`} key={movie.id}>
            <MovieCard
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              name={movie.title}
              rating={parseFloat(movie.vote_average.toFixed(1))}
              Loading={loading}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Seemore;