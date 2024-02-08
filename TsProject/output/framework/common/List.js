"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List extends Array {
    constructor() {
        super();
    }
    add = function (value) {
        this.push(value);
    };
    insert = function (index, value) {
        this.splice(index, 0, value);
    };
    remove = function (value) {
        var index = this.indexOf(value);
        this.removeAt(index);
    };
    removeAt = function (index) {
        this.splice(index, 1);
    };
    contains = function (value) {
        return this.indexOf(value) >= 0;
    };
    get count() {
        return this.length;
    }
    clear = function () {
        this.splice(0);
    };
    foreach = function (callback) {
        this._breaking = false;
        var sum = this.length;
        for (var i = 0; i < sum; i++) {
            if (this._breaking) {
                break;
            }
            callback(this[i]);
        }
    };
    _breaking = false;
    break = function () {
        this._breaking = true;
    };
    toArray = function () {
        var array = [];
        this.forEach((element) => {
            array.push(element);
        });
        return array;
    };
    append = function (value) {
        value.forEach(element => {
            this.push(element);
        });
    };
}
exports.List = List;
//# sourceMappingURL=List.js.map