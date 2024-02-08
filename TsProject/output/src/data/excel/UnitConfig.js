import { Singleton } from "../../framework/common/Singleton";
export class UnitConfigTR {
    constructor(_id, _Name, _Desc, _Position, _Height, _Weight) {
        this._id = _id;
        this._Name = _Name;
        this._Desc = _Desc;
        this._Position = _Position;
        this._Height = _Height;
        this._Weight = _Weight;
    }
}
export class UnitConfigTB extends Singleton {
    constructor() {
        super();
        this.trs = new Map();
        this.trs.set(1001, new UnitConfigTR(1001, "米克尔", "带有强力攻击技能", 1, 178, 68));
    }
}
//# sourceMappingURL=UnitConfig.js.map