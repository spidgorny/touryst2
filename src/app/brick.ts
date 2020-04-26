import {BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, Scene} from 'three';
import {Component} from "./component";
import {Object3D} from "three/src/core/Object3D";

export class Brick extends Component {

  public hasRotation: boolean = true;

  public material: MeshPhongMaterial;

  constructor(scene: Object3D, size: number, color: Color | string | number) {
    super(scene);
    this.geometry = new BoxGeometry(size, size, size);
    this.material = new MeshPhongMaterial({color});
  }

  update(runner: number) {
    if (this.hasRotation) {
      this.rotateY(0.01);
    }
  }

}
