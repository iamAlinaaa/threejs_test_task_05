import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    this.sources = sources;
    this.materialSettings = document.getElementById("materialSettings");
    this.setLoaders();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.rgbeLoader = new RGBELoader();
    this.loaders.fbxLoader = new FBXLoader();
  }

  loadSourceFile(category, pathToFile) {
    switch (category) {
      
      case "fbx":
        return new Promise((resolve) => {
          this.loaders.fbxLoader.load(pathToFile, (sourceFile) => {
            this.sources.push(sourceFile);
            this.sources.length > 0
              ? (this.materialSettings.style.display = "flex")
              : (this.materialSettings.style.display = "none");
            resolve(sourceFile);
          });
        });

      case "gltf":
      case "glb":
        return new Promise((resolve) => {
          this.loaders.gltfLoader.load(pathToFile, (sourceFile) => {
            this.sources.push(sourceFile);
            this.sources.length > 0
              ? (this.materialSettings.style.display = "flex")
              : (this.materialSettings.style.display = "none");
            resolve(sourceFile);
          });
        });

      case "jpg":
      case "jpeg":
      case "png":
        return new Promise((resolve) => {
          this.loaders.textureLoader.load(pathToFile, (sourceFile) => {
            resolve(sourceFile);
          });
        });

      case "hdr":
        return new Promise((resolve) => {
          this.loaders.rgbeLoader.load(pathToFile, (sourceFile) => {
            resolve(sourceFile);
          });
        });
    }
  }
}
