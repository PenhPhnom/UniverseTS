export class ArrayMap {
    constructor() {
        this._arr = new Array();
        this._map = new Map();
    }
    add(key, value) {
        this._map.set(key, value);
        this._arr.push(value);
        return value;
    }
    get(key) {
        return this._map.get(key);
    }
    remove(key) {
        var obj = this._map.get(key);
        if (!obj)
            return null;
        var index = this._arr.indexOf(obj);
        this._arr.splice(index, 1);
        this._map.delete(key);
        return obj;
    }
    /**
     * 返回新的数组实例
     */
    getArr() {
        return this._arr;
    }
    dispose() {
        this._arr.length = 0;
        this._map.clear();
    }
}
//# sourceMappingURL=ArrayMap.js.map