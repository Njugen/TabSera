interface iHistoryState {
    tabs: Array<chrome.history.HistoryItem>
    markedTabs: Array<chrome.history.HistoryItem>
    tabsSort: string,
    viewMode: "list" | "grid",
}

export default iHistoryState;