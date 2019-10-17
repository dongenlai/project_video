namespace cuckoo {
     class UserInfo{
        public nickName: string = "";
        public playerId: number = 0;
        public sex: number = -1;
        public retStr: any = {};
        public state:number = -1;
        public type:number = -1;
        public faceUrl:string = "";
        public score:number = 0;
        public experience:number = 0;
        public level:number = 0;
        public ip:string = "";
        public gpsAddr:string = "";
        public token:string = "";
        constructor() {}

        readFromJson(data:any){
            const result = data.result;
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
        }
    }
     
    export const curUser = {
        baseInfo: new UserInfo(),
        token: "",
        access_token: "",
    }
}