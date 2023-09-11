import { iTabItem } from "./tab_item"

interface iWindowItem {
    id: number,
    key: number,
    tabs: Array<iTabItem>
}

export {
    iWindowItem
};