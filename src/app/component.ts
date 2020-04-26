import {Camera, Mesh, Scene, Sphere} from "three";
import {Object3D} from "three/src/core/Object3D";

export class Component extends Mesh {

	scene: Object3D;

	// @ts-ignore
	public camera: Camera;

	objects: (Component | Object3D)[] = [];

	constructor(scene: Object3D) {
		super();
		this.scene = scene;
		// this.castShadow = true;
		// this.receiveShadow = true;

		// create objects and push them to this.objects
		// call this.addToScene() afterwards
	}

	addToScene() {
		this.objects.map(o => this.add(o));
	}

	update(runner: number) {
		this.objects.map(o => {
			if ('update' in o) {
				o.update(runner);
			}
		});
	}

}
