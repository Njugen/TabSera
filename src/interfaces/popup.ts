import { iFolderItem } from "./folder_item"

interface iPopup {
    title: String,
    type: "slide-in" | "popup"
    folder?: iFolderItem,
    onClose: () => void
}

export {iPopup};