"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
csharp_1.UnityEngine.Debug.Log('Hello World ! TS');
let cube = csharp_1.UnityEngine.GameObject.Find('Cube');
setTimeout(() => {
    cube.transform.localScale = new csharp_1.UnityEngine.Vector3(2, 2, 2);
}, 2000);
//# sourceMappingURL=ScriptExample1.js.map