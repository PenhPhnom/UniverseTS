import { ResManager } from "../common/ResManager";
import { Singleton } from "../common/Singleton";
import { InkWriter } from "./InkWriter";
export class StoryManager extends Singleton {
    get inkWriter() {
        return this._inkWriter;
    }
    constructor() {
        super();
        this.storyAddress = "Story/TestStory.json";
    }
    async initialize() {
        if (this._inkWriter == null) {
            var json = (await ResManager.Instance(ResManager).loadTextAsset(this.storyAddress)).text;
            this._inkWriter = new InkWriter(json);
        }
    }
    beginStory(knotName) {
        this._inkWriter.beginStory(knotName);
    }
    canContinue() {
        return this._inkWriter.canContinue;
    }
    advanceStory() {
        this._inkWriter.advanceStory();
    }
    selectChoice(choice) {
        this._inkWriter.selectChoice(choice.index);
    }
    loadCurrent() {
        if (this._inkWriter != null)
            this._inkWriter.load();
    }
    getVariable(variableName) {
        return this._inkWriter.getVariable(variableName);
    }
    setVariable(variableName, value) {
        this.inkWriter.setVariable(variableName, value);
    }
}
//# sourceMappingURL=StoryManager.js.map