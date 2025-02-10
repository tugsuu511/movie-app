import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import Star from "@/icons/Star";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
interface MoviesType {
  genres: { id: number; name: string }[];
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  popularity: number;
  release_date: string;
}

const SearchFull = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      setMovies([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const fetchMovieDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
              },
            }
          );

          setMovies(response.data.results);
          console.log(response.data.results);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError("Киноны мэдээллийг татахад алдаа гарлаа.");
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);
  const formatNumber = (num: number): number => parseFloat(num.toFixed(1));
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="xl:w-[379px] xl:h-[36px] w-[251px] h-[44px] mt-1 xl:mt-0  ">
      <div className="flex items-center border rounded-lg px-3  shadow-sm focus-within:ring-2 focus-within:ring-gray-500  ">
        <SearchIcon className="text-gray-500" />
        <Input
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          value={searchValue}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="border-none text-base w-full focus-visible:ring-0 shadow-none"
        />
      </div>

      {isFocused && searchValue && (
        <div className="xl:w-[577px] w-[335px] h-auto overflow-hidden rounded-lg dark:bg-customText bg-white p-2 mt-2    ">
          {loading ? (
            <p className="text-center text-gray-500 mt-4">Loading...</p>
          ) : movies.length > 0 ? (
            movies.slice(0, 5).map((movie) => (
              <Link
                href={`/detail/${movie.id}`}
                key={movie.id}
                onClick={() => setSearchValue("")}
              >
                <div className="p-2 border-b shadow-sm xl:w-[553px] xl:h-[116px]   flex justify-between items-center mt-2">
                  <div className="w-[67px] h-[100px] rounded">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={""}
                      width={67}
                      height={100}
                      className="rounded"
                    />
                  </div>
                  <div className="xl:w-[454px] xl:h-[99px] w-[212px] h-[99px] flex flex-col xl:justify-between">
                    <div className="xl:w-full xl:h-auto w-[212px] h-auto flex flex-col justify-center">
                      <div className="text-xl font-semibold truncate w-full overflow-hidden">
                        {movie.title}
                      </div>
                      <div className="w-[71px] h-[36px] flex justify-start items-center mt-1">
                        <Star />
                        <div className="w-[43px] h-[36px] flex justify-center items-start flex-col">
                          <div className="w-[43px] h-[20px] flex justify-center items-center font-normal text-sm">
                            {formatNumber(movie.vote_average)}
                            <p className="text-gray-500">/10</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="xl:w-full xl:h-auto w-[212px] h-[51px] flex justify-start items-end">
                      {formatDate(movie.release_date)}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Cant find movies.</p>
          )}
          <div className="text-sm font-semibold mt-3 ml-2">
            See all results for &quot;{searchValue}&quot;
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFull;