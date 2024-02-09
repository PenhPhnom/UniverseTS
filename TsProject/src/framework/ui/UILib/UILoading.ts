import { UIPanel } from "../UIPanel";
import { UITypeDef } from "../UIDefine";
import { binder } from "../../common/NiceDecorator";
import { UIMessage } from "../../../game/event/UIMessage";
import { S } from "../../../global/GameConfig";



export class  UILoading {

    public onAwake(): void {
       
    }
    
    public get uiType(): UITypeDef {    
        return UITypeDef.Loading;
    }

    public onShow(arg:any):void{
      
        // S.UIMessageManger.addListener(
        //     UIMessage.MSG_SCENE_PROGRESS,
        //     this,
        //     (progress:number)=>{
        //         this.progressLoading.TweenValue(progress, 0.1);
        //     });
    }

    public onClose(arg:any):void{
        S.UIMessageManger.removeListenerByCode(
            UIMessage.MSG_SCENE_PROGRESS
        );
    }


}