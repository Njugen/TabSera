type tNavLink = {
    label: string
    url: string,
    isActive: boolean,
    onClick: () => void,
}
interface iNavlink {
    label: string,
    url: string,
    isActive: boolean,
    onClick: () => void,
}

export {tNavLink, iNavlink};