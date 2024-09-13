'use client';
import MemeGrid from "@/components/MemeGrid";
import MenuBar from "@/components/MenuBar";
import SearchBar from "@/components/SearchBar";
import { useMemeStore } from "@/hooks/useMemes";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoIosSettings } from "react-icons/io";

export default function Home() {
  // Load the memes if they are not loaded
  const [loadAsciis, maxResultsAtOnce, setMaxResultsAtOnce, crossAxisCount, setCrossAxisCount] = useMemeStore((state) => [
    state.loadAsciis,
    state.maxResultsAtOnce,
    state.setMaxResultsAtOnce,
    state.crossAxisCount,
    state.setCrossAxisCount

  ]);
  const isOnceCalled = useRef(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (isOnceCalled.current === false) {
      isOnceCalled.current = true;
      loadAsciis();
    }
  }
  );


  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  // Close modal if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeSettings();
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);


  return (
    <>
      <Toaster />
      <main className="flex min-h-screen flex-col items-center p-8">
        {/* Title and settings */}
        <div className="flex flex-row justify-between w-full align-center ">

          <div className="text-textcolor">
            ¯\_(ツ)_/¯ Mojiverse
          </div>

          <IoIosSettings className="cursor-pointer" onClick={openSettings} color="#767676" size={32} />
        </div>


        {/* Search bar */}

        <SearchBar />

        <div className="m-3"></div>

        {/* Menu bar */}
        <MenuBar />

        <div className="m-3"></div>

        {/* Emojis/Gifs */}
        <MemeGrid />

        {/* Settings Dialog */}
        {isSettingsOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-lg p-6 w-1/3">

              <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>

              {/* Number Fields */}
              <div className="mb-4 flex flex-row justify-between">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="number1">
                  Grid cross section
                </label>
                <div className="flex items-center space-x-2">
                  <button className="text-white" onClick={() => setCrossAxisCount(crossAxisCount - 1)}>-</button>
                  <input
                    type="number"
                    id="number1"
                    className="w-full rounded-lg focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
                    value={crossAxisCount}
                    onChange={(e) => setCrossAxisCount(Number(e.target.value))}
                  />
                  <button className="text-white" onClick={() => setCrossAxisCount(crossAxisCount + 1)}>+</button>
                </div>
              </div>
              
              <div className="mb-4 flex flex-row justify-between">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="number1">
                  Max results
                </label>
                <div className="flex items-center space-x-2">
                  <button className="text-white" onClick={() => setMaxResultsAtOnce(maxResultsAtOnce - 1)}>-</button>
                  <input
                    type="number"
                    id="number1"
                    className="w-full rounded-lg focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
                    value={maxResultsAtOnce}
                    onChange={(e) => setMaxResultsAtOnce(Number(e.target.value))}
                  />
                  <button className="text-white" onClick={() => setMaxResultsAtOnce(maxResultsAtOnce + 1)}>+</button>
                </div>
              </div>


              {/* Close Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeSettings}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

    </>
  );
}
