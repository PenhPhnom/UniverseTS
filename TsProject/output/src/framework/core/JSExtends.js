const kFixedPrecise = 4;
function installJSExtends() {
    Number.prototype["fixed"] = function () {
        return +(this.toFixed(kFixedPrecise));
    };
    Number.prototype["trueMod"] = function (max) {
        return ((this % max) + max) % max;
    };
}
installJSExtends();
//# sourceMappingURL=JSExtends.js.map