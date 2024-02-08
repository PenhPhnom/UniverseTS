export class GroupID {
    constructor() {
        this.reset();
    }
    assign(groupID) {
        this._id0 = groupID._id0;
        this._id1 = groupID._id1;
        this._id2 = groupID._id2;
        this.key = groupID.key;
        return this;
    }
    reset() {
        this._id0 = this._id1 = this._id2 = 0;
        this.key = "";
        return this;
    }
    equal(other) {
        return this._id0 == other._id0 && this._id1 == other._id1 && this._id2 == other._id2;
    }
    clear(pos) {
        if (pos <= 31) {
            this._id0 &= ~(1 << pos);
        }
        else if (pos <= 63) {
            pos -= 31;
            this._id1 &= ~(1 << pos);
        }
        else {
            pos -= 63;
            this._id2 &= ~(1 << pos);
        }
        this.makeKey();
    }
    set(pos) {
        if (pos <= 31) {
            this._id0 |= (1 << pos);
        }
        else if (pos <= 63) {
            pos -= 31;
            this._id1 |= 1 << pos;
        }
        else {
            pos -= 63;
            this._id2 |= 1 << pos;
        }
        this.makeKey();
        return this;
    }
    hasMask(mask) {
        return (this._id0 & mask._id0) == mask._id0 && (this._id1 & mask._id1) == mask._id1 && (this._id2 & mask._id2) == mask._id2;
    }
    has(pos) {
        if (pos <= 31) {
            return !!(this._id0 & (1 << pos));
        }
        if (pos <= 63) {
            pos -= 31;
            return !!(this._id1 & (1 << pos));
        }
        pos -= 63;
        return !!(this._id2 & (1 << pos));
    }
    intersection(result, other) {
        result._id0 = this._id0 & other._id0;
        result._id1 = this._id1 & other._id1;
        result._id2 = this._id2 & other._id2;
        result.makeKey();
    }
    makeKey() {
        this.key = this._id0 + "_" + this._id1 + "_" + this._id2;
    }
}
//# sourceMappingURL=GroupID.js.map