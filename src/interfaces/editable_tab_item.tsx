import { iTabItem } from "./tab_item";

interface iEditableTabItem {
    windowId: number,
    id?: number,
    preset?: string,
    onStop: () => void
}

export {
    iEditableTabItem
};