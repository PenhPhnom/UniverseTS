import { ArrayMap } from "../core/ArrayMap";
import { Logger } from "../logger/Logger";
export class AEntity {
    constructor() {
        this.uuid = 0;
        this.eventsMap = new Map();
        this.components = new Map();
        this.parent = null;
        this._children = new ArrayMap();
        this._typeChildren = new Map();
    }
    addChild(child, c) {
        child.parent = this;
        this._children.add(child.uuid, child);
        let childrenArr = this._typeChildren.get(c.name);
        if (childrenArr == null) {
            childrenArr = new Array();
            this._typeChildren.set(c.name, childrenArr);
        }
        childrenArr.push(child);
    }
    removeChild(child) {
        let entity = this._children.remove(child.uuid);
        entity.dispose();
    }
    getChildren() {
        return this._children.getArr();
    }
    getChildByUUID(uuid) {
        return this._children.get(uuid);
    }
    getChildrenByType(c) {
        return this._typeChildren.get(c.name);
    }
    getChildByType(c) {
        return this.getChildrenByType(c)[0];
    }
    addComponent(c) {
        let cc = new c();
        cc.entity = this;
        this.components[c.name] = cc;
        return cc;
    }
    getComponent(c) {
        return this.components[c.name];
    }
    getOrAddComponent(c) {
        let com = this.getComponent(c);
        if (com == null) {
            com = this.addComponent(c);
        }
        return com;
    }
    publish(event, c) {
        let array = this.eventsMap.get(c.name);
        if (array == null || array.length == 0) {
            Logger.log("this event not subscribed...");
            return;
        }
        for (let i = 0; i < array.length; i++) {
            let f = array[i];
            if (f != null)
                f(event);
        }
    }
    subscribe(action, c) {
        let array = this.eventsMap.get(c.name);
        if (array == null) {
            array = new Array();
            this.eventsMap.set(c.name, array);
        }
        array.push(action);
    }
    unSubscribe(action, c) {
        let array = this.eventsMap.get(c.name);
        let index = array.indexOf(action, 0);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    dispose() {
        let children = this.getChildren;
        for (let i = 0; i < children.length; i++) {
            children[i].dispose();
        }
        this.components.clear();
        this.eventsMap.clear();
        this._typeChildren.clear();
        this._children.dispose();
        this.parent = null;
    }
}
//# sourceMappingURL=AEntity.js.map