console.log("console.log in infected page");

const rrecord = require("rrweb").record;
const rrwebPlayer = require("rrweb-player").default;
import "rrweb-player/dist/style.css";

let recorder = null;
let events = [];

function startRecording() {
    console.log("rrweb recording");

    if (recorder) return;

    recorder = rrecord({
        emit(event) {
            console.log(event);
            events.push(event);
        },
    });
}

function stopRecording() {
    console.log("rrweb stopped recording");
    if (recorder === null || recorder === undefined) return;

    recorder();
    recorder = null;

    let event_count = events.length;

    let recording_time =
        events[event_count - 1].timestamp - events[0].timestamp;
    recording_time /= 1000;

    console.log(
        `recording_time: ${recording_time}s, event_count: ${event_count}`
    );

    new rrwebPlayer({
        target: document.body,
        props: {
            events: events,
            autoPlay: false,
        },
    });
}

function exportRecording() {
    console.log("rrweb exported recording");
    if (events.length === 0) {
        console.log("no recording present");
        return;
    }

    const events_json = JSON.stringify(events);

    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>session replayer</title>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/style.css"/>
        <script src="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/index.js"></script>
    </head>
    <body>
        <div id="replayer">this text should show above the player</div>

        <script>
            console.log("please don't hack me");

            let events = ${events_json};
            
            const player = new rrwebPlayer({
                target: document.getElementById("replayer");
                props: {
                    events: events,
                    autoPlay: false
                }
            });
        </script>
        
    </body>
    </html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });

    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");

    a.style.display = "none";
    a.href = url;
    a.download = "session-replayer.html";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start-rrweb") {
        startRecording();
        sendResponse({ status: "rrweb started" });
    } else if (request.action === "stop-rrweb") {
        stopRecording();
        sendResponse({ status: "rrweb stopped" });
    } else if (request.action === "export-rrweb") {
        exportRecording();
        sendResponse({ status: "rrweb exported" });
    }
});
