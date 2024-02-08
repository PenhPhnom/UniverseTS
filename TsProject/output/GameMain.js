"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./framework/logger/Logger");
class GameMain {
    constructor() {
    }
    async start() {
        Logger_1.Logger.log("Game start in JS....");
    }
    onApplicationQuit() {
        Logger_1.Logger.log("Game onApplicationQuit in JS....");
    }
    onDispose() {
        Logger_1.Logger.log("Game onDispose in JS....");
    }
}
new GameMain().start();
//# sourceMappingURL=GameMain.js.map