var cuckoo;
(function (cuckoo) {
    var WXLOGIN_STATE;
    (function (WXLOGIN_STATE) {
        WXLOGIN_STATE[WXLOGIN_STATE["REFUSE"] = 0] = "REFUSE";
        WXLOGIN_STATE[WXLOGIN_STATE["SUCCESS"] = 1] = "SUCCESS";
        WXLOGIN_STATE[WXLOGIN_STATE["CANCEL"] = 2] = "CANCEL"; //取消
    })(WXLOGIN_STATE || (WXLOGIN_STATE = {}));
    cuckoo.WxInterFace = {
        _className: "com/shared/sdk/WXInterface",
        //静态（注意覆盖）
        _callFunc: null,
        sendAuthRequest: function () {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                //参数回调函数 到java层eval 例如 
                jsb.reflection.callStaticMethod(this._className, "sendAuthRequest", "(Ljava/lang/String;)V", "");
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
            }
        },
        //微信登陆
        wXLogin: function (callBack) {
            this._callFunc = callBack;
            this.sendAuthRequest();
        },
        //微信登陆回调
        wXLoginRes: function (reCode, code, state) {
            if (this._callFunc && typeof this._callFunc === 'function') {
                this._callFunc(reCode, code);
            }
        },
        //设置appid 
        setAppID: function (appid) {
            console.log("-00--00--0-0" + cc.sys.os)
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                console.log("设置appid" + appid);
                jsb.reflection.callStaticMethod(this._className, "setWXAppIDByClient", "(Ljava/lang/String;)V", appid);
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
            }
        },
        //获取微信appid
        getAppID: function () {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                var appid = jsb.reflection.callStaticMethod(this._className, "getAppID", "()Ljava/lang/String;", null);
                console.log("返回来的appid: " + appid);
                return appid;
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
            }
            return "";
        },
        //监测是否安装微信
        isWXAppInstalled: function () {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                var isinstall = jsb.reflection.callStaticMethod(this._className, "isWXAppInstalled", "()Z", null);
                console.log("微信安装了么？？？");
                return isinstall;
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
            }
            return false;
        }
    };
})(cuckoo || (cuckoo = {}));
