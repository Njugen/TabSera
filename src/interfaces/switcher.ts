interface iSwitcherSelected {
    state: boolean | null
}

interface iSwitcher {
    label?: String,
    dark?: boolean,
    value: boolean,
    onCallback: (e: iSwitcherSelected) => void
}

export {iSwitcherSelected, iSwitcher};