var cuckoo;
(function (cuckoo) {
    var HttpUserData = /** @class */ (function () {
        function HttpUserData(postEventName, errorCode, errorMsg, retStr) {
            this.postEventName = "";
            this.postEventName = postEventName;
            this.errorCode = errorCode;
            this.errorMsg = errorMsg;
            this.retStr = retStr;
        }
        return HttpUserData;
    }());
    var Net = /** @class */ (function () {
        function Net() {
        }
        Net.httpGet = function (url, cb) {
            var xhr = new XMLHttpRequest();
            ['abort', 'error', 'timeout'].forEach(function (eventname) {
                xhr["on" + eventname] = function () {
                    cb(1, eventname);
                };
            });
            // Special event
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    var httpStatus = xhr.statusText;
                    var response = xhr.responseText;
                    cb(0, httpStatus, response);
                }
            };
            // 10 seconds for timeout
            xhr.timeout = 10 * 1000;
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            xhr.send();
        };
        /*
          eventInfo {
              postEventName
              postEventNode
          }
        */
        Net.httpPost = function (url, header, timeOut, postData, eventInfo) {
            var xhr = new XMLHttpRequest();
            // Simple events 'loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'
            ['abort', 'error', 'timeout'].forEach(function (eventname) {
                xhr["on" + eventname] = function () {
                    console.log("Http::eventname: " + eventname);
                    Net.postEvent(eventInfo, 1, eventname, "");
                };
            });
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    var httpStatus = xhr.statusText;
                    var response = xhr.responseText;
                    // var setCookie = xhr.getResponseHeader("Set-Cookie");
                    // if(setCookie){
                    //     var sliceIndex = setCookie.indexOf(";");
                    //     setCookie = setCookie.substring(sliceIndex,0);
                    //     Net.httpCookie = setCookie;
                    // }
                    Net.postEvent(eventInfo, 0, httpStatus, response);
                }
            };
            // 10 seconds for timeout
            xhr.timeout = timeOut;
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // xhr.setRequestHeader("Cookie", Net.httpCookie);
            for (var name in header) {
                xhr.setRequestHeader(name, header[name]);
            }
            // win下不支持send object
            if (postData.constructor === String)
                xhr.send(postData);
            else {
                var sendData = "";
                for (var name in postData) {
                    if (sendData.length === 0)
                        sendData += cc.js.formatStr("%s=%s", name, encodeURIComponent(postData[name]));
                    else
                        sendData += cc.js.formatStr("&%s=%s", name, encodeURIComponent(postData[name]));
                }
                xhr.send(sendData);
            }
        };
        Net.httpPostHs = function (subUrl, postData, postEventInfo) {
            var header = {
                "appKey": "wechatDefaultLoginConf",
                "Authorization": "Bearer " + cuckoo.curUser.token
            };
            Net.httpPost(cuckoo.GAME.urlHs + subUrl, header, 10 * 1000, postData, postEventInfo);
        };
        Net.postEvent = function (eventInfo, xErrorCode, xErrorMsg, xRetStr) {
            var postEventNode = eventInfo.postEventNode;
            var postEventName = eventInfo.postEventName;
            if (!postEventNode || !cc.isValid(postEventNode)) {
                console.log("http event node is valid");
                return;
            }
            var event = new cc.Event.EventCustom(postEventName, true);
            var userData = new HttpUserData(postEventName, xErrorCode, xErrorMsg, xRetStr);
            event.setUserData(userData);
            postEventNode.dispatchEvent(event);
        };
        //cookie 缓存
        Net.httpCookie = "";
        return Net;
    }());
    cuckoo.Net = Net;
})(cuckoo || (cuckoo = {}));
