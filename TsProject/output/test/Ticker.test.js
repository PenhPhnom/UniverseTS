import { Ticker } from "../src/framework/core/Ticker";
const kLogicDeltaTime = 0.1;
function tick(dt, time, frameRatio) {
    //this._rootSystem.tick(dt, time, frameRatio);
}
function postTick(dt, time, frameRatio) {
    //this._rootSystem.postTick(dt, time, frameRatio);
    //this._context.postTick();
}
function fixedTick(dt, time) {
    //this._rootSystem.fixedTick(dt, time);
}
function postFixedTick(dt, time) {
    //this._rootSystem.postFixedTick(dt, time);
    //this._context.postFixedTick();
}
test("Ticker test", () => {
    let ticker = new Ticker(kLogicDeltaTime, (dt, time, frameRatio) => tick(dt, time, frameRatio), (dt, time, frameRatio) => postTick(dt, time, frameRatio), (dt, time) => fixedTick(dt, time), (dt, time) => postFixedTick(dt, time));
    while (true) {
        let dt = 0.001;
        let battleSpeed = 1;
        //加速： Global.battleSpeed
        dt = dt * battleSpeed;
        ticker.tick(dt);
        return;
    }
});
//# sourceMappingURL=Ticker.test.js.map