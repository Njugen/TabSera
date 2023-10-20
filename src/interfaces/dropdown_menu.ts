import { iFieldOption } from "./dropdown";

interface iDropdownMenu {
    tag: string,
    options: Array<iFieldOption>,
    selected: number | null,
    onSelect: (id: number) => void,
}

export default iDropdownMenu;