interface iGenericPopup {
    title: string,
    type: "slide-in" | "popup",
    children: Array<JSX.Element> | JSX.Element,
    show: boolean,
    cancel: {
        label: string,
        handler: (e?: any) => void
    },
    save?: {
        label: string,
        handler: (e?: any) => void
    },
}

export default iGenericPopup;