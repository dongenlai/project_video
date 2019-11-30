var cuckoo;

(function(s) {
var c;
(function(s) {
s[s.NO_NET = 0] = "NO_NET";
s[s.NET_2G = 1] = "NET_2G";
s[s.NET_3G = 2] = "NET_3G";
s[s.NET_4G = 3] = "NET_4G";
s[s.NET_WIFI = 5] = "NET_WIFI";
})(c || (c = {}));
var t = [ "无网络", "2G", "3G", "4G", "未知", "WIFI" ];
s.NativeInterFace = {
_className_ANDROID: "com/shared/sdk/NativeInterface",
_className_IOS: "ZQStatusBarTool",
_callFunc: null,
getCurrentBattery: function() {
var s;
cc.sys.os == cc.sys.OS_ANDROID ? s = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceBattery", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (s = jsb.reflection.callStaticMethod(this._className_IOS, "currentBatteryPercent"));
console.log("当前电量: " + s);
return s;
},
getCurrentNetworkType: function() {
var s = "0";
cc.sys.os == cc.sys.OS_ANDROID ? s = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceSignalStatus", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (s = jsb.reflection.callStaticMethod(this._className_IOS, "currentNetworkType"));
var c = parseInt(s);
console.log("当前网络类型:netType: " + c + " NET_DES: " + t[c]);
return c;
},
getSignalStrength: function() {
var s = 0;
cc.sys.os == cc.sys.OS_ANDROID ? s = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceSignalLevel", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (s = jsb.reflection.callStaticMethod(this._className_IOS, "getSignalStrength"));
console.log("信号强度: " + s);
return s;
},
getServiceCompany: function() {
var s = "";
cc.sys.os == cc.sys.OS_ANDROID ? s = jsb.reflection.callStaticMethod(this._className_ANDROID, "getMobileType", "()Ljava/lang/String;") : cc.sys.os == cc.sys.OS_IOS && (s = jsb.reflection.callStaticMethod(this._className_IOS, "serviceCompany"));
console.log("运营商: " + s);
return s;
},
onLockNotify: function(s) {
console.log("native-锁屏通知");
cc.sys.os == cc.sys.OS_ANDROID || (cc.sys.os, cc.sys.OS_IOS);
},
setWindowBrightness: function(s) {
console.log("设置屏幕亮度:" + s);
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this._className_ANDROID, "setWindowBrightness", "(Ljava/lang/String;)V", s) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(this._className_IOS, "setWindownBrightness:", s);
}
};
})(cuckoo || (cuckoo = {}));