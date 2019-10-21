var cuckoo;
(function (cuckoo) {
    cuckoo.GAME = {
        cfg: {
            //本地存储版本号
            localStorageVersion: "1.0",
            //!!暂时写到这里 不安全
            //微信appid
            wxAppId: "wx28cfba0b0d0f7cb9",
            //微信appscript
            appSecret: "a224ffffe619eaadc388596ba54bfe1c"
        },
        //游戏地址{外网, 内网}
        urlHs: "http://10.168.1.191:9083/api",
        //运行状态{debug: true or false} 
        mode: false
    };
})(cuckoo || (cuckoo = {}));
