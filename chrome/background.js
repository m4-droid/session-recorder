console.log("where does it go? revise");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "start-recording") {
        console.log("starting rrweb...");
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                if (tabs.length == 0) {
                    console.log(
                        "unable to start recording, maybe tab lost focus"
                    );
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
                    console.log(
                        "unable to stop recording, maybe tab lost focus"
                    );
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
    } else if (request.action === "export-recording") {
        console.log("exporting rrweb...");
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                if (tabs.length == 0) {
                    console.log(
                        "unable to export recording, maybe tab lost focus"
                    );
                    return;
                }
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { action: "export-rrweb" },
                    function (response) {
                        console.log(response.status);
                    }
                );
            }
        );
        sendResponse({ status: "recording exported" });
    }
});
