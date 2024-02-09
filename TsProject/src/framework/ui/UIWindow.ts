import { UIPanel } from "./UIPanel";
import { UITypeDef, UIComDefs } from "./UIDefine";


export abstract class  UIWindow {
   
    public get uiType(): UITypeDef {    
        return UITypeDef.Window;
    }


    public onAwake():void{
        

    }

    public onShow(arg:any):void{

    }
    public onClose(arg:any):void{

      
    }

    private onBtnClose(){
    }

}