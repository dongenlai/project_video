var cuckoo;

(function(c) {
var s, t, e;
(function(c) {
c[c.REFUSE = 0] = "REFUSE";
c[c.SUCCESS = 1] = "SUCCESS";
c[c.CANCEL = 2] = "CANCEL";
c[c.DEFAULT = 3] = "DEFAULT";
})(s || (s = {}));
(function(c) {
c[c.FRIEND = 0] = "FRIEND";
c[c.PYQ = 1] = "PYQ";
})(t || (t = {}));
(function(c) {
c[c.IMAGE = 0] = "IMAGE";
c[c.TEXT = 1] = "TEXT";
})(e || (e = {}));
c.WxInterFace = {
_className: "com/shared/sdk/WXInterface",
_callFunc: null,
sendAuthRequest: function() {
if (cc.sys.os == cc.sys.OS_ANDROID) jsb.reflection.callStaticMethod(this._className, "sendAuthRequest", "(Ljava/lang/String;)V", ""); else if (cc.sys.os == cc.sys.OS_IOS) {
console.log("微信ios 登陆");
jsb.reflection.callStaticMethod("wxInterface", "sendWXLoginRequest:", "");
}
},
wXLogin: function(c) {
this._callFunc = c;
this.sendAuthRequest();
},
wXLoginRes: function(c, s, t) {
this._callFunc && "function" == typeof this._callFunc && this._callFunc(c, s);
},
wXShareRes: function(c) {
console.log("分享结果回调:" + c);
},
setAppID: function(c) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
console.log("设置appid" + c);
jsb.reflection.callStaticMethod(this._className, "setWXAppIDByClient", "(Ljava/lang/String;)V", c);
} else cc.sys.os, cc.sys.OS_IOS;
},
getAppID: function() {
if (cc.sys.os == cc.sys.OS_ANDROID) {
var c = jsb.reflection.callStaticMethod(this._className, "getAppID", "()Ljava/lang/String;", null);
console.log("返回来的appid: " + c);
return c;
}
cc.sys.os, cc.sys.OS_IOS;
return "";
},
isWXAppInstalled: function() {
if (cc.sys.os == cc.sys.OS_ANDROID) {
var c = jsb.reflection.callStaticMethod(this._className, "isWXAppInstalled", "()Z", null);
console.log("微信安装了么？？？");
return c;
}
cc.sys.os, cc.sys.OS_IOS;
return !1;
},
doOrder: function() {
if (cc.sys.os == cc.sys.OS_ANDROID) ; else if (cc.sys.os == cc.sys.OS_IOS) {
var c = JSON.stringify({
appid: "wxadf0ba8a4e984ce8",
noncestr: "87ff30748e52fd4941b3739f53f00c7a",
package: "Sign=WXPay",
partnerid: 1900006771,
prepayid: "wx24220244985843f7d06b1fbb1961990632",
sign: "243A1394B579F473F506BB0F243BE511",
timestamp: 1574604165
});
jsb.reflection.callStaticMethod("wxInterface", "doOrder:withInfo:", c, "orderId");
}
},
doShare: function(c, s, t, e, n) {
console.log("执行分享:type: " + c + " url:" + s + " title:" + t + " description: " + e + " iconpath: " + n);
n = cc.js.formatStr("%s", n);
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this._className, "shareURLToWX", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", s, t, e, n) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("wxInterface", "doShare:title:url:description:flag:", n, t, s, e, 1);
}
};
})(cuckoo || (cuckoo = {}));