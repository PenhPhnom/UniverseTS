"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const puerts_1 = require("puerts");
const component = csharp_1.UnityEngine.GameObject.FindObjectOfType(puerts_1.$typeof(csharp_1.JsEnvExample5));
const gameObject = csharp_1.UnityEngine.GameObject.Find("Cube");
component.add_onClick1(() => {
    console.log("ts:Click 1 Lambda call");
    let v1 = new csharp_1.UnityEngine.Vector3(1, 1, 1);
    let v2 = csharp_1.UnityEngine.Vector3.op_Addition(v1, new csharp_1.UnityEngine.Vector3(1, 2, 3));
    console.log(`Vector add out:x=${v2.x},y=${v2.y},z=${v2.z}`);
});
const funCall = function () {
    console.log("ts:Click 1 funtion call");
    const d = Math.random() * 3 + 1;
    gameObject.transform.localScale = csharp_1.UnityEngine.Vector3.op_Multiply(csharp_1.UnityEngine.Vector3.one, d);
};
component.add_onClick1(funCall);
component.add_onClick2((s) => {
    console.log("ts:Click 2 , s=" + s);
    const a = parseInt(s);
    const r1 = gameObject.transform.localEulerAngles;
    const r2 = csharp_1.UnityEngine.Vector3.op_Subtraction(r1, new csharp_1.UnityEngine.Vector3(0, a, 0));
    gameObject.transform.localEulerAngles = r2;
});
//# sourceMappingURL=ScriptExample5.js.map