import { EntityGroup, EntityCombineGroup } from "./EntityGroup";
import { GroupID } from "./GroupID";
import { theFramePool } from "../FramePool";
class MatchGroups {
    constructor(groupID) {
        this.groups = [];
        this.groupID = new GroupID();
        this.groupID.assign(groupID);
    }
}
class GroupContext {
    get entityContext() { return this._entityCtx; }
    get groupIDToGoup() { return this._groupIDToGroup; }
    constructor(entityCtx, groupPropName) {
        this._groupIDToGroup = {};
        this._groupIDToMatchGroups = {};
        this._customIDToCombineGroup = {};
        this._entityCtx = entityCtx;
        this._groupPropName = groupPropName;
    }
    reset() {
        let groupMap = this._groupIDToGroup;
        for (let id in groupMap) {
            let group = groupMap[id];
            group.reset();
        }
    }
    clear() {
        let groupMap = this._groupIDToGroup;
        for (let id in groupMap) {
            let group = groupMap[id];
            group.clear();
        }
    }
    getByGroupID(groupID) {
        return this._groupIDToGroup[groupID.key];
    }
    getOrCreateGroupByID(groupID) {
        let group = this._groupIDToGroup[groupID.key];
        if (group) {
            return group;
        }
        group = new EntityGroup(this.entityContext, groupID);
        this._groupIDToGroup[groupID.key] = group;
        let entityMap = this._entityCtx.entityMap;
        let propName = this._groupPropName;
        for (let key in entityMap) {
            let entity = entityMap[key];
            if (entity[propName].hasMask(groupID)) {
                group.add(entity);
            }
        }
        // matchGroupID我们缓存起来了, 所以这里也还需要重新计算一下.
        let matchGroupMap = this._groupIDToMatchGroups;
        for (let matchGroupIDKey in matchGroupMap) {
            let matchGroups = matchGroupMap[matchGroupIDKey];
            if (matchGroups.groupID.hasMask(groupID)) {
                matchGroups.groups.push(group);
            }
        }
        return group;
    }
    createOrGroups(customID, groupIDs) {
        let result = this._customIDToCombineGroup[customID];
        if (result) {
            return result;
        }
        let self = this;
        let groups = groupIDs.map((groupID) => self.getOrCreateGroupByID(groupID));
        result = this._customIDToCombineGroup[customID] = new EntityCombineGroup(groups);
        return result;
    }
    changeEntityGroup(entity, prevGroupID, curGroupID) {
        let keepGroupMask = theFramePool.allocItem("GroupID", GroupID);
        curGroupID.intersection(keepGroupMask, prevGroupID);
        let addGroups = this.getOrCreateMatchGroups(curGroupID);
        for (let group of addGroups.groups) {
            if (keepGroupMask.hasMask(group.groupID)) {
                continue;
            }
            group.add(entity);
        }
        let delGroups = this.getOrCreateMatchGroups(prevGroupID);
        for (let group of delGroups.groups) {
            if (group.mute) {
                continue;
            }
            if (keepGroupMask.hasMask(group.groupID)) {
                continue;
            }
            group.del(entity);
        }
    }
    resetEvents() {
        let groupIDToGroup = this._groupIDToGroup;
        for (let key in groupIDToGroup) {
            let group = groupIDToGroup[key];
            group.resetEvents();
        }
    }
    getOrCreateMatchGroups(groupID) {
        let matchGroups = this._groupIDToMatchGroups[groupID.key];
        if (matchGroups) {
            return matchGroups;
        }
        this._groupIDToMatchGroups[groupID.key] = matchGroups = new MatchGroups(groupID);
        let groupIDToGroup = this._groupIDToGroup;
        for (let checkGroupKey in groupIDToGroup) {
            let checkGroup = groupIDToGroup[checkGroupKey];
            let checkGroupID = checkGroup.groupID;
            if (groupID.hasMask(checkGroupID)) {
                matchGroups.groups.push(checkGroup);
            }
        }
        return matchGroups;
    }
}
export class ComponentGroupContext extends GroupContext {
    constructor(entityCtx) {
        super(entityCtx, "groupID");
    }
    create(...classes) {
        let groupID = theFramePool.allocItem("GroupID", GroupID);
        groupID.reset();
        let ctx = this._entityCtx;
        for (let cls of classes) {
            if (cls) {
                groupID.set(ctx.getOrRegClassID(cls));
            }
        }
        return this.getOrCreateGroupByID(groupID);
    }
}
//# sourceMappingURL=GroupContext.js.map