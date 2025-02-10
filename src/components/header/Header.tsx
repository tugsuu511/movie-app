"use client";

// import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import SearchFull from "../Search";
import { Search } from "lucide-react";
import { X } from "lucide-react";
import Dropdown from "../Dropdown";
import { useState } from "react";
import { Film } from "lucide-react";
export default function Home() {

  try {
  } catch (error) {
    console.log(error);
  }

  const { setTheme , theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-[59px] ">
      <div className="w-full h-[59px] flex justify-center items-center fixed z-40 bg-white dark:bg-black px-4 sm:px-6">
        <div className="w-full max-w-[1280px] h-[36px] flex justify-between items-center">
          <div className="flex gap-2 text-indigo-700 font-bold">
            <Film />
            Movie Z
          </div>
          <div className="w-[488px] h-[36px] hidden md:flex  flex justify-between items-center">
            <Select>
              <SelectTrigger className="w-[97px] h-[36px] border border-white-500">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="w-[575px] h-[305px]">
                <SelectGroup className="pl-3">
                  <p className="font-semibold text-2xl px-4 py-2">Genres</p>
                  <p className="font-normal text-base px-4 pb-2">
                    See lists of movies by genre
                  </p>
                  <div>
                    <Dropdown />
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
            <SearchFull />
          </div>
          <div className="flex gap-3">
            <div className="relative w-[36px] h-[36px] xl:hidden flex justify-center items-center">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <Search />
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
            <div
              className={`absolute top-0 left-0 w-full bg-white dark:bg-black shadow-md rounded transition-all duration-700 ease-in-out z-30 flex justify-center
                 ${
                   isOpen
                     ? "h-[59px] opacity-100"
                     : "h-0 opacity-0 overflow-hidden"
                 }`}
            >
              <div className=" w-[340px] h-[59px] flex justify-between items-center">
                <div className="w-[299px] h-[44px] flex justify-between items-center">
                  <Select>
                    <SelectTrigger className="w-[36px] h-[36px] border border-white-500">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="xl:w-[575px] xl:h-[305px] w-[335px] h-[513px]">
                      <SelectGroup className="pl-3 ">
                        <p className="font-semibold text-2xl px-4 py-2">
                          Genres
                        </p>
                        <p className="font-normal text-base px-4 pb-2">
                          See lists of movies by genre
                        </p>
                        <div>
                          <Dropdown />
                        </div>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <SearchFull />
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4 cursor-pointer text-gray-500 hover:text-black" />
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              {theme === "dark" ? (
                <Button
                  variant={"outline"}
                  className="w-9 h-9"
                  onClick={() => setTheme("light")}
                >
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              ) : (
                <Button
                  variant={"outline"}
                  className="w-9 h-9"
                  onClick={() => setTheme("dark")}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
