var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { storyUI } from "../../../data/ui/story";
import { binder } from "../../../framework/common/NiceDecorator";
import { StoryMessageManager } from "../../../framework/ink/StoryMessageManager";
import { Logger } from "../../../framework/logger/Logger";
import { UIWindow } from "../../../framework/ui/UIWindow";
import { S } from "../../../global/GameConfig";
export class UIStoryWin extends UIWindow {
    constructor() {
        super(...arguments);
        this.shouldContineStory = false;
        this.optionsMap = new Map();
    }
    onAwake() {
        super.onAwake();
        this.m_btnList.itemRenderer = (index, obj) => {
            this.renderBtnList(index, obj);
        };
        this.m_btnList.onClickItem.Add((event) => {
            let clickId = this.m_btnList.GetChildIndex(event.data);
            if (this.shouldContineStory) {
                S.StoryManager.advanceStory();
            }
            else {
                this.optionsMap.clear();
                S.StoryManager.selectChoice(this.allChoices[clickId]);
            }
        });
    }
    onShow(vo) {
        super.onShow(vo);
        S.StoryMessageManager.addListener(StoryMessageManager.ONCONTENTREADY, this, this.OnContentReady);
        S.StoryMessageManager.addListener(StoryMessageManager.ONCHOICESPRESENTED, this, this.OnChoicesPresented);
        S.StoryMessageManager.addListener(StoryMessageManager.ONSTORYFINISHED, this, this.OnStoryFinished);
        this.optionsMap.clear();
        this.shouldContineStory = false;
        S.StoryManager.beginStory("story2");
    }
    OnContentReady(speakerContent, speakerId, currentTags, currentChoices) {
        this.m_speakerTxt.text = speakerContent;
        if (S.StoryManager.canContinue) {
            this.shouldContineStory = true;
            this.m_btnList.numItems = 1;
        }
        if (currentChoices.length > 0) {
            this.allChoices = currentChoices;
            this.shouldContineStory = false;
            let len = currentChoices.length;
            for (let i = 0; i < len; i++) {
                this.optionsMap.set(i, currentChoices[i].text);
            }
            this.m_btnList.numItems = len;
        }
    }
    renderBtnList(index, obj) {
        let continueBtn = obj.asButton;
        if (this.optionsMap.size > 0) {
            continueBtn.text = this.optionsMap.get(index);
        }
        else {
            continueBtn.text = "点击继续";
        }
    }
    OnChoicesPresented(currentChoices) {
        this.shouldContineStory = false;
        Logger.log("....OnChoicesPresented......");
    }
    OnStoryFinished() {
        Logger.log("Story Finished");
        S.UIManager.closeWindow(storyUI.UIStoryWin, null);
    }
    onClose(arg) {
        super.onClose(arg);
        S.StoryMessageManager.removeListener(StoryMessageManager.ONCONTENTREADY, this.OnContentReady);
        S.StoryMessageManager.removeListener(StoryMessageManager.ONCHOICESPRESENTED, this.OnChoicesPresented);
        S.StoryMessageManager.removeListener(StoryMessageManager.ONSTORYFINISHED, this.OnStoryFinished);
    }
}
__decorate([
    binder("speakerTxt")
], UIStoryWin.prototype, "m_speakerTxt", void 0);
__decorate([
    binder("btnList")
], UIStoryWin.prototype, "m_btnList", void 0);
//# sourceMappingURL=UIStoryWin.js.map