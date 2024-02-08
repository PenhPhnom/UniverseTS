import { UnityEngine } from "csharp";
export default class Utils {
    static pingPong(value, max) {
        return Math.abs(Utils.trueMod(value - max, 2 * max) - max);
    }
    static fail(msg) {
        throw new Error(msg);
    }
    static clamp(val, min, max) {
        if (val < min) {
            return min;
        }
        if (val > max) {
            return max;
        }
        return val;
    }
    static remap(val, valMin, valMax, mapMin, mapMax) {
        let ratio = (val - valMin) / (valMax - valMin);
        return mapMin + ratio * (mapMax - mapMin);
    }
    static matchInt(ratio, intMin, intMax) {
        let middleRatio = ratio + 0.5 / intMax;
        middleRatio %= 1.0;
        return intMin + Math.floor(middleRatio * intMax);
    }
    static remapToInt(val, valMin, valMax, mapMin, mapMax) {
        let ratio = (val - valMin) / (valMax - valMin);
        return Utils.matchInt(ratio, mapMin, mapMax);
    }
    static trueMod(val, max) {
        return ((val % max) + max) % max;
    }
    static wrapRemapToInt(val, valMin, valMax, mapMin, mapMax) {
        val = valMin + Utils.trueMod(val - valMin, valMax - valMin);
        return this.remapToInt(val, valMin, valMax, mapMin, mapMax);
    }
    static findInMap(map, compare) {
        for (let key in map) {
            let value = map[key];
            if (compare(key, value)) {
                return value;
            }
        }
        return null;
    }
    static rotatePoint(rpoint, angle, x, y) {
        let ret = new UnityEngine.Vector2();
        let rad = angle * Math.PI / 180;
        ret.x = (x - rpoint.x) * Math.cos(rad) - (y - rpoint.y) * Math.sin(rad) + rpoint.x;
        ret.y = (x - rpoint.x) * Math.sin(rad) + (y - rpoint.y) * Math.cos(rad) + rpoint.y;
        return ret;
    }
}
//# sourceMappingURL=Utils.js.map