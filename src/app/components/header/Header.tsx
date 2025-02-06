"use client";
import React from "react";
import { Film, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";

const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="mx-5 flex items-center justify-between my-3">
      <div className="flex gap-2 text-indigo-700 bold">
        <Film />
        Movie Z
      </div>
      <div className="flex gap-3">
        <Button variant={"outline"} className="w-[36px] h-[36px] md:hidden">
          <Search />
        </Button>
        <Input placeholder="search" className="hidden md:block"/>
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
  );
};

export default Header;
