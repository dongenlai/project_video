var cuckoo;
(function (cuckoo) {
    var EventListener = /** @class */ (function () {
        /*
          @param target 监听节点
          @param events 监听目标数组
          @param callBack 回调函数
        */
        function EventListener(target, callBack) {
            this.events = [];
            this.callFunc = null;
            this.target = null;
            this.target = target;
            this.callFunc = callBack;
        }
        EventListener.prototype.throwError = function () {
            console.error("Local Event is Error Please Check Node is isValid or events is null");
        };
        EventListener.prototype.registerLocalListener = function (eventNames) {
            var _this = this;
            if (!this.target || !cc.isValid(this.target)) {
                return this.throwError();
            }
            if (this.events && this.events.length > 0)
                this.events.forEach(function (value, index, array) {
                    _this.target.on(value, function (event) {
                        var jsondata = event.getUserData();
                        if (this.callFunc)
                            this.callFunc(jsondata);
                    }.bind(_this));
                });
        };
        EventListener.prototype.unRegisterLocalListener = function () {
        };
        EventListener.prototype.getLocalListenerByName = function () {
        };
        EventListener.prototype.removeLocalListenerByName = function () {
        };
        return EventListener;
    }());
    cuckoo.EventListener = EventListener;
})(cuckoo || (cuckoo = {}));
