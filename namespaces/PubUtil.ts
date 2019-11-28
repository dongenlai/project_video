namespace cuckoo {
    export const PubUtil = {	
        /*
          截屏传入当前父节点,和存放路径
        */
       captureScreen: function (parent: cc.Node, filePath: string) {
            //注意，EditBox，VideoPlayer，Webview 等控件无法被包含在截图里面
            if(CC_JSB) {
                let node = new cc.Node();
                node.parent = parent;
                node.width = parent.getContentSize().width;
                node.height = parent.getContentSize().height;
                let camera = node.addComponent(cc.Camera);
                
                let texture = new cc.RenderTexture();
                texture.initWithSize(node.width, node.height);
                camera.targetTexture = texture;

                // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
                parent.scaleY = -1;
                camera.render(node.parent);
                parent.scaleY = 1;

                // 这样我们就能从 RenderTexture 中获取到数据了
                let data = texture.readPixels();
                let width = texture.width;
                let height = texture.height;
                
                let fullPath = filePath;
                if (jsb.fileUtils.isFileExist(fullPath)) {
                    jsb.fileUtils.removeFile(fullPath);
                }
                console.log("截图保存路径:" + fullPath);
                jsb.saveImageData(data, width, height, fullPath);
            }else{
                //todo
            }
        },

         /**
         * serialize json object to string.
         * @param {Object} json
         * @returns {String}
         */
        obj2String: function (json) {
            try {
                return JSON.stringify(json);
            } catch (e) {
                console.log("obj2String error");
                return "";
            }
        },

        /**
         * parse string to json object.
         * @param {String} strData
         * @returns {Object}
         */
        string2Obj: function (strData:any):any {
            try {
                return JSON.parse(strData);
            } catch (e) {
                console.error(cc.js.formatStr("exception name=%s, msg=%s class=%s line=%d", e.name, e.message, e.fileName, e.lineNumber));
                return {};
            }
        },
        
        /*
          @param key {本地存储关键字}
          @param json {本地存储内容}
        */
        setLocalDataJson:function(key:any, json:any){
            if (!json)
               json = {};

            json["version"] = cuckoo.GAME.cfg.localStorageVersion;   
            cc.sys.localStorage.setItem(json["version"] + key, this.obj2String(json));
        },

        getLocalDataJson:function(key:any):any{
            const data = cc.sys.localStorage.getItem(cuckoo.GAME.cfg.localStorageVersion + key);
            if (!data)
                return {};

            var json = this.string2Obj(data);
            if (json["version"] !== cuckoo.GAME.cfg.localStorageVersion) {
                console.log("getLocalDataJson version changed");
                return {};
            }
            return json;
        },
    }
}