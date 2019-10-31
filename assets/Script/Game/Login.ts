import VideoUtil from "./VideoUtil";
import Notice from "./Notice";
import BaseNode from "./BaseNode";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends BaseNode {
    //视频组件
    @property(cc.Prefab)
    videoPrefab:cc.Prefab = null;
    videoScript: VideoUtil = null;
    //公告组件
    @property(cc.Prefab)
    noticePrefab:cc.Prefab = null;
    noticeScript: Notice = null;

    //背景
    bg: cc.Node = null;

    touchText: cc.Node = null;

    start () {
        //调用基类start
        super.start(["guestLogin", "wxLogin", "autoLogin", "notice"], this.onHttpEvent);
        // this.doRequestNotice();
    }

    private doRequestNotice():void{
        // this.noticeScript.showNotice();
        cuckoo.Net.httpPostHs("/affiche/v1", {}, {postEventName:"notice", postEventNode:this.node});
    }

    onHttpEvent(data:any){
        const eventName = data.postEventName;
        const errorCode = data.errorCode;
        if (errorCode != 0) {
            this.showToast("http数据接口访问出错" + "(" + eventName + ")", 2);
            return;
        }
        const retStr = cuckoo.PubUtil.string2Obj(data.retStr);
        switch(eventName){
            case "wxLogin":
                this.onLoginSuccess(retStr);
                break;
            case "autoLogin":
                this.onLoginSuccess(retStr);
                break
            case "guestLogin":
                this.onLoginSuccess(retStr);
                break
            case "notice":
                this.onNoticeSuccess(retStr);    
            default:
                console.log("event is not exit");
                break    
        }
    }

    private onNoticeSuccess(json:any):void{
        console.log("----1111----" + JSON.stringify(json));
    }

    private onLoginSuccess(json:any):void{
        cuckoo.curUser.baseInfo.readFromJson(json);
        const token = cuckoo.curUser.baseInfo.token;
        //缓存token信息
        if (token) 
            cuckoo.curUser.token = token;
        cuckoo.PubUtil.setLocalDataJson("localUser", { "token": token} );
        //登陆成功
        console.log("登陆返回数据" + JSON.stringify(json));
        this.onGoGame();
    }

    onLoad(){
        super.onLoad();
        this.bg = cc.find("bg", this.node); 
        //视频组件相关
        let videoObject = cc.instantiate(this.videoPrefab);
        videoObject.parent = this.node;
        const videoScript = videoObject.getComponent(VideoUtil)
        this.videoScript = videoScript

        //公告组件相关
        let noticePrefab = cc.instantiate(this.noticePrefab);
        noticePrefab.parent = this.node;
        this.noticeScript = noticePrefab.getComponent(Notice);

        //点击任意位置继续
        this.touchText = cc.find("touch_text", this.node); 
        //注册全局监听 
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    }

    onTouch(){
       if (this.touchText.active){
          cc.director.loadScene("Game");
       }
    }

    private onWxClick():void{
        cuckoo.WxInterFace.wXLogin(function(retCode, code){
            if (retCode == 0) {
                const data = { code:code };
                console.log("微信登陆成功"+ retCode + " code: " + code);
                cuckoo.Net.httpPostHs("/weChatLogin/v1", data, {postEventName:"wxLogin", postEventNode:this.node});
            }else if(retCode == 1) {
            }else{
            }
        })
    }

    private onYkClick():void{
        // const _locaData = cuckoo.PubUtil.getLocalDataJson("localUser");
        // if (_locaData.token) {
        //     cuckoo.curUser.token = _locaData.token;
        //     this.onAutoLogin();
        // } else {
           console.log("游客登陆！！")
           cuckoo.Net.httpPostHs("/guestGenerateAndLogin/v1", {}, {postEventName:"guestLogin", postEventNode:this.node});
        // }
    }

    protected onAutoLogin():void{
        console.log("自动登陆！！")
        cuckoo.Net.httpPostHs("/guestGenerateAndLogin/v1", {}, {postEventName:"autoLogin", postEventNode:this.node});
    }

    showPreLoadPanel(state:boolean):void{
        this.bg.opacity = state ? 255 : 0;
    }

    onGoGame(){
        this.showPreLoadPanel(false);
        this.videoScript.playVideo("video/part1/Start", null, function(videoObj){
            if (cc.isValid(videoObj)) {}
            console.log("视频播放完成！！！！！！！");
            this.touchText.active = true;
            this.touchText.runAction(cc.blink(1.5, 1).repeatForever());
        }.bind(this))
    }
}
