"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResManager = void 0;
const Singleton_1 = require("./Singleton");
const csharp_1 = require("csharp");
class ResManager extends Singleton_1.Singleton {
    _pkgMap = new Map();
    constructor() {
        super();
    }
    async loadScene(sceneName, mode = csharp_1.UnityEngine.SceneManagement.LoadSceneMode.Single) {
    }
    async unloadScene(sceneInstance) {
    }
    unloadSceneByName(sceneName) {
    }
    async loadPrefab(address) {
    }
    async loadTextAsset(address) {
    }
    async loadTextBytes(address) {
    }
    async loadSprite(address) {
    }
    releaseAddressGO(go) {
    }
}
exports.ResManager = ResManager;
//# sourceMappingURL=ResManager.js.map