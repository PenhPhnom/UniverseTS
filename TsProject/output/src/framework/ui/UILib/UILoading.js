var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UIPanel } from "../UIPanel";
import { UITypeDef } from "../UIDefine";
import { binder } from "../../common/NiceDecorator";
import { UIMessage } from "../../../game/event/UIMessage";
import { S } from "../../../global/GameConfig";
export class UILoading  {
    onAwake() {
    }
    get uiType() {
        return UITypeDef.Loading;
    }
    onShow(arg) {
        this.progressLoading.value = 0;
        this.progressLoading.visible = true;
        S.UIMessageManger.addListener(UIMessage.MSG_SCENE_PROGRESS, this, (progress) => {
            this.progressLoading.TweenValue(progress, 0.1);
        });
    }
    onClose(arg) {
        this.progressLoading.visible = false;
        S.UIMessageManger.removeListenerByCode(UIMessage.MSG_SCENE_PROGRESS);
    }
}
__decorate([
    binder("loading_pregress")
], UILoading.prototype, "progressLoading", void 0);
//# sourceMappingURL=UILoading.js.map