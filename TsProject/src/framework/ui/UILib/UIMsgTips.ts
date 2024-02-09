import { binder } from "../../common/NiceDecorator";
import { UIWidge } from "../UIWidge";


//Tips 挂件
export class UIMsgTips extends UIWidge{

    private m_alpha = 1;
    private m_yOffset = 20;

    private m_intervel;

    public onAwake(): void {
        

    }


    public onShow(arg:any):void{

        this.m_alpha = 1;

        this.m_intervel = setInterval(this.moveTips,500);
    }

    private moveTips(){

        this.m_alpha -= 0.01;
        if(this.m_alpha <0 ) this.onClose(null);

        this.m_yOffset -= 0.1;
        if(this.m_yOffset < 0) this.m_yOffset = 0;

    }

    public onClose(arg:any):void{

        clearInterval(this.m_intervel);
    }

}