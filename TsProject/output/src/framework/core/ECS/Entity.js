import { CompFieldType } from "./EntityContext";
import { Vec2 } from "../Vec2";
import { GroupID } from "./GroupID";
import { theFramePool } from "../FramePool";
import { EventSlots } from "./EventSlots";
import { TypedObjectPool } from "../../common/TypedObjectPool";
let GArrayPool = new TypedObjectPool(Array);
export class Entity {
    get id() { return this._id; }
    get context() { return this._ctx; }
    get groupID() { return this._groupID; }
    init(ctx, id) {
        this._ctx = ctx;
        this._id = id;
        this._groupID = new GroupID();
        this._prevGroupID = new GroupID();
    }
    reset() {
        this._ctx = null;
        this._groupID = null;
        this._prevGroupID = null;
        this.clearAllComponentData();
    }
    beforeRecover() {
        this._prevGroupID.assign(this._groupID);
        this._groupID.reset();
        this._ctx.componentGroupContext.changeEntityGroup(this, this._prevGroupID, this._groupID);
        this._ctx = null;
        this.clearAllComponentData();
    }
    add(cls0, cls1, cls2, cls3, cls4, cls5) {
        this.beginGroupChange();
        this.doAdd(cls0);
        if (cls1) {
            this.doAdd(cls1);
            if (cls2) {
                this.doAdd(cls2);
                if (cls3) {
                    this.doAdd(cls3);
                    if (cls4) {
                        this.doAdd(cls4);
                        if (cls5) {
                            this.doAdd(cls5);
                        }
                    }
                }
            }
        }
        this.endGroupChange();
        return this;
    }
    get(cls0, cls1, cls2, cls3, cls4) {
        if (!this.has(cls0)) {
            return null;
        }
        if (cls1 !== undefined && !this.has(cls1)) {
            return null;
        }
        if (cls2 !== undefined && !this.has(cls2)) {
            return null;
        }
        if (cls3 !== undefined && !this.has(cls3)) {
            return null;
        }
        if (cls4 !== undefined && !this.has(cls4)) {
            return null;
        }
        return this;
    }
    getOrCreate(cls0, cls1, cls2, cls3, cls4) {
        let result = this.get(cls0, cls1, cls2, cls3, cls4);
        if (!result) {
            result = this.add(cls0, cls1, cls2, cls3, cls4);
        }
        return result;
    }
    del(cls) {
        let ctx = this._ctx;
        let classID = ctx.getOrRegClassID(cls);
        if (!this._groupID.has(classID)) {
            return;
        }
        let prevGroup = theFramePool.allocItem("GroupID", GroupID);
        prevGroup.assign(this._groupID);
        this._groupID.clear(classID);
        let defaults = ctx.getCompSpecFieldDesc(classID);
        for (let name of Object.getOwnPropertyNames(defaults)) {
            delete this[name];
        }
        this._ctx.componentGroupContext.changeEntityGroup(this, prevGroup, this._groupID);
    }
    has(cls) {
        let classID = this._ctx.getOrRegClassID(cls);
        return this._groupID.has(classID);
    }
    recover() {
        this._ctx.recover(this);
    }
    vec2(name) {
        let getter = this._ctx.getFieldConvertor(name);
        if (getter) {
            return getter.call(this);
        }
        return Vec2.kZero;
    }
    beginGroupChange() {
        this._prevGroupID.assign(this._groupID);
    }
    endGroupChange() {
        if (!this._groupID.equal(this._prevGroupID)) {
            this._ctx.componentGroupContext.changeEntityGroup(this, this._prevGroupID, this._groupID);
        }
    }
    doAdd(cls) {
        let ctx = this._ctx;
        let classID = ctx.getOrRegClassID(cls);
        if (this._groupID.has(classID)) {
            return;
        }
        let desc = ctx.getCompSpecFieldDesc(classID);
        let count = desc.length;
        for (let i = 0; i < count; i++) {
            let fieldDesc = desc[i];
            switch (fieldDesc.type) {
                case CompFieldType.Array:
                    this[fieldDesc.name] = GArrayPool.get();
                    break;
                case CompFieldType.Map:
                    this[fieldDesc.name] = {};
                    break;
                case CompFieldType.Slot:
                    this[fieldDesc.name] = new EventSlots();
                    break;
            }
        }
        this._groupID.set(classID);
    }
    clearAllComponentData() {
        // Entity自己的成员变量是以_开始的, 所以可以这么暴力.
        let names = Object.getOwnPropertyNames(this);
        let count = names.length;
        for (let i = 0; i < count; i++) {
            let name = names[i];
            if (name.substr(0, 3) == 'ref') {
                delete this[name];
            }
            else if (name.substr(-4) == "List") {
                let list = this[name];
                list.length = 0;
                GArrayPool.recover(list);
                delete this[name];
            }
            else if (name.substr(0, -3) == 'Map') {
                delete this[name];
            }
        }
    }
}
//# sourceMappingURL=Entity.js.map