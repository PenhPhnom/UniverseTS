import { nice_ts } from "../../data/pb/gen/pb";
import { Opcode } from "../../data/pb/Opcode";
import { Logger } from "../../framework/logger/Logger";
import { S } from "../../global/GameConfig";
export class LoginAPI {
    static async benchmarkTest() {
        for (let i = 1; i < 2; i++) {
            let msg = nice_ts.C2GS_Test.create();
            msg.testID = i;
            msg.testName = "benchmark test";
            let response = await S.SessionManager.sendGateMsg(Opcode.MSG_C2GS_Test, msg);
            let test = response;
            Logger.log("code: " + test.Error + ",msg:" + test.Message + ",res:" + test.testResponse);
        }
    }
    static async loginRealmServer(account, password) {
        let msg = nice_ts.C2R_Login.create();
        msg.Account = account;
        msg.Password = password;
        let response = await S.SessionManager.sendRealmMsg(Opcode.MSG_C2R_Login, msg);
        return response;
    }
    static async loginGateServer(gateId, gateKey) {
        let msg = nice_ts.C2G_LoginGate.create();
        msg.GateId = gateId;
        msg.Key = gateKey;
        let response = await S.SessionManager.sendGateMsg(Opcode.MSG_C2G_LoginGate, msg);
        return response;
    }
}
//# sourceMappingURL=LoginAPI.js.map