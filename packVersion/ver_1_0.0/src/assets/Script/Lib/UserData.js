var cuckoo;

(function(e) {
var t = function() {
function e() {
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
e.prototype.readFromJson = function(e) {
var t = e.result;
this.nickName = t.nickName;
this.playerId = t.playerId;
this.sex = t.sex;
this.state = t.state;
this.type = t.type;
this.faceUrl = t.faceUrl;
this.score = t.score;
this.experience = t.experience;
this.level = t.level;
this.ip = t.ip;
this.gpsAddr = t.gpsAddr;
this.token = t.token;
};
return e;
}();
e.curUser = {
baseInfo: new t(),
token: "",
access_token: ""
};
})(cuckoo || (cuckoo = {}));