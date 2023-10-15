import { iFolder } from "./folder"

interface iPopup {
    title: String,
    folder?: iFolder,
    onClose: () => void
}

export {iPopup};