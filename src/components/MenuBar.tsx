import { EnumSearchType } from "@/enums";
import { useMemeStore } from "@/hooks/useMemes";
import { useEffect } from "react";

const MenuBar: React.FC = () => {
    const [selectedMenu, setSelectedMenu, search] = useMemeStore((state) => [
        state.selectedMenu,
        state.setSelectedMenu,
        state.search,
    ]);

    const handleMenuItemClick = (item: EnumSearchType) => {
        setSelectedMenu(item);
        // if (currentSearchItems.length > 0) {
            search(undefined);
        // }
    }
    
    useEffect(() => {
        // If there is a search term, run search whenever the menu item changes
        const currentSearchTerm = useMemeStore.getState().currentSearchTerm;
        if (currentSearchTerm?.length > 0) {
            search(currentSearchTerm);
        }
    }, [selectedMenu, search]);  
    
    const menuItems: EnumSearchType[] = [
        EnumSearchType.ascii,
        EnumSearchType.image,
        EnumSearchType.gif,
        EnumSearchType.emojis,
    ];

    console.log("Selected menu: ", selectedMenu);

    return (
        <div className="flex flex-row items-center">
            {
                menuItems.map(
                    (item, number) => (
                        <MenuItem
                            key={item + selectedMenu}
                            title={item.toString()}
                            onClick={() => handleMenuItemClick(item)}
                            isSelected={selectedMenu === item}
                        />
                    )
                )
            }
        </div>
    );
};

export default MenuBar;

// Menu item, title and onclick, isSelected
const MenuItem: React.FC<{
    title: string;
    onClick: () => void;
    isSelected: boolean;
}> = ({ title, onClick, isSelected }) => {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer rounded w-44 h-8 flex flex-row justify-center items-center text-textcolor hover:bg-gray-9 ${isSelected ? "bg-gray-3" : ""}`}
        >
            <div>
            {title}

            </div>
        </div>
    );
};