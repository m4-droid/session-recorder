// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//         text: "OFF",
//     });
// });

console.log("where does it go? revise");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "start-recording") {
        console.log("starting rrweb...");
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                if (tabs.length == 0) {
                    console.log("unable to start recording, maybe tab lost focus");
                    return;
                }
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { action: "start-rrweb" },
                    function (response) {
                        console.log(response.status);
                    }
                );
            }
        );
        sendResponse({ status: "recording started" });
    } else if (request.action === "stop-recording") {
        console.log("stopping rrweb...");
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                if (tabs.length == 0) {
                    console.log("unable to stop recording, maybe tab lost focus");
                    return;
                }
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { action: "stop-rrweb" },
                    function (response) {
                        console.log(response.status);
                    }
                );
            }
        );
        sendResponse({ status: "recording stopped" });
    }
});

// Inject content script on tab updates
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete") {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ["scripts/content.js"],
//         });
//     }
// });
