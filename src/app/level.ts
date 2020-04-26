import {BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, Scene} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Fountain} from "./fountain";
import {Object3D} from "three/src/core/Object3D";
import {Component} from "./component";

export class Level extends Component {

	objects: any[] = [];

	constructor(scene: Object3D) {
		super(scene);
		this.objects.push(new Fountain(scene));

		const loader = new GLTFLoader();
		loader.load('public/touryst.glb', (gltf: GLTF) => {
			gltf.scene.receiveShadow = true;
			gltf.scene.traverse((node: any) => {
				if ('isMesh' in node && node.isMesh) {
					// console.log(node);
					node.receiveShadow = true;
				}
			});
			scene.add(gltf.scene);
		}, undefined, function (error) {
			console.error(error);
		});
		this.addToScene();
	}

	update(runner: number) {
		this.objects.map(o => o.update(runner));
	}

}
