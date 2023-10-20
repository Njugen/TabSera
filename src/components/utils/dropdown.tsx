import { useRef, useState, useEffect } from "react";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import { iDropdown, iFieldOption } from "../../interfaces/dropdown";
import DropdownMenu from "./dropdown_menu";

/*
    A dropdown selector, containing a menu with a set of options
*/

function Dropdown(props: iDropdown): JSX.Element {
    // The selected option id
    const [selected, setSelected] = useState<number | null>(null);

    // State defining the visibility of the menu
    const [showSubMenuContainer, setShowSubMenuContainer] = useState<boolean>(false);
    const [hack, setHack] = useState<boolean>(false);
    const { tag, preset, options, onCallback } = props;

    // Reference to dropdown selector container
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Show or hide sub menu based on state by sliding down the menu.
    // The sliding effect is delayed to allow certain states to take effect
    function handleShowSubMenu(): void {
        if(showSubMenuContainer === false){
            setShowSubMenuContainer(true);
            setHack(false);
        } else {
            setHack(true);
            setShowSubMenuContainer(false);
        }
    
    }

    // Trigger once an option has been selected
    function handleSelect(id: number): void {
        setSelected(id);
        handleShowSubMenu();
    }
    
    function renderDropdownMenu(): JSX.Element {
        return (
            <DropdownMenu tag={`${tag}`} options={options} selected={selected} onSelect={handleSelect} />
        );
    }


    // Get information about the selected option 
    function getSelectedOption(): iFieldOption | null {
        const target = options.find((option) => option.id === selected);
        return target ? target : null;
    }

    function handleWindowClick(e: any): void {
        e.stopPropagation();

        const selectorTag = (tag + "-selector");
        if(e.target!.id !== selectorTag && 
        e.target.parentElement?.id !== selectorTag && 
        e.target.tagName !== "svg" && 
        e.target.tagName !== "path") {
            setHack((prevState) => !prevState);
        }
    }

    useEffect(() => {
        if(hack === true) {
            setShowSubMenuContainer(false)
        }
    }, [hack])   

    useEffect(() => {
        // Listen for clicks at all time and determine whether or not the menu should be shown/hidden
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, []);


    useEffect(() => {
        // Once the selected option id has been changed, send it back to the parent component
        onCallback({ selected: selected });
    }, [selected]);

    return (
        <div ref={dropdownRef} className={`hover:cursor-pointer bg-white relative text-sm w-full text-tbfColor-darkergrey rounded-lg h-10 border transition-all duration-75 ${showSubMenuContainer === true ? " border-tbfColor-lightpurple" : "border-tbfColor-middlegrey4"}`}>
            <div id={`${tag}-selector`} data-testid={`${tag}-selector`} className="flex items-center justify-between mx-3 h-full" onClick={handleShowSubMenu}>          
                <span className="hover:cursor-pointer">{!getSelectedOption() ? preset.label : getSelectedOption()!.label}</span>
                {showSubMenuContainer === true ? <CollapseIcon size={28} fill={"#000"} /> : <ExpandIcon size={28} fill={"#000"} />}
            </div>
            { showSubMenuContainer === true && renderDropdownMenu()}
        </div>
    ); 
}

export default Dropdown;