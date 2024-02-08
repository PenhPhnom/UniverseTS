import { Logger } from "../logger/Logger";
export class InkStateInspector {
    BindInkMethods(inkStory) {
        //3参数以下采用此方式
        this.bindInkMethodOnce(inkStory, "GetCharacterName", this.getCharacterName);
        //3参数以上采用此方式 
        this.bindInkMethodOnceGeneral(inkStory, "GetCharacterNameByMutiParams", this.getCharacterNameMutiParams);
    }
    getCharacterName() {
        return "Justin Test Puerts";
    }
    getCharacterNameMutiParams(p1, p2, p3) {
        return "Justin Muti Params";
    }
    bindInkMethodOnce(inkStory, funcName, func) {
        try {
            inkStory.BindExternalFunction(funcName, func);
        }
        catch (err) {
            Logger.warn(err);
        }
    }
    bindInkMethodOnceGeneral(inkStory, funcName, func) {
        try {
            inkStory.BindExternalFunctionGeneral(funcName, func);
        }
        catch (err) {
            Logger.warn(err);
        }
    }
    unbindInkMethod(inkStory, funcName) {
        try {
            inkStory.UnbindExternalFunction(funcName);
        }
        catch (err) {
            Logger.warn(err);
        }
    }
}
//# sourceMappingURL=InkStateInspector.js.map