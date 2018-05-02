import * as React from 'react';
import {Room} from "colyseus.js";
import {PlayerShip, SpaceState} from "../model/space-state";
import {DeltaContainer} from 'delta-listener';
import KeyHandler, {KEYDOWN} from 'react-key-handler';
import * as Keycode from "@gamestdio/keycode";

export interface ScreenProps {
    room: Room<SpaceState> & DeltaContainer<SpaceState>;
}

export class Screen extends React.Component<ScreenProps> {

    componentWillMount() {
        this.props.room.onUpdate.add(() => {
            this.forceUpdate();
        });

// listen to patches coming from the server
//         this.props.room.listen("messages/:number", function (change: DataChange) {
//             const p = document.createElement("p");
//             p.innerHTML = change.value;
//             let querySelector = document.querySelector("#messages") as HTMLDivElement;
//             querySelector.appendChild(p);
//         });
//
//         this.props.room.listen(function (change: DataChange) {
//             console.log("patch:", change.path, change.operation, change.value)
//         });
    }

    onUp = ()=>{
        console.log('up');
        this.props.room.send({ move: "up" });
    };

    render() {
        return [
            <KeyHandler keyEventName={KEYDOWN} keyCode={Keycode.UP} onKeyHandle={this.onUp} />,
            <h1>{this.props.room.name}:{this.props.room.id}</h1>,
            ...Object.values<PlayerShip>(this.props.room.data.players).map(p =>
                <div key={p.id}>{JSON.stringify(p.pos)}</div>),

        ];
    }
}
