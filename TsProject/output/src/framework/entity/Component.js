export class Component {
    publish(event, c) {
        this.entity.publish(event, c);
    }
    subscribe(action, c) {
        this.entity.subscribe(action, c);
    }
    unSubscribe(action, c) {
        this.entity.unSubscribe(action, c);
    }
}
//# sourceMappingURL=Component.js.map