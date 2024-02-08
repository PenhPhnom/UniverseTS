import Utils from "./Utils";
// NOTE: 时序是: FixedTicker => Ticker => PostFixedTicker => PostTicker
export class Ticker {
    get delta() { return this._delta; }
    set delta(value) { this._delta = value; }
    ;
    constructor(delta, realtimeTicker, postRealtimeTicker, fixedTicker, postFixedTicker) {
        this._delta = delta;
        this._realtimeTicker = realtimeTicker;
        this._postRealtimeTicker = postRealtimeTicker;
        this._fixedTicker = fixedTicker;
        this._postFixedTicker = postFixedTicker;
        this._realTime = 0;
        this._fixedTime = 0;
        this._nextTickTime = 0;
    }
    tick(dt) {
        this._realTime += dt;
        // FixedTicker
        let ticked = this._realTime.fixed() >= this._nextTickTime;
        if (ticked) {
            this._fixedTime = this._nextTickTime;
            this._nextTickTime = (this._fixedTime + this._delta).fixed();
            this._fixedTicker(this._delta, this._fixedTime);
        }
        // Ticker
        let frameRatio = this.getFrameRatio();
        this._realtimeTicker(dt, this._realTime, frameRatio);
        // PostFixedTicker
        if (ticked) {
            this._postFixedTicker(this._delta, this._fixedTime);
        }
        // PostTicker
        this._postRealtimeTicker(dt, this._realTime, frameRatio);
    }
    resetTime() {
        this._fixedTime = 0;
        this._realTime = 0;
        this._nextTickTime = 0;
    }
    getFrameRatio() {
        return Utils.clamp((this._realTime - this._fixedTime) / this._delta, 0, 1);
    }
}
//# sourceMappingURL=Ticker.js.map