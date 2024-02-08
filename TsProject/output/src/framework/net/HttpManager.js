import { NiceTS } from "csharp";
import { $promise } from "puerts";
import { Singleton } from "../common/Singleton";
import { Logger } from "../logger/Logger";
export class HttpManager extends Singleton {
    constructor() {
        super();
    }
    async get(url) {
        try {
            let task = NiceTS.HttpManager.Get(url);
            let txt = await $promise(task);
            return txt;
        }
        catch (ex) {
            Logger.error(`Get error :${url} : ${ex}`);
            return null;
        }
    }
    async post(url, form) {
        try {
            let task = NiceTS.HttpManager.Post(url, form);
            let txt = await $promise(task);
            return txt;
        }
        catch (ex) {
            Logger.error(`Post error :${url} : ${ex}`);
            return null;
        }
    }
}
//# sourceMappingURL=HttpManager.js.map