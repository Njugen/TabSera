interface iCheckbox {
    label?: String,
    dark?: boolean,
    onCallback: (e: {
        state: boolean
    }) => void
}

export { iCheckbox }