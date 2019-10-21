const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseNode extends cc.Component {
    @property(cc.Prefab)
    toastPrefab:cc.Prefab = null;
    //回调函数(默认不传)
    protected callFunc:Function = null;
    //事件参数列表
    protected events:string[] = [];
    //弹框通用
    protected toast:cc.Node = null;

    protected onLoad():void{
        console.log("BaseNode super!!");
    }

    protected showToast(str:string, time:number = 2, callBack?:Function):void{
        const toast = cc.instantiate(this.toastPrefab);
        toast.parent = this.node;

        const text = cc.find("text", toast); 
        if (text)
           text.getComponent(cc.Label).string = str || "";

        const moveBy = cc.moveBy(time, cc.p(0, 200));
        const finish = cc.callFunc(function(){
            toast.destroy();
        }, this);

        toast.runAction(cc.sequence(moveBy, finish));
    }

    protected start(events?:string[], callFunc?:Function): void{
        this.callFunc = callFunc;
        this.events = events;

        if (this.callFunc)
            this.addEventListenerWithTarget();
    };

    protected addEventListenerWithTarget():void{
        console.log("addEventListenerWithTarget(params): " + JSON.stringify(this.events));
        this.events.forEach((value:string, index: number, array:[]) => {
            this.node.on(value, function(event){ 
                const jsondata = event.getUserData();
                if (this.callFunc)
                    this.callFunc(jsondata)
            }.bind(this))
        }) 
    }

    protected removeEventListenerWithTarget():void{

        console.log("removeEventListenerWithTarget(params): " + JSON.stringify(this.events));
    }
   
}