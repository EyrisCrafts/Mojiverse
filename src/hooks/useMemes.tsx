import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { EnumSearchType } from "@/enums";
import { ModelEmoji } from "@/classes/ModelEmoji";
import data from '@emoji-mart/data'
import { init, SearchIndex } from 'emoji-mart'
import debounce from 'lodash.debounce';

init({ data })

interface AsciiEmoji {
    phrase: string;
    shortcut: string;
}

interface SettingsStoreProps {
    // Currently selected Gif or Emoji
    currentSelectedGifIndex: number;
    setCurrentSelectedGifIndex: (index: number) => void;

    currentSelectedGif: ModelEmoji | null;
    setCurrentSelectedGif: (item: ModelEmoji) => void;


    // Search term
    currentSearchTerm: string;
    setCurrentSearchTerm: (term: string) => void;

    // Menu Items
    selectedMenu: EnumSearchType;
    setSelectedMenu: (menu: EnumSearchType) => void;

    // Ascii memes
    allAsciis: AsciiEmoji[];
    loadAsciis: () => Promise<void>;

    // Current search items
    currentSearchItems: ModelEmoji[];
    setCurrentSearchItems: (items: ModelEmoji[]) => void;

    // Functional methods
    search: (searchTerm: string  | undefined) => void;

    // Settings
    maxResultsAtOnce: number;
    setMaxResultsAtOnce: (maxResults: number) => void;
    crossAxisCount: number;
    setCrossAxisCount: (crossAxisCount: number) => void;

}

const debouncedGifSearch = debounce(async (searchTerm: string, set: any, maxResultsAtOnce: number, searchType: EnumSearchType) => {
    console.log(`Searching for GIFs with ${searchTerm}`);
    const url = `https://g.tenor.com/v1/search?q=${encodeURIComponent(searchTerm)}&key=LIVDSRZULELA&limit=${maxResultsAtOnce}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        const data: any[] = json["results"];

        const newResults = data.map(result => ({
            memeUrl: searchType === EnumSearchType.gif ? result["media"][0]["mediumgif"]["url"] : result["media"][0]["mp4"]["preview"],
            searchType: EnumSearchType.gif
        }));
        const converted = newResults.map((item) => new ModelEmoji('', '', item.searchType, item.memeUrl));
        set({ currentSearchItems: converted });
        // Select the first item
        if (converted.length > 0) {
            set({ currentSelectedGif: converted[0] });
        }
        console.log(`Memes length ${newResults.length}`);
    } catch (e) {
        console.error(`Error parsing GIF: ${e}`);
    }
}, 1000);

export const useMemeStore = create<SettingsStoreProps>()(
    persist(
        (set) => ({
            // Currently selected Gif or Emoji
            currentSelectedGifIndex: 0,
            setCurrentSelectedGifIndex: (index: number) => set({ currentSelectedGifIndex: index }),

            currentSelectedGif: null,
            setCurrentSelectedGif: (item: ModelEmoji) => set({ currentSelectedGif: item }),

            // Settings 
            maxResultsAtOnce: 20,
            setMaxResultsAtOnce: (maxResults: number) => set({ maxResultsAtOnce: maxResults }),
            crossAxisCount: 4,
            setCrossAxisCount: (crossAxisCount: number) => set({ crossAxisCount: crossAxisCount }),

            // Search term
            currentSearchTerm: '',
            setCurrentSearchTerm: (term: string) => set({ currentSearchTerm: term }),

            // Menu Items
            setSelectedMenu: (menu: EnumSearchType) => set({ selectedMenu: menu }),
            selectedMenu: EnumSearchType.emojis,

            // Ascii memes
            allAsciis: [],
            loadAsciis: async () => {
                try {
                    const response = await axios.get('/ascii.json'); // Assuming ascii.json is in the public folder
                    set({ allAsciis: response.data.retro_emojis });
                    console.log('Loaded ASCII data:', response.data.retro_emojis.length);
                } catch (error) {
                    console.error('Failed to load ASCII data:', error);
                    set({ allAsciis: [] });
                }
            },

            // Current search items
            currentSearchItems: [],
            setCurrentSearchItems: (items: ModelEmoji[]) => set({ currentSearchItems: items }),

            // Functional methods
            search: async (searchTerm: string | undefined) => {
                const searchTermToUse = searchTerm || useMemeStore.getState().currentSearchTerm;
                // Clear the current items
                set({ currentSearchItems: [] });
                // Search the current items
                const searchType = useMemeStore.getState().selectedMenu;

                if (searchType === EnumSearchType.ascii) {
                    const items = useMemeStore.getState().allAsciis;
                    const filteredItems = items.filter((item) => item.shortcut.includes(searchTermToUse));
                    const asciiEmojis = filteredItems.map((item) => new ModelEmoji(item.phrase, item.shortcut, EnumSearchType.ascii, '')).slice(0, useMemeStore.getState().maxResultsAtOnce);

                    set({ currentSearchItems: asciiEmojis });
                    // Select the first item
                    if (asciiEmojis.length > 0) {
                        set({ currentSelectedGif: asciiEmojis[0] });
                    }
                    console.log('Filtered ASCII data:', filteredItems.length);
                    return;
                } else if (searchType === EnumSearchType.emojis) {
                    const emojis = await SearchIndex.search(searchTerm)
                    if (!emojis) {
                        return [];
                    }
                    const results = emojis.map((emoji: { name: string, skins: { native: any; }[]; }) => {
                        return new ModelEmoji(emoji.skins[0].native, emoji.name, EnumSearchType.emojis, "");
                    }).slice(0, useMemeStore.getState().maxResultsAtOnce);
                    set({ currentSearchItems: results });
                    // set the first item
                    if (results.length > 0) {
                        set({ currentSelectedGif: results[0] });
                    }
                    console.log('Filtered Emoji data:', results.length);

                } else if (searchType === EnumSearchType.gif) {
                    debouncedGifSearch(searchTermToUse, set, useMemeStore.getState().maxResultsAtOnce, searchType);

                } else if (searchType === EnumSearchType.image) {
                    debouncedGifSearch(searchTermToUse, set, useMemeStore.getState().maxResultsAtOnce, searchType);
                }
            }

        }),
        {
            name: 'settings-storage', // name of the item in the storage (must be unique)
            getStorage: () => sessionStorage, // or localStorage
            // Custom serialize/deserialize handling for ModelEmoji instances
            serialize: JSON.stringify,
            onRehydrateStorage: (state: any) => {
                // console log the rehydrated state
                console.log('Rehydrated state:', state);
                return state;
            },
            deserialize: (str: string) => {
                try {
                    const json = JSON.parse(str);
                    if (json.currentSearchItems) {
                        json.currentSearchItems = json.currentSearchItems.map((item: any) => {
                            if (item.emoji && item.shortName && item.searchType && item.memeUrl) {
                                return new ModelEmoji(item.emoji, item.shortName, item.searchType, item.memeUrl);
                            } else {
                                throw new Error("Invalid data for ModelEmoji");
                            }
                        });
                    }
                    return json;
                } catch (error) {
                    console.error("Failed to deserialize:", error);
                    // Handle or return default state
                    return {}; // Return a default or partial state as appropriate
                }

            }
        },
    )
);

