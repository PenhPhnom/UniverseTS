import { UIPanel } from "./UIPanel";
import { UITypeDef, UIComDefs } from "./UIDefine";
import { FairyGUI } from "csharp";
export class UIWindow  {
    get uiType() {
        return UITypeDef.Window;
    }
    onAwake() {
        this.m_btnClose = this.fui.GetChild(UIComDefs.WindowCloseBtn);
    }
    onShow(arg) {
        this.fui.x = FairyGUI.GRoot.inst.width / 2 - this.fui.width / 2;
        this.fui.y = FairyGUI.GRoot.inst.height / 2 - this.fui.height / 2;
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Add(this.onBtnClose);
        }
    }
    onClose(arg) {
        if (this.m_btnClose != undefined) {
            this.m_btnClose.onClick.Remove(this.onBtnClose);
        }
    }
    onBtnClose() {
        this.close(0);
    }
}
//# sourceMappingURL=UIWindow.js.map