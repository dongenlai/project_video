var cuckoo;
(function (cuckoo) {
    var WXLOGIN_STATE;
    (function (WXLOGIN_STATE) {
        WXLOGIN_STATE[WXLOGIN_STATE["REFUSE"] = 0] = "REFUSE";
        WXLOGIN_STATE[WXLOGIN_STATE["SUCCESS"] = 1] = "SUCCESS";
        WXLOGIN_STATE[WXLOGIN_STATE["CANCEL"] = 2] = "CANCEL";
        WXLOGIN_STATE[WXLOGIN_STATE["DEFAULT"] = 3] = "DEFAULT"; //异常
    })(WXLOGIN_STATE || (WXLOGIN_STATE = {}));
    //微信分享渠道 
    var SHARE_TYPE;
    (function (SHARE_TYPE) {
        SHARE_TYPE[SHARE_TYPE["FRIEND"] = 0] = "FRIEND";
        SHARE_TYPE[SHARE_TYPE["PYQ"] = 1] = "PYQ"; //朋友圈
    })(SHARE_TYPE || (SHARE_TYPE = {}));
    //分享内容 
    var SHARE_CONTENT_TYPE;
    (function (SHARE_CONTENT_TYPE) {
        SHARE_CONTENT_TYPE[SHARE_CONTENT_TYPE["IMAGE"] = 0] = "IMAGE";
        SHARE_CONTENT_TYPE[SHARE_CONTENT_TYPE["TEXT"] = 1] = "TEXT"; //文字
    })(SHARE_CONTENT_TYPE || (SHARE_CONTENT_TYPE = {}));
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
                console.log("微信ios 登陆");
                jsb.reflection.callStaticMethod("wxInterface", "sendWXLoginRequest:", "");
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
        wXShareRes: function (reCode) {
            console.log("分享结果回调:" + reCode);
        },
        //设置appid 
        setAppID: function (appid) {
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
        },
        //下订单 
        doOrder: function (resCode) {
            var resInfo = cuckoo.Base64.decode(resCode);
            var resCodeStr = JSON.stringify(resInfo);
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod(this._className, "doOrder", "(Ljava/lang/String;)V", resCode);
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("wxInterface", "doOrder:withInfo:", resCode, "orderId");
            }
        },
        payResNotify: function (code) {
            console.log("微信支付通知");
        },
        //开始分享 
        doShare: function (type, url, title, description, iconpath) {
            console.log("执行分享:" + "type: " + type + " url:" + url + " title:" + title + " description: " + description + " iconpath: " + iconpath);
            var iconpath = cc.js.formatStr("%s", iconpath);
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                // jsb.reflection.callStaticMethod(this._className, "shareURLToWXPYQ", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, title, description, iconpath);
                jsb.reflection.callStaticMethod(this._className, "shareURLToWX", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, title, description, iconpath);
                // jsb.reflection.callStaticMethod(this._className, "shareText", "(Ljava/lang/String;Ljava/lang/String;)V",  title, "wechat");
                // jsb.reflection.callStaticMethod(this._className, "shareImageToWX", "(Ljava/lang/String;)V",  iconpath);
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("wxInterface", "doShare:title:url:description:flag:", iconpath, title, url, description, 1);
                // jsb.reflection.callStaticMethod("wxInterface", "doShareText:flag:",  title, 1);
            }
        }
    };
})(cuckoo || (cuckoo = {}));
