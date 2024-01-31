chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

let newTabId = null; // Declare this outside the command listener

chrome.commands.onCommand.addListener((command) => {
    if (command === "open-popup") {
        chrome.tabs.create({url: "tab-input.html"}, function(tab) {
            newTabId = tab.id; // Store the ID of the new tab
        });
    }
});

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    if (response.tabNumber !== undefined) {
        chrome.tabs.query({currentWindow: true}, (tabs) => {
            if (response.tabNumber >= 0 && response.tabNumber < tabs.length) {
                chrome.tabs.update(tabs[response.tabNumber].id, {active: true});
                if (newTabId !== null) {
                    chrome.tabs.remove(newTabId); // Close the new tab
                    newTabId = null; // Reset the stored tab ID
                }
            }
        });
    }
});
