import Experience from "../Experience";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import * as THREE from "three";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.selectedMeshElement = this.experience.selectedMeshElement;
    this.outlineHelper = null;

    this.setTransformControls();
  }

  setTransformControls() {
    this.transformControls = new TransformControls(
      this.camera.instance,
      this.canvas
    );
    this.transformControls.addEventListener("dragging-changed", (e) => {
      this.experience.camera.controls.enabled = !e.value;
    });
    this.transformControls.addEventListener("change", () => {
      this.experience.renderer.update();
    });
    this.scene.add(this.transformControls);
  }

  addTransformControls() {
    this.selectedMeshElement = this.experience.selectedMeshElement;
    this.transformControls.attach(this.selectedMeshElement);
  }

  removeTransformControls() {
    this.selectedMeshElement = this.experience.selectedMeshElement;
    this.transformControls.detach(this.selectedMeshElement);
  }

  addOutlineHelper() {
    this.outlineHelper = new THREE.BoxHelper(this.selectedMeshElement, "white");
    this.scene.add(this.outlineHelper);
  }

  removeOutlineHelper() {
    this.outlineHelper.visible = false;
  }

  update() {
    this.outlineHelper = this.experience.transformControls.outlineHelper;
    if (this.selectedMeshElement && this.outlineHelper) {
      this.outlineHelper.setFromObject(this.selectedMeshElement);
    }
  }
}
