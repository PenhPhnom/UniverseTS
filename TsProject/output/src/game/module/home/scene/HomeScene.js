import { homeUI } from "../../../../data/ui/home";
import { BaseScene } from "../../../../framework/scene/BaseScene";
import { S } from "../../../../global/GameConfig";
import { VoHome } from "../vo/VoHome";
export class HomeScene extends BaseScene {
    constructor() {
        super();
    }
    onEnter() {
    }
    onComplete() {
        let vo = new VoHome();
        vo.name = "Justin";
        vo.hp = 1200;
        vo.mp = 3300;
        vo.money = 666;
        S.UIManager.openPageInScene(homeUI.PackageName, homeUI.UIHomePage, vo);
    }
    onLeave() {
    }
}
//# sourceMappingURL=HomeScene.js.map