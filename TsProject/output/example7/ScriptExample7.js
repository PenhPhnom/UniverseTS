"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const puerts_1 = require("puerts");
let cube1 = csharp_1.UnityEngine.GameObject.Find("Cube1");
let cube2 = csharp_1.UnityEngine.GameObject.Find("Cube2");
let btn = csharp_1.UnityEngine.GameObject.Find("Button1");
let btnComponent = btn.GetComponent(puerts_1.$typeof(csharp_1.UnityEngine.UI.Button));
btnComponent.onClick.AddListener(async () => {
    // await $promise(JsEnvExample7.RotateFroSeconds(cube1,1));
    // await WaitTimeForSeconds(1.5);
    // await $promise(JsEnvExample7.RotateFroSeconds(cube2,2));
    await RotateForSeconds(cube1, 1);
    await WaitTimeForSeconds(Math.random() + 1);
    await RotateForSeconds(cube2, 1);
});
async function WaitTimeForSeconds(sec) {
    console.log("wait time:" + sec);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, sec * 1000);
    });
}
//System.Threading.Tasks.Task.Yield
async function RotateForSeconds(go, d) {
    let end = csharp_1.UnityEngine.Time.time + d;
    while (csharp_1.UnityEngine.Time.time < end) {
        go.transform.Rotate(csharp_1.UnityEngine.Vector3.op_Multiply(new csharp_1.UnityEngine.Vector3(1, 1), csharp_1.UnityEngine.Time.deltaTime * 150));
        await puerts_1.$promise(csharp_1.System.Threading.Tasks.Task.Yield());
    }
}
//# sourceMappingURL=ScriptExample7.js.map