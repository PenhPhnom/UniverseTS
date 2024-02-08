import { Messenger } from "../common/Messenger";
import { Singleton } from "../common/Singleton";
export class RedHintsMessageManager extends Singleton {
    constructor() {
        super(...arguments);
        this.redhintsMessage = new Messenger();
    }
    addListener(msgCode, obj, listener) {
        this.redhintsMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.redhintsMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.redhintsMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.redhintsMessage.clearup();
    }
    broadcast(msgCode, params) {
        this.redhintsMessage.broadcast(msgCode, params);
    }
}
//# sourceMappingURL=RedHintsMessageManager.js.map