import {Brick} from "./brick";
import {Color, Vector3} from "three";

export class FountainParticle extends Brick {

  originalColor: number;

  x = 0;
  y = 0;
  z = 0;

  force: Vector3 = new Vector3();
  gravity: Vector3 = new Vector3(0, -0.01, 0);

  constructor(size: number, color: Color | number | string) {
    super(size, color);
    this.originalColor = color as number;
    this.resetPos();

    // try to make it run for some time
    this.y = Math.random() * 10;
    this.position.set(this.x, this.y, this.z);
    for (let i = 0; i < 1000; i++) {
      this.update(i);
    }
  }

  resetPos() {
    const radius = 3;
    this.force = new Vector3(0, 0.5 + Math.random() * 0.1, 0);
    this.x = Math.random() * radius - radius / 2;
    this.y = 0;
    this.z = Math.random() * radius - radius / 2;
    this.position.set(this.x, this.y, this.z);
  }

  update(runner: number) {
    this.position.add(this.force);
    this.force.add(this.gravity);
    this.material.color = new Color(this.originalColor).multiplyScalar(1 + this.position.y / 30);
    if (this.position.y < 0) {
      this.resetPos();
    }
  }

}
