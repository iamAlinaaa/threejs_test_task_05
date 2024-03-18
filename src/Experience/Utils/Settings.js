import Experience from "../Experience.js";
import * as THREE from "three";
export default class Settings {
  constructor() {
    this.experience = new Experience();
    this.transformControls = this.experience.transformControls;
    this.resources = this.experience.resources;
    this.currentEnvMap = null;
    
    this.customModel = document.getElementById("cusomModel");
    this.normalMap = document.getElementById("normalMap");
    this.map = document.getElementById("map");
    this.environmentMap = document.getElementById("environmentMap");
    this.modelEnvironmentMap = document.getElementById("modelEnvironmentMap");

    this.color = document.getElementById("color");
    this.metalness = document.getElementById("metalness");
    this.opacity = document.getElementById("opacity");
    this.roughness = document.getElementById("roughness");

    this.modelEventListener();
    this.materialsEventListener();
    this.texturesEventListener();
    this.environmentMapEventListener();
  }

  updateMaterials() {
    if (this.experience.selectedMeshElement.material) {
      this.currentColor = new THREE.Color(
        this.experience.selectedMeshElement.material.color
      );
    }
    this.color.value = this.experience.selectedMeshElement.material?.color
      ? `#${this.currentColor.getHexString()}`
      : "#ffffff";
    this.metalness.value =
      this.experience.selectedMeshElement.material?.metalness || 1;
    this.opacity.value =
      this.experience.selectedMeshElement.material?.opacity || 1;
    this.roughness.value =
      this.experience.selectedMeshElement.material?.roughness || 1;
  }

  meshTraverse(e, callback) {
    if (this.experience.selectedMeshElement) {
      this.experience.selectedMeshElement.traverse((child) => {
        child.isMesh && callback(child, e.target.value);
      });
    }
  }

  modelEventListener() {
    this.customModel.addEventListener("input", async (e) => {
      const fileSource = e.target.files[0];
      const fileCategory = fileSource.name.slice(
        fileSource.name.lastIndexOf(".") + 1
      );
      const model = await this.resources
        .loadSourceFile(fileCategory, URL.createObjectURL(fileSource))
        .then((res) => res);
      if (model) {
        if (this.experience.selectedMeshElement) {
          this.transformControls.removeOutlineHelper();
        }
        this.selectedMeshElement =
          this.resources.sources[this.resources.sources.length - 1].scene;
        this.experience.selectedMeshElement = this.selectedMeshElement;
        this.experience.scene.add(this.selectedMeshElement);
        this.transformControls.addTransformControls();
        this.transformControls.addOutlineHelper();
        this.updateMaterials();
      }
    });
  }

  materialsEventListener() {
    this.color.addEventListener("input", (e) => {
      this.meshTraverse(e, (child, value) => {
        child.material.color.set(value);
      });
    });

    this.metalness.addEventListener("input", (e) => {
      this.meshTraverse(e, (child, value) => {
        child.material.metalness = value;
      });
    });

    this.opacity.addEventListener("input", (e) => {
      this.meshTraverse(e, (child, value) => {
        child.material.transparent = true;
        child.material.needsUpdate = true;
        child.material.opacity = value;
      });
    });

    this.roughness.addEventListener("input", (e) => {
      this.meshTraverse(e, (child, value) => {
        child.material.roughness = value;
      });
    });
  }

  texturesEventListener() {
    this.map.addEventListener("input", async (e) => {
      const fileSource = e.target.files[0];
      const fileCategory = fileSource.name.slice(
        fileSource.name.lastIndexOf(".") + 1
      );
      const result = await this.resources.loadSourceFile(
        fileCategory,
        URL.createObjectURL(fileSource)
      );
      if (result) {
        this.meshTraverse(e, (child) => {
          child.material.map = result;
          child.material.needsUpdate = true;
          child.material.map.mapping = THREE.EquirectangularReflectionMapping;
          child.material.map.colorSpace = THREE.SRGBColorSpace;
        });
      }
    });

    this.normalMap.addEventListener("input", async (e) => {
      const fileSource = e.target.files[0];
      const fileCategory = fileSource.name.slice(
        fileSource.name.lastIndexOf(".") + 1
      );
      const result = await this.resources.loadSourceFile(
        fileCategory,
        URL.createObjectURL(fileSource)
      );
      if (result) {
        this.meshTraverse(e, (child) => {
          child.material.normalMap = result;
          child.material.needsUpdate = true;
          child.material.normalMap.mapping =
            THREE.EquirectangularReflectionMapping;
          child.material.normalMap.colorSpace = THREE.SRGBColorSpace;
        });
      }
    });

    this.modelEnvironmentMap.addEventListener("input", async (e) => {
      const fileSource = e.target.files[0];
      const fileCategory = fileSource.name.slice(
        fileSource.name.lastIndexOf(".") + 1
      );
      const result = await this.resources.loadSourceFile(
        fileCategory,
        URL.createObjectURL(fileSource)
      );
      if (result) {
        this.meshTraverse(e, (child) => {
          child.material.envMap = result;
          child.material.needsUpdate = true;
          child.material.envMap.mapping =
            THREE.EquirectangularReflectionMapping;
          child.material.envMap.colorSpace = THREE.SRGBColorSpace;
        });
      }
    });
  }

  environmentMapEventListener() {
    this.environmentMap.addEventListener("input", async (e) => {
      const fileSource = e.target.files[0];
      const fileCategory = fileSource.name.slice(
        fileSource.name.lastIndexOf(".") + 1
      );
      this.currentEnvMap = await this.resources.loadSourceFile(
        fileCategory,
        URL.createObjectURL(fileSource)
      );
      this.currentEnvMap.mapping = THREE.EquirectangularReflectionMapping;
      this.currentEnvMap.colorSpace = THREE.SRGBColorSpace;
    });
  }

  update() {
    this.experience.scene.environment = this.currentEnvMap;
    this.experience.scene.background = this.currentEnvMap;
  }
}
