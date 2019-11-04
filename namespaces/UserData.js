var cuckoo;
(function (cuckoo) {
    var UserInfo = /** @class */ (function () {
        function UserInfo() {
            this.nickName = "";
            this.playerId = 0;
            this.sex = -1;
            this.retStr = {};
            this.state = -1;
            this.type = -1;
            this.faceUrl = "";
            this.score = 0;
            this.experience = 0;
            this.level = 0;
            this.ip = "";
            this.gpsAddr = "";
            this.token = "";
        }
        UserInfo.prototype.readFromJson = function (data) {
            var result = data.result;
            this.nickName = result.nickName;
            this.playerId = result.playerId;
            this.sex = result.sex;
            this.state = result.state;
            this.type = result.type;
            this.faceUrl = result.faceUrl;
            this.score = result.score;
            this.experience = result.experience;
            this.level = result.level;
            this.ip = result.ip;
            this.gpsAddr = result.gpsAddr;
            this.token = result.token;
        };
        return UserInfo;
    }());
    cuckoo.curUser = {
        baseInfo: new UserInfo(),
        token: "",
        access_token: ""
    };
})(cuckoo || (cuckoo = {}));
