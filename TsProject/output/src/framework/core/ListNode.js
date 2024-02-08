import { TypedObjectPool } from "../common/TypedObjectPool";
export class ListNode {
    static create() { return this._pool.get(); }
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
ListNode._pool = new TypedObjectPool(ListNode);
//# sourceMappingURL=ListNode.js.map