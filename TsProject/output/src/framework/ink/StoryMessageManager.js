import { Messenger } from "../common/Messenger";
import { Singleton } from "../common/Singleton";
export class StoryMessageManager extends Singleton {
    constructor() {
        super(...arguments);
        this.storyMessage = new Messenger();
    }
    addListener(msgCode, obj, listener) {
        this.storyMessage.addListener(msgCode, obj, listener);
    }
    removeListener(msgCode, listener) {
        this.storyMessage.removeListener(msgCode, listener);
    }
    removeListenerByCode(msgCode) {
        this.storyMessage.removeListenerByType(msgCode);
    }
    clearup() {
        this.storyMessage.clearup();
    }
    broadcastContentReady(msgCode, speakerContent, speakerId, currentTags, currentChoices) {
        this.storyMessage.broadcast(msgCode, speakerContent, speakerId, currentTags, currentChoices);
    }
    broadcastChoicesPresented(mesgCode, currentChoices) {
        this.storyMessage.broadcast(mesgCode, currentChoices);
    }
    broadcastStoryFinished(mesgCode) {
        this.storyMessage.broadcast(mesgCode);
    }
}
StoryMessageManager.ONCONTENTREADY = 1001;
StoryMessageManager.ONCHOICESPRESENTED = 1002;
StoryMessageManager.ONSTORYFINISHED = 1003;
//# sourceMappingURL=StoryMessageManager.js.map