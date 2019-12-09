var cuckoo;

(function(e) {
e.PubUtil = {
captureScreen: function(e, o) {
var t = new cc.Node();
t.parent = e;
t.width = e.getContentSize().width;
t.height = e.getContentSize().height;
var r = t.addComponent(cc.Camera), n = new cc.RenderTexture();
n.initWithSize(t.width, t.height);
r.targetTexture = n;
e.scaleY = -1;
r.render(t.parent);
e.scaleY = 1;
var c = n.readPixels(), a = n.width, i = n.height, s = o;
jsb.fileUtils.isFileExist(s) && jsb.fileUtils.removeFile(s);
console.log("截图保存路径:" + s);
jsb.saveImageData(c, a, i, s);
},
obj2String: function(e) {
try {
return JSON.stringify(e);
} catch (e) {
console.log("obj2String error");
return "";
}
},
string2Obj: function(e) {
try {
return JSON.parse(e);
} catch (e) {
console.error(cc.js.formatStr("PubUtil-> exception name=%s, msg=%s class=%s line=%d", e.name, e.message, e.fileName, e.lineNumber));
return {};
}
},
setLocalDataJson: function(o, t) {
t || (t = {});
t.version = e.GAME.cfg.localStorageVersion;
cc.sys.localStorage.setItem(t.version + o, this.obj2String(t));
},
getLocalDataJson: function(o) {
var t = e.GAME.cfg.localStorageVersion + o;
console.log("get local json key: " + t);
var r = cc.sys.localStorage.getItem(t);
if (!r) return {};
var n = this.string2Obj(r);
if (n.version !== e.GAME.cfg.localStorageVersion) {
console.log("getLocalDataJson version changed");
return {};
}
return n;
},
removeItemInLocalDataJson: function(o) {
if (o) {
var t = e.GAME.cfg.localStorageVersion + o;
console.log("delete local json key: " + t);
cc.sys.localStorage.removeItem(t);
}
},
clearLocalDataJson: function() {
cc.sys.localStorage.clear();
}
};
})(cuckoo || (cuckoo = {}));