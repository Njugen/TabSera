interface iTextIconButton {
    icon: string,
    text: string,
    fill: string,
    disabled: boolean,
    size: {
        icon: number,
        text: string
    },
    onClick?: (e: any) => void
}


export {
    iTextIconButton
};