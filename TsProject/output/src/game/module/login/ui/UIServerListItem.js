import { FairyGUI } from "csharp";
/**
 *
 *  此处之所以要引用 UIServerListItem 对象，是因为 V8会GC掉此对象， 但是c#端确仍然存在此Delegate
 *  注意：要将宏： FAIRYGUI_PUERTS 打开才能有效释放引用
 *
 */
let __cacheListItemMap = new Map();
let __id = 0;
export class UIServerListItem extends FairyGUI.GButton {
    constructor() {
        super();
        this.itemid = 0;
        this["__onDispose"] = () => { this.onDispose(); };
        __id++;
        this.itemid = __id;
        __cacheListItemMap.set(this.itemid, this);
    }
    onDispose() {
        __cacheListItemMap.delete(this.itemid);
    }
    set itemLabel(txt) {
        this.text = txt;
    }
}
//# sourceMappingURL=UIServerListItem.js.map