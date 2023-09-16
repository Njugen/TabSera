import { iTabItem } from "./tab_item";

interface iEditableTabItem {
    windowId: number,
    id?: number,
    onStop: () => void
}

export {
    iEditableTabItem
};