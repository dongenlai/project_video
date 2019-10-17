namespace cuckoo {
    export class EventListener {	
        private events:any = [];
        private callFunc:Function = null;
        private target:cc.Node = null;
        /*
          @param target 监听节点
          @param events 监听目标数组
          @param callBack 回调函数
        */ 
        constructor(target:cc.Node, callBack:Function){
            this.target = target;
            this.callFunc = callBack;
        }	

        throwError(){
            console.error("Local Event is Error Please Check Node is isValid or events is null");
        }
        
        registerLocalListener(eventNames:[]):any{
            if (!this.target || !cc.isValid(this.target)) {
               return this.throwError();
            }
            if (this.events && this.events.length > 0)
                this.events.forEach((value:string, index: number, array:[]) => {
                    this.target.on(value, function(event){ 

                        const jsondata = event.getUserData();
                        if (this.callFunc)
                            this.callFunc(jsondata)

                    }.bind(this))
                }) 
        }

        unRegisterLocalListener(){

        }

        getLocalListenerByName(){

        }

        removeLocalListenerByName(){

        }
    }	
}





