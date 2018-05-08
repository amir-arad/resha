import {Client, DataChange} from "colyseus.js";

const host = window.document.location.host.replace(/:.*/, '');

const client = new Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
const room = client.join("basic");
room.onJoin.add(function () {
    console.log("joined");
});

room.onStateChange.addOnce(function (state: any) {
    console.log("initial room data:", state);
});

// new room state
room.onStateChange.add(function (state: any) {
    // this signal is triggered on each patch
});

// listen to patches coming from the server
room.listen("messages/:number", function (change: DataChange) {
    const p = document.createElement("p");
    p.innerHTML = change.value;
    let querySelector = document.querySelector("#messages") as HTMLDivElement;
    querySelector.appendChild(p);
});

room.listen(function (change: DataChange) {
    console.log("patch:", change.path, change.operation, change.value)
});

window.addEventListener("load", function(e) {
// send data to room on submit
    let form = document.querySelector("#form") as HTMLFormElement;
    form.onsubmit = function (e) {
        e.preventDefault();
        const input = document.querySelector("#input") as HTMLInputElement;
        console.log("input:", input.value);
        // send data to room
        room.send({message: input.value});
        // clear input
        input.value = "";
    };
});
