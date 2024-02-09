import { UIBase } from "./UIBase";


export abstract class UIComponent{

    private _timer;
    constructor(pkg:string, name:string)
    {
        this.createUI(pkg,name);
    }
    public createUI(pkg:string, name:string)
    {
        this.onAwake();
    }

    public SetDisable(visible:boolean)
    {
    }

    public onShow(vo?:any):void{
        this.SetDisable(true);
    }

    public abstract onAwake():void;
    public abstract onClose(arg?:any):void;

    public startTimer()
    {
        this._timer=setInterval(this.update.bind(this),200);
    }

    public onUpdate():void{}

    public update():void{
        this.onUpdate();
    }
}