import {Mesh, MeshBasicMaterial, MeshPhongMaterial, Object3D, Scene, SphereGeometry, Vector3} from "three";
import {Component} from "./component";

export class Sphere extends Component {

	constructor(scene: Object3D, pos: Vector3, radius: number = 1) {
		super(scene);
		const geometry = new SphereGeometry(radius, 16, 16);
		const material = new MeshPhongMaterial({color: 0xffff00});
		const sphere = new Mesh(geometry, material);
		this.objects.push(sphere);
		this.addToScene();
	}

}
