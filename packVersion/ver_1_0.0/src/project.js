window.__require = function t(e, o, n) {
function i(r, c) {
if (!o[r]) {
if (!e[r]) {
var a = r.split("/");
a = a[a.length - 1];
if (!e[a]) {
var p = "function" == typeof __require && __require;
if (!c && p) return p(a, !0);
if (s) return s(a, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var u = o[r] = {
exports: {}
};
e[r][0].call(u.exports, function(t) {
return i(e[r][1][t] || t);
}, u, u.exports, t, e, o, n);
}
return o[r].exports;
}
for (var s = "function" == typeof __require && __require, r = 0; r < n.length; r++) i(n[r]);
return i;
}({
AudioMng: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "28074dmN1xMYLP10NPWDILO", "AudioMng");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = cc._decorator, r = s.ccclass, c = s.property, a = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.bgm = null;
e.buttonAudio = null;
return e;
}
e.prototype.onLoad = function() {};
e.prototype.start = function() {};
e.prototype.playMusic = function() {
cc.audioEngine.playMusic(this.bgm, !0);
};
e.prototype.pauseMusic = function() {
cc.audioEngine.pauseMusic();
};
e.prototype.resumeMusic = function() {
cc.audioEngine.resumeMusic();
};
e.prototype._playSFX = function(t) {
cc.audioEngine.playEffect(t, !1);
};
e.prototype.playButton = function() {
this._playSFX(this.buttonAudio);
};
i([ c(cc.AudioClip) ], e.prototype, "bgm", void 0);
i([ c(cc.AudioClip) ], e.prototype, "buttonAudio", void 0);
return e = i([ r ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {} ],
BaseNode: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "149991NTmtD/47HPe3oisiY", "BaseNode");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = cc._decorator, r = s.ccclass, c = s.property, a = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.toastPrefab = null;
e.callFunc = null;
e.events = [];
e.toast = null;
e.curRunToast = null;
return e;
}
e.prototype.onLoad = function() {
console.log("BaseNode super!!");
};
e.prototype.showToast = function(t, e, o) {
void 0 === e && (e = 2);
if (!this.curRunToast) {
var n = cc.instantiate(this.toastPrefab);
this.curRunToast = n;
n.parent = this.node;
var i = cc.find("text", n);
i && (i.getComponent(cc.Label).string = t || "");
var s = cc.moveBy(e, cc.p(0, 120)), r = cc.callFunc(function() {
n.destroy();
this.curRunToast = null;
}, this);
n.runAction(cc.sequence(s, r));
}
};
e.prototype.start = function(t, e) {
this.callFunc = e;
this.events = t;
this.callFunc && this.addEventListenerWithTarget();
};
e.prototype.addEventListenerWithTarget = function() {
var t = this;
console.log("addEventListenerWithTarget(params): " + JSON.stringify(this.events));
this.events.forEach(function(e, o, n) {
t.node.on(e, function(t) {
var e = t.getUserData();
this.callFunc && this.callFunc(e);
}.bind(t));
});
};
e.prototype.removeEventListenerWithTarget = function() {
console.log("removeEventListenerWithTarget(params): " + JSON.stringify(this.events));
};
i([ c(cc.Prefab) ], e.prototype, "toastPrefab", void 0);
return e = i([ r ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {} ],
ButtonScale: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "324e9pcQrZO5LhbAjS5lo0J", "ButtonScale");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = cc._decorator, r = s.ccclass, c = s.property, a = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.pressedScale = 1;
e.transDuration = 0;
e.initScale = 0;
e.button = null;
e.scaleDownAction = null;
e.scaleUpAction = null;
return e;
}
e.prototype.onLoad = function() {
var t = this, e = cc.find("Menu/AudioMng") || cc.find("Game/AudioMng");
e && (e = e.getComponent("AudioMng"));
t.initScale = this.node.scale;
t.button = t.getComponent(cc.Button);
t.scaleDownAction = cc.scaleTo(t.transDuration, t.pressedScale);
t.scaleUpAction = cc.scaleTo(t.transDuration, t.initScale);
function o(e) {
this.stopAllActions();
this.runAction(t.scaleUpAction);
}
this.node.on("touchstart", function(e) {
this.stopAllActions();
this.runAction(t.scaleDownAction);
}, this.node);
this.node.on("touchend", o, this.node);
this.node.on("touchcancel", o, this.node);
};
i([ c ], e.prototype, "pressedScale", void 0);
i([ c ], e.prototype, "transDuration", void 0);
return e = i([ r ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {} ],
Game: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b926b8mzwtLZIRgYGIC/l4U", "Game");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = t("./BaseNode"), r = cc._decorator, c = r.ccclass, a = r.property, p = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.settingPrefab = null;
e.settingLayer = null;
e.recordPrefab = null;
e.recordLayer = null;
e.userName = null;
e.rescue_progress = null;
e.rescue_label = null;
return e;
}
e.prototype.onLoad = function() {
var t = cc.instantiate(this.settingPrefab);
t.parent = this.node;
this.settingLayer = t;
var e = cc.instantiate(this.recordPrefab);
e.parent = this.node;
this.recordLayer = e;
var o = cc.find("bg", this.node), n = cc.find("leftNode", o);
this.userName = cc.find("userName", n).getComponent(cc.Label);
var i = cc.find("hall_rescue_bg", n);
this.rescue_progress = cc.find("rescue_progress", i).getComponent(cc.ProgressBar);
this.rescue_label = cc.find("rescue_text", i).getComponent(cc.Label);
};
e.prototype.onStory = function() {
this.showToast("故事线功能敬请期待！", 5);
};
e.prototype.onChapter = function() {
this.showToast("章节功能敬请期待！", 5);
};
e.prototype.onLockedChapter = function() {
this.showToast("解锁章节章节功能敬请期待！", 5);
};
e.prototype.onRecord = function() {
this.recordLayer.active = !0;
};
e.prototype.start = function() {
this.init();
};
e.prototype.onUserInput = function() {
this.settingLayer.active = !0;
};
e.prototype.init = function() {
this.initUserInfo();
};
e.prototype.initUserInfo = function() {
this.userName.string = cuckoo.curUser.baseInfo.nickName;
this.rescue_progress.progress = 100;
this.rescue_label.string = "营救进度:100%";
};
i([ a(cc.Prefab) ], e.prototype, "settingPrefab", void 0);
i([ a(cc.Prefab) ], e.prototype, "recordPrefab", void 0);
return e = i([ c ], e);
}(s.default);
o.default = p;
cc._RF.pop();
}, {
"./BaseNode": "BaseNode"
} ],
Load: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2dbd3I13mJC85xRCtQgcxsm", "Load");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = t("./BaseNode"), r = t("./Update"), c = cc._decorator, a = c.ccclass, p = c.property, u = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.progressBar = null;
e.manifestUrl = null;
e.progress = 0;
e.hotUpdate = null;
e.storagePath = null;
return e;
}
e.prototype._init = function() {
console.log(jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST + "**1****");
console.log(jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST + "***2***");
console.log(jsb.EventAssetsManager.ERROR_PARSE_MANIFEST + "****3**");
console.log(jsb.EventAssetsManager.ALREADY_UP_TO_DATE + "****4**");
console.log(jsb.EventAssetsManager.NEW_VERSION_FOUND + "****5**");
this.storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "remote-asset";
this.hotUpdate = r.default.instance;
console.log("this.manifestUrl: " + this.manifestUrl + " this.storagePath: " + this.storagePath);
this.hotUpdate.init(this.manifestUrl, this.storagePath);
this._addUpdateListener();
};
e.prototype._addUpdateListener = function() {
this.hotUpdate.on("NEW_VERSION_FOUND", this._onNewVersionFound, this);
this.hotUpdate.on("ALREADY_UP_TO_DATE", this._onAlredyUpToDate, this);
this.hotUpdate.on("UPDATE_PROGRESSION", this._updataProgression, this);
this.hotUpdate.on("UPDATE_FAILED", this._onUpdateFailed, this);
this.hotUpdate.on("ERROR_NO_LOCAL_MANIFEST", this._onAlredyUpToDate, this);
this.hotUpdate.on("ERROR_DOWNLOAD_MANIFEST", this._onDownloadError, this);
this.hotUpdate.on("ERROR_PARSE_MANIFEST", this._onUpdateFailed, this);
this.hotUpdate.on("ERROR_DECOMPRESS", this._onUpdateFailed, this);
this.hotUpdate.on("ERROR_UPDATING", this._onUpdateFailed, this);
};
e.prototype._removeUpdateListener = function() {
this.hotUpdate.off("NEW_VERSION_FOUND", this._onNewVersionFound, this);
this.hotUpdate.off("ALREADY_UP_TO_DATE", this._onAlredyUpToDate, this);
this.hotUpdate.off("UPDATE_PROGRESSION", this._updataProgression, this);
this.hotUpdate.off("UPDATE_FAILED", this._onUpdateFailed, this);
this.hotUpdate.off("ERROR_NO_LOCAL_MANIFEST", this._onAlredyUpToDate, this);
this.hotUpdate.off("ERROR_DOWNLOAD_MANIFEST", this._onDownloadError, this);
this.hotUpdate.off("ERROR_PARSE_MANIFEST", this._onUpdateFailed, this);
this.hotUpdate.off("ERROR_DECOMPRESS", this._onUpdateFailed, this);
this.hotUpdate.off("ERROR_UPDATING", this._onUpdateFailed, this);
};
e.prototype._onNewVersionFound = function() {
console.log("开始执行更新");
this.node.active = !0;
this.hotUpdate.execUpdate();
};
e.prototype._onAlredyUpToDate = function() {
window.allreadyUpdate = !0;
console.log("当前已经是最新版本");
};
e.prototype._updataProgression = function(t) {
var e = t.progress;
if (e) {
var o = e.percent;
e.filePercent, e.downloadedFiles, e.totalFiles, e.downloadedBytes, e.totalBytes;
JSON.stringify(e + "-00-0-0-0--------");
this.progressBar.progress = o;
}
};
e.prototype._retry = function(t) {
if (t > 0) {
this.hotUpdate.retry();
return this._retry(t - 1);
}
this._onDownloadError();
};
e.prototype._onDownloadError = function(t) {
JSON.stringify(t + "-0-00-0_onDownloadError--0****");
};
e.prototype._onUpdateFailed = function() {
this._retry(3);
};
e.prototype.onLoad = function() {
if (window.allreadyUpdate) this.node.active = !1; else {
console.log("====-=--==--==1-");
this._init();
this.hotUpdate.checkUpdate();
}
};
e.prototype.onDestroy = function() {
if (cc.sys.isNative && this.hotUpdate) {
this._removeUpdateListener();
this.hotUpdate.destroy();
}
};
e.prototype.doUpdateProcess = function() {};
e.prototype.update = function(t) {};
e.prototype.start = function() {
this.setWxInfo();
};
e.prototype.setWxInfo = function() {
cuckoo.WxInterFace.setAppID(cuckoo.GAME.cfg.wxAppId);
};
e.prototype._progressCallback = function(t, e, o) {
var n = e / 2;
this.progress = t / n;
};
e.prototype._completeCallback = function(t, e) {
console.log("进入登陆场景" + cc.loader.getRes("video/part1/cocosvideo"));
cc.director.loadScene("Login");
};
e.prototype._updateProgressBar = function() {
this.progressBar.progress = this.progress;
};
i([ p({
type: cc.ProgressBar
}) ], e.prototype, "progressBar", void 0);
i([ p({
type: cc.Asset
}) ], e.prototype, "manifestUrl", void 0);
return e = i([ a ], e);
}(s.default);
o.default = u;
cc._RF.pop();
}, {
"./BaseNode": "BaseNode",
"./Update": "Update"
} ],
Login: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2880aCTUhlPuaWEmMxbitRY", "Login");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = t("./VideoUtil"), r = t("./Notice"), c = t("./BaseNode"), a = cc._decorator, p = a.ccclass, u = a.property, l = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.videoPrefab = null;
e.videoScript = null;
e.noticePrefab = null;
e.noticeScript = null;
e.bg = null;
e.touchText = null;
return e;
}
e.prototype.start = function() {
t.prototype.start.call(this, [ "guestLogin", "wxLogin", "autoLogin", "notice" ], this.onHttpEvent);
cc.director.loadScene("Game");
};
e.prototype.doRequestNotice = function() {
cuckoo.Net.httpPostHs("/affiche/v1", {}, {
postEventName: "notice",
postEventNode: this.node
});
};
e.prototype.onHttpEvent = function(t) {
var e = t.postEventName;
if (0 == t.errorCode) {
var o = cuckoo.PubUtil.string2Obj(t.retStr);
switch (e) {
case "wxLogin":
case "autoLogin":
case "guestLogin":
this.onLoginSuccess(o);
break;

case "notice":
this.onNoticeSuccess(o);

default:
console.log("event is not exit");
}
} else this.showToast("http数据接口访问出错,eventName为(" + e + ")", 5);
};
e.prototype.onNoticeSuccess = function(t) {
console.log("----1111----" + JSON.stringify(t));
};
e.prototype.onLoginSuccess = function(t) {
cuckoo.curUser.baseInfo.readFromJson(t);
var e = cuckoo.curUser.baseInfo.token;
e && (cuckoo.curUser.token = e);
cuckoo.PubUtil.setLocalDataJson("localUser", {
token: e
});
console.log("登陆返回数据" + JSON.stringify(t));
this.onGoGame();
};
e.prototype.onLoad = function() {
t.prototype.onLoad.call(this);
this.bg = cc.find("bg", this.node);
var e = cc.instantiate(this.videoPrefab);
e.parent = this.node;
var o = e.getComponent(s.default);
this.videoScript = o;
var n = cc.instantiate(this.noticePrefab);
n.parent = this.node;
this.noticeScript = n.getComponent(r.default);
this.touchText = cc.find("touch_text", this.node);
this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
};
e.prototype.onTouch = function() {
this.touchText.active && cc.director.loadScene("Game");
};
e.prototype.onWxClick = function() {
var t = this;
cuckoo.WxInterFace.wXLogin(function(e, o) {
if (0 == e) {
var n = {
code: o
};
console.log("微信登陆成功" + e + " code: " + o);
cuckoo.Net.httpPostHs("/weChatLogin/v1", n, {
postEventName: "wxLogin",
postEventNode: t.node
});
}
});
};
e.prototype.onYkClick = function() {
cuckoo.PubUtil.getLocalDataJson("localUser");
console.log("游客登陆！！");
cuckoo.Net.httpPostHs("/guestGenerateAndLogin/v1", {}, {
postEventName: "guestLogin",
postEventNode: this.node
});
};
e.prototype.onAutoLogin = function() {
console.log("自动登陆！！");
cuckoo.Net.httpPostHs("/guestGenerateAndLogin/v1", {}, {
postEventName: "autoLogin",
postEventNode: this.node
});
};
e.prototype.showPreLoadPanel = function(t) {
this.bg.opacity = t ? 255 : 0;
};
e.prototype.onGoGame = function() {
this.showPreLoadPanel(!1);
cc.director.loadScene("Game");
};
i([ u(cc.Prefab) ], e.prototype, "videoPrefab", void 0);
i([ u(cc.Prefab) ], e.prototype, "noticePrefab", void 0);
return e = i([ p ], e);
}(c.default);
o.default = l;
cc._RF.pop();
}, {
"./BaseNode": "BaseNode",
"./Notice": "Notice",
"./VideoUtil": "VideoUtil"
} ],
Notice: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "07ec3bWpCREcqa2g2k801tJ", "Notice");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = cc._decorator, r = s.ccclass, c = (s.property, function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.scrollView = null;
e.item = null;
return e;
}
e.prototype.onKnown = function() {
this.node.destroy();
};
e.prototype.showNotice = function() {
this.node.active = !0;
};
e.prototype.onLoad = function() {};
e.prototype.start = function() {};
return e = i([ r ], e);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
Record: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "f1288iQqNFAJbeq504IG+R/", "Record");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s, r, c, a, p, u = t("./BaseNode"), l = cc._decorator, h = l.ccclass;
l.property;
(function(t) {
t[t.RESCUE_BTN = 0] = "RESCUE_BTN";
t[t.POINTPRAISE_BTN = 1] = "POINTPRAISE_BTN";
t[t.TUCAO_BTN = 2] = "TUCAO_BTN";
})(s || (s = {}));
(function(t) {
t[t.PRAISE_DAY_BTN = 0] = "PRAISE_DAY_BTN";
t[t.PRAISE_WEEK_BTN = 1] = "PRAISE_WEEK_BTN";
t[t.PRAISE_TOTAL_BTN = 2] = "PRAISE_TOTAL_BTN";
})(r || (r = {}));
(function(t) {
t[t.Tucao_DAY_BTN = 3] = "Tucao_DAY_BTN";
t[t.Tucao_WEEK_BTN = 4] = "Tucao_WEEK_BTN";
t[t.Tucao_TOTAL_BTN = 5] = "Tucao_TOTAL_BTN";
})(c || (c = {}));
(function(t) {
t[t["点赞日榜"] = 0] = "点赞日榜";
t[t["点赞周榜"] = 1] = "点赞周榜";
t[t["点赞总榜"] = 2] = "点赞总榜";
})(a || (a = {}));
(function(t) {
t[t["吐槽日榜"] = 0] = "吐槽日榜";
t[t["吐槽周榜"] = 1] = "吐槽周榜";
t[t["吐槽总榜"] = 2] = "吐槽总榜";
})(p || (p = {}));
var f = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.lastTouchLeftBtn = null;
e.rescueListContent = null;
e.rescuePanel_Item = null;
e.spacing = 10;
e.panelList = [];
e.lastPanel = null;
e.lastPraiseTopBtn = null;
e.pointPraiseAndTucaoBtn_Texts = [];
e.pointPraiseAndTucaoTexts = [];
e.thumbAndTucaoContent = null;
e.thumbAndTucaoContentItem = null;
e.thumbNum = null;
e.thumbsListContent = null;
e.thumbsListContentItem = null;
e.curLeftPressType = s.RESCUE_BTN;
e.record_thumbs = null;
e.record_tucao = null;
return e;
}
e.prototype.onLoad = function() {
var t = cc.find("bg", this.node), e = cc.find("leftNode", t);
this.lastTouchLeftBtn = cc.find("rescueBtn", e);
var o = cc.find("rescuePanel", t);
this.lastPanel = o;
this.rescuePanel_Item = cc.find("rescuePanel_Item", o);
var n = cc.find("rescueList", o);
this.rescueListContent = cc.find("view/content", n);
var i = cc.find("thumbsPanel", t);
this.record_tucao = cc.find("role_rank/record_tucao", i);
this.record_thumbs = cc.find("role_rank/record_thumbs", i);
var s = cc.find("topNode", i);
this.lastPraiseTopBtn = s.getChildByName("praiseDayBtn");
this.panelList.push(o, i, i);
var r = cc.find("PraiseText", s).getComponent(cc.Label), c = cc.find("PraiseWeekText", s).getComponent(cc.Label), a = cc.find("PraiseTotalText", s).getComponent(cc.Label);
this.pointPraiseAndTucaoTexts.push(r, c, a);
var p = cc.find("praiseDayBtn", s), u = cc.find("praiseWeekBtn", s), l = cc.find("praiseTotalBtn", s), h = cc.find("Background/Label", p).getComponent(cc.Label), f = cc.find("Background/Label", u).getComponent(cc.Label), d = cc.find("Background/Label", l).getComponent(cc.Label);
this.pointPraiseAndTucaoBtn_Texts.push(h, f, d);
var _ = cc.find("thumb_r_top", i), y = cc.find("rankList", _);
this.thumbAndTucaoContent = cc.find("view/content", y);
this.thumbAndTucaoContentItem = cc.find("rankListItem", _);
this.thumbNum = cc.find("thumbNum", _).getComponent(cc.Label);
var g = cc.find("thumbsList", i);
this.thumbsListContent = cc.find("view/content", g);
this.thumbsListContentItem = cc.find("thumbList_Item", i);
};
e.prototype.start = function() {
this.refreshRescueList();
};
e.prototype.RescueList = function(t) {
this.checkShowLeftBtnHeightLight(t, s.RESCUE_BTN);
};
e.prototype.PointPraiseList = function(t) {
this.checkShowLeftBtnHeightLight(t, s.POINTPRAISE_BTN);
};
e.prototype.TucaoList = function(t) {
this.checkShowLeftBtnHeightLight(t, s.TUCAO_BTN);
};
e.prototype.checkShowLeftBtnHeightLight = function(t, e) {
this.lastTouchLeftBtn && t !== this.lastTouchLeftBtn && (this.lastTouchLeftBtn.opacity = 0);
this.lastPanel && this.lastPanel !== this.panelList[e] && (this.lastPanel.active = !1);
var o = this.panelList[e];
o.active = !0;
t.target.opacity = 255;
this.lastTouchLeftBtn = t.target;
this.lastPanel = o;
this.curLeftPressType = e;
var n = [ this.refreshRescueList.bind(this), this.refreshPointPraiseList.bind(this), this.refreshTucaoList.bind(this) ];
n[e] && n[e]();
};
e.prototype.switchPointPraiseAndTucao = function() {};
e.prototype.getRecordType = function() {
return this.curLeftPressType;
};
e.prototype.refreshRescueList = function() {
this.rescueListContent.height = 10 * (this.rescuePanel_Item.height + this.spacing) + this.spacing;
for (var t = 0; t < 10; t++) {
var e = cc.instantiate(this.rescuePanel_Item);
e.active = !0;
this.rescueListContent.addChild(e);
e.setPosition(-this.rescueListContent.width / 2, 0 - e.height * t - this.spacing * (t + 1));
}
};
e.prototype.refreshPointPraiseList = function() {
this.thumbNum.string = "点赞数";
this.record_thumbs.active = !0;
this.record_tucao.active = !1;
this.pointPraiseAndTucaoBtn_Texts.forEach(function(t, e, o) {
t.string = a[e];
});
this.pointPraiseAndTucaoTexts.forEach(function(t, e, o) {
t.string = a[e];
});
this.roleRankList(s.POINTPRAISE_BTN);
};
e.prototype.refreshTucaoList = function() {
this.thumbNum.string = "吐槽数";
this.record_thumbs.active = !1;
this.record_tucao.active = !0;
this.pointPraiseAndTucaoBtn_Texts.forEach(function(t, e, o) {
t.string = p[e];
});
this.pointPraiseAndTucaoTexts.forEach(function(t, e, o) {
t.string = p[e];
});
this.roleRankList(s.TUCAO_BTN);
};
e.prototype.PraiseDayList = function(t) {
this.curLeftPressType != s.RESCUE_BTN && this.checkPraiseTopBtnSelected(t, this.curLeftPressType == s.POINTPRAISE_BTN ? r.PRAISE_DAY_BTN : c.Tucao_DAY_BTN);
};
e.prototype.PraiseWeekList = function(t) {
this.curLeftPressType != s.RESCUE_BTN && this.checkPraiseTopBtnSelected(t, this.curLeftPressType == s.POINTPRAISE_BTN ? r.PRAISE_WEEK_BTN : c.Tucao_WEEK_BTN);
};
e.prototype.PraiseTotalList = function(t) {
this.curLeftPressType != s.RESCUE_BTN && this.checkPraiseTopBtnSelected(t, this.curLeftPressType == s.POINTPRAISE_BTN ? r.PRAISE_TOTAL_BTN : c.Tucao_TOTAL_BTN);
};
e.prototype.checkPraiseTopBtnSelected = function(t, e) {
var o = t.target;
this.lastPraiseTopBtn && this.lastPraiseTopBtn !== o && (this.lastPraiseTopBtn.opacity = 0);
o.opacity = 255;
this.lastPraiseTopBtn = o;
this.refreshThumbAndTucaoList(this.curLeftPressType, e);
};
e.prototype.refreshThumbAndTucaoList = function(t, e) {
console.log("当前大标签: " + t + " 小标签页: " + e + this.thumbAndTucaoContent);
this.thumbAndTucaoContent.removeAllChildren();
this.thumbAndTucaoContent.height = 10 * (this.thumbAndTucaoContentItem.height + this.spacing) + this.spacing;
for (var o = 0; o < 10; o++) {
var n = cc.instantiate(this.thumbAndTucaoContentItem);
n.active = !0;
this.thumbAndTucaoContent.addChild(n);
n.setPosition(-this.thumbAndTucaoContent.width / 2, 0 - n.height * o - this.spacing * (o + 1));
}
};
e.prototype.roleRankList = function(t) {
this.thumbsListContent.removeAllChildren();
this.thumbsListContent.height = 10 * (this.thumbsListContentItem.height + this.spacing) + this.spacing;
for (var e = 0; e < 10; e++) {
var o = cc.instantiate(this.thumbsListContentItem);
o.active = !0;
this.thumbsListContent.addChild(o);
o.setPosition(-this.thumbsListContent.width / 2, 0 - o.height * e - this.spacing * (e + 1));
}
};
e.prototype.onBack = function() {
this.node.active = !1;
};
return e = i([ h ], e);
}(u.default);
o.default = f;
cc._RF.pop();
}, {
"./BaseNode": "BaseNode"
} ],
Setting: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "6bd6c/m0bZEo7EqmbtN/+eJ", "Setting");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = cc._decorator, r = s.ccclass, c = (s.property, function(t) {
n(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {};
e.prototype.start = function() {};
e.prototype.onBack = function() {
this.node.active = !1;
};
e.prototype.onShare = function() {};
e.prototype.onLightSlider = function(t, e) {
var o = cc.find("silder_progress", t.node);
o && (o.width = t.progress * t.node.width);
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("com/cuckoo/game/BrightnessTools", "setCurWindowBrightness", "(I)V", 255 * t.progress) : (cc.sys.os, 
cc.sys.OS_IOS);
};
e.prototype.onMusicSlider = function(t, e) {
var o = cc.find("silder_progress", t.node);
o && (o.width = t.progress * t.node.width);
};
e.prototype.onMusicCheckBox = function(t) {
var e = t.isChecked, o = cc.find("Background", t.node);
o && (o.active = !e);
};
e.prototype.onSoundCheckBox = function(t) {
var e = t.isChecked, o = cc.find("Background", t.node);
o && (o.active = !e);
};
e.prototype.setMusicState = function() {};
e.prototype.setSoundState = function() {};
e.prototype.onLogOut = function() {};
return e = i([ r ], e);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
Update: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "ae52a+35XVCGalmspoMxynQ", "Update");
var n, i = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}();
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = function(t) {
i(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.manifestUrl = null;
e.stroagePath = "";
e.am = null;
e.updateListener = null;
e.updating = !1;
e.canRetry = !1;
return e;
}
Object.defineProperty(e, "instance", {
get: function() {
if (!cc.sys.isNative) throw new Error("Native only");
null == e._instance && (e._instance = new e());
return e._instance;
},
enumerable: !0,
configurable: !0
});
e.prototype.init = function(t, o) {
if (null == e.instance) throw new Error("not instance");
this._initAssetsManager(t, o);
};
e.prototype._initAssetsManager = function(t, e) {
this.stroagePath = e;
this.manifestUrl = t;
this.am = new jsb.AssetsManager(this.manifestUrl, e, this._versionCompareHandle);
this.am.setVerifyCallback(this._verifyCallback);
cc.sys.os == cc.sys.OS_ANDROID && this.am.setMaxConcurrentTask(3);
};
e.prototype._verifyCallback = function(t, e) {
e.compressed, e.md5, e.path, e.size;
return !0;
};
e.prototype._versionCompareHandle = function(t, e) {
for (var o = t.split("."), n = e.split("."), i = 0; i < o.length; ++i) {
var s = parseInt(o[i]), r = parseInt(n[i] || 0);
if (s != r) return s - r;
}
return n.length > o.length ? -1 : 0;
};
e.prototype.checkUpdate = function() {
if (this.updating) throw new Error("Checking or updating ...");
console.log("this.am.getState(): " + this.am.getState());
if (this.am.getState() == jsb.AssetsManager.State.UNINITED) {
var t = this.manifestUrl.nativeUrl;
cc.loader.md5Pipe && (t = cc.loader.md5Pipe.transformURL(t));
console.log("88877878877878" + t);
this.am.loadLocalManifest(t);
}
if (!this.am.getLocalManifest() || !this.am.getLocalManifest().isLoaded()) throw new Error("Failed to load local manifest ...");
this.am.setEventCallback(this._checkCb.bind(this));
this.am.checkUpdate();
this.updating = !0;
};
e.prototype._checkCb = function(t) {
var o = 0, n = t.getEventCode(), i = e.EventType[n], s = "";
console.log(n + "_checkCb====-==---=-=-");
switch (n) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
s = t.getMessage();
break;

case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
o = t.getTotalBytes();
break;

default:
return;
}
this.am.setEventCallback(null);
this.updating = !1;
i && this.emit(i, {
totalBytes: o,
msg: s
});
};
e.prototype.execUpdate = function() {
if (this.am && !this.updating) {
this.am.setEventCallback(this._updateCb.bind(this));
if (this.am.getState() == jsb.AssetsManager.State.UNINITED) {
var t = this.manifestUrl.nativeUrl;
cc.loader.md5Pipe && (t = cc.loader.md5Pipe.transformURL(t));
this.am.loadLocalManifest(t);
}
this.am.update();
this.updating = !0;
}
};
e.prototype._updateCb = function(t) {
var o = !1, n = !1, i = t.getEventCode(), s = t.getMessage(), r = e.EventType[i], c = {
progress: null,
msg: s
};
switch (i) {
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
n = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var a = {
percent: isNaN(t.getPercent()) ? 0 : t.getPercent(),
filePercent: t.getPercentByFile(),
downloadedFiles: t.getDownloadedFiles(),
totalFiles: t.getTotalFiles(),
downloadedBytes: t.getDownloadedBytes(),
totalBytes: t.getTotalBytes()
};
c.progress = a;
this.emit("UPDATE_PROGRESSION", c);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.updating = !1;
this.canRetry = !0;
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
cc.error("asset", t.getAssetId(), s);
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
}
r && this.emit(r, c);
if (n) {
this.am.setEventCallback(null);
this.updateListener = null;
this.updating = !1;
}
if (o) {
this.am.setEventCallback(null);
this.updateListener = null;
var p = jsb.fileUtils.getSearchPaths(), u = this.am.getLocalManifest().getSearchPaths();
Array.prototype.unshift.apply(p, u);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(p));
jsb.fileUtils.setSearchPaths(p);
cc.audioEngine.stopAll();
cc.game.restart();
}
};
e.prototype.retry = function() {
if (!this.updating && this.canRetry) {
this.canRetry = !1;
this.am.downloadFailedAssets();
}
};
e.prototype.clearCache = function() {
var t = this.stroagePath;
if (!t) throw new Error("storagePath not exist");
if (!jsb.fileUtils.isDirectoryExist(t)) {
throw new Error("path:--\x3e" + t + "not exist");
}
jsb.fileUtils.removeDirectory(t);
};
e.prototype.destroy = function() {
if (this.updateListener) {
this.am.setEventCallback(null);
this.updateListener = null;
}
};
e._instance = null;
e.EventType = cc.sys.isNative && ((n = {})[jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST] = "ERROR_NO_LOCAL_MANIFEST", 
n[jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST] = "ERROR_DOWNLOAD_MANIFEST", n[jsb.EventAssetsManager.ERROR_PARSE_MANIFEST] = "ERROR_PARSE_MANIFEST", 
n[jsb.EventAssetsManager.ALREADY_UP_TO_DATE] = "ALREADY_UP_TO_DATE", n[jsb.EventAssetsManager.NEW_VERSION_FOUND] = "NEW_VERSION_FOUND", 
n[jsb.EventAssetsManager.UPDATE_PROGRESSION] = "UPDATE_PROGRESSION", n[jsb.EventAssetsManager.UPDATE_FINISHED] = "UPDATE_FINISHED", 
n[jsb.EventAssetsManager.UPDATE_FAILED] = "UPDATE_FAILED", n[jsb.EventAssetsManager.UPDATE_NEEDRESTART] = "UPDATE_NEEDRESTART", 
n[jsb.EventAssetsManager.ERROR_UPDATING] = "ERROR_UPDATING", n[jsb.EventAssetsManager.ERROR_DECOMPRESS] = "ERROR_DECOMPRESS", 
n);
return e;
}(cc.EventTarget);
o.default = s;
cc._RF.pop();
}, {} ],
VideoSplitUtil: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c08433/nlRHS5GAtjSGp+Je", "VideoSplitUtil");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = cc._decorator, r = s.ccclass, c = (s.property, function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.videoPlayer_1 = null;
e.videoPlayer_2 = null;
return e;
}
e.prototype.start = function() {};
e.prototype.onLoad = function() {
cc.Camera.main.backgroundColor = cc.color(0, 0, 0, 0);
cc.macro.ENABLE_TRANSPARENT_CANVAS = !0;
var t = cc.find("video1", this.node), e = cc.find("video2", this.node);
if (!cc.sys.isNative) {
this.node.zIndex = 5;
var o = document.getElementsByClassName("gameCanvas")[0];
o.style.position = "relative";
o.style.zIndex = 10;
}
this.videoPlayer_1 = t.getComponent(cc.VideoPlayer);
this.videoPlayer_2 = e.getComponent(cc.VideoPlayer);
};
e.prototype.PlayVideo = function(t, e, o) {
this.node.active = !0;
this.videoPlayer_1.clip = cc.loader.getRes(t);
this.videoPlayer_2.clip = cc.loader.getRes(e);
console.log("视频1: " + this.videoPlayer_1.clip);
console.log("视频2: " + this.videoPlayer_2.clip);
this.videoPlayer_1.play();
this.videoPlayer_2.play();
};
return e = i([ r ], e);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
VideoUtil: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "73fc66lwpFK4IQAqbKU0pB/", "VideoUtil");
var n = this && this.__extends || function() {
var t = function(e, o) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
})(e, o);
};
return function(e, o) {
t(e, o);
function n() {
this.constructor = e;
}
e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), i = this && this.__decorate || function(t, e, o, n) {
var i, s = arguments.length, r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, o, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (r = (s < 3 ? i(r) : s > 3 ? i(e, o, r) : i(e, o)) || r);
return s > 3 && r && Object.defineProperty(e, o, r), r;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var s = cc._decorator, r = s.ccclass, c = s.property, a = function(t) {
n(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e._videoType = cc.VideoPlayer.ResourceType.LOCAL;
e.callback = null;
e.progressCallback = null;
e.video_object = null;
e.playState = !1;
return e;
}
Object.defineProperty(e.prototype, "videoType", {
get: function() {
return this._videoType;
},
set: function(t) {
this._videoType = t;
},
enumerable: !0,
configurable: !0
});
e.prototype.update = function(t) {
if (!this.playState && this.isPlayFinish() && this.callback && "function" == typeof this.callback) {
this.playState = !0;
this.callback(this.node);
}
};
e.prototype.isPlayFinish = function() {
var t = parseFloat(this.video_object.currentTime.toPrecision(3)), e = parseFloat(this.video_object.getDuration().toPrecision(3));
if (isNaN(t) || isNaN(e)) return !1;
if (e > 0 && t >= e) return !0;
this.progressCallback && "function" == typeof this.progressCallback && this.progressCallback(t, e);
return !1;
};
e.prototype.onLoad = function() {
cc.Camera.main.backgroundColor = cc.color(0, 0, 0, 0);
cc.macro.ENABLE_TRANSPARENT_CANVAS = !0;
if (!cc.sys.isNative) {
this.node.zIndex = 5;
var t = document.getElementsByClassName("gameCanvas")[0];
t.style.position = "relative";
t.style.zIndex = 10;
}
this.video_object = this.node.getComponent(cc.VideoPlayer);
this.callback = null;
this.playState = !1;
console.log("VideoPrefab init");
};
e.prototype.start = function() {};
e.prototype.play = function() {
this.video_object.play();
};
e.prototype.pause = function() {
this.video_object.pause();
};
e.prototype.stop = function() {
this.video_object.stop();
};
e.prototype.isPlaying = function() {
return this.video_object.isPlaying();
};
e.prototype.setVideoClip = function(t) {
var e = cc.loader.getRes(t);
this.video_object.clip = e;
};
e.prototype.playVideo = function(t, e, o) {
this.playState = !1;
this.node.active = !0;
this.progressCallback = e;
this.callback = o;
this.setVideoClip(t);
this.play();
};
e.prototype.playVideoBySplit = function(t, e, o) {
this.node.active = !0;
};
e.prototype.getVideoDuration = function() {
return this.video_object ? this.video_object.getDuration() : 0;
};
i([ c ], e.prototype, "_videoType", void 0);
i([ c ], e.prototype, "videoType", null);
return e = i([ r ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {} ]
}, {}, [ "AudioMng", "ButtonScale", "BaseNode", "Game", "Load", "Login", "Notice", "Record", "Setting", "Update", "VideoSplitUtil", "VideoUtil" ]);