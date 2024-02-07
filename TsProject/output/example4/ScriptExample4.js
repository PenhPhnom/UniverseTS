"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func6 = exports.func5 = exports.func4 = exports.func3 = exports.func2 = exports.func1 = void 0;
const csharp_1 = require("csharp");
/** 普通的方法 */
function func1() {
    console.log(`ts:test call func1`);
}
exports.func1 = func1;
/** 带有参数的方法 */
function func2(s) {
    console.log(`ts:test call func2,s=${s}`);
}
exports.func2 = func2;
let gameobject;
/** 传入一个GameObject的方法 */
function func3(obj) {
    console.log(`ts:test call func3,gameobject = ${obj.name}`);
    gameobject = obj;
    setInterval(() => {
        gameobject.transform.Rotate(300 * csharp_1.UnityEngine.Time.deltaTime, 0, 0);
    });
}
exports.func3 = func3;
/* 将传入的C#对象中的action重设 */
function func4(component) {
    console.log(`ts:test call func4,c=${component}`);
    let a = 1;
    component.action1 = () => {
        gameobject.transform.localScale = new csharp_1.UnityEngine.Vector3(a, a, a);
        a += csharp_1.UnityEngine.Time.deltaTime;
        if (a >= 3) {
            a = 1;
        }
    };
}
exports.func4 = func4;
/* 从JS中返回数据到C# */
function func5() {
    console.log(`ts:test call func5`);
    return "from func5 return data";
}
exports.func5 = func5;
/* 返回之前传入的GameObject */
function func6() {
    console.log(`ts:test call func6`);
    return gameobject;
}
exports.func6 = func6;
/** 使用C#自定义类，数据修改，静态方法调用 */
function testCallCSharp() {
    let test = new csharp_1.Example4TestClass();
    console.log(`test class str = ${test.str}`);
    test.str = "change in ts code";
    test.LogStr();
    const s = csharp_1.Example4TestClass.TestCall("call from ts code !!");
    console.log(`test call static func,s=${s}`);
}
testCallCSharp();
//# sourceMappingURL=ScriptExample4.js.map