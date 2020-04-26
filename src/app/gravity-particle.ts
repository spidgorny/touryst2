import {Brick} from "./brick";
import {Color, Scene, Vector3} from "three";
import {Object3D} from "three/src/core/Object3D";
import {Sphere} from "./sphere";

export class GravityParticle extends Sphere {

	// @ts-ignore
	originalColor: number;

	x = 0;
	y = 0;
	z = 0;

	force: Vector3 = new Vector3();
	gravity: Vector3 = new Vector3(0, 0, 0);

	constructor(scene: Object3D, size: number, color: Color | number | string) {
		super(scene, new Vector3(0, 0, 0), size);
		// @ts-ignore
		this.material.color.set(color);
		this.originalColor = color as number;
		this.castShadow = true;
		this.receiveShadow = true;
		this.resetPos();
	}

	resetPos() {
		const radius = 10;
		this.force = new Vector3(Math.random(), 0, 0);
		this.force.add(new Vector3(0.5, 0, 0));
		this.force.divideScalar(1);
		this.x = Math.random() * radius - radius / 2;
		this.y = 0;//Math.random() * radius - radius / 2;
		this.z = Math.random() * radius - radius / 2;
		this.position.set(this.x, this.y, this.z);
	}

	update(runner: number) {
		const gravity = this.position.clone().multiplyScalar(-1);
		gravity.multiplyScalar(1 / gravity.lengthSq());
		gravity.clampLength(0, 0.05);

		this.force.add(gravity);
		this.force.clampLength(0, 2);

		// this.material.color = new Color(this.originalColor).multiplyScalar(1 + this.position.y / 30);

		this.position.add(this.force);
		if (this.position.length() > 100) {
			this.force.multiplyScalar(-0.99);
		}
		if (this.position.length() < 5 - Math.random() * 2) {
			this.position.clampLength(5, Number.MAX_VALUE);
		}
	}

}
