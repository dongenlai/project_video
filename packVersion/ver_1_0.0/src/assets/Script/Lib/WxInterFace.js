var cuckoo;

(function(s) {
var c;
(function(s) {
s[s.REFUSE = 0] = "REFUSE";
s[s.SUCCESS = 1] = "SUCCESS";
s[s.CANCEL = 2] = "CANCEL";
})(c || (c = {}));
s.WxInterFace = {
_className: "com/shared/sdk/WXInterface",
_callFunc: null,
sendAuthRequest: function() {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this._className, "sendAuthRequest", "(Ljava/lang/String;)V", "") : (cc.sys.os, 
cc.sys.OS_IOS);
},
wXLogin: function(s) {
this._callFunc = s;
this.sendAuthRequest();
},
wXLoginRes: function(s, c, t) {
this._callFunc && "function" == typeof this._callFunc && this._callFunc(s, c);
},
setAppID: function(s) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
console.log("设置appid" + s);
jsb.reflection.callStaticMethod(this._className, "setWXAppIDByClient", "(Ljava/lang/String;)V", s);
} else cc.sys.os, cc.sys.OS_IOS;
},
getAppID: function() {
if (cc.sys.os == cc.sys.OS_ANDROID) {
var s = jsb.reflection.callStaticMethod(this._className, "getAppID", "()Ljava/lang/String;", null);
console.log("返回来的appid: " + s);
return s;
}
cc.sys.os, cc.sys.OS_IOS;
return "";
},
isWXAppInstalled: function() {
if (cc.sys.os == cc.sys.OS_ANDROID) {
var s = jsb.reflection.callStaticMethod(this._className, "isWXAppInstalled", "()Z", null);
console.log("微信安装了么？？？");
return s;
}
cc.sys.os, cc.sys.OS_IOS;
return !1;
}
};
})(cuckoo || (cuckoo = {}));