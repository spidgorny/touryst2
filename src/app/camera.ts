import {PerspectiveCamera, Vector3} from "three";

export class Camera extends PerspectiveCamera {

  x = 10;
  y = 50;
  z = 130;

  constructor() {
    super(45, innerWidth / innerHeight, 0.1, 10000);
    this.position.set(this.x, this.y, this.z);
    this.lookAt(new Vector3(0, 0, 0));
  }

  update(runner: number) {
  }

}
