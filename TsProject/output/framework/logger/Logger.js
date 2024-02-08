"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const csharp_1 = require("csharp");
const GameConfig_1 = require("../../global/GameConfig");
var LogType;
(function (LogType) {
    LogType[LogType["Error"] = 0] = "Error";
    LogType[LogType["Assert"] = 1] = "Assert";
    LogType[LogType["Warning"] = 2] = "Warning";
    LogType[LogType["Log"] = 3] = "Log";
    LogType[LogType["Exception"] = 4] = "Exception";
})(LogType || (LogType = {}));
class Logger {
    static log(args) {
        // if(!GameConfig.debug) return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    /**
 * Outputs a warning message to the Logger.
 * @param message  list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
 */
    static warn(args) {
        if (!GameConfig_1.GameConfig.debug)
            return;
        let msg = Logger.getPrintStack(LogType.Warning, true, args);
        console.warn(msg);
    }
    /**
     * Outputs an error message to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
     */
    static error(args) {
        if (!GameConfig_1.GameConfig.debug)
            return;
        let msg = Logger.getPrintStack(LogType.Error, true, args);
        console.error(msg);
    }
    /** Outputs a stack trace to the Logger.
     * @param message A list of JavaScript objects to output. The string representations of each of these objects are appended together in the order listed and output.
    */
    static trace(args) {
        if (!GameConfig_1.GameConfig.debug)
            return;
        let msg = Logger.getPrintStack(LogType.Log, true, args);
        console.log(msg);
    }
    static _instance;
    static getPrintStack(type, showStack, args) {
        let message = '';
        for (let i = 0; i < args.length; i++) {
            const element = args[i];
            if (typeof element === 'object' && Logger.LOG_OBJECT_TO_JSON) {
                message += JSON.stringify(element);
            }
            else {
                message += element;
            }
            if (i < args.length - 1) {
                message += ' ';
            }
        }
        if (showStack || csharp_1.UnityEngine.Application.isEditor) {
            var stacks = new Error().stack.split('\n');
            for (let i = 3; i < stacks.length; i++) {
                const line = stacks[i];
                message += '\n';
                message += line;
            }
        }
        if (Logger._instance == null) {
            Logger._instance = new csharp_1.UnityEngine.Object();
        }
        return message;
    }
    /** Log JavaScript Objects as JSON format */
    static LOG_OBJECT_TO_JSON(args) {
        return false;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map