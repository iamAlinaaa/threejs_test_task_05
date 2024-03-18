import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.environment = new Environment();
    this.floor = new Floor();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.loadedModelsArray = this.experience.loadedModelsArray;
    this.transformControls = this.experience.transformControls;

    this.setMouseCoordinates();

    window.addEventListener("click", (e) => {
      this.setRaycaster();
    });
  }

  setMouseCoordinates() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
    });
  }

  setRaycaster() {
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    if (this.loadedModelsArray.length) {
      this.scenesArray = this.loadedModelsArray.map((item) => item.scene);
      this.intersectObjects = this.raycaster.intersectObjects(this.scenesArray);
      if (this.intersectObjects.length) {
        this.experience.selectedMeshElement = this.intersectObjects[0].object;
        this.transformControls.addTransformControls();
        this.experience.settings.updateMaterials();
      }
    }
  }
}
