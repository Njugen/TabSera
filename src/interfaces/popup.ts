import { iFolderItem } from "./folder_item"

interface iPopup {
    title: string,
    type: "slide-in" | "popup"
    folder?: iFolderItem,
    onClose: () => void
}

export {iPopup};