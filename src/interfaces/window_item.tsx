import { iTabItem } from "./tab_item"

interface iWindowItem {
    id: number,
    tabs: Array<iTabItem>,
    initExpand?: boolean,
    disableMark?: boolean,
    disableEdit?: boolean
}

export {
    iWindowItem
};