import {BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, Scene} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Brick} from "./brick";
import {FountainParticle} from "./fountain-particle";
import {Object3D} from "three/src/core/Object3D";


export class Fountain extends Mesh {

  x = -20;
  y = 2;
  z = 28;

  objects: any[] = [];

  constructor(scene: Object3D) {
    super();
    this.position.set(this.x, this.y, this.z);
    for (let i = 0; i < 300; i++) {
      this.objects.push(new FountainParticle(scene, 0.5, 0x0088ff));
    }
    this.objects.map(o => this.add(o));
  }

  update(runner: number) {
    this.objects.map(o => o.update(runner));
  }

}
