"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
const TypedObjectPool_1 = require("./TypedObjectPool");
class ListNode {
    static _pool = new TypedObjectPool_1.TypedObjectPool(ListNode);
    static create() { return this._pool.get(); }
    data;
    dataExtra;
    next;
    prev;
    event;
    isEmpty() {
        return this.next === this;
    }
    insertAfter(prev) {
        this.prev = prev;
        this.next = prev.next;
        this.next.prev = this;
        prev.next = this;
    }
    remove() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.prev = this;
        this.next = this;
        this.data = null;
        ListNode._pool.recover(this);
    }
    reset() {
        this.data = null;
        this.next = this;
        this.prev = this;
        return this;
    }
}
exports.ListNode = ListNode;
//# sourceMappingURL=ListNode.js.map