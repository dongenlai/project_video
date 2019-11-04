var cuckoo;
(function (cuckoo) {
    cuckoo.PubUtil = {
        /*
          通用弹框提示
        */
        createToast: function (node, str, callback) {
            var prefab = cc.instantiate(this.videoPrefab);
            prefab.parent = node;
        },
        /**
        * serialize json object to string.
        * @param {Object} json
        * @returns {String}
        */
        obj2String: function (json) {
            try {
                return JSON.stringify(json);
            }
            catch (e) {
                console.log("obj2String error");
                return "";
            }
        },
        /**
         * parse string to json object.
         * @param {String} strData
         * @returns {Object}
         */
        string2Obj: function (strData) {
            try {
                return JSON.parse(strData);
            }
            catch (e) {
                console.error(cc.js.formatStr("exception name=%s, msg=%s class=%s line=%d", e.name, e.message, e.fileName, e.lineNumber));
                return {};
            }
        },
        /*
          @param key {本地存储关键字}
          @param json {本地存储内容}
        */
        setLocalDataJson: function (key, json) {
            if (!json)
                json = {};
            json["version"] = cuckoo.GAME.cfg.localStorageVersion;
            cc.sys.localStorage.setItem(json["version"] + key, this.obj2String(json));
        },
        getLocalDataJson: function (key) {
            var data = cc.sys.localStorage.getItem(cuckoo.GAME.cfg.localStorageVersion + key);
            if (!data)
                return {};
            var json = this.string2Obj(data);
            if (json["version"] !== cuckoo.GAME.cfg.localStorageVersion) {
                console.log("getLocalDataJson version changed");
                return {};
            }
            return json;
        }
    };
})(cuckoo || (cuckoo = {}));
