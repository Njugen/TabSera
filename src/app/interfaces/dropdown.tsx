interface iFieldOption {
    id: Number,
    label: String
}

interface iDropdown {
    tag: String,
    preset: iFieldOption,
    options: Array<iFieldOption>,
    onCallback: (e: {
        selected: Number | null
    }) => void
}