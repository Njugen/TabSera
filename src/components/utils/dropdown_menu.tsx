import iDropdownMenu from "../../interfaces/dropdown_menu";

/*
    Dropdown menu, containing a set of options.

    Applies slides down effect when shown. Hidden by default.
*/

const DropdownMenu = (props: iDropdownMenu): JSX.Element => {
    const { tag, options, onSelect, selected } = props;

    const applyClasses = (id: number): string => {
        if(selected === id){
            // Indicate a selected option.
            return "hover:opacity-70 border-b bottom flex items-center text-sm text-white weight-bold px-3 py-6 h-10 w-full bg-tbfColor-lightpurple h-9";
        } else {
            // Indicate a non-selected option(s)
            return "hover:bg-tbfColor-lightgrey border-b border-tbfColor-middlegrey hover:border-tbfColor-lightergrey flex items-center text-sm text-tbfColor-darkergrey weight-bold px-3 py-6 h-10 w-full";
        }
    }

    // Id for use in classes, keys or id parameters
    const optionListItemId = (id: number): string => {
        if(selected === id){
            return `${tag}-option-${id}-active`;
        }
        
        return `${tag}-option-${id}`;
    }

    // Build a list of <li> representing options
    const renderOptionListItem = (): Array<JSX.Element> => {
        const result: Array<JSX.Element> = (
            options.map((option, i) => {
                return (
                    <li id={optionListItemId(option.id)} key={optionListItemId(option.id)}>
                        <button key={option.id} onClick={() => onSelect(option.id)} className={applyClasses(option.id)}>
                            {option.label}
                        </button>
                    </li>
                );
            })
        );

        return result;
    }

    return (
        <ul id={tag} data-testid={tag} className={`z-50 list-none drop-shadow-no_pos overflow-y-auto bg-white absolute max-h-[2000px] mt-2 text-sm w-full text-tbfColor-darkergrey rounded-lg`}>
            {renderOptionListItem()}
        </ul>
    )
}

export default DropdownMenu;