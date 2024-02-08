var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { binder } from "../../common/NiceDecorator";
import { UIWidge } from "../UIWidge";
//Tips 挂件
export class UIMsgTips extends UIWidge {
    constructor() {
        super(...arguments);
        this.m_alpha = 1;
        this.m_yOffset = 20;
    }
    onAwake() {
    }
    onShow(arg) {
        this.m_tip.text = arg;
        this.m_alpha = 1;
        this.m_intervel = setInterval(this.moveTips, 500);
    }
    moveTips() {
        this.m_alpha -= 0.01;
        if (this.m_alpha < 0)
            this.onClose(null);
        this.m_yOffset -= 0.1;
        if (this.m_yOffset < 0)
            this.m_yOffset = 0;
        this.m_tip.y -= this.m_yOffset;
    }
    onClose(arg) {
        clearInterval(this.m_intervel);
    }
}
__decorate([
    binder("top")
], UIMsgTips.prototype, "m_tip", void 0);
//# sourceMappingURL=UIMsgTips.js.map