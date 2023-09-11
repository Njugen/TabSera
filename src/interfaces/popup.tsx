interface iPopup {
    title: String,
    children: React.ReactNode,
    onSave: () => void,
    onClose: () => void
}

export {iPopup};