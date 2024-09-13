
import { EnumSearchType } from "@/enums";
import { useMemeStore } from "@/hooks/useMemes";
import { showErrorToast, showSuccessToast } from "@/utils/utils";
import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
    const [search, setCurrentSearchTerm, setSelectedMenu, currentSearchTerm, setCurrentSelectedGifIndex, currentSearchItems, currentSelectedGifIndex, crossAxisCount, setCurrentSelectedGif] = useMemeStore((state) => [state.search, state.setCurrentSearchTerm, state.setSelectedMenu, state.currentSearchTerm, state.setCurrentSelectedGifIndex, state.currentSearchItems, state.currentSelectedGifIndex, state.crossAxisCount, state.setCurrentSelectedGif]);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "/") {
                // Prevent default action to avoid typing "/" in the input field
                event.preventDefault();
                // Focus the input field
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            } else if (event.key === "1") { // 1 for ascii
                event.preventDefault();
                console.log("Setting selected menu to ascii");
                setSelectedMenu(EnumSearchType.ascii);
                if (currentSearchTerm.length > 0) {
                    useMemeStore.getState().search(currentSearchTerm);
                }
            } else if (event.key === "2") { // 2 for image
                event.preventDefault();
                console.log("Setting selected menu to image");
                setSelectedMenu(EnumSearchType.image);
                if (currentSearchTerm.length > 0) {
                    useMemeStore.getState().search(currentSearchTerm);
                }
            } else if (event.key === "3") { // 3 for gif
                event.preventDefault();
                setSelectedMenu(EnumSearchType.gif);
                if (currentSearchTerm.length > 0) {
                    useMemeStore.getState().search(currentSearchTerm);
                }
            } else if (event.key === "4") { // 4 for emojis
                event.preventDefault();
                setSelectedMenu(EnumSearchType.emojis);
                if (currentSearchTerm.length > 0) {
                    useMemeStore.getState().search(currentSearchTerm);
                }
            } else if (event.key === "Escape") { // Escp to empty the search
                event.preventDefault();
                setCurrentSearchTerm("");
            } // up arrow key
            else if (event.key === "ArrowUp") {
                event.preventDefault();
                const newIndex = currentSelectedGifIndex - crossAxisCount;
                if (newIndex >= 0) {
                    setCurrentSelectedGifIndex(newIndex);
                    setCurrentSelectedGif(currentSearchItems[newIndex])
                    console.log("New index: " + newIndex);
                }
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                const newIndex = currentSelectedGifIndex + crossAxisCount;
                if (newIndex < currentSearchItems.length) {
                    setCurrentSelectedGifIndex(newIndex);
                    setCurrentSelectedGif(currentSearchItems[newIndex])
                    console.log("New index: " + newIndex);
                }
            } else if (event.key === "ArrowLeft") {
                // event.preventDefault();
                if (currentSelectedGifIndex > 0) {
                    setCurrentSelectedGifIndex(currentSelectedGifIndex - 1);
                    setCurrentSelectedGif(currentSearchItems[currentSelectedGifIndex - 1])
                    console.log("New index: " + (currentSelectedGifIndex - 1));
                }
            } else if (event.key === "ArrowRight") {
                // event.preventDefault();
                if (currentSelectedGifIndex < currentSearchItems.length - 1) {
                    setCurrentSelectedGifIndex(currentSelectedGifIndex + 1);
                    setCurrentSelectedGif(currentSearchItems[currentSelectedGifIndex + 1])
                    console.log("New index: " + (currentSelectedGifIndex + 1));
                }
            } else if (event.key === "Enter") {
                // Copy to clipboard
                if (currentSelectedGifIndex >= 0 && currentSelectedGifIndex < currentSearchItems.length) {
                    const item = currentSearchItems[currentSelectedGifIndex];
                    if (item.searchType == EnumSearchType.ascii || item.searchType == EnumSearchType.emojis) {
                        console.log("Copying to clipboard: " + item.emoji);
                        navigator.clipboard.writeText(item.emoji);
                        // Show a toast
                        showSuccessToast("Copied to clipboard");
                    } else if (item.searchType == EnumSearchType.image) {
                        // Download the image and copy to clipboard

                        fetch(item.memeUrl)
                            .then(response => response.blob())
                            .then(blob => {
                                // Create a new clipboard item
                                const data = [new ClipboardItem({ [blob.type]: blob })];

                                // Copy the blob to the clipboard
                                navigator.clipboard.write(data).then(() => {
                                    // Show a success toast
                                    showSuccessToast("Image/GIF copied to clipboard");
                                }).catch(err => {
                                    // Handle errors
                                    showErrorToast("Failed to copy image/GIF to clipboard");
                                    console.error(err);
                                });
                            })
                            .catch(err => {
                                // Handle errors while fetching the image
                                showErrorToast("Failed to download image/GIF");
                                console.error(err);
                            });

                    } else if (item.searchType == EnumSearchType.gif) {
                        // Download the image/Gif and copy to clipboard
                        console.log("Copying gif to clipboard: " + item.memeUrl);
                        navigator.clipboard.writeText(item.memeUrl);
                        // Show a toast
                        showSuccessToast("Copied to clipboard");
                    }
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCurrentSearchTerm(event.target.value);
        search(event.target.value);
    }

    return (
        <div className="w-full grid grid-cols-12 ">

            <div className="bg-gray-3 col-start-4 col-span-6 p-4 rounded-lg flex flex-row">
                {/* Search Icon */}
                <FaSearch color="#8D8D8D" size={24} className="mr-3" />

                {/* Search text field */}
                <input
                    ref={inputRef}
                    value={currentSearchTerm}
                    className="bg-gray-3 text-textcolor w-full focus:outline-none"
                    type="text"
                    placeholder="Search for emojis and gifs"
                    onChange={handleSearch}
                />

                {/* Shortcut for focus */}

                <div className="text-textcolor mr-2">
                    /
                </div>
            </div>
        </div>
    );
}

export default SearchBar;