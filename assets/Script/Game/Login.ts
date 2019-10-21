import VideoUtil from "./VideoUtil";
import BaseNode from "./BaseNode";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends BaseNode {
    @property(cc.Prefab)
    videoPrefab:cc.Prefab = null;

    videoScript: VideoUtil = null;
    touchText: cc.Node = null;
    bg: cc.Node = null;

    start () {
        //调用基类start
        super.start(["guestLogin", "wxLogin", "autoLogin"], this.onHttpEvent);
    }

    onHttpEvent(data:any){
        const eventName = data.postEventName;
        const errorCode = data.errorCode;
        if (errorCode != 0) {
            this.showToast("登陆失败", 1);
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
            default:
                console.log("event is not exit");
                break    
        }
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
        //点击任意位置继续
        this.touchText = cc.find("touch_text", this.node); 
        //开始游戏按钮 
        // startLabel.on(cc.Node.EventType.TOUCH_END, this.onGoGame, this);
        //视频组件相关
        let videoObject = cc.instantiate(this.videoPrefab);
        videoObject.parent = this.node;
        const videoScript = videoObject.getComponent(VideoUtil)
        this.videoScript = videoScript
        //注册全局监听 
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    }

    onTouch(){
       if (this.touchText.active){
          cc.director.loadScene("Game");
       }
    }

    private onWxClick():void{
        cuckoo.WxInterFace.wXLogin(function(){
           cuckoo.Net.httpPostHs("/weChatLogin/v1", {}, {postEventName:"wxLogin", postEventNode:this.node});
        })
    }

    private onYkClick():void{
        const _locaData = cuckoo.PubUtil.getLocalDataJson("localUser");
        if (_locaData.token) {
            cuckoo.curUser.token = _locaData.token;
            this.onAutoLogin();
        } else {
           console.log("游客登陆！！")
           cuckoo.Net.httpPostHs("/guestGenerateAndLogin/v1", {}, {postEventName:"guestLogin", postEventNode:this.node});
        }
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
