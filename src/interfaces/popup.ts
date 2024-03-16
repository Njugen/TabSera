import { iFolder } from "./folder"

interface iPopup {
    title: String,
    type: "slide-in" | "popup"
    folder?: iFolder,
    onClose: () => void
}

export {iPopup};