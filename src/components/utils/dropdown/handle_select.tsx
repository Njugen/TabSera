import { iFieldOption } from "../../../interfaces/dropdown";
import DropdownMenu from "../dropdown_menu/dropdown_menu";

const renderDropdownMenu = (
        tag: string, 
        options: Array<iFieldOption>, 
        selected: number | null, 
        callback: (id: number) => void
    ): JSX.Element => {
        return (
            <DropdownMenu 
                tag={`${tag}`} 
                options={options} 
                selected={selected} 
                onSelect={callback} 
            />
        );
}

export default renderDropdownMenu;