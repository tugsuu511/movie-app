"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { MovieCard } from "@/components/Card";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const CategoryPage = () => {
  const { segment } = useParams();
  const params = useParams();

  const [movies, setMovies] = useState<
    { id: number; poster_path: string; title: string; vote_average: number }[]
  >([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPage, SetTotalPage] = useState(1);
  const currentPage = Number(params.page);
  const startPage = Math.max(0, currentPage - 2);
  const slicePage = 3;
  const endPage = Math.min(totalPage, startPage + slicePage);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${segment}?language=en-US&page=${currentPage}`,
          { headers: { Authorization: `Bearer ${TMDB_API_KEY}` } }
        );
        setMovies(response.data.results);
        SetTotalPage(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Киноны мэдээллийг татахад алдаа гарлаа.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [segment, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    router.push(`/category/${segment}/${pageNumber}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>errror</p>;

  return (
    <div className="w-screen h-auto flex justify-center items-center my-10">
      <div className="w-full sm:w-[1440px] h-auto px-5 sm:px-20 flex flex-col gap-3">
        <h1 className="text-2xl font-semibold mb-5 capitalize">{segment}</h1>
        <div className="w-[350px] sm:w-[1277px]  flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px]">
          {movies.map((movie) => (
            <Link href={`/detail/${movie.id}`} key={movie.id}>
              <MovieCard
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/default-poster.jpg"
                }
                name={movie.title}
                rating={parseFloat(movie.vote_average.toFixed(1))}
                Loading={loading}
              />
            </Link>
          ))}
        </div>
        <div className="xl:w-[1290px] xl:h-[40px] flex justify-end items-end">
          <Pagination className="w-auto float-right">
            <PaginationContent className="">
              <PaginationItem>
                <PaginationPrevious
                  className={`${
                    currentPage &&
                    currentPage < 2 &&
                    `opacity-50 hover:bg-transparent hover:text-white hover:cursor-default`
                  }`}
                  href="#"
                  onClick={() =>
                    currentPage &&
                    currentPage > 1 &&
                    handlePageChange(currentPage - 1)
                  }
                />
              </PaginationItem>
              {[...Array(totalPage).keys()]
                .slice(startPage, endPage)
                .map((pageNum) => (
                  <PaginationItem key={pageNum + 1}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(pageNum + 1)}
                      isActive={currentPage === pageNum + 1}
                      className="text-gray-500"
                    >
                      {pageNum + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={`${
                    currentPage && currentPage === totalPage && `opacity-50`
                  }`}
                  href="#"
                  onClick={() =>
                    currentPage &&
                    currentPage < totalPage &&
                    handlePageChange(currentPage + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;