interface iCheckbox {
    label?: String,
    dark?: boolean,
    checked: boolean,
    onCallback: (e: {
        state: boolean
    }) => void
}

export { iCheckbox }