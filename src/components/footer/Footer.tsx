"use client";

import React from "react";

import { Film } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen bg-indigo-700 xl:flex xl:justify-center xl:items-center xl:flex-row flex justify-center items-center text-white">
      <div className="w-[375px] h-[308px] py-[40px] px-[20px] bg-indigo-700  flex justify-between items-start flex-col xl:flex xl:justify-between xl:items-center xl:flex-row xl:h-50 xl:w-[1280px]">
        <div className="w-[247px] h-[52px]  flex flex-col justify-between items-start">
          <div className="w-[92px] h-[20px] flex justify-start items-center gap-2 font-bold ">
            <Film className="w-5 h-5" /> Movie Z
          </div>
          <div className="w-[247px] h-[20px] text-sm">
            © 2024 Movie Z. All Rights Reserved.
          </div>
        </div>
        <div className="w-[335px] h-[148px]  flex justify-between items-start">
          <div className="w-[174px] h-[136px]  justify-between items-start flex flex-col">
            Contact Information
            <div className="w-[174px] h-[104px]  flex justify-between items-start flex-col">
              <div className="w-[174px] h-[40px]  flex justify-between items-center">
                <Mail className="w-4 h-4" />
                <div className="w-[146px] h-[40px] text-sm">
                  <div> Email:</div>
                  <div> tugserdenedamdin@gmail.com</div>
                </div>
              </div>
              <div className="w-[174px] h-[40px]  flex justify-between items-center">
                <Phone className="w-4 h-4" />
                <div className="w-[146px] h-[40px] text-sm">
                  <div> Phone:</div>
                  <div> +976 80103878</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[113px] h-[148px] line-height-1.25rem flex justify-between items-start flex-col">
            Follow us
            <div className="w-[68px] h-[116px] flex justify-between items-start flex-col">
              <Link
                href="https://www.facebook.com/pinecone.academy.mongolia"
                className="w-[66px] h-[20px] font-medium"
              >
                Facebook
              </Link>
              <Link
                href="https://www.instagram.com/_dtgsuuuuu/"
                className="w-[66px] h-[20px] font-medium"
              >
                Instagram
              </Link>
              <Link
                href="https://www.X.com/"
                className="w-[66px] h-[20px] font-medium"
              >
                Twitter
              </Link>
              <Link
                href="https://www.Youtube.com/"
                className="w-[66px] h-[20px] font-medium"
              >
                Youtube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
