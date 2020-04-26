import {
	Geometry,
	Material,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	Object3D,
	Scene,
	SphereGeometry,
	Vector3
} from "three";
import {Component} from "./component";

export class Sphere extends Component {

	material: MeshPhongMaterial;
	geometry: Geometry;

	constructor(scene: Object3D, pos: Vector3, radius: number = 1) {
		super(scene);
		this.geometry = new SphereGeometry(radius, 16, 16);
		this.material = new MeshPhongMaterial({color: 0xffff00});
		const sphere = new Mesh(this.geometry, this.material);
		this.objects.push(sphere);
		this.addToScene();
	}

}
