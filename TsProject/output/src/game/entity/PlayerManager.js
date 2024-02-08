import { Singleton } from "../../framework/common/Singleton";
import { EntityFactory } from "../../framework/entity/EntityFactory";
import { Player } from "./Player";
export class PlayerManager extends Singleton {
    getPlayer(reCreate = false) {
        if (reCreate) {
            this.player = null;
            this.player = EntityFactory.Instance(EntityFactory).create(Player);
        }
        else {
            if (this.player == null) {
                this.player = EntityFactory.Instance(EntityFactory).create(Player);
            }
        }
        return this.player;
    }
}
//# sourceMappingURL=PlayerManager.js.map