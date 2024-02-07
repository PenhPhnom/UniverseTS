"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const cube = csharp_1.UnityEngine.GameObject.Find("Cube");
setInterval(() => {
    let x = getX();
    let y = 0;
    let z = 0;
    const time = csharp_1.UnityEngine.Time.deltaTime;
    cube.transform.Rotate(x * time, y * time, z * time);
});
function getX() {
    return 300;
}
//# sourceMappingURL=ScriptExample3.js.map