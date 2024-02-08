"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedObjectPool = exports.AnyObjectPool = void 0;
class AnyObjectPool {
    _class;
    _pool = [];
    constructor(cls) {
        this._class = cls;
    }
    get() {
        let obj = this._pool.pop();
        return obj !== undefined ? obj : new this._class();
    }
    recover(obj) {
        this._pool.push(obj);
    }
}
exports.AnyObjectPool = AnyObjectPool;
class TypedObjectPool {
    _class;
    _pool = [];
    constructor(cls) {
        this._class = cls;
    }
    get() {
        let obj = this._pool.pop();
        return obj !== undefined ? obj : new this._class();
    }
    recover(obj) {
        this._pool.push(obj);
    }
}
exports.TypedObjectPool = TypedObjectPool;
//# sourceMappingURL=TypedObjectPool.js.map