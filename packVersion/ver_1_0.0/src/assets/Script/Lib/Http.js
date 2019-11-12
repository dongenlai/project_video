var cuckoo;

(function(t) {
var e = function() {
return function(t, e, o, n) {
this.postEventName = "";
this.postEventName = t;
this.errorCode = e;
this.errorMsg = o;
this.retStr = n;
};
}(), o = function() {
function o() {}
o.httpGet = function(t, e) {
var o = new XMLHttpRequest();
[ "abort", "error", "timeout" ].forEach(function(t) {
o["on" + t] = function() {
e(1, t);
};
});
o.onreadystatechange = function() {
if (4 == o.readyState && o.status >= 200 && o.status <= 207) {
var t = o.statusText, n = o.responseText;
e(0, t, n);
}
};
o.timeout = 1e4;
o.open("GET", t, !0);
o.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
o.send();
};
o.httpPost = function(t, e, n, s, r) {
var a = new XMLHttpRequest();
[ "abort", "error", "timeout" ].forEach(function(t) {
a["on" + t] = function() {
console.log("Http::eventname: " + t);
o.postEvent(r, 1, t, "");
};
});
a.onreadystatechange = function() {
console.log("xhr.readyState: " + a.readyState + " xhr.status: " + a.status);
if (4 == a.readyState && a.status >= 200 && a.status <= 207) {
var t = a.statusText, e = a.responseText;
if (cc.sys.isNative) {
var n = a.getResponseHeader("Set-Cookie");
if (n) {
var s = n.indexOf(";");
n = n.substring(s, 0);
o.httpCookie = n;
}
} else o.httpCookie = document.cookie;
o.postEvent(r, 0, t, e);
} else 4 == a.readyState && 0 == a.status && o.postEvent(r, 1, "onError", "");
};
a.timeout = n;
a.open("POST", t, !0);
a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
cc.sys.isNative && a.setRequestHeader("Cookie", o.httpCookie);
for (var i in e) a.setRequestHeader(i, e[i]);
if (s.constructor === String) a.send(s); else {
var c = "";
for (var i in s) 0 === c.length ? c += cc.js.formatStr("%s=%s", i, encodeURIComponent(s[i])) : c += cc.js.formatStr("&%s=%s", i, encodeURIComponent(s[i]));
console.log("发送数据包" + c + "\n 当前url: " + t);
console.log("请求头信息" + JSON.stringify(e));
a.send(c);
}
};
o.httpPostHs = function(e, n, s) {
var r = {
appKey: "wechatDefaultLoginConf",
Authorization: "Bearer " + t.curUser.token
};
o.httpPost(t.GAME.urlHs + e, r, 1e4, n, s);
};
o.postEvent = function(t, o, n, s) {
var r = t.postEventNode, a = t.postEventName;
if (r && cc.isValid(r)) {
var i = new cc.Event.EventCustom(a, !0), c = new e(a, o, n, s);
i.setUserData(c);
r.dispatchEvent(i);
} else console.log("http event node is valid");
};
o.httpCookie = "";
return o;
}();
t.Net = o;
})(cuckoo || (cuckoo = {}));