'use client';
import MemeGrid from "@/components/MemeGrid";
import MenuBar from "@/components/MenuBar";
import SearchBar from "@/components/SearchBar";
import { useMemeStore } from "@/hooks/useMemes";
import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { IoIosSettings } from "react-icons/io";

export default function Home() {
  // Load the memes if they are not loaded
  const [loadAsciis] = useMemeStore((state) => [
    state.loadAsciis,
  ]);
  const isOnceCalled = useRef(false);

  useEffect(() => {
    if (isOnceCalled.current === false) {
      isOnceCalled.current = true;
      loadAsciis();
    }
  }
  );

  return (
    <>
      <Toaster />
      <main className="flex min-h-screen flex-col items-center p-8">
        {/* Title and settings */}
        <div className="flex flex-row justify-between w-full align-center ">

          <div className="text-textcolor">
            ¯\_(ツ)_/¯ Mojiverse
          </div>

          <IoIosSettings color="#767676" size={32} />
        </div>


        {/* Search bar */}

        <SearchBar />

        <div className="m-3"></div>

        {/* Menu bar */}
        <MenuBar />

        <div className="m-3"></div>

        {/* Emojis/Gifs */}
        <MemeGrid />

      </main>

    </>
  );
}
