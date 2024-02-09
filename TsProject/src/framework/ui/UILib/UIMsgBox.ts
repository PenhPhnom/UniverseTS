import { binder } from "../../../framework/common/NiceDecorator";
import { UIWindow } from "../UIWindow";

// 通用弹窗
export class UIMsgBoxArg{
    public title:string = "";
    public content:string = "";
    public btnText:string = "";//"确定|取消|关闭"
}


export class UIMsgBox extends UIWindow{

    private m_arg:UIMsgBoxArg;


    public onAwake():void{
        super.onAwake();

    }

    public onShow(arg:any):void{
        

        
    }


    public onClose(arg:any):void{
        super.onClose(arg);

     
    }

}