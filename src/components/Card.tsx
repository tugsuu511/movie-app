"use client";

import { Card, CardContent } from "@/components/ui/card";

import Star from "@/icons/Star";
import Image from "next/legacy/image";

interface MovieCardProps {
  src: string;
  name: string;
  rating: number;
  Loading: boolean;
}

export const MovieCard = ({ src, name, rating }: MovieCardProps) => {
  return (
    <Card className="w-[158px] h-[309px] sm:w-[230px] sm:h-[439px] flex items-center justify-center rounded-xl overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center overflow-hidden p-0 bg-customcard dark:bg-customcarddark w-[158px] h-[309px] sm:w-[230px] sm:h-[439px]">
        <div className="sm:w-[229.73px] sm:h-[340px] rounded w-[157.5px] h-[233px]">
          <Image
            src={src}
            alt={name}
            // className="sm:w-[229.73px] sm:h-[340px] rounded w-[157.5px] h-[233px]"
            // layout="fill"
            width={229.73}
            height={340}
            // objectFit="contain"
          />
        </div>
        {/* <Image src={src} alt={name} layout={"fill"} objectFit="cover" /> */}
        <div className="sm:w-[230px] sm:h-[96px] w-[142px] h-[70px] rounded p-2">
          <div className="w-[214px] h-[23px] flex justify-start items-center gap-2">
            <Star />
            {rating}/10
          </div>
          <div className="w-[214px] h-[56px]">{name}</div>
        </div>
      </CardContent>
    </Card>
  );
};