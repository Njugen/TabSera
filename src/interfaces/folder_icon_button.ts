interface iFolderIconButton {
    id: string,
    active: boolean,
    children: Array<JSX.Element> | JSX.Element,
    onClick: (e: any) => void
}

export {iFolderIconButton}