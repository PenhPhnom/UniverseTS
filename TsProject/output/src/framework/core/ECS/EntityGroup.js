import { GroupID } from "./GroupID";
function entityCmp(a, b) {
    if (!a) {
        return 1;
    }
    if (!b) {
        return -1;
    }
    return a.id - b.id;
}
let _holdList = [];
function fastRemoveUndefineInArray(arr) {
    _holdList.length = 0;
    let count = arr.length;
    for (let i = 0; i < count; i++) {
        if (arr[i] === undefined) {
            _holdList.push(i);
        }
    }
    let holdListIndex = 0;
    let newArrLength = count - _holdList.length;
    for (let i = newArrLength; i < count; i++) {
        let val = arr[i];
        if (val === undefined) {
            continue;
        }
        let holdIndex = _holdList[holdListIndex++];
        arr[holdIndex] = val;
    }
    arr.length = newArrLength;
    return _holdList.length;
}
function clearMap(map) {
    for (let key in map) {
        delete map[key];
    }
}
export class EntityGroup {
    get mute() { return this._mute; }
    get groupID() { return this._groupID; }
    get entityCount() { return this._entityCount; }
    get addedEntities() { return this._addedEntities; }
    get deletedEntities() { return this._deletedEntities; }
    constructor(entityContext, groupID) {
        this._entities = [];
        this._entityCount = 0;
        this._entityIDToIndex = {};
        this._addedEntities = [];
        this._deletedEntities = [];
        this._mute = false;
        this._needSort = false;
        this._entityCtx = entityContext;
        this._groupID = new GroupID().assign(groupID);
    }
    reset() {
        this._entities.length = 0;
        this._entityCount = 0;
        clearMap(this._entityIDToIndex);
        this._needSort = false;
        this._addedEntities.length = 0;
        this._deletedEntities.length = 0;
    }
    clear() {
        this.reset();
    }
    forEach(fn, thisArg, data) {
        if (this._needSort) {
            this.sortEntities();
        }
        let entities = this._entities;
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (entity === undefined) {
                continue;
            }
            fn.call(thisArg, entity, data);
        }
    }
    asArrayHasHole() {
        if (this._needSort) {
            this.sortEntities();
        }
        return this._entities;
    }
    added() {
        return this.addedEntities;
    }
    deleted() {
        return this._deletedEntities;
    }
    add(entity) {
        let length = this._entities.push(entity);
        this._entityIDToIndex[entity.id] = length - 1;
        this._addedEntities.push(entity);
        this._entityCount++;
        if (this._needSort) {
            return;
        }
        this._needSort = this.getLastEntityID() > entity.id;
    }
    del(entity) {
        this._entityCount--;
        let entityID = entity.id;
        let entities = this._entities;
        let idToIndex = this._entityIDToIndex;
        let index = idToIndex[entityID];
        delete entities[index];
        delete idToIndex[entityID];
        this._deletedEntities.push(entity);
    }
    delAll() {
        let entities = this._entities;
        if (entities.length <= 0) {
            return;
        }
        this._mute = true;
        for (let entity of entities) {
            entity.recover();
            this._deletedEntities.push(entity);
        }
        this._entities.length = 0;
        clearMap(this._entityIDToIndex);
        this._needSort = false;
        this._addedEntities.length = 0;
        this._entityCount = 0;
        this._mute = false;
    }
    resetEvents() {
        this._addedEntities.length = 0;
        this._deletedEntities.length = 0;
        if (fastRemoveUndefineInArray(this._entities)) {
            this.sortEntities();
        }
    }
    sortEntities() {
        let entities = this._entities.sort(entityCmp);
        let idToIndex = this._entityIDToIndex;
        clearMap(idToIndex);
        let count = entities.length;
        for (let k = 0; k < count; k++) {
            let entity = entities[k];
            if (entity) {
                idToIndex[entity.id] = k;
            }
        }
        this._needSort = false;
    }
    getLastEntityID() {
        let entities = this._entities;
        let count = entities.length;
        for (let i = count - 1; i >= 0; i--) {
            let entity = entities[i];
            if (entity) {
                return entity.id;
            }
        }
        return 0;
    }
}
export class EntityCombineGroup {
    constructor(groups) {
        this._groups = [];
        this._groups = groups;
    }
    get groups() { return this._groups; }
    hasEntity() {
        for (let group of this._groups) {
            if (group.entityCount > 0) {
                return true;
            }
        }
        return false;
    }
}
export class EntityGroupIter {
    init(group) {
        this._group = group;
    }
    get group() { return this._group; }
    get count() { return this._group.entityCount; }
    forEach(fn, thisArg, data) {
        this._group.forEach(fn, thisArg, data);
    }
    asArrayHasHole() {
        return this._group.asArrayHasHole();
    }
    added() {
        return this._group.addedEntities;
    }
    deleted() {
        return this._group.deletedEntities;
    }
}
//# sourceMappingURL=EntityGroup.js.map