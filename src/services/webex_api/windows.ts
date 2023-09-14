function getAllWindows(callback: any): void {
    chrome.windows.getAll({
        windowTypes: ["normal"]
    }, (data: any) => {
        callback(data);
    });
}

function getWindow(callback: any): void {
    chrome.windows.getAll({
        windowTypes: ["normal"]
    }, (data: chrome.windows.Window[]) => {
        callback(data);
    });
}

export {
    getAllWindows
}