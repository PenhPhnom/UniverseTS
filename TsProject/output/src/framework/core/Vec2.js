import { BattleMath } from "./BattleMath";
export class Vec2 {
    get width() { return this.x; }
    set width(w) { this.x = w; }
    get height() { return this.y; }
    set height(h) { this.y = h; }
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    setVec2(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    setScalar(s) {
        this.x = s;
        this.y = s;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    equal(v) {
        return this.x == v.x && this.y == v.y;
    }
    fixed() {
        this.x = this.x.fixed();
        this.y = this.y.fixed();
        return this;
    }
    setLength(len) {
        return Vec2.mulScalar(this, Vec2.normalize(this, this), len);
    }
    clone() {
        return new Vec2(this.x, this.y);
    }
    lengthSQ() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    clampLength(maxLen) {
        let lenSQ = this.lengthSQ().fixed();
        let maxLenSQ = (maxLen * maxLen).fixed();
        if (lenSQ > maxLenSQ) {
            this.setLength(maxLen);
        }
        return this;
    }
    static add(out, a, b) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        return out;
    }
    static addScalar(out, a, s) {
        out.x = a.x + s;
        out.y = a.y + s;
        return out;
    }
    static addScaledVec(out, a, b, s) {
        out.x = a.x + b.x * s;
        out.y = a.y + b.y * s;
        return out;
    }
    static sub(out, a, b) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        return out;
    }
    static subScalar(out, a, s) {
        out.x = a.x - s;
        out.y = a.y - s;
        return out;
    }
    static mul(out, a, b) {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        return out;
    }
    static mulScalar(out, a, f) {
        out.x = a.x * f;
        out.y = a.y * f;
        return out;
    }
    static div(out, a, b) {
        out.x = a.x / b.x;
        out.y = a.y / b.y;
        return out;
    }
    static divScalar(out, a, s) {
        return Vec2.mulScalar(out, a, 1.0 / s);
    }
    static neg(out, a) {
        out.x = -a.x;
        out.y = -a.y;
        return out;
    }
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    static cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    static normalize(out, a) {
        return Vec2.divScalar(out, a, a.length());
    }
    static distanceSQ(a, b) {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return dx * dx + dy * dy;
    }
    static distance(a, b) {
        return Math.sqrt(Vec2.distanceSQ(a, b));
    }
    static lerp(out, a, b, f) {
        out.x = (b.x - a.x) * f + a.x;
        out.y = (b.y - a.y) * f + a.y;
        return out;
    }
    static rotation(a, b) {
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        if (dx == 0 && dy == 0) {
            return 0;
        }
        let angle = Math.atan2(dy, dx) * BattleMath.kRadToDeg;
        return BattleMath.trueMod(angle, 360);
    }
    toString() {
        return `{x:${this.x}, y:${this.y}}`;
    }
}
Vec2.kZero = new Vec2(0, 0);
Vec2.kAxisX = new Vec2(1, 0);
Vec2.kAxisY = new Vec2(0, 1);
Vec2.kOne = new Vec2(1, 1);
//# sourceMappingURL=Vec2.js.map