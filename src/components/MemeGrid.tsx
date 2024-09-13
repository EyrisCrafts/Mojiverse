import { ModelEmoji } from "@/classes/ModelEmoji";
import { EnumSearchType } from "@/enums";
import { useMemeStore } from "@/hooks/useMemes";
import Image from 'next/image';
import GridItem from "./MemeGridItem";

const MemeGrid: React.FC = () => {
    const [currentSearchItems, crossAxisCount] = useMemeStore((state) => [
        state.currentSearchItems,
        state.crossAxisCount
    ]);
    console.log("length of search items: " + currentSearchItems.length.toString())
    return (
        <div className={`grid grid-cols-4 gap-4 justify-center`}>
            {currentSearchItems.map((item: ModelEmoji, index: number) => (
                // GridItem(item)
                <GridItem key={`${item.shortName} - ${item.emoji} - ${item.searchType} - ${item.memeUrl}`} item={new ModelEmoji(item.emoji, item.shortName, item.searchType, item.memeUrl)} index={index} />
            ))}
        </div>
    );
}

export default MemeGrid;
