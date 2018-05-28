import { Client } from 'colyseus.js'
import { Engine } from './engine'

function createWsUrl () {
  const host = window.document.location.host.replace(/:.*/, '')
  const protocol = location.protocol.replace('http', 'ws')
  const port = location.port ? `:${location.port}` : ''
  return `${protocol}${host}${port}`
}

const viewScreen = new Engine()
viewScreen.camera.position.z = 600

const client = new Client(
  createWsUrl()
)
const room = client.join('basic')

room.onStateChange.addOnce(function (state: any) {
  state.cubes.forEach((c: any) => viewScreen.addCube(c.x, c.y, c.z))
})
