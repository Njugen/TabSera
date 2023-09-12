chrome.runtime.onInstalled.addListener(() => {
    console.log("WOOOHO");
});

chrome.bookmarks.onCreated.addListener(() => {
    console.log("BOOKMARKED!");
});