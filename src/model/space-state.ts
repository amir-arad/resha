import {EntityMap} from "colyseus";

export interface Vector {
    x: number;
    y: number;
}

export function Vector(x = 0, y = 0, z = 0): Vector {
    return {x, y}
}

export interface PlayerShip {
    id: string;
    pos: Vector;
}

export interface SpaceState {
    players: EntityMap<PlayerShip>;
}
