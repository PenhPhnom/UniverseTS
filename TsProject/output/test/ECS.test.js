require("../src/framework/core/JSExtends");
import { Entity } from "../src/framework/core/ECS/Entity";
import { EntityContext } from "../src/framework/core/ECS/EntityContext";
import { Vec2 } from "../src/framework/core/Vec2";
class UnitEntity extends Entity {
}
class EventEntity extends Entity {
}
class Game {
}
function createVec2FieldConvertor(name, xField, yField) {
    let hideName = "__hide_" + name;
    return function () {
        let hideVec2 = this[hideName];
        if (!hideVec2) {
            hideVec2 = this[hideName] = new Vec2();
        }
        hideVec2.set(this[xField], this[yField]);
        return hideVec2;
    };
}
class BuffComponent {
    constructor() {
        this.name = "";
        this.buffID = 0;
        this.skillID = 0;
    }
}
class EventHandleListComponent {
    constructor() {
        this.name = "";
        this.eventHandleList = null;
    }
}
test("ECS test", () => {
    let unitCtx = new EntityContext("Battle", UnitEntity);
    unitCtx.regFieldConvertor("pos", createVec2FieldConvertor("pos", "posX", "posY"));
    let unit = unitCtx.create().add(BuffComponent, EventHandleListComponent);
    unit.buffID = 11;
    unit.skillID = 12;
    unit.name = "hello";
    let buff = unit.get(BuffComponent);
    console.log(buff.buffID);
    let event = unit.get(EventHandleListComponent);
    console.log(event.name);
});
//# sourceMappingURL=ECS.test.js.map