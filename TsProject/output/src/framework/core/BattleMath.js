import { Vec2 } from "./Vec2";
const kPrecise = 7;
export class BattleMath {
    static lengthSQ(x, y) {
        return x * x + y * y;
    }
    static distanceSQ(x0, y0, x1, y1) {
        let dx = x0 - x1;
        let dy = y0 - y1;
        return dx * dx + dy * dy;
    }
    static trueMod(val, max) {
        return ((val % max) + max) % max;
    }
    static sign(val) {
        return val >= 0 ? 1.0 : -1.0;
    }
    static getShortestRotationSign(src, dst) {
        let dAngle = dst - src;
        let absDAngle = Math.abs(dAngle);
        return (absDAngle < 180) ? this.sign(dAngle) : -this.sign(dAngle);
    }
    static clampValueBySign(val, dst, sign) {
        if (sign > 0) {
            return Math.min(val, dst);
        }
        return Math.max(val, dst);
    }
    static circleCollision(center0, radius0, center1, radius1) {
        let distSQ = Vec2.distanceSQ(center0, center1).fixed();
        let radius = radius0 + radius1;
        let radiusSQ = (radius * radius).fixed();
        return distSQ < radiusSQ;
    }
    static fixed(n) {
        return +(n.toFixed(kPrecise));
    }
    static fixedVec2(v) {
        v.x = +(v.x.toFixed(kPrecise));
        v.y = +(v.y.toFixed(kPrecise));
        return v;
    }
    static dirToRotation(x, y) {
        let angle = (Math.atan2(y, x) * BattleMath.kRadToDeg).fixed();
        return angle.trueMod(360);
    }
}
BattleMath.kDegToRad = (Math.PI / 180.0).fixed();
BattleMath.kRadToDeg = (180.0 / Math.PI).fixed();
//# sourceMappingURL=BattleMath.js.map