import { ListNode } from "../ListNode";
let _tmpListArr = [];
export class EventSlots {
    constructor() {
        this._eventMap = {};
    }
    add(event, callback, data) {
        let eventList = this.getOrCreateEventList(event);
        let node = ListNode.create();
        node.data = callback;
        node.dataExtra = data;
        node.event = event;
        node.insertAfter(eventList);
        return node;
    }
    fire(event, evt) {
        let eventList = this.getOrCreateEventList(event);
        eventList.data++;
        let clearCounter = false;
        let node = eventList.next;
        //  let next: ListNode;
        let nodes = _tmpListArr;
        nodes.length = 0;
        while (node !== eventList) {
            nodes.push(node);
            node = node.next;
        }
        for (let node of nodes) {
            if (node.data && node.data.call)
                clearCounter = node.data.call(null, evt, node.dataExtra, eventList.data) || clearCounter;
        }
        // while (node !== eventList) {
        //     next = node.next;
        //     let checkNextNext = next.next;
        //     if(node.data.call)
        //         clearCounter = node.data.call(null, evt, node.dataExtra, eventList.data) || clearCounter;
        //     if (next.next != checkNextNext) {
        //         let iii = 0;
        //     }
        //     node = next;
        // }
        if (clearCounter) {
            eventList.data = 0;
        }
    }
    getOrCreateEventList(event) {
        let listNode = this._eventMap[event];
        if (listNode) {
            return listNode;
        }
        listNode = ListNode.create();
        listNode.prev = listNode;
        listNode.next = listNode;
        // NOTE: 这个用来存消息的计数.
        listNode.data = 0;
        listNode.dataExtra = undefined;
        this._eventMap[event] = listNode;
        return listNode;
    }
}
//# sourceMappingURL=EventSlots.js.map