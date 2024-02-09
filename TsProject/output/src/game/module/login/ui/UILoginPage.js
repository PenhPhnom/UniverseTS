var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI, UnityEngine } from "csharp";
import { loginUI } from "../../../../data/ui/login";
import { VoServer, VoServerItem } from "../vo/VoServer";
import { UIMessage } from "../../../event/UIMessage";
import { SceneDef } from "../../../../framework/scene/SceneDef";
import { storyUI } from "../../../../data/ui/story";
import { commonUI } from "../../../../data/ui/common";
import { S } from "../../../../global/GameConfig";
import { Logger } from "../../../../framework/logger/Logger";
export class UILoginPage{
    constructor() {
        super(...arguments);
        this._effectGo = null;
    }
    async onAwake() {
        super.onAwake();
        this.m_loginBtn.onClick.Add(() => {
            this.onLoginClick();
        });
        this.m_storyBtn.onClick.Add(() => {
            S.UIManager.openWindow(storyUI.PackageName, storyUI.UIStoryWin, null);
        });
        this.m_newGuideBtn.onClick.Add(() => {
            S.UIManager.openWindow(commonUI.PackageName, commonUI.UIUIGuideWin, null);
        });
        this.m_selserverBtn.onClick.Add(() => {
            this.openSelServerWin();
        });
        // let connected = await S.SessionManager.connectRealmServer();
        // this.m_loginBtn.enabled = connected;
        // Logger.log("connect ream server: "+connected)
    }
    onSelectServer(serverItem) {
        Logger.log(" server selected: " + serverItem.serverName);
        this.m_selserverBtn.text = serverItem.serverName;
    }
    async onShow(vo) {
        super.onShow(vo);
        //加载特效
        this._effectGo = await S.ResManager.loadPrefab("Effect/Prefab/UI/ef_ui_pet_rank_yellow_test.prefab");
        let inst = UnityEngine.GameObject.Instantiate(this._effectGo);
        let wrapper = new FairyGUI.GoWrapper(inst);
        this.m_holder.SetNativeObject(wrapper);
        //监听选服消息
        S.UIMessageManger.addListener(UIMessage.MSG_SELECT_SERVER, this, this.onSelectServer);
    }
    onClose(arg) {
        super.onClose(arg);
        //卸载铁效
        S.ResManager.releaseAddressGO(this._effectGo);
        S.UIMessageManger.removeListener(UIMessage.MSG_SELECT_SERVER, this.onSelectServer);
    }
    openSelServerWin() {
        // 测试数据
        let voServer = new VoServer();
        for (let i = 1; i < 10; i++) {
            voServer.areaMap.set(i, "分区" + i);
            voServer.serverMap.set(i, new Array());
            for (let j = 1; j < 200; j++) {
                let voServerItem = new VoServerItem();
                voServerItem.areaId = i;
                voServerItem.serverId = j;
                voServerItem.serverName = "测试服务器" + i + ":" + j;
                voServerItem.serverStatus = Math.floor(Math.random() * 3 + 1);
                voServer.serverMap.get(i).push(voServerItem);
            }
        }
        S.UIManager.openWindow(loginUI.PackageName, loginUI.UISelServerWin, voServer);
    }
    async onLoginClick() {
        let account = this.m_account.text;
        let password = this.m_password.text;
        Logger.log(`account:${account} - password: ${password}`);
        S.SceneManager.loadScene(SceneDef.HomeScene);
        // if(account != "" && password != ""){
        //     let msg = await LoginAPI.loginRealmServer(account, password)
        //     this.gateId = msg.GateId;
        //     this.gateKey = msg.Key;
        //     Logger.log("login ream succ, gate addr:"+msg.Address + ",key:"+msg.Key);
        //     S.SessionManager.disconnectRealmServer();
        //     //登录网关服
        //     let connected = await S.SessionManager.connectGateServer(msg.Address);
        //     if(connected){
        //         Logger.log("connect gate succ")
        //         let msg = await LoginAPI.loginGateServer( this.gateId, this.gateKey)
        //         let playerID = msg.PlayerId;
        //         Logger.log("login gate response.." +playerID);
        //         S.SceneManager.loadScene(SceneDef.HomeScene);
        //     }else{
        //     Logger.log("connect gate err ")
        //     }
        //  }
    }
}
__decorate([
    binder("account")
], UILoginPage.prototype, "m_account", void 0);
__decorate([
    binder("password")
], UILoginPage.prototype, "m_password", void 0);
__decorate([
    binder("selserverBtn")
], UILoginPage.prototype, "m_selserverBtn", void 0);
__decorate([
    binder("loginBtn")
], UILoginPage.prototype, "m_loginBtn", void 0);
__decorate([
    binder("storyBtn")
], UILoginPage.prototype, "m_storyBtn", void 0);
__decorate([
    binder("newGuideBtn")
], UILoginPage.prototype, "m_newGuideBtn", void 0);
__decorate([
    binder("hold")
], UILoginPage.prototype, "m_holder", void 0);
//# sourceMappingURL=UILoginPage.js.map