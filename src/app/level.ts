import {BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, Scene} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Fountain} from "./fountain";


export class Level extends Mesh {

  objects: any[] = [];

  constructor(scene: Scene) {
    super();
    this.objects.push(new Fountain());
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
