namespace cuckoo {

    enum WXLOGIN_STATE {
         "REFUSE" = 0,    //拒绝
         "SUCCESS",       //成功
         "CANCEL",        //取消
         "DEFAULT"        //异常
    }

    //微信分享渠道 
    enum SHARE_TYPE {
        "FRIEND" = 0,    //好友
        "PYQ"            //朋友圈
    }

    //分享内容 
    enum SHARE_CONTENT_TYPE {
        "IMAGE" = 0,    //图片 
        "TEXT"          //文字
    }

    export const WxInterFace = {
         _className:"com/shared/sdk/WXInterface",
         //静态（注意覆盖）
         _callFunc:null, 

        sendAuthRequest:function(){
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                //参数回调函数 到java层eval 例如 
                jsb.reflection.callStaticMethod(this._className, "sendAuthRequest", "(Ljava/lang/String;)V",  "");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                console.log("微信ios 登陆")
                jsb.reflection.callStaticMethod("wxInterface", "sendWXLoginRequest:", "");
            }
        },

        //微信登陆
        wXLogin:function(callBack:Function){
            this._callFunc = callBack;
            this.sendAuthRequest();
        },

        //微信登陆回调
        wXLoginRes:function(reCode:number, code:any, state:any){
            if (this._callFunc && typeof this._callFunc === 'function' ){
                this._callFunc(reCode, code)
            }
        },

        wXShareRes:function(reCode:number){
            console.log("分享结果回调:" + reCode)
        },

        //设置appid 
        setAppID:function(appid:string){
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                console.log("设置appid" + appid);
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
        },

        //下订单 
        doOrder:function():void{
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "doOrder", "(IILjava/lang/String;Ljava/lang/String;)V",
                //     jsondata["orderId"], jsondata["channelId"], jsondata["payInfo"], jsondata["thirdOrderId"]);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                const payInfo = {
                    appid:"wxadf0ba8a4e984ce8",
                    noncestr:"87ff30748e52fd4941b3739f53f00c7a",
                    package:"Sign=WXPay",
                    partnerid:1900006771,
                    prepayid:"wx24220244985843f7d06b1fbb1961990632",
                    sign:"243A1394B579F473F506BB0F243BE511",
                    timestamp:1574604165,
                }
                var s = JSON.stringify(payInfo)
                jsb.reflection.callStaticMethod("wxInterface", "doOrder:withInfo:", s, "orderId");
            }
        },

        //开始分享 
        doShare:function(type:number, url:string, title:string, description:string, iconpath:string):void{
            console.log("执行分享:" + "type: " + type + " url:" + url + " title:" + title + " description: " + description + " iconpath: " + iconpath);
            var iconpath = cc.js.formatStr("%s", iconpath);
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                // jsb.reflection.callStaticMethod(this._className, "shareURLToWXPYQ", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, title, description, iconpath);
                jsb.reflection.callStaticMethod(this._className, "shareURLToWX", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, title, description, iconpath);
                // jsb.reflection.callStaticMethod(this._className, "shareText", "(Ljava/lang/String;Ljava/lang/String;)V",  title, "wechat");
                // jsb.reflection.callStaticMethod(this._className, "shareImageToWX", "(Ljava/lang/String;)V",  iconpath);

            } else if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("wxInterface", "doShare:title:url:description:flag:", iconpath, title, url, description, 1);
                // jsb.reflection.callStaticMethod("wxInterface", "doShareText:flag:",  title, 1);
            }
        }
    }
}