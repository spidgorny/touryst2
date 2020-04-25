import {
  AmbientLight,
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
import { Brick } from './brick';
import {Level} from "./level";
import {Camera} from "./camera";

export class App {
  private readonly scene = new Scene();
  private readonly camera = new Camera();
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });

  private ambient: AmbientLight;
  private light: PointLight;
  private runner: number = 0;

  objects: any[] = [];

  constructor() {
    this.scene.add(this.camera);
    this.objects.push(this.camera);  // for update()

    this.ambient = new AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambient);

    this.light = new PointLight(0xffffff, 0.5, 10000, 0);
    this.light.position.set( 80, 80, 50 );
    // const sphere = new SphereBufferGeometry( 1, 8, 8 );
    // this.light.add( new Mesh( sphere, new MeshBasicMaterial( { color: 0xff0040 } ) ) );
    this.scene.add(this.light);

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color('rgb(0,0,0)'));

    this.initObjects();

    this.render();
  }

  private initObjects() {
    // const brick = new Brick(40, new Color('rgb(255,0,0)'));
    // this.objects.push(brick);

    // const brick2 = new Brick(40, new Color('rgb(0,0,255)'));
    // brick2.position.set(50, 0, 0);
    // brick2.hasRotation = false;
    // this.objects.push(brick2);

    this.objects.push(new Level(this.scene));

    this.objects.map(o => this.scene.add(o));
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

    this.runner += 1;
  }
}
