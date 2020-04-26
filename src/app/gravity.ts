import {Component} from "./component";
import {Color, PointLight, Scene, Vector3} from "three";
import {FountainParticle} from "./fountain-particle";
import {Object3D} from "three/src/core/Object3D";
import {GravityParticle} from "./gravity-particle";
import {Sphere} from "./sphere";

export class Gravity extends Component {

  constructor(scene: Object3D) {
    super(scene);

    this.objects.push(new Sphere(this.scene, new Vector3(0, 0, 0), 2));
    this.objects.push(new PointLight(0xffffff, 0.5));

    for (let i = 0; i < 500; i++) {
      let color = new Color(
        0.5 + Math.random() * 0.5,
        0.5 + Math.random() * 0.5,
        0.5 + Math.random() * 0.5,
      );
      this.objects.push(new GravityParticle(this.scene, 0.2, color));
    }

    this.addToScene();
  }

}
