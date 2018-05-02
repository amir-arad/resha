// BattleRoom.ts
import {Client, Room} from "colyseus";
import {PlayerShip, SpaceState, Vector} from "../model/space-state";

export class SpaceRoom extends Room<SpaceState> {

    onInit(options: any) {
        console.log("Creating SpaceRoom");

        this.setState({players:{}});
        this.setSimulationInterval(() => this.update());

    }
    update () {
        // tick
    }
    onJoin(client: Client, options?: any) {
        console.log('join', client.sessionId);
        this.state.players[client.sessionId] = {
            id:client.sessionId,
            pos:Vector()
        };
    }

    onLeave(client: Client) {
        console.log('leave', client.sessionId);
        delete this.state.players[client.sessionId];
    }

    onMessage(client: Client, data: any) {
        console.log('message', data);
    }

    onDispose() {
        console.log("Dispose SpaceRoom");
    }

}
