import {BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial} from 'three';

export class Brick extends Mesh {

  public hasRotation: boolean = true;

  public material: MeshPhongMaterial;

  constructor(size: number, color: Color | string | number) {
    super();
    this.geometry = new BoxGeometry(size, size, size);
    this.material = new MeshPhongMaterial({ color });
  }

  update(runner: number) {
    if (this.hasRotation) {
      this.rotateY(0.01);
    }
  }

}
