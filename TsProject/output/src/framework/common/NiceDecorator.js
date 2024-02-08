// FairyGUI 元件 绑定器
export function binder(name) {
    return function (target, key) {
        target["binders"] = target["binders"] || {};
        target["binders"][key] = name;
    };
}
//# sourceMappingURL=NiceDecorator.js.map