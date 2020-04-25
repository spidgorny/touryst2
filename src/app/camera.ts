import {PerspectiveCamera, Vector3} from "three";

export class Camera extends PerspectiveCamera {

  x = 10;
  y = 50;
  z = 130;

  constructor() {
    super(45, innerWidth / innerHeight, 0.1, 10000);
    this.position.set(this.x, this.y, this.z);
    this.lookAt(new Vector3(-10, 0, 0));
  }

  update(runner: number) {
    let sin = Math.sin(runner/100);
    let cos = Math.cos(runner/100);
    this.position.set(this.x + 5 * cos, this.y + 5 * sin, this.z);
  }

}
