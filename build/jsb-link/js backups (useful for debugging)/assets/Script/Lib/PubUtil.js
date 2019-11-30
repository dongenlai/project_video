var cuckoo;

(function(e) {
e.PubUtil = {
captureScreen: function(e, t) {
var r = new cc.Node();
r.parent = e;
r.width = e.getContentSize().width;
r.height = e.getContentSize().height;
var n = r.addComponent(cc.Camera), o = new cc.RenderTexture();
o.initWithSize(r.width, r.height);
n.targetTexture = o;
e.scaleY = -1;
n.render(r.parent);
e.scaleY = 1;
var i = o.readPixels(), c = o.width, a = o.height, s = t;
jsb.fileUtils.isFileExist(s) && jsb.fileUtils.removeFile(s);
console.log("截图保存路径:" + s);
jsb.saveImageData(i, c, a, s);
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
console.error(cc.js.formatStr("exception name=%s, msg=%s class=%s line=%d", e.name, e.message, e.fileName, e.lineNumber));
return {};
}
},
setLocalDataJson: function(t, r) {
r || (r = {});
r.version = e.GAME.cfg.localStorageVersion;
cc.sys.localStorage.setItem(r.version + t, this.obj2String(r));
},
getLocalDataJson: function(t) {
var r = cc.sys.localStorage.getItem(e.GAME.cfg.localStorageVersion + t);
if (!r) return {};
var n = this.string2Obj(r);
if (n.version !== e.GAME.cfg.localStorageVersion) {
console.log("getLocalDataJson version changed");
return {};
}
return n;
}
};
})(cuckoo || (cuckoo = {}));