'use strict'

const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

export class Engine {
  private three: any
  renderer: any
  scene: any
  camera: any
  controls: any
  constructor () {
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    )
    this.controls = new OrbitControls(this.camera)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.animate()
    document.body.appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => { // TODO: betterify
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()		
    }, false)
  }
  addCube (x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(50, 50, 50)
    const material = new THREE.MeshNormalMaterial()
    const cube = new THREE.Mesh( geometry, material )
    cube.position.x = x
    cube.position.y = y
    cube.position.z = z
    this.scene.add(cube)
  }
  private animate () {
    this.renderer.render(this.scene, this.camera);		
    requestAnimationFrame(() => this.animate()) // TODO: let's do this better
  }
}
