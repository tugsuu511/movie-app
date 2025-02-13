"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Star from "@/icons/Star";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const Genre = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();
  const [totalPage, SetTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const startPage = Math.max(0, currentPage - 2);
  const slicePage = 3;
  const endPage = Math.min(totalPage, startPage + slicePage);

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const selectedGenreIds = searchParams.get("genresId")?.split(",") || [];

  interface Movie {
    vote_average: number;
    poster_path: string | null;
    id: number;
    title: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  // const router = useRouter();

  const getMovieData = useCallback(async () => {
    try {
      setLoading(true);

      const genreListResponse = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      const genreIds = searchParams.get("genresId") || "";
      const genreMoviesResponse = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      SetTotalPage(genreMoviesResponse.data.total_pages);
      setGenres(genreListResponse.data.genres);
      setMovies(genreMoviesResponse.data.results);
      setTotalResults(genreMoviesResponse.data.total_results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message || "Алдаа гарлаа.");
      }
    }
  }, [searchParams, currentPage]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData, currentPage, searchParams]);

  const handleGenreSelection = (genreId: number) => {
    const genreIdStr = genreId.toString();
    let updatedGenres;

    if (selectedGenreIds.includes(genreIdStr)) {
      updatedGenres = selectedGenreIds.filter((id) => id !== genreIdStr);
    } else {
      updatedGenres = [...selectedGenreIds, genreIdStr];
    }

    const queryParams = new URLSearchParams();

    if (updatedGenres.length > 0) {
      queryParams.set("genresId", updatedGenres.join(","));
    } else {
      queryParams.delete("genresId");
    }

    router.push(`/genre/?${queryParams.toString()}`);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      const genreIds = searchParams.get("genresId") || "";
      router.push(`/genre?genresId=${genreIds}&page=${pageNumber}`);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full px-5 p-8 xl:w-[1280px] flex flex-wrap justify-between">
        <div className="mb-8 text-2xl font-semibold xl:w-[1280px] xl:h-[36px] xl:mb-10">
          Search Filter
        </div>
        <div className="w-auto h-auto xl:w-[387px] xl:h-[352px] static fixed lg:sticky">
          <div className="flex justify-between items-start flex-col">
            <div className="text-xl font-semibold ">Search by genre</div>
            <div className="text-base font-normal">
              See lists of movies by genre
            </div>
          </div>
          <div className="flex flex-wrap mt-5 gap-3  ">
            {genres.length > 0 &&
              genres.map((genre) => {
                const genreId = genre.id.toString();
                const isSelected = selectedGenreIds.includes(genreId);
                return (
                  <div
                    key={genre.id}
                    className={`${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black "
                        : ""
                    }h-[20px] border border-gray-500 rounded-full flex justify-between gap-2 items-center p-[10px] text-xs font-semibold cursor-pointer`}
                    onClick={() => handleGenreSelection(genre.id)}
                  >
                    {genre.name}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-start ">
          <div className="text-xl font-semibold mt-8 xl:mt-0">
            {totalResults} titles{" "}
          </div>
          <div className="flex flex-col items-end ">
            <div className="w-[350px] sm:w-[806px] h-auto  flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px] my-10  ">
              {movies.map((movie) => (
                <Link href={`/detail/${movie.id}`} key={movie.id}>
                  <Card
                    key={movie.id}
                    className="w-[158px] h-[309px] sm:w-[165px] sm:h-[330px] flex items-center justify-center rounded-xl "
                  >
                    <CardContent className="flex flex-col items-center justify-center overflow-hidden p-0 bg-customcard dark:bg-customcarddark w-[158px] h-[309px] sm:w-[230px] sm:h-[330px] rounded-xl">
                      <div className="sm:w-[165px] sm:h-[244px] rounded w-[157.5px] h-[233px]">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          width={165}
                          height={244}
                        />
                      </div>
                      <div className="sm:w-[165px] sm:h-[87px] w-[142px] h-[70px] rounded p-2">
                        <div className="w-[149px] h-[23px] flex justify-start items-center gap-2">
                          <Star />
                          {parseFloat(movie.vote_average.toFixed(1))}/10
                        </div>
                        <div className="w-[149px] h-[56px]">{movie.title}</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="xl:w-[110px] xl:h-[40px] flex justify-end items-end xl:mr-10">
              <Pagination className="w-auto float-right">
                <PaginationContent className="">
                  <PaginationItem>
                    <PaginationPrevious
                      className={`${
                        currentPage === 1 && "opacity-50 cursor-default"
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  {[...Array(totalPage).keys()]
                    .slice(startPage, endPage)
                    .map((pageNum) => (
                      <PaginationItem key={pageNum + 1}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum + 1)}
                          isActive={currentPage === pageNum + 1}
                        >
                          {pageNum + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem>
                    <PaginationNext
                      className={`${
                        currentPage === totalPage && "opacity-50 cursor-default"
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;