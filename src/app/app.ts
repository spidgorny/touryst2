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

export class App {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });

  private brick: Brick;
  private ambient: AmbientLight;
  private light: PointLight;
  private runner: number = 0;

  constructor() {
    this.brick = new Brick(40, new Color('rgb(255,0,0)'));
    this.scene.add(this.brick);

    const brick2 = new Brick(40, new Color('rgb(0,0,255)'));
    brick2.position.set(50, 0, 0);
    this.scene.add(brick2);

    this.camera.position.set(100, 200, 200);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.ambient = new AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambient);

    this.light = new PointLight(0xffffff, 0.5, 10000, 0);
    this.light.position.set( 80, 80, 50 );
    const sphere = new SphereBufferGeometry( 1, 8, 8 );
    this.light.add( new Mesh( sphere, new MeshBasicMaterial( { color: 0xff0040 } ) ) );

    this.scene.add(this.light);

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color('rgb(0,0,0)'));

    this.render();
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
    this.brick.rotateY(0.01);
    this.camera.position.set(100, 200 + 10 * Math.sin(this.runner/100), 200);
    this.runner += 1;
  }
}
