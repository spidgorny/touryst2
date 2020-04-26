import {BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, Scene} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Fountain} from "./fountain";
import {Object3D} from "three/src/core/Object3D";


export class Level extends Mesh {

  objects: any[] = [];

  constructor(scene: Object3D) {
    super();
    this.objects.push(new Fountain(scene));
    this.objects.map(o => this.add(o));

    const loader = new GLTFLoader();
    loader.load( 'public/touryst.glb',  ( gltf: GLTF ) => {
      scene.add( gltf.scene );
    }, undefined, function ( error ) {
      console.error( error );
    });
  }

  update(runner: number) {
    this.objects.map(o => o.update(runner));
  }

}
