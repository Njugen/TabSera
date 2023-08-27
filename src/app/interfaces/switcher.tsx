interface iSwitcher {
    onCallback: (e: {
        state: boolean
    }) => void
}