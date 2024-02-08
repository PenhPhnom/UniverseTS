import { loginUI } from "../../../../data/ui/login";
import { BaseScene } from "../../../../framework/scene/BaseScene";
import { S } from "../../../../global/GameConfig";
export class LoginScene extends BaseScene {
    onEnter() {
    }
    onComplete() {
        S.UIManager.openPageInScene(loginUI.PackageName, loginUI.UILoginPage, null);
    }
    onLeave() {
    }
}
//# sourceMappingURL=LoginScene.js.map