import { UIBase } from "./UIBase";
import { FairyGUI } from "csharp";
export class UIComponent extends UIBase {
    // constructor(pkg:string, name:string)
    // {
    //     super();
    //     this.createUI(pkg,name);
    // }
    createUI(pkg, name) {
        let comp = FairyGUI.UIPackage.CreateObject(pkg, name).asCom;
        this.fui = comp;
        this.bindAll(this);
        this.onAwake();
    }
    addToParent(p, vo) {
        this.parent = p;
        p.AddChild(this.fui);
        this.fui.SetSize(this.parent.width, this.parent.height);
        this.fui.AddRelation(this.parent, FairyGUI.RelationType.Size);
        this.onShow(vo);
    }
    SetDisable(visible) {
        this.fui.visible = visible;
    }
    onShow(vo) {
        this.SetDisable(true);
    }
    startTimer() {
        this._timer = setInterval(this.update.bind(this), 200);
    }
    onUpdate() { }
    update() {
        this.onUpdate();
    }
}
//# sourceMappingURL=UIComponent.js.map