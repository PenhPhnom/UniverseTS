import { Story } from "inkjs/engine/Story";
import { Logger } from "../logger/Logger";
import { InkStateInspector } from "./InkStateInspector";
import { StoryMessageManager } from "./StoryMessageManager";
export class InkWriter {
    constructor(storyJson) {
        this._allInkCommands = new Map();
        this.setupInkCommands();
        this.createStroy(storyJson);
        this.load();
    }
    load() {
        let storyState = "";
        if (storyState != null && storyState != "") {
            this._currentStory.state.LoadJson(storyState);
        }
    }
    createStroy(json) {
        this._currentStory = new Story(json);
    }
    beginStory(knotName) {
        if (this._currentStory == null) {
            Logger.warn("Trying to AdvanceStory in InkWriter when no story has been created");
            return;
        }
        this._currentStory.ChoosePathString(knotName, true);
        let inkState = new InkStateInspector();
        inkState.BindInkMethods(this._currentStory);
        this.advanceStory();
    }
    giveReward() {
        Logger.log("give reward...");
        return true;
    }
    setupInkCommands() {
        this._allInkCommands.set("GIVE_REWARD", this.giveReward);
    }
    handleCommand(command, args) {
        if (this._allInkCommands.has(command)) {
            return this._allInkCommands.get(command)(args);
        }
        Logger.error("Could not find InkCommand with name:" + command);
        return true;
    }
    parseCommandName(text) {
        let num = text.indexOf(InkWriter.COMMAND_PREFIX);
        let num2 = text.indexOf(InkWriter.COMMAND_DELIMITER);
        if (num2 == -1) {
            num2 = text.length;
        }
        let length = num2 - (num + InkWriter.COMMAND_PREFIX.length);
        return text.substr(num + InkWriter.COMMAND_PREFIX.length, length).trim();
    }
    parseCommandArgs(text) {
        let num = text.indexOf(InkWriter.COMMAND_DELIMITER);
        if (num == -1) {
            return [];
        }
        let length = text.length - (num + 1);
        let list = text.substr(num + 1, length).
            trim().
            split(InkWriter.COMMAND_ARG_DELIMITER);
        for (let i = 0; i < list.length; i++) {
            list[i] = list[i].trim();
        }
        return list;
    }
    extractSpeaker(line) {
        if (line.startsWith(InkWriter.COMMAND_PREFIX)) {
            return ["0", line.trim()];
        }
        let array = line.split(':', 2);
        if (array.length > 1) {
            let speakID = array[0].trim();
            let speakContent = array[1].trim();
            return [speakID, speakContent];
        }
        return ["0", line.trim()];
    }
    saveCurrentStory() {
        let currState = this._currentStory.state.toJson();
        //TODOｓａｖｅ
    }
    canContinue() {
        return this._currentStory.canContinue;
    }
    advanceStory() {
        if (this._currentStory == null) {
            Logger.warn("Trying to AdvanceStory in InkWriter when no story has been created");
        }
        else if (this._currentStory.canContinue) {
            let text = this._currentStory.Continue().trim();
            if (text == "") {
                this.advanceStory();
                return;
            }
            let speakID;
            let speakContent;
            [speakID, speakContent] = this.extractSpeaker(text);
            let commandName = null;
            let args = null;
            if (speakContent.startsWith(InkWriter.COMMAND_PREFIX)) {
                commandName = this.parseCommandName(speakContent);
                args = this.parseCommandArgs(speakContent);
                if (commandName != null && commandName != "") {
                    if (this.handleCommand(commandName, args)) {
                        this.advanceStory();
                    }
                }
            }
            else {
                //OnContentReady
                StoryMessageManager.Instance(StoryMessageManager).broadcastContentReady(StoryMessageManager.ONCONTENTREADY, speakContent, speakID, this._currentStory.currentTags, this._currentStory.currentChoices);
            }
        }
        else if (this._currentStory.currentChoices.length > 0) {
            //OnChoicesPresented
            StoryMessageManager.Instance(StoryMessageManager).broadcastChoicesPresented(StoryMessageManager.ONCHOICESPRESENTED, this._currentStory.currentChoices);
        }
        else {
            //OnStoryFinished
            StoryMessageManager.Instance(StoryMessageManager).broadcastStoryFinished(StoryMessageManager.ONSTORYFINISHED);
        }
    }
    selectChoice(choiceIndex) {
        if (this._currentStory == null) {
            Logger.warn("Trying to ChooseChoice in InkWriter when no story has begun");
            return;
        }
        this._currentStory.ChooseChoiceIndex(choiceIndex);
        this.advanceStory();
    }
    getVariable(variableName) {
        return this._currentStory.variablesState.GetVariableWithName(variableName);
    }
    setVariable(variableName, value) {
        this._currentStory.variablesState.$(variableName, value);
    }
}
InkWriter.DEBUG_STORY_ID = "DEBUG_STORY";
InkWriter.COMMAND_PREFIX = ">>>";
InkWriter.COMMAND_DELIMITER = ":";
InkWriter.COMMAND_ARG_DELIMITER = ',';
//# sourceMappingURL=InkWriter.js.map