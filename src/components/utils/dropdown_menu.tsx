import iDropdownMenu from "../../interfaces/dropdown_menu";

/*
    Dropdown menu, containing a set of options.

    Applies slides down effect when shown. Hidden by default.
*/

function DropdownMenu(props: iDropdownMenu): JSX.Element {
    const { tag, options, onSelect, selected } = props;

    function applyClasses(id: number): string {
        if(selected === id){
            // Indicate a selected option.
            return "hover:opacity-70 border-b bottom flex items-center text-sm text-white weight-bold px-3 py-6 h-10 w-full bg-tbfColor-lightpurple h-9";
        } else {
            // Indicate a non-selected option(s)
            return "hover:bg-tbfColor-lightgrey border-b border-tbfColor-middlegrey hover:border-tbfColor-lightergrey flex items-center text-sm text-tbfColor-darkergrey weight-bold px-3 py-6 h-10 w-full";
        }
    }

    return (
        <ul id={tag} data-testid={tag} className={`z-50 list-none drop-shadow-no_pos overflow-y-auto bg-white absolute max-h-[2000px] mt-2 text-sm w-full text-tbfColor-darkergrey rounded-lg`}>
            { options.map((option, i) => {
                return (
                    <li id={`${tag}-option-${option.id}${selected === option.id ? "-active" : ""}`} key={`${tag}-option-${option.id}${selected === option.id ? "-active" : ""}`}>
                        <button key={option.id} onClick={() => onSelect(option.id)} className={applyClasses(option.id)}>
                            {option.label}
                        </button>
                    </li>
                );
            })}
        </ul>
    )
}

export default DropdownMenu;