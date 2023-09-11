interface iFieldOption {
    id: number,
    label: String
}

interface iDropdown {
    tag: String,
    preset: iFieldOption,
    options: Array<iFieldOption>,
    onCallback: (e: {
        selected: number | null
    }) => void
}

export { iFieldOption, iDropdown }