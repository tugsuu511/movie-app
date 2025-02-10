"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { MovieCard } from "../../../components/Card";
import { Play } from "lucide-react";
import { GenreDiv } from "@/components/GenreDiv";
import Nexticon from "@/icons/Nexticon";
import StarSize from "@/icons/StarSize";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const MovieDetail = () => {
  const router = useParams();
  const { id } = router;
  interface MoviesType {
    genres: { id: number; name: string }[];
    runtime: ReactNode;
    release_date: ReactNode;
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
    popularity: number;
  }

  const [movie, setMovie] = useState<MoviesType | null>(null);
  const [director, setDirector] = useState<{ name: string } | null>(null);
  const [writer, setWriter] = useState<{ name: string } | null>(null);
  const [similarMovie, setSimilarMovie] = useState<MoviesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
          }
        );
        const Director = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
          }
        );
        const similarMovie = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
          }
        );
        const Trailer = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
          }
        );
        const videos = Trailer.data.results;
        const officialTrailer = videos.find(
          (video: { type: string; site: string }) =>
            video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(officialTrailer);

        setMovie(response.data as MoviesType);
        const directorData = Director.data.crew.find(
          (member: { job: string }) => member.job === "Director"
        );

        setDirector(directorData);
        setWriter(writer);

        setSimilarMovie(similarMovie.data.results);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Киноны мэдээллийг татахад алдаа гарлаа.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, writer]);

  if (loading) return <Skeleton className="h-[309px] w-[158px] rounded" />;
  if (error) return <p>error</p>;
  if (!movie) return null;
  if (error) return <p>{error}</p>;
  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(".0", "") + "K";
    if (num <= 1_000) return (num / 1_000).toFixed(1).replace(".0", "") + "K";
    return Math.round(num).toString();
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className=" w-full  pt-8 flex justify-center items-center flex-col">
        <div className="w-full h-[882px]  flex flex-col justify-between items-center xl:w-[1080px]">
          <div className="w-full h-[300px]  flex justify-between items-center flex-col xl:h-[524px]">
            <div className="w-full h-[56px] px-5  flex justify-between items-center">
              <div className="w-[211px]  flex justify-between items-center flex-col">
                <div className="w-[211px] h-auto flex justify-start items-center text-2xl font-semibold ">
                  {movie.title}
                </div>
                <div className="w-[211px] h-[20px]">
                  {movie.release_date} · {movie.runtime} min
                </div>
              </div>
              <div className="w-[71px] h-[56px] justify-center items-end flex">
                <div className="w-[71px] h-[36px]  flex justify-between items-center ">
                  <StarSize />
                  <div className="w-[43px] h-[36px] flex justify-between items-start flex-col">
                    <div className="w-[43px] h-[20px] flex justify-center items-center font-normal text-sm">
                      {movie.vote_average}
                      <p className="text-gray-500">/10</p>
                    </div>
                    <div className="h-[16px] w-[36px] text-xs text-gray-500">
                      {formatNumber(movie.popularity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[211px]  overflow-hidden relative bg-black/40 xl:w-[1080px] xl:h-[428px] xl:flex xl:justify-between xl:items-center xl:bg-transparent xl:mt-8">
              {loading ? (
                <Skeleton className="h-[309px] w-[158px] rounded" />
              ) : (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="xl:w-[290px] xl:h-[428px] hidden xl:block"
                  width={290}
                  height={428}
                />
              )}
              <div className="xl:block hidden relative">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt=""
                  className="w-full h-full object-cover bg-black/40 xl:w-[760px] xl:h-[428px] xl:bg-transparent relative"
                  width={760}
                  height={428}
                />
                <div className="absolute inset-0 bg-black/40  "></div>

                <div
                  className="w-[174px] h-[40px]  absolute bottom-[12px] left-[12px] flex justify-between items-center z-30 "
                  onClick={() => setShowTrailer(true)}
                >
                  <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                    <Play className="w-4 h-4 text-black" />
                  </div>
                  <p className="text-white">Play trailer</p>{" "}
                  <p className="text-white text-sm font-normal">2:35</p>
                </div>
              </div>
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt=""
                className="w-full h-full object-cover bg-black/40 xl:w-[760px] xl:h-[428px] xl:bg-transparent xl:hidden"
                width={760}
                height={428}
              />

              <div className="absolute inset-0 bg-black/40  xl:bg-transparent"></div>
              <div
                className="w-[174px] h-[40px]  absolute bottom-[12px] left-[12px] flex justify-between items-center z-30 xl:hidden "
                onClick={() => setShowTrailer(true)}
              >
                <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                  <Play className="w-4 h-4 text-black" />
                </div>

                <p className="text-white">Play trailer</p>

                {trailer && (
                  <p className="text-white text-sm font-normal">2:35</p>
                )}
              </div>
              {showTrailer && trailer && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                  <iframe
                    width="800"
                    height="450"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                  <X
                    onClick={() => setShowTrailer(false)}
                    className="absolute top-4 right-4 text-white"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-[375px] h-[344px] mt-8 mb-5  px-5 flex justify-between xl:w-[1080px] xl:h-[100px] xl:items-center xl:p-0 xl:flex xl:justify-between xl:items-start">
            <div className="w-[100px] h-[144px]  relative overflow-hidden xl:w-[290px] xl:h-[428px] xl:hidden ">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt=""
                className="w-[100px] h-[144px]"
                width={100}
                height={144}
              />
            </div>
            <div className="w-[201px] h-86  flex justify-start gap-3 items-center flex-col xl:w-[1080px] xl:h-[80px] xl:p-0">
              <div className="w-[201px]  flex flex-wrap gap-2 xl:w-[1080px] xl:h-[20px]">
                {movie.genres.map((genre) => (
                  <GenreDiv key={genre.id} text={genre.name} />
                ))}
              </div>
              <div className="w-[201px] h-[240px]  text-base font-normal xl:w-[1080px] xl:h-[40px] overflow-hidden xl:overflow-visible">
                {movie.overview}
              </div>
            </div>
          </div>
          <div className="w-[335px]  xl:w-[1080px]  ">
            <div className="w-[335px]  pb-3 xl:w-[1080px]  mb-[20px] flex gap-[53px] border-b border-b-customGenre items-center  dark:border-b-customGenredark">
              <h1 className="w-[55px]">Director</h1>
              <p>{director?.name ?? "Unknown"} </p>
            </div>
            <div className="w-[335px]  pb-3 xl:w-[1080px] mb-[20px] flex gap-[53px] border-b border-b-customGenre items-center">
              <h1 className="w-[55px]">Writers</h1>
              <p>{writer?.name ?? "Unknown"}</p>
            </div>
            <div className="w-[335px] pb-3 xl:w-[1080px]  mb-[20px] flex gap-[53px] border-b border-b-customGenre items-center">
              <h1 className="w-[55px]"> Stars</h1>
              <p>Cynthia Erivo · Ariana Grande · Jeff Goldblum </p>
            </div>
          </div>
        </div>
        <div className="w-[335px]   flex justify-center items-start xl:w-[1080px] flex-col">
          <div className="w-[335px] h-[36px] text-2xl font-semibold flex justify-between items-center xl:w-[1080px]">
            More like this
            <button className="w-[120px] h-[36px] px-4 py-2 flex justify-between items-center font-medium text-sm">
              See more
              <Nexticon />
            </button>
          </div>
          <div className="w-[335px] h-auto  flex justify-between gap-4  flex-wrap  sm:gap-[31.2px] xl:w-[1080px] my-4">
            {similarMovie
              .slice(0, 4)
              .map(
                (movie: {
                  id: number;
                  title: string;
                  poster_path: string;
                  vote_average: number;
                }) => (
                  <Link href={`/detail/${movie.id}`} key={movie.id}>
                    <MovieCard
                      key={movie.id}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      name={movie.title}
                      rating={parseFloat(movie.vote_average.toFixed(1))}
                      Loading={loading}
                    />
                  </Link>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;