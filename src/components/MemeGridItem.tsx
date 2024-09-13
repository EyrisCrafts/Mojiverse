import { ModelEmoji } from "@/classes/ModelEmoji";
import { EnumSearchType } from "@/enums";
import { useMemeStore } from "@/hooks/useMemes";

interface GridItemProps {
    item: ModelEmoji;
    index: number;
}


const GridItem: React.FC<GridItemProps> = ({ item, index }: GridItemProps) => {
    const [currentSelectedGifIndex] = useMemeStore((state) => [state.currentSelectedGifIndex]);

    const safeCustomToString = (item: ModelEmoji) => {
        return item.customToString ? item.customToString() : `${item.shortName} - ${item.emoji} - ${item.searchType} - ${item.memeUrl}`;
    }

    // console.log(item);
    
    const isSelectedItem: boolean = index === currentSelectedGifIndex;
    console.log("Is selected item: "+ isSelectedItem.toString() + " index: " + index.toString() + " currentSelectedGifIndex: " + currentSelectedGifIndex.toString());
    // const isSelectedItem: boolean = currentSelectedGif !== null && currentSelectedGif instanceof  ModelEmoji && (item.customToString() === currentSelectedGif.customToString());

    const onClick = () => {
        // copy to clipboard
        // if (currentSelectedGifIndex >= 0 && currentSelectedGifIndex < currentSearchItems.length) {
        //     const item = currentSearchItems[currentSelectedGifIndex];
        //     // if (item.searchType)
        //     navigator.clipboard.writeText(item.emoji);
        //     // Show a toast
        //     showSuccessToast("Copied to clipboard");

        // }
    }

    
    if (item.searchType === EnumSearchType.ascii || item.searchType === EnumSearchType.emojis) {
        return (
            <div key={safeCustomToString(item)} className={`w-44 h-44 text-white rounded-lg bg-gray-3 flex flex-col justify-center items-center m-3 ${isSelectedItem ? "border-solid border-2 border-selected" : ""} hover:border-solid hover:border-2 hover:border-selected cursor-pointer`}>

                <div className={`mb-4 ${item.searchType === EnumSearchType.emojis ? "emoji-mart-emoji" : ""}`}>
                    {item.emoji}
                </div>

                <div className="text-textcolor text-center">
                    {item.shortName}
                </div>

            </div>
        );
    } else if (item.searchType === EnumSearchType.image || item.searchType === EnumSearchType.gif) {
        return (
            <div key={safeCustomToString(item)} className={`w-48 h-48 p-1 rounded-lg bg-gray-3 flex flex-col justify-center items-center m-3  ${isSelectedItem ? "border-solid border-2 border-selected" : ""} hover:border-solid hover:border-2 hover:border-selected cursor-pointer`}>
                <img src={item.memeUrl} alt={item.shortName} className="w-48 h-48 object-cover rounded-lg" />
                <div className="text-textcolor text-center">
                    {item.shortName}
                </div>
            </div>
        );
    }


};
export default GridItem;