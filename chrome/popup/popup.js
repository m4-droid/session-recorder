console.log("console.log in popup's console");

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");

    startBtn.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;
            const tabId = tabs[0].id;
            chrome.runtime.sendMessage(
                { action: "start-recording", tabId },
                (response) => {
                    if (chrome.runtime.lastError) {
                        alert(
                            "Error starting recording: " +
                                chrome.runtime.lastError.message
                        );
                        return;
                    }
                    startBtn.disabled = true;
                    stopBtn.disabled = false;

                    console.log(response.status);
                }
            );
        });
    });

    stopBtn.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;
            const tabId = tabs[0].id;
            chrome.runtime.sendMessage(
                { action: "stop-recording", tabId },
                (response) => {
                    if (chrome.runtime.lastError) {
                        alert(
                            "Error stopping recording: " +
                                chrome.runtime.lastError.message
                        );
                        return;
                    }
                    startBtn.disabled = false;
                    stopBtn.disabled = true;

                    console.log(response.status);
                }
            );
        });
    });
});
