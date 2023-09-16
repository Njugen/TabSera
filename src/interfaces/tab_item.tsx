interface iTabItem {
    id: number,
    label: string,
    url: string,
    onMark?: (tabId: number, checked: boolean) => void,
    onEdit?: (tabId: number) => void
}

export {
    iTabItem
};