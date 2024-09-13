import { ModelEmoji } from "@/classes/ModelEmoji";
import { EnumSearchType } from "@/enums";
import { useMemeStore } from "@/hooks/useMemes";
import Image from 'next/image';
import GridItem from "./MemeGridItem";
import { useEffect, useState } from "react";

const MemeGrid: React.FC = () => {
    const [currentSearchItems, crossAxisCount] = useMemeStore((state) => [
        state.currentSearchItems,
        state.crossAxisCount
    ]);
    const [_, forceUpdate] = useState(0);

    useEffect(() => {
        forceUpdate(n => n + 1);  // increment state to force re-render
    }, [crossAxisCount]);

    return (
        <div key={`grid-${crossAxisCount}`} style={{ display: 'grid', gridTemplateColumns: `repeat(${crossAxisCount}, minmax(0, 1fr))`, gap: '16px', justifyContent: 'center' }}>
            {currentSearchItems.map((item: ModelEmoji, index: number) => (
                <GridItem key={`${item.shortName} - ${item.emoji} - ${item.searchType} - ${item.memeUrl}`} item={new ModelEmoji(item.emoji, item.shortName, item.searchType, item.memeUrl)} index={index} />
            ))}
        </div>
    );
}

export default MemeGrid;
