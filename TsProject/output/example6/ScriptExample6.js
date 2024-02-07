"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const puerts_1 = require("puerts");
let cube = csharp_1.UnityEngine.GameObject.Find("Cube");
let btn = csharp_1.UnityEngine.GameObject.Find("Button1");
let btnComponent = btn.GetComponent(puerts_1.$typeof(csharp_1.UnityEngine.UI.Button));
btnComponent.onClick.AddListener(() => {
    cube.transform.Rotate(10, 0, 0);
});
let callback = function func1() {
    cube.transform.localScale = csharp_1.UnityEngine.Vector3.op_Addition(cube.transform.localScale, new csharp_1.UnityEngine.Vector3(0.1, 0.1, 0.1));
};
btnComponent.onClick.AddListener(callback);
// btnComponent.onClick.RemoveListener(callback);
// btnComponent.onClick.RemoveAllListeners();
//# sourceMappingURL=ScriptExample6.js.map