interface iFieldOption {
    id: number,
    label: String
}

interface iDropdownSelected {
    selected: number | null
}

interface iDropdown {
    tag: String,
    preset: iFieldOption,
    options: Array<iFieldOption>,
    onCallback: (e: iDropdownSelected) => void
}

export { iFieldOption, iDropdownSelected, iDropdown }