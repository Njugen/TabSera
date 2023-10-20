interface iSwitcherSelected {
    state: boolean
}

interface iSwitcher {
    label?: String,
    value: boolean,
    id: string,
    onCallback: (e: boolean | null) => void
}

export {iSwitcherSelected, iSwitcher};