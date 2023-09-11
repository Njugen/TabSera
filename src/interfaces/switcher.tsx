interface iSwitcher {
    label?: String,
    dark?: boolean,
    onCallback: (e: {
        state: boolean
    }) => void
}

export {iSwitcher};