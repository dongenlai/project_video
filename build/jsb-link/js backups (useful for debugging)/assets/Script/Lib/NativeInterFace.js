var cuckoo;

(function(c) {
var s;
(function(c) {
c[c.NO_NET = 0] = "NO_NET";
c[c.NET_2G = 1] = "NET_2G";
c[c.NET_3G = 2] = "NET_3G";
c[c.NET_4G = 3] = "NET_4G";
c[c.NET_WIFI = 5] = "NET_WIFI";
})(s || (s = {}));
var t = [ "无网络", "2G", "3G", "4G", "未知", "WIFI" ];
c.NativeInterFace = {
_className_ANDROID: "com/shared/sdk/NativeInterface",
_className_IOS: "ZQStatusBarTool",
_callFunc: null,
getCurrentBattery: function() {
var c;
cc.sys.os == cc.sys.OS_ANDROID ? c = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceBattery", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (c = jsb.reflection.callStaticMethod(this._className_IOS, "currentBatteryPercent"));
console.log("当前电量: " + c);
return c;
},
getCurrentNetworkType: function() {
var c = "0";
cc.sys.os == cc.sys.OS_ANDROID ? c = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceSignalStatus", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (c = jsb.reflection.callStaticMethod(this._className_IOS, "currentNetworkType"));
var s = parseInt(c);
console.log("当前网络类型:netType: " + s + " NET_DES: " + t[s]);
return s;
},
getSignalStrength: function() {
var c = 0;
cc.sys.os == cc.sys.OS_ANDROID ? c = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceSignalLevel", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (c = jsb.reflection.callStaticMethod(this._className_IOS, "getSignalStrength"));
console.log("信号强度: " + c);
return c;
},
getServiceCompany: function() {
var c = "";
cc.sys.os == cc.sys.OS_ANDROID ? c = jsb.reflection.callStaticMethod(this._className_ANDROID, "getMobileType", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (c = jsb.reflection.callStaticMethod(this._className_IOS, "serviceCompany"));
console.log("运营商: " + c);
return c;
},
onLockNotify: function(c) {
console.log("native-锁屏通知");
cc.sys.os == cc.sys.OS_ANDROID || (cc.sys.os, cc.sys.OS_IOS);
},
setWindowBrightness: function(c) {
console.log("设置屏幕亮度:" + c);
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this._className_ANDROID, "setWindowBrightness", "(Ljava/lang/String;)V", c) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(this._className_IOS, "setWindownBrightness:", c);
},
getPackageName: function() {
var c = "";
cc.sys.os == cc.sys.OS_ANDROID ? c = jsb.reflection.callStaticMethod(this._className_ANDROID, "getPackageName", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (c = jsb.reflection.callStaticMethod("NativeInterFace", "getPackageName"));
return c;
},
getVersionCode: function() {
var c = "0.0";
cc.sys.os == cc.sys.OS_ANDROID ? c = jsb.reflection.callStaticMethod(this._className_ANDROID, "getAppVersionName", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (c = jsb.reflection.callStaticMethod("NativeInterFace", "getCurVersion"));
return c;
},
copyStr: function(c) {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this._className_ANDROID, "copyStr", "(Ljava/lang/String;)V", c) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("NativeInterFace", "copyToClipboard:", c);
},
openWebURL: function(c) {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this._className_ANDROID, "openWebURL", "(Ljava/lang/String;)V", c) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("NativeInterFace", "openWebURL:", c);
}
};
})(cuckoo || (cuckoo = {}));