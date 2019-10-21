namespace cuckoo {
    export const WxInterFace = {
         _className:"com/shared/xsdk/WXInterface",
         //静态（注意覆盖）
         _callFunc:null, 

        sendAuthRequest:function(){
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                //参数回调函数 到java层eval 例如 
                jsb.reflection.callStaticMethod(this._className, "sendAuthRequest", "(Ljava/lang/String;)V", "");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
            }
        },

        //微信登陆
        wXLogin:function(callBack:Function){
            this._callFunc = callBack;
            
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod(this._className, "sendWXLoginRequest", "(Ljava/lang/String;)V", "");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
            }
        },

        //微信登陆回调
        wXLoginRes:function(reCode:number, code:any, state:any){
            if (this._callFunc && typeof this._callFunc === 'function' ){
                console.log("微信登陆成功了么？？？");
                this._callFunc()
            }
        },

        //设置appid 
        setAppID:function(appid:string){
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                console.log("设置appid");
                jsb.reflection.callStaticMethod(this._className, "setWXAppIDByClient", "(Ljava/lang/String;)V", appid);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
            }
        },

        //获取微信appid
        getAppID:function():string{
            if (cc.sys.os == cc.sys.OS_ANDROID) {
               const appid = jsb.reflection.callStaticMethod(this._className, "getAppID", "()Ljava/lang/String;", null);
               console.log("返回来的appid: " + appid);
               return appid;
            } else if (cc.sys.os == cc.sys.OS_IOS) {
            }
            return ""
        },

        //监测是否安装微信
        isWXAppInstalled:function():boolean{
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                const isinstall = jsb.reflection.callStaticMethod(this._className, "isWXAppInstalled", "()Z", null);
                console.log("微信安装了么？？？");
                return isinstall;
            } else if (cc.sys.os == cc.sys.OS_IOS) {
 
            }
           return false;
        }
    }
}