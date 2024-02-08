import { Singleton } from "../common/Singleton";
export class EntityFactory extends Singleton {
    constructor() {
        super(...arguments);
        this.autoID = 0;
    }
    create(c) {
        let cc = new c();
        cc.uuid = ++this.autoID;
        cc.onAwake(null);
        return cc;
    }
    createWithData(initData, c) {
        let cc = new c();
        cc.uuid = ++this.autoID;
        cc.onAwake(initData);
        return cc;
    }
}
//# sourceMappingURL=EntityFactory.js.map