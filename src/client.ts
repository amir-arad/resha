import {Client, DataChange} from "colyseus.js"
import {Engine} from './engine'

const host = window.document.location.host.replace(/:.*/, '')
const viewScreen = new Engine()
viewScreen.camera.position.z = 600

const client = new Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
const room = client.join("basic")

room.onStateChange.addOnce(function (state: any) {
  state.cubes.forEach((c: any) => viewScreen.addCube(c.x, c.y,c.z))
})
