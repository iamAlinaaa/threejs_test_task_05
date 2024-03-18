import * as THREE from "three";
import Experience from "../Experience.js";
export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physicsWorld = this.experience.physicsWorld;
    this.defaultMaterial = this.experience.defaultMaterial;

    this.setSunLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#FFDDCC", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 50;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(30, 5, 0);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#FFEECC", 1.5);
    this.scene.add(this.ambientLight);
  }
}
