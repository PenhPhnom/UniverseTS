"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csharp_1 = require("csharp");
const puerts_1 = require("puerts");
const player = csharp_1.UnityEngine.GameObject.Find("Capsule");
csharp_1.UnityEngine.Camera.main.transform.SetParent(player.transform);
csharp_1.UnityEngine.Camera.main.transform.position = new csharp_1.UnityEngine.Vector3(0, 2, -3.5);
csharp_1.UnityEngine.Camera.main.transform.Rotate(15, 0, 0);
setInterval(() => {
    const moveX = csharp_1.UnityEngine.Input.GetAxis("Horizontal") * csharp_1.UnityEngine.Time.deltaTime * 200;
    const moveZ = csharp_1.UnityEngine.Input.GetAxis("Vertical") * csharp_1.UnityEngine.Time.deltaTime * 8;
    player.transform.Rotate(0, moveX, 0);
    player.transform.Translate(0, 0, moveZ);
    if (csharp_1.UnityEngine.Input.GetKeyDown(csharp_1.UnityEngine.KeyCode.Space)) {
        const rb = player.GetComponent(puerts_1.$typeof(csharp_1.UnityEngine.Rigidbody));
        rb.AddForce(new csharp_1.UnityEngine.Vector3(0, 5, 0), csharp_1.UnityEngine.ForceMode.Impulse);
    }
});
//# sourceMappingURL=ScriptExample2.js.map