import { Singleton } from "../common/Singleton";
import { Logger } from "../logger/Logger";
import { RedHintsMessageManager } from "./RedHintsMessageManager";
export var enumRedHints;
(function (enumRedHints) {
    /** 标记位 */
    enumRedHints[enumRedHints["none"] = 0] = "none";
    /** 聊天 */
    enumRedHints[enumRedHints["chat"] = 1] = "chat";
    /** 聊天世界频道 */
    enumRedHints[enumRedHints["chat_world"] = 2] = "chat_world";
    /** 聊天公会频道 */
    enumRedHints[enumRedHints["chat_family"] = 3] = "chat_family";
    /** 聊天系统频道 */
    enumRedHints[enumRedHints["chat_system"] = 4] = "chat_system";
})(enumRedHints || (enumRedHints = {}));
export class RedHintsManager extends Singleton {
    constructor() {
        super();
        this.init();
    }
    init() {
        this._data = [0]; //第一位无意义
        this._parentIndex = [0];
        this._childNum = [0];
        this._childIndex = [0];
        //------------------------记录父子关系-----------------------
        //聊天
        this.setParent(enumRedHints.chat_world, enumRedHints.chat);
        this.setParent(enumRedHints.chat_family, enumRedHints.chat);
        this.setParent(enumRedHints.chat_system, enumRedHints.chat);
    }
    /**
     * 设置红点的开启和关闭
    */
    setRedHintOpenOrClose(red, isOpen) {
        if (this._childNum[red] > 0) {
            Logger.log("红点数据设置错误：不能直接对高级的红点数据操作");
            return;
        }
        this.doSetRedHintOpenOrClose(red, isOpen ? 1 : 0);
    }
    /**
     * 记录父子关系：子---父
    */
    setParent(child, parent) {
        if (this._parentIndex[parent] == child) {
            Logger.log("关系反了");
            return;
        }
        if (this._parentIndex[child]) {
            Logger.log("重复设置");
            return;
        }
        this._parentIndex[child] = parent;
        if (isNaN(this._childNum[parent])) {
            this._childNum[parent] = 0;
        }
        this._childNum[parent]++; //子项数量增加
        this._childIndex[child] = this._childNum[parent]; //子项的索引 从1开始
    }
    doSetRedHintOpenOrClose(red, value) {
        if (this._data[red] != value) {
            this._data[red] = value;
            let _parent = this._parentIndex[red];
            if (_parent) {
                //如果有父级，更新父级
                let index = this._childIndex[red]; //获取在父级中的索引
                this.doSetRedHintOpenOrClose(_parent, value > 0 ? this._data[_parent] | this.addV(index) : this._data[_parent] & this.subV(index)); //设置父级的值
            }
            //发改变事件:全局事件
            //emit(RedHintsManager.RED_HINT_VALUE_CHANGED, red);
            //红点事件，局部事件
            RedHintsMessageManager.Instance(RedHintsMessageManager).broadcast(red, value);
        }
    }
    addV(index) {
        return 1 << (index - 1);
    }
    subV(index) {
        return ~this.addV(index);
    }
    /**
     * 查看红点是否开启
    */
    checkRedIsOpen(red) {
        return this._data[red] > 0;
    }
}
/**
 * 红点值改变
*/
RedHintsManager.RED_HINT_VALUE_CHANGED = "RED_HINT_VALUE_CHANGED";
//# sourceMappingURL=RedHintsManager.js.map