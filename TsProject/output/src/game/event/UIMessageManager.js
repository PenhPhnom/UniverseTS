import { Messenger } from "../../framework/common/Messenger";
import { Singleton } from "../../framework/common/Singleton";
export class UIMessageManger extends Singleton {
    constructor() {
        super(...arguments);
        this.uiMessage = new Messenger();
    }
    addListener(msgCode, obj, listener) {
        this.uiMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.uiMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.uiMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.uiMessage.clearup();
    }
    broadcast(msgCode, params) {
        this.uiMessage.broadcast(msgCode, params);
    }
}
//# sourceMappingURL=UIMessageManager.js.map