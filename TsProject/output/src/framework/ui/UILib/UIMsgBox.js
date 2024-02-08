var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { binder } from "../../../framework/common/NiceDecorator";
import { UIWindow } from "../UIWindow";
// 通用弹窗
export class UIMsgBoxArg {
    constructor() {
        this.title = "";
        this.content = "";
        this.btnText = ""; //"确定|取消|关闭"
    }
}
export class UIMsgBox extends UIWindow {
    onAwake() {
        super.onAwake();
        this.bindAll(this);
    }
    onShow(arg) {
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    binder("msgTxt")
], UIMsgBox.prototype, "m_txt", void 0);
__decorate([
    binder("okBtn")
], UIMsgBox.prototype, "m_okBtn", void 0);
__decorate([
    binder("cancelBtn")
], UIMsgBox.prototype, "m_cancelBtn", void 0);
//# sourceMappingURL=UIMsgBox.js.map