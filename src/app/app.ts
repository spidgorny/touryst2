import {
	AmbientLight, CameraHelper,
	Color, Mesh, MeshBasicMaterial,
	PerspectiveCamera,
	PointLight,
	Scene,
	SphereBufferGeometry,
	SpotLight,
	SpotLightShadow,
	Vector3,
	WebGLRenderer
} from 'three';
import {Brick} from './brick';
import {Level} from "./level";
import {Camera} from "./camera";
import {Gravity} from "./gravity";
import {FloatingCamera} from "./floating-camera";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class App {
	private readonly scene = new Scene();
	// @ts-ignore
	private camera: Camera | FloatingCamera;
	private readonly renderer = new WebGLRenderer({
		antialias: true,
		canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
	});

	private ambient: AmbientLight;
	private light: PointLight | undefined;
	private runner: number = 0;
	private controls: OrbitControls;

	objects: any[] = [];

	constructor() {
		this.ambient = new AmbientLight(0xffffff, 0.5);
		this.scene.add(this.ambient);

		this.renderer.setSize(innerWidth, innerHeight);
		this.renderer.setClearColor(new Color('rgb(0,0,0)'));
		this.renderer.shadowMap.enabled = true;

		this.initObjects();

		// @ts-ignore
		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		// @ts-ignore
		this.camera.controls = this.controls;

		this.render();
	}

	initLight() {
		this.light = new PointLight(0xffffff, 0.5, 10000, 0);
		this.light.castShadow = true;

		// const sphere = new SphereBufferGeometry( 1, 8, 8 );
		// this.light.add( new Mesh( sphere, new MeshBasicMaterial( { color: 0xff0040 } ) ) );
		this.scene.add(this.light);
	}

	private initObjects() {
		if (new URLSearchParams(document.location.search).has('gravity')) {
			this.camera = new Camera();
			this.camera.position.set(this.camera.x / 2, this.camera.y / 4, this.camera.z / 2);
			this.scene.add(this.camera);

			this.objects.push(new Gravity(this.scene));

			this.initLight();
			// @ts-ignore
			this.light.position.set(0, 8, 0);

			// const cameraHelper = new CameraHelper(this.light.shadow.camera);
			// this.scene.add(cameraHelper);
		} else {
			this.camera = new FloatingCamera();
			this.scene.add(this.camera);
			this.objects.push(this.camera);  // for update()
			this.objects.push(new Level(this.scene));

			this.initLight();
			// @ts-ignore
			this.light.position.set(8, 110, 25);
			// const cameraHelper = new CameraHelper(this.light.shadow.camera);
			// this.scene.add(cameraHelper);
		}

		this.objects.map(o => {
			o.camera = this.camera;
			return this.scene.add(o);
		});
	}

	private adjustCanvasSize() {
		this.renderer.setSize(innerWidth, innerHeight);
		this.camera.aspect = innerWidth / innerHeight;
		this.camera.updateProjectionMatrix();
	}

	private render() {
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(() => this.render());

		this.adjustCanvasSize();
		this.objects.map(o => o.update(this.runner));

		this.controls.update();

		this.runner += 1;
	}
}
