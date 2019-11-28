var cuckoo;

(function(t) {
var e = function() {
function t(t, e) {
this.events = [];
this.callFunc = null;
this.target = null;
this.target = t;
this.callFunc = e;
}
t.prototype.throwError = function() {
console.error("Local Event is Error Please Check Node is isValid or events is null");
};
t.prototype.registerLocalListener = function(t) {
var e = this;
if (!this.target || !cc.isValid(this.target)) return this.throwError();
this.events && this.events.length > 0 && this.events.forEach(function(t, n, o) {
e.target.on(t, function(t) {
var e = t.getUserData();
this.callFunc && this.callFunc(e);
}.bind(e));
});
};
t.prototype.unRegisterLocalListener = function() {};
t.prototype.getLocalListenerByName = function() {};
t.prototype.removeLocalListenerByName = function() {};
return t;
}();
t.EventListener = e;
})(cuckoo || (cuckoo = {}));