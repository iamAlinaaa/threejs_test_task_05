import Experience from "../Experience.js";
import * as THREE from "three";
export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
  }

  setFloor() {
    this.floorMesh = new THREE.GridHelper(30, 30, "#919191", "#3d3d3d");
    this.scene.add(this.floorMesh);
  }
}
