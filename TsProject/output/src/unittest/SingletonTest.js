import { Singleton } from '../framework/common/Singleton';
import { Logger } from '../framework/logger/Logger';
export class SingletonTest extends Singleton {
    constructor() {
        super();
        this.num = 0;
        Logger.log("SingletonTest call constructor");
    }
    add() {
        this.num += 1;
    }
    test() {
        return this.num;
    }
}
//# sourceMappingURL=SingletonTest.js.map