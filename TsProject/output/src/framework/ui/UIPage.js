import { UIPanel } from "./UIPanel";
import { UITypeDef, UIComDefs } from "./UIDefine";
import { S } from "../../global/GameConfig";
export class UIPage extends UIPanel {
    get uiType() {
        return UITypeDef.Page;
    }
    onAwake() {
        this.m_btnGoBack = this.fui.GetChild(UIComDefs.BackBtn);
        if (this.m_btnGoBack != undefined) {
            this.m_btnGoBack.onClick.Add(() => {
                this.onBtnGoBack();
            });
        }
    }
    onShow(vo) {
    }
    onClose(arg) {
    }
    onBtnGoBack() {
        S.UIManager.goBackPage();
    }
}
//# sourceMappingURL=UIPage.js.map