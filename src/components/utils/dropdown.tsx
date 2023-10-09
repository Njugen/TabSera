import { useRef, useState, useEffect } from "react";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import { iDropdown, iFieldOption } from "../../interfaces/dropdown";

function Dropdown(props: iDropdown): JSX.Element {
    const [selected, setSelected] = useState<number | null>(null);
    const [showSubMenuContainer, setShowSubMenuContainer] = useState<boolean>(false);
    const [slideDown, setSlideDown] = useState<boolean>(false);
    const { tag, preset, options, onCallback } = props;
    const dropdown = useRef<any>();

    function handleShowSubMenu(): void {
        if(showSubMenuContainer === false){
            setShowSubMenuContainer(true);
            setTimeout(() => {
                setSlideDown(slideDown === true ? false : true);
            }, 200);
        } else {
            setSlideDown(false);
            setTimeout(() => {
                setShowSubMenuContainer(false);
            }, 200);
        }
    
    }

    function handleSelect(id: number): void {
        setSelected(id);
        handleShowSubMenu();
    }
    
    function applyClasses(id: number): string {
        if(selected === id){
            return "hover:opacity-70 border-b bottom flex items-center text-sm text-white weight-bold px-3 py-6 h-10 w-full bg-tbfColor-lightpurple h-9";
        } else {
            return "hover:bg-tbfColor-lightgrey border-b border-tbfColor-middlegrey hover:border-tbfColor-lightergrey flex items-center text-sm text-tbfColor-darkergrey weight-bold px-3 py-6 h-10 w-full";
        }
    }

    function renderDropdown(): JSX.Element {
        return (
            <>
                <ul id={`dropdown-tag-${tag}`} className={`z-50 list-none drop-shadow-no_pos overflow-y-auto bg-white absolute max-h-[2000px] mt-2 text-sm w-full text-tbfColor-darkergrey rounded-lg ${slideDown === false ? "transition-all top-0 ease-out h-0 duration-500" : "transition-all top-12 ease-in duration-100"}`}>
                    { options.map((option, i) => {
                        return (
                            <li id={`dropdown-tag-${tag}-${i}`} key={`dropdown-tag-${tag}-${i}`}>
                                <button key={option.id} onClick={() => handleSelect(option.id)} className={applyClasses(option.id)}>
                                    {option.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }

    function handleWindowClick(e: any): void {
        e.stopPropagation();
        if(showSubMenuContainer === false || !e.target.parentElement || ! e.target.parentElement.parentElement) return;
        
        const targetId = `dropdown-tag-${tag}`;

        const firstParent = e.target.parentElement!.id;
        const secondParent = e.target.parentElement.parentElement.id
        if(e.target.id.includes(targetId) === false && firstParent.includes(targetId) === false && secondParent.includes(targetId) === false){
            handleShowSubMenu();
        }

    }

   useEffect(() => {
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, [showSubMenuContainer])

    useEffect(() => {
        onCallback({ selected: selected });
    }, [selected]);

    function getSelectedOption(): iFieldOption | null {
        const target = options.find((option) => option.id === selected);
        return target ? target : null;
    }

    return (
        
        <div ref={dropdown} className={`hover:cursor-pointer bg-white relative text-sm w-full text-tbfColor-darkergrey rounded-lg h-10 border transition-all duration-75 ${showSubMenuContainer === true ? " border-tbfColor-lightpurple" : "border-tbfColor-middlegrey4"}`}>
            <div id={`dropdown-tag-${tag}-selector`} className="flex items-center justify-between mx-3 h-full" onClick={handleShowSubMenu}>          
                <span className="hover:cursor-pointer">{!getSelectedOption() ? preset.label : getSelectedOption()!.label}</span>
                {showSubMenuContainer === true ? <CollapseIcon size={28} fill={"#000"} /> : <ExpandIcon size={28} fill={"#000"} />}
            </div>
            { showSubMenuContainer === true && renderDropdown()}
        </div>
    ); 
}

export default Dropdown;