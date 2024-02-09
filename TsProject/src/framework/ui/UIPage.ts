import { UIPanel } from "./UIPanel";
import { UITypeDef, UIComDefs } from "./UIDefine";
import { S } from "../../global/GameConfig";



export abstract class UIPage {
    public get uiType(): UITypeDef {    
        return UITypeDef.Page;
    }

    


    public onAwake():void{
       
    }


    public onShow(vo:any):void{

    
    }

    public onClose(arg:any):void{
   
    }

    private onBtnGoBack(){
        S.UIManager.goBackPage();
    }

} 