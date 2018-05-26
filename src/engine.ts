'use strict';

// loader for three.js examples, see https://github.com/mrdoob/three.js/issues/9562
import * as _THREE from 'three';
declare global {
    interface Window {
        THREE: typeof _THREE;
    }
}
window.THREE = _THREE;
//load three.js example extentions
import 'three/examples/js/controls/OrbitControls.js';

import {BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer, OrbitControls} from 'three';

export class Engine {
    renderer = new WebGLRenderer({antialias: true});
    scene = new Scene();
    camera = new PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
    );
    controls = new OrbitControls(this.camera);

    constructor() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.animate();
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => { // TODO: betterify
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix()
        }, false)
    }

    addCube(x: number, y: number, z: number) {
        const geometry = new BoxGeometry(50, 50, 50);
        const material = new MeshNormalMaterial();
        const cube = new Mesh(geometry, material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        this.scene.add(cube)
    }

    private animate() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate()) // TODO: let's do this better
    }
}
