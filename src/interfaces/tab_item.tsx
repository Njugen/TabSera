interface iTabItem {
    id: number,
    label: string,
    url: string,
    onMark?: (tabId: number, checked: boolean) => void
}

export {
    iTabItem
};