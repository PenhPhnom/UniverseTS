import { nice_ts } from "./gen/pb";
export class DecodeMsg {
}
export class Opcode {
    static decode(opcode, msg) {
        let msgObj = this.map[opcode]["decode"](msg);
        let decodeMsg = new DecodeMsg();
        decodeMsg.rpcId = msgObj.RpcId;
        decodeMsg.msgObj = msgObj;
        return decodeMsg;
    }
    static encode(opcode, msg) {
        let buf = this.map[opcode]["encode"](msg).finish();
        return buf;
    }
}
Opcode.MSG_C2R_Login = 1000;
Opcode.MSG_R2C_Login = 1001;
Opcode.MSG_C2G_LoginGate = 1002;
Opcode.MSG_G2C_LoginGate = 1003;
Opcode.MSG_C2GS_Test = 2001;
Opcode.MSG_GS2C_Test = 2002;
Opcode.map = {
    1000: { "decode": nice_ts.C2R_Login.decode, "encode": nice_ts.C2R_Login.encode },
    1001: { "decode": nice_ts.R2C_Login.decode, "encode": nice_ts.R2C_Login.encode },
    1002: { "decode": nice_ts.C2G_LoginGate.decode, "encode": nice_ts.C2G_LoginGate.encode },
    1003: { "decode": nice_ts.G2C_LoginGate.decode, "encode": nice_ts.G2C_LoginGate.encode },
    2001: { "decode": nice_ts.C2GS_Test.decode, "encode": nice_ts.C2GS_Test.encode },
    2002: { "decode": nice_ts.GS2C_Test.decode, "encode": nice_ts.GS2C_Test.encode }
};
//# sourceMappingURL=Opcode.js.map