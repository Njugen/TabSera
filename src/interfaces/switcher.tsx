interface iSwitcher {
    label?: String,
    dark?: boolean,
    value: boolean,
    onCallback: (e: {
        state: boolean
    }) => void
}

export {iSwitcher};