import { iFolder } from "./folder"

interface iPopup {
    title: String,
    children: React.ReactNode,
    folder?: iFolder,
    onClose: () => void
}

export {iPopup};