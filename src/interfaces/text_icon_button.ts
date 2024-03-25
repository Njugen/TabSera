interface iTextIconButton {
    id: string,
    text: string,
    disabled: boolean,
    textSize: string,
    children: Array<JSX.Element> | JSX.Element,
    onClick: (e: any) => void
}


export {
    iTextIconButton
};