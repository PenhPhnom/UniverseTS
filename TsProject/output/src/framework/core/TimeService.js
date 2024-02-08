import { TypedObjectPool } from "../common/TypedObjectPool";
class TimeEvent {
    init(id, curTime, life, delay, interval) {
        this.id = id;
        this.fired = false;
        this.isEnd = false;
        this.interval = interval;
        this.endTime = curTime + life;
        this.fireTime = curTime + delay;
        this.tick(curTime, curTime);
        return this;
    }
    tick(curTime, prevTime) {
        if (this.isEnd) {
            return;
        }
        let fireTime = this.fireTime;
        this.fired = fireTime <= curTime;
        if (this.fired) {
            this.fireTime = curTime + this.interval;
        }
        this.isEnd = curTime >= this.endTime;
    }
    stop() {
        this.fired = false;
        this.isEnd = true;
    }
    mod(delta) {
        if (this.isEnd) {
            return;
        }
        this.fireTime += delta;
        this.endTime += delta;
    }
    timeLeft(curTime) {
        return Math.max(0, this.endTime - curTime);
    }
}
export class TimeServer {
    get dt() { return this._dt; }
    get time() { return this._time; }
    get prevTime() { return this._prevTime; }
    constructor() {
        this._nextID = 1;
        this._idToEvent = {};
        this._finishedTimer = [];
        this._pool = new TypedObjectPool(TimeEvent);
        this.reset();
    }
    reset() {
        this._dt = 0;
        this._time = 0;
        this._prevTime = 0;
        this._nextID = 1;
        this.removeAllTimer();
        this._finishedTimer.length = 0;
    }
    tick(dt, time) {
        this._dt = dt;
        let prevTime = this._prevTime = this._time;
        this._time = time;
        let idToEvent = this._idToEvent;
        for (let id in idToEvent) {
            let event = idToEvent[id];
            event.tick(time, prevTime);
            if (event.isEnd) {
                this._finishedTimer.push(event.id);
            }
        }
    }
    postTick() {
        this.removeFinishedTimer();
    }
    wait(life) {
        return this.loop(life, life, life + 1);
    }
    loop(life, delay, interval) {
        let id = this._nextID++;
        let event = this._pool.get();
        this._idToEvent[id] = event;
        event.init(id, this._time, life, delay, interval);
        return id;
    }
    stop(id) {
        let event = this._idToEvent[id];
        if (event) {
            event.stop();
        }
    }
    resetTime(id, life) {
        let event = this._idToEvent[id];
        if (event) {
            event.init(event.id, this._time, life, 0, event.interval);
        }
    }
    modTime(id, modVal) {
        let event = this._idToEvent[id];
        if (event) {
            event.mod(modVal);
        }
    }
    waitOrResetTime(id, life) {
        if (this.isEnd(id)) {
            return this.wait(life);
        }
        this.resetTime(id, life);
        return id;
    }
    on(id) {
        let event = this._idToEvent[id];
        return event ? event.fired : false;
    }
    isEnd(id) {
        let event = this._idToEvent[id];
        return event ? event.isEnd : true;
    }
    timeLeft(id) {
        let event = this._idToEvent[id];
        return event ? event.timeLeft(this._time) : 0;
    }
    removeFinishedTimer() {
        let finishedTimer = this._finishedTimer;
        let idToEvent = this._idToEvent;
        let pool = this._pool;
        for (let id of this._finishedTimer) {
            let event = idToEvent[id];
            pool.recover(event);
            delete idToEvent[id];
        }
        finishedTimer.length = 0;
    }
    removeAllTimer() {
        let idToEvent = this._idToEvent;
        let pool = this._pool;
        for (let id in idToEvent) {
            let event = idToEvent[id];
            pool.recover(event);
            delete idToEvent[id];
        }
    }
}
//# sourceMappingURL=TimeService.js.map