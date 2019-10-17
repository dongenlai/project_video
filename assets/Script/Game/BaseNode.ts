const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseNode extends cc.Component {
    //回调函数(默认不传)
    protected callFunc:Function = null;
    //事件参数列表
    protected events:string[] = [];

    protected onLoad():void{
        console.log("BaseNode super!!");
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