var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { binder } from "../../../../framework/common/NiceDecorator";
import { UIWindow } from "../../../../framework/ui/UIWindow";
import { S } from "../../../../global/GameConfig";
import { UIMessage } from "../../../event/UIMessage";
import { UIServerListItem } from "./UIServerListItem";
export class UISelServerWin extends UIWindow {
    constructor() {
        super(...arguments);
        this.clickAreaIndex = 0;
        this.clickServerIndex = 0;
    }
    onAwake() {
        super.onAwake();
        this.backBtn.onClick.Add(() => {
            this.close();
        });
        this.okBtn.onClick.Add(() => {
            this.onSelectServer();
        });
        this.areaList.onClickItem.Add((event) => {
            this.clickAreaIndex = this.areaList.GetChildIndex(event.data);
            this.serverList.numItems = this.voServer.serverMap.get(this.clickAreaIndex + 1).length;
            this.serverList.RefreshVirtualList();
        });
        this.serverList.onClickItem.Add((event) => {
            this.clickServerIndex = this.serverList.GetChildIndex(event.data);
            this.title.text = "已选择服务器：" + this.clickServerIndex;
        });
        let pool = [];
    }
    onSelectServer() {
        let selItem = this.voServer.serverMap.get(this.clickAreaIndex + 1)[this.clickServerIndex];
        S.UIMessageManger.broadcast(UIMessage.MSG_SELECT_SERVER, selItem);
        this.close();
    }
    onShow(vo) {
        super.onShow(vo);
        this.voServer = vo;
        this.areaList.SetVirtual();
        this.areaList.itemRenderer = (index, obj) => {
            this.renderAreaListItem(index, obj);
        };
        this.areaList.numItems = vo.areaMap.size;
        this.serverList.SetVirtual();
        this.serverList.itemRenderer = (index, obj) => {
            this.renderServerListItem(index, obj);
        };
        this.serverList.numItems = vo.serverMap.get(this.clickAreaIndex + 1).length;
    }
    renderAreaListItem(index, obj) {
        let areaBtn = obj.asButton;
        areaBtn.text = this.voServer.areaMap.get(index + 1);
    }
    renderServerListItem(index, item) {
        if (item instanceof UIServerListItem) {
            console.log("1111111111111111111111");
        }
        else {
            console.log("333333333333333333");
        }
        item.itemLabel = this.voServer.serverMap.get(this.clickAreaIndex + 1)[index].serverName;
        //serverBtn.icon = FairyGUI.UIPackage.
    }
    onClose(arg) {
        super.onClose(arg);
    }
}
__decorate([
    binder("areaList")
], UISelServerWin.prototype, "areaList", void 0);
__decorate([
    binder("serverList")
], UISelServerWin.prototype, "serverList", void 0);
__decorate([
    binder("backBtn")
], UISelServerWin.prototype, "backBtn", void 0);
__decorate([
    binder("okBtn")
], UISelServerWin.prototype, "okBtn", void 0);
__decorate([
    binder("title")
], UISelServerWin.prototype, "title", void 0);
//# sourceMappingURL=UISelServerWin.js.map