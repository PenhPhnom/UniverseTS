import { Singleton } from './Singleton';
import { $promise } from 'puerts';
import { NiceTS, UnityEngine } from 'csharp';
import { Logger } from '../logger/Logger';
export class ResManager extends Singleton {
    constructor() {
        super();
        this._pkgMap = new Map();
    }
    async loadFairyGUIPackage(packageName) {
        try {
            let count = this._pkgMap.get(packageName);
            if (count == null || count < 1) {
                //没有缓存，加载
                let address = packageName + "_fui.bytes";
                let task = NiceTS.ResourceManager.LoadFairyGUIPackage(address, packageName);
                await $promise(task);
                this._pkgMap.set(packageName, 1);
            }
            else {
                this._pkgMap.set(packageName, count + 1);
            }
        }
        catch (ex) {
            Logger.error(`Load fairyGUI :${packageName} : ${ex}`);
        }
    }
    releaseFairyGUIPackage(packageName) {
        let count = this._pkgMap.get(packageName);
        if (count != null && count > 1) {
            this._pkgMap.set(packageName, count - 1);
        }
        else {
            Logger.log(`release fagui package:${packageName}`);
            this._pkgMap.delete(packageName);
            NiceTS.ResourceManager.ReleaseFGUIPackage(packageName);
        }
    }
    async loadScene(sceneName, mode = UnityEngine.SceneManagement.LoadSceneMode.Single) {
        try {
            let task = NiceTS.ResourceManager.LoadScene(sceneName, mode, (progress) => {
                Logger.log("load scene: " + progress);
            });
            let scenInstance = await $promise(task);
            return scenInstance;
        }
        catch (ex) {
            Logger.error(`Load Scene :${sceneName} : ${ex}`);
            return null;
        }
    }
    async unloadScene(sceneInstance) {
        try {
            let task = NiceTS.ResourceManager.UnloadScene(sceneInstance);
            let go = await $promise(task);
            return go;
        }
        catch (ex) {
            Logger.error(`Unload scene  : ${ex}`);
            return null;
        }
    }
    unloadSceneByName(sceneName) {
        NiceTS.ResourceManager.UnloadSceneByName(sceneName);
    }
    async loadPrefab(address) {
        try {
            let task = NiceTS.ResourceManager.LoadPrefab(address);
            let go = await $promise(task);
            return go;
        }
        catch (ex) {
            Logger.error(`Load prefab :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextAsset(address) {
        try {
            let task = NiceTS.ResourceManager.LoadTextAsset(address);
            let go = await $promise(task);
            return go;
        }
        catch (ex) {
            Logger.error(`Load textasset :${address} : ${ex}`);
            return null;
        }
    }
    async loadTextBytes(address) {
        try {
            let task = NiceTS.ResourceManager.LoadTextBytes(address);
            let bytes = await $promise(task);
            return bytes;
        }
        catch (ex) {
            Logger.error(`LoadTextBytes :${address} : ${ex}`);
        }
    }
    async loadSprite(address) {
        try {
            let task = NiceTS.ResourceManager.LoadSprite(address);
            let go = await $promise(task);
            return go;
        }
        catch (ex) {
            Logger.error(`Load sprite :${address} : ${ex}`);
            return null;
        }
    }
    releaseAddressGO(go) {
        NiceTS.ResourceManager.ReleaseAddressGO(go);
    }
}
//# sourceMappingURL=ResManager.js.map