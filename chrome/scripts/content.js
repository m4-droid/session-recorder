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

    let recording_time = events[event_count - 1].timestamp - events[0].timestamp;
    recording_time /= (1000);

    console.log(`recording_time: ${recording_time}s, event_count: ${event_count}`);
    
    new rrwebPlayer({
        target: document.body,
        props: {
            events,
        },
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start-rrweb") {
        startRecording();
        sendResponse({ status: "rrweb started" });
    } else if (request.action === "stop-rrweb") {
        stopRecording();
        sendResponse({ status: "rrweb stopped" });
    }
});
