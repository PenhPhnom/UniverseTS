import { TypedObjectPool } from "../../common/TypedObjectPool";
import { ComponentGroupContext } from "./GroupContext";
import { SyncDebugger } from "./SyncDebugger";
export var CompFieldType;
(function (CompFieldType) {
    CompFieldType[CompFieldType["Normal"] = 0] = "Normal";
    CompFieldType[CompFieldType["Array"] = 1] = "Array";
    CompFieldType[CompFieldType["Map"] = 2] = "Map";
    CompFieldType[CompFieldType["Slot"] = 3] = "Slot";
})(CompFieldType || (CompFieldType = {}));
let gClassSpecFieldMap = {};
export class EntityContext {
    get contextName() { return this._name; }
    get componentGroupContext() { return this._compGroupCtx; }
    get entityMap() { return this._entityMap; }
    // get debugger() { return this._debugger; }
    constructor(name, cls) {
        this._nextID = 1;
        this._entityMap = {};
        this._fieldConvertorMap = {};
        this._singletonMap = {};
        this._name = name;
        this._classIDKey = "__compid_" + name;
        this._entityPool = new TypedObjectPool(cls);
        this._compGroupCtx = new ComponentGroupContext(this);
        this._debugger = new SyncDebugger();
    }
    reset() {
        this._debugger.clearRecord();
        this._compGroupCtx.reset();
        this._nextID = 1;
        let entityMap = this._entityMap;
        let pool = this._entityPool;
        for (let id in entityMap) {
            let entity = entityMap[id];
            entity.reset();
            pool.recover(entity);
        }
        this._entityMap = {};
        this._singletonMap = {};
    }
    clear() {
        let entityMap = this._entityMap;
        let pool = this._entityPool;
        for (let id in entityMap) {
            let entity = entityMap[id];
            entity.reset();
            pool.recover(entity);
            delete entityMap[id];
        }
        this._compGroupCtx.clear();
    }
    entityMapAs() {
        return this._entityMap;
    }
    get(id) {
        return (this._entityMap[id]);
    }
    getAs(id, cls0, cls1, cls2, cls3, cls4) {
        let result = this._entityMap[id];
        return result ? result.get(cls0, cls1, cls2, cls3, cls4) : null;
    }
    create() {
        let entity = this._entityPool.get();
        let id = this._nextID++;
        entity.init(this, id);
        this._entityMap[id] = entity;
        return entity;
    }
    recover(entity) {
        delete this._entityMap[entity.id];
        entity.beforeRecover();
        this._entityPool.recover(entity);
    }
    postTick() {
        this._compGroupCtx.resetEvents();
    }
    getOrRegClassID(cls) {
        let classID = cls[this._classIDKey];
        if (classID !== undefined) {
            return classID;
        }
        let specFields = gClassSpecFieldMap[this._name];
        if (!specFields) {
            specFields = gClassSpecFieldMap[this._name] = [];
        }
        let descs = [];
        let defInst = new cls();
        // 标记特殊字段.
        for (let key of Object.getOwnPropertyNames(defInst)) {
            let type = CompFieldType.Normal;
            // List/Map/Slot
            let end4Char = key.substr(-4);
            if (end4Char == 'List') {
                type = CompFieldType.Array;
            }
            else if (end4Char == 'Slot') {
                type = CompFieldType.Slot;
            }
            else {
                let end3Char = key.substr(-3);
                if (end3Char == 'Map') {
                    type = CompFieldType.Map;
                }
            }
            if (type != CompFieldType.Normal) {
                descs.push({
                    type: type,
                    name: key,
                });
            }
        }
        specFields.push(descs);
        classID = specFields.length - 1;
        if (classID >= 96) {
            // debugger;
            // throw new Error("too much component type")
            console.error("too much component type");
        }
        cls[this._classIDKey] = classID;
        return classID;
    }
    regFieldConvertor(name, convertor) {
        this._fieldConvertorMap[name] = convertor;
    }
    getCompSpecFieldDesc(classID) {
        return gClassSpecFieldMap[this._name][classID];
    }
    getFieldConvertor(name) {
        return this._fieldConvertorMap[name];
    }
    hasSingleton(id) {
        return !!this._singletonMap[id];
    }
    singleton(id) {
        let entity = this._singletonMap[id];
        if (entity) {
            return entity;
        }
        entity = this._singletonMap[id] = this.create();
        return entity;
    }
}
//# sourceMappingURL=EntityContext.js.map