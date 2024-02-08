export class SyncDebugger {
    constructor() {
        this._record = [];
    }
    addRecord(a, b, c, d, e) {
        // let record = this._record;
        // let startIndex = record.length;
        // record.push(a);
        // if (b !== undefined) { record.push(b); }
        // if (c !== undefined) { record.push(c); }
        // if (d !== undefined) { record.push(d); }
        // if (e !== undefined) { record.push(e); }
        // let debugRecord = this._debugRecord;
        // if (!debugRecord) {
        //     return;
        // }
        // let endIndex = record.length;
        // let failed = false;
        // for (let index = startIndex; index < endIndex; index++) {
        //     if (debugRecord[index] !== record[index]) {
        //         failed = true;
        //         break;
        //     }
        // }
        // if (failed) {
        //     console.error("sync failed.");
        //     console.error(`DebugRecord: ${debugRecord.slice(startIndex, endIndex)}`);
        //     console.error(`Record: ${record.slice(startIndex, endIndex)}`);
        //     debugger;
        // }
    }
    clearRecord() {
        // this._record.length = 0;
    }
    uploadRecord(url) {
        // let content = JSON.stringify(this._record);
        // let request = new XMLHttpRequest();
        // request.open("POST", url, true);
        // request.setRequestHeader("Content-type", "text/plain");
        // request.send(content);
    }
    setDebugRecord(debugRecord) {
        // this._debugRecord = debugRecord;
    }
}
//# sourceMappingURL=SyncDebugger.js.map