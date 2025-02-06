"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/types/Movie-type";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
 
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
 
export default function Home() {
  const [nowPlayingData, setNowPlayingData] = useState<Movie[]>([]);
  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
 
  const getNowPlayingMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      console.log("Now Playing Movies:", response.data.results);
      setNowPlayingData(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };
 
  useEffect(() => {
    getMovieData();
    getNowPlayingMovieData();
  }, []);
 
  return (
    <div className="h-screen w-screen">
      <div className="md:hidden">
        <Carousel className="w-screen flex flex-col p-0 ">
          <CarouselContent>
            {nowPlayingData.slice(0, 10).map((movie) => (
              <CarouselItem key={movie.id}>
                <div>
                  <Card>
                    <CardContent className="flex  justify-center p-0">
                      <div className="">
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                          width={1000}
                          height={250}
                          alt="Picture of the author"
                        />
                        <div className="p-5">
                          <div className="flex justify-between">
                            <div>
                              <p>Now playing:</p>
                              <h3 className="font-semibold text-2xl">
                                {movie.title}
                              </h3>
                            </div>
                            <div className="flex gap-1 items-center">
                              <Star className="text-yellow-400 w-7 h-7" />
                              {movie.vote_average}/10
                            </div>
                          </div>
                          <div>
                            <p className="font-normal text-sm leading-5 my-4 h-[100px] overflow-hidden overflow-y-auto">
                              {movie.overview}
                            </p>
                          </div>
                          <Button>
                            <Play />
                            Watch trailer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      </div>
 
      <div>
      <Carousel className="w-screen flex flex-col p-0 ">
          <CarouselContent>
            {nowPlayingData.slice(0, 10).map((movie) => (
              <CarouselItem key={movie.id}>
                <div>
                  <Card>
                    <CardContent className="p-0 ">
                      <div className="">
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                          width={10000}
                          height={600}
                          alt="Picture of the author"
                          className="absolute "
                        />
                        <div className="p-5 relative top-0 left-0 h-[600px]">
                          <div className="flex flex-col gap-3">
                            <div className="text-white">
                              <p>Now playing:</p>
                              <h3 className="font-semibold text-2xl">
                                {movie.title}
                              </h3>
                            </div>
                            <div className="flex gap-1 items-center text-white">
                              <Star className="text-yellow-400 w-7 h-7" />
                              {movie.vote_average}/10
                            </div>
                          </div>
                          <div>
                            <p className="font-normal text-sm leading-5 my-4 w-[302px] h-[100px] overflow-hidden overflow-y-auto text-white">
                              {movie.overview}
                            </p>
                          </div>
                          <Button>
                            <Play />
                            Watch trailer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
}