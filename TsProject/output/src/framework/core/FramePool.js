export class FramePool {
    constructor() {
        this._allocatedPoolMap = {};
        this._recoveredPoolMap = {};
    }
    // TODO: 如果我们Patch的话, 应该可以去掉这个stringSign.
    allocItem(sign, cls) {
        let recoveredPool = this.getOrCreatePool(this._recoveredPoolMap, sign);
        let item = recoveredPool.length ? recoveredPool.pop() : new cls();
        let allocatedPool = this.getOrCreatePool(this._allocatedPoolMap, sign);
        allocatedPool.push(item);
        return item;
    }
    getAllocatedItemCount(sign) {
        return this._allocatedPoolMap[sign] ? this._allocatedPoolMap[sign].length : 0;
    }
    getRecoveredItemCount(sign) {
        return this._recoveredPoolMap[sign] ? this._recoveredPoolMap[sign].length : 0;
    }
    recoverAll() {
        let allocatedMap = this._allocatedPoolMap;
        let recoveredMap = this._recoveredPoolMap;
        for (let key in allocatedMap) {
            let allocatedArray = allocatedMap[key];
            let recoveredArray = recoveredMap[key] || [];
            recoveredArray.push(...allocatedArray);
            allocatedArray.length = 0;
            this._recoveredPoolMap[key] = recoveredArray;
        }
    }
    getOrCreatePool(poolMap, sign) {
        return poolMap[sign] || (poolMap[sign] = []);
    }
}
export let theFramePool = new FramePool();
//# sourceMappingURL=FramePool.js.map