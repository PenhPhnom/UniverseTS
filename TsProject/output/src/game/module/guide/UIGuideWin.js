var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { binder } from "../../../framework/common/NiceDecorator";
import { UIWindow } from "../../../framework/ui/UIWindow";
export class UIGuideWin extends UIWindow {
    onAwake() {
        super.onAwake();
        this.m_focus.alpha = 0.2;
        this.m_focus.SetXY(520, 550);
    }
    onShow(vo) {
        super.onShow(vo);
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    binder("focus")
], UIGuideWin.prototype, "m_focus", void 0);
//# sourceMappingURL=UIGuideWin.js.map