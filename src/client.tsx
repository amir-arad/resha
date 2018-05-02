import {Client, DataChange, Room} from "colyseus.js";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SpaceState} from "./model/space-state";
import {Screen} from "./client/screen";

const host = window.document.location.host.replace(/:.*/, '');

const client = new Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
const room: Room<SpaceState> = client.join<SpaceState>("space");

const roomReady = new Promise(res => room.onUpdate.addOnce(res));
const loaded = new Promise(res => window.addEventListener("load", res));

(async function () {
    await roomReady;
    await loaded;
    console.log("initial room data:", room.data);
    ReactDOM.render(
        <Screen room={room}/>,
        document.getElementById('resha')
    );
}());
