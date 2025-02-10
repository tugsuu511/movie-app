import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from 'lucide-react';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const Dropdown = () => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState("");

  const getMovieData = async () => {
    try {
      setLoading(true);

      const genreResponse = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      setGenres(genreResponse.data.genres); 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message || "Алдаа гарлаа.");
      }
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div className="xl:w-[533px] xl:h-[200px] w-[335px] h-[100px] flex  border-t border-gray-500 flex-wrap gap-[8px] pr-10  xl:items-center xl:flex-wrap xl:gap-[16px] pt-2">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className="h-[20px] border border-gray-500 rounded-full flex justify-between gap-2 items-center p-[10px] text-xs font-semibold "
        >
          {genre.name}
          <ChevronRight className="w-4 h-4" />
        </div>
      ))}
    </div>
  );
};

export default Dropdown;