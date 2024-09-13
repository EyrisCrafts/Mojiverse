import { ModelEmoji } from "@/classes/ModelEmoji";
import { EnumSearchType } from "@/enums";
import { useMemeStore } from "@/hooks/useMemes";
import { showErrorToast, showSuccessToast } from "@/utils/utils";

interface GridItemProps {
    item: ModelEmoji;
    index: number;
}


const GridItem: React.FC<GridItemProps> = ({ item, index }: GridItemProps) => {
    const [currentSelectedGifIndex, currentSearchItems] = useMemeStore((state) => [state.currentSelectedGifIndex, state.currentSearchItems]);

    const safeCustomToString = (item: ModelEmoji) => {
        return item.customToString ? item.customToString() : `${item.shortName} - ${item.emoji} - ${item.searchType} - ${item.memeUrl}`;
    }

    // console.log(item);
    
    const isSelectedItem: boolean = index === currentSelectedGifIndex;
    console.log("Is selected item: "+ isSelectedItem.toString() + " index: " + index.toString() + " currentSelectedGifIndex: " + currentSelectedGifIndex.toString());
    // const isSelectedItem: boolean = currentSelectedGif !== null && currentSelectedGif instanceof  ModelEmoji && (item.customToString() === currentSelectedGif.customToString());

    const onClick = () => {
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

    
    if (item.searchType === EnumSearchType.ascii || item.searchType === EnumSearchType.emojis) {
        return (
            <div onClick={onClick} key={safeCustomToString(item)} className={`w-44 h-44 text-white rounded-lg bg-gray-3 flex flex-col justify-center items-center m-3 ${isSelectedItem ? "border-solid border-2 border-selected" : ""} hover:border-solid hover:border-2 hover:border-selected cursor-pointer`}>

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
            <div onClick={onClick} key={safeCustomToString(item)} className={`w-48 h-48 p-1 rounded-lg bg-gray-3 flex flex-col justify-center items-center m-3  ${isSelectedItem ? "border-solid border-2 border-selected" : ""} hover:border-solid hover:border-2 hover:border-selected cursor-pointer`}>
                <img src={item.memeUrl} alt={item.shortName} className="w-48 h-48 object-cover rounded-lg" />
                <div className="text-textcolor text-center">
                    {item.shortName}
                </div>
            </div>
        );
    }


};
export default GridItem;