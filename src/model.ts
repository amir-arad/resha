import { Client, Room } from 'colyseus'

export class BasicRoom extends Room {
  onInit (options: any) {
    this.setState({
      cubes: [{ x: 0, y: 0, z: 0 }]
    })
  }

  onJoin (client: Client) {
    // TBD
  }

  onLeave (client: Client) {
    // TBD
  }

  onMessage (client: Client, data: any) {
    // TBD
  }

  onDispose () {
    // TBD
  }
}
