"use client";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/legacy/image";
import Seemore from "../components/Seemore";
import DetailCard from "../components/DetailCard";
import { X } from "lucide-react";
import { Movie } from "@/types/Movie-type";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;


export default function Home() {
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  useEffect(() => {
    const getMovieData = async () => {
      try {
        setLoading(true);

        const [upcomingRes, popularRes, topRatedRes, nowPlayingRes] =
          await Promise.all([
            axios.get(`${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`, {
              headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
              },
            }),
            axios.get(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
              headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
              },
            }),
            axios.get(
              `${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
              {
                headers: {
                  Authorization: `Bearer ${TMDB_API_KEY}`,
                },
              }
            ),
            axios.get(
              `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
              {
                headers: {
                  Authorization: `Bearer ${TMDB_API_KEY}`,
                },
              }
            ),
          ]);

        setUpcomingMovies(upcomingRes.data.results);
        setPopularMovies(popularRes.data.results);
        setTopRated(topRatedRes.data.results);
        setNowPlaying(nowPlayingRes.data.results);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.status_message || "Error fetching data"
          );
        }
      }
    };

    getMovieData();
  }, []);

  const fetchTrailer = async (movieId: number) => {
    try {
      console.log("Fetching trailer for movie ID:", movieId);

      const trailerRes = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      const officialTrailer = trailerRes.data.results.find(
        (video: { type: string; site: string }) =>
          video.type === "Trailer" && video.site === "YouTube"
      );

      if (officialTrailer) {
        setTrailer(officialTrailer);
        setShowTrailer(true);
      } else {
       
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
      if (axios.isAxiosError(error)) {
        alert(
          `Failed to fetch trailer: ${
            error.response?.data.status_message || "Unknown error"
          }`
        );
      }
    }
  };

  return (
    <>
      <div className="w-full h-auto flex justify-between items-center flex-col mb-10 gap-12 sm:gap-20">
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselPrevious className="left-5 sm:left-11 z-20 top-40 xl:top-80" />
          <CarouselContent>
            {nowPlaying.slice(0, 10).map((movie, index) => (
              <CarouselItem key={index}>
                <div className="relative">
                  <Card className="w-full sm:w-screen overflow-hidden">
                    <CardContent className="flex items-center justify-center h-[300px] sm:h-[600px] w-full relative p-0 overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        objectFit="cover"
                        layout="fill"
                      />
                    </CardContent>
                  </Card>
                  <DetailCard movie={movie} fetchTrailer={fetchTrailer} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-5 sm:right-11 z-20 top-40 xl:top-80" />
        </Carousel>

        <Seemore
          movies={upcomingMovies}
          title={"Upcoming"}
          loading={false}
          link="/category/upcoming/1"
        />
        <Seemore
          movies={popularMovies}
          title={"Popular"}
          loading={false}
          link="/category/popular/1"
        />
        <Seemore
          movies={topRated}
          title={"Top Rated"}
          loading={false}
          link="/category/top_rated/1"
        />
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
            className="absolute top-4 right-4 text-white cursor-pointer"
          />
        </div>
      )}
    </>
  );
}