var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { commonUI } from "../../../../data/ui/common";
import { homeUI } from "../../../../data/ui/home";
import { LoginAPI } from "../../../api/LoginAPI";
import { Opcode } from "../../../../data/pb/Opcode";
import { S } from "../../../../global/GameConfig";
import { Logger } from "../../../../framework/logger/Logger";
export class UIHomePage{
    onAwake() {
        super.onAwake();
        this.m_chatBtn.onClick.Add(() => {
            this.onchatBtn();
        });
        this.m_bagBtn.onClick.Add(() => {
            this.onbagBtn();
        });
        this.m_shopBtn.onClick.Add(() => {
            this.onshopBtn();
        });
        this.m_levelBtn.onClick.Add(() => {
            this.onlevelBtn();
        });
    }
    onShow(vo) {
        super.onShow(vo);
        this.m_nameLbl.text = vo.name;
        this.m_mpLbl.text = vo.mp.toString();
        this.m_hpLbl.text = vo.hp.toString();
        this.m_moneyLbl.text = vo.money.toString();
        S.GameSession.listen(Opcode.MSG_GS2C_Test, function (msg) {
            Logger.log("收到服务器下发的消息。。。。" + msg.testResponse);
        });
    }
    onClose(arg) {
        super.onClose(arg);
    }
    onchatBtn() {
        S.UIManager.openWindow(commonUI.PackageName, commonUI.UIUINoticeWin, null);
        Logger.log("on chat...");
    }
    onbagBtn() {
        Logger.log("on bag ..");
        //benchmark test
        LoginAPI.benchmarkTest();
    }
    onshopBtn() {
        S.UIManager.openPage(homeUI.PackageName, homeUI.UIShopPage);
    }
    onlevelBtn() {
        Logger.log("on level...");
    }
}
__decorate([
    binder("chatBtn")
], UIHomePage.prototype, "m_chatBtn", void 0);
__decorate([
    binder("bagBtn")
], UIHomePage.prototype, "m_bagBtn", void 0);
__decorate([
    binder("shopBtn")
], UIHomePage.prototype, "m_shopBtn", void 0);
__decorate([
    binder("levelBtn")
], UIHomePage.prototype, "m_levelBtn", void 0);
__decorate([
    binder("nameTxt")
], UIHomePage.prototype, "m_nameLbl", void 0);
__decorate([
    binder("hpTxt")
], UIHomePage.prototype, "m_hpLbl", void 0);
__decorate([
    binder("mpTxt")
], UIHomePage.prototype, "m_mpLbl", void 0);
__decorate([
    binder("moneyTxt")
], UIHomePage.prototype, "m_moneyLbl", void 0);
//# sourceMappingURL=UIHomePage.js.map