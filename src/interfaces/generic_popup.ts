interface iGenericPopup {
    title: string,
    type: "slide-in" | "popup",
    children: Array<JSX.Element> | JSX.Element,
    onClose: (e?: any) => void
    onSave: (e?: any) => void
}

export default iGenericPopup;