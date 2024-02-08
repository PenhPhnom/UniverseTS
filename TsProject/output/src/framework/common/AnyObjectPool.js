export class AnyObjectPool {
    constructor(cls) {
        this._pool = [];
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
export class TypedObjectPool {
    constructor(cls) {
        this._pool = [];
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
//# sourceMappingURL=AnyObjectPool.js.map