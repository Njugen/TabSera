interface iTabItem {
    id: number,
    label: string,
    url: string,
    marked: boolean,
    disableEdit?: boolean,
    disableMark?: boolean,
    onMark?: (tabId: number, checked: boolean) => void,
    onEdit?: (tabId: number) => void
}

export {
    iTabItem
};