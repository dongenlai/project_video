var cuckoo;

(function(o) {
o.PubUtil = {
createToast: function(o, t, e) {
cc.instantiate(this.videoPrefab).parent = o;
},
obj2String: function(o) {
try {
return JSON.stringify(o);
} catch (o) {
console.log("obj2String error");
return "";
}
},
string2Obj: function(o) {
try {
return JSON.parse(o);
} catch (o) {
console.error(cc.js.formatStr("exception name=%s, msg=%s class=%s line=%d", o.name, o.message, o.fileName, o.lineNumber));
return {};
}
},
setLocalDataJson: function(t, e) {
e || (e = {});
e.version = o.GAME.cfg.localStorageVersion;
cc.sys.localStorage.setItem(e.version + t, this.obj2String(e));
},
getLocalDataJson: function(t) {
var e = cc.sys.localStorage.getItem(o.GAME.cfg.localStorageVersion + t);
if (!e) return {};
var r = this.string2Obj(e);
if (r.version !== o.GAME.cfg.localStorageVersion) {
console.log("getLocalDataJson version changed");
return {};
}
return r;
}
};
})(cuckoo || (cuckoo = {}));