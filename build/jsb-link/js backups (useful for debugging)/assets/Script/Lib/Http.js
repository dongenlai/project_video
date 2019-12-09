var cuckoo;

(function(e) {
var t = function() {
return function(e, t, o, s) {
this.postEventName = "";
this.postEventName = e;
this.errorCode = t;
this.errorMsg = o;
this.retStr = s;
};
}(), o = function() {
function o() {}
o.downloadPic = function(t, s) {
if (cc.sys.isNative) if (cc.sys.os != cc.sys.OS_IOS) {
var n = jsb.fileUtils.getWritablePath() + "headimg/", i = n + e.Base64.encode(t) + ".png";
if (jsb.fileUtils.isFileExist(i)) s(i); else {
o.httpGet(t, function(e) {
if (e) {
jsb.fileUtils.isDirectoryExist(n) || jsb.fileUtils.createDirectory(n);
if (jsb.fileUtils.writeDataToFile(new Uint8Array(e), i)) {
console.log("Remote write file succeed.");
s(i);
} else console.log("Remote write file failed!.");
} else console.log("Remote download file failed.");
}, !0);
}
} else s(t); else s(t);
};
o.httpGet = function(e, t, o) {
var s = new XMLHttpRequest();
o && (s.responseType = "arraybuffer");
[ "abort", "error", "timeout" ].forEach(function(e) {
s["on" + e] = function() {
o ? t(null) : t(1, e);
};
});
s.onreadystatechange = function() {
if (4 == s.readyState && s.status >= 200 && s.status <= 207) {
var e = s.statusText, n = o ? s.response : s.responseText;
o ? t(n) : t(0, e, n);
}
};
s.timeout = 1e4;
s.open("GET", e, !0);
s.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
s.send();
};
o.httpPost = function(e, t, s, n, i) {
var r = new XMLHttpRequest();
[ "abort", "error", "timeout" ].forEach(function(e) {
r["on" + e] = function() {
console.log("Http::eventname: " + e);
o.postEvent(i, 1, e, "");
};
});
r.onreadystatechange = function() {
if (4 == r.readyState && r.status >= 200 && r.status <= 207) {
var e = r.statusText, t = r.responseText;
if (cc.sys.isNative) {
var s = r.getResponseHeader("Set-Cookie");
if (s) {
var n = s.indexOf(";");
s = s.substring(n, 0);
o.httpCookie = s;
}
} else o.httpCookie = document.cookie;
o.postEvent(i, 0, e, t);
} else 4 == r.readyState && 0 == r.status && o.postEvent(i, 1, "onError", "");
};
r.timeout = s;
r.open("POST", e, !0);
r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
cc.sys.isNative && r.setRequestHeader("Cookie", o.httpCookie);
for (var a in t) r.setRequestHeader(a, t[a]);
if (n.constructor === String) r.send(n); else {
var c = "";
for (var a in n) 0 === c.length ? c += cc.js.formatStr("%s=%s", a, encodeURIComponent(n[a])) : c += cc.js.formatStr("&%s=%s", a, encodeURIComponent(n[a]));
console.log("发送数据包： " + c);
console.log("url: " + e);
console.log("请求头信息： " + JSON.stringify(t));
r.send(c);
}
};
o.httpPostHs = function(t, s, n) {
var i = {
appKey: e.GAME.appKey,
Authorization: "Bearer " + e.curUser.token
};
o.httpPost(e.GAME.urlHs + t, i, 1e4, s, n);
};
o.postEvent = function(e, o, s, n) {
var i = e.postEventNode, r = e.postEventName;
if (i && cc.isValid(i)) {
var a = new cc.Event.EventCustom(r, !0), c = new t(r, o, s, n);
a.setUserData(c);
i.dispatchEvent(a);
} else console.log("http event node is valid");
};
o.httpCookie = "";
return o;
}();
e.Net = o;
})(cuckoo || (cuckoo = {}));