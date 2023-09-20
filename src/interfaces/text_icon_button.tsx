interface iTextIconButton {
    icon: string,
    text: string,
    fill: string,
    size: {
        icon: number,
        text: string
    },
    onClick?: (e: any) => void
}


export {
    iTextIconButton
};