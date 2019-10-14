import VideoUtil from "./VideoUtil";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component {
    @property(cc.Prefab)
    videoPrefab:cc.Prefab = null;

    videoScript: VideoUtil = null;
    touchText: cc.Node = null;
    bg: cc.Node = null;
    preLoadGameBg: cc.Node = null;

    start () {
    }

    onLoad(){
        this.bg = cc.find("bg", this.node); 
        this.preLoadGameBg = cc.find("bg/preLoadGameBg", this.node);
        const startLabel = cc.find("bg/preLoadGameBg/startLabel", this.node);
        //点击任意位置继续
        this.touchText = cc.find("touch_text", this.node); 
        //开始游戏按钮 
        startLabel.on(cc.Node.EventType.TOUCH_END, this.onGoGame, this);
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

    onWxClick(){
        this.showPreLoadPanel(true)
    }

    onYkClick(){
        this.showPreLoadPanel(true)
    }

    showPreLoadPanel(state:boolean):void{
        this.preLoadGameBg.active = state
        this.bg.opacity = state ? 255 : 0;
    }

    onGoGame(){
        this.showPreLoadPanel(false);
        console.log(this.videoScript + "---00--00-")
        this.videoScript.playVideo("video/part1/Start", null, function(videoObj){
            if (cc.isValid(videoObj)) {}
            console.log("视频播放完成！！！！！！！");
            this.touchText.active = true;
            this.touchText.runAction(cc.blink(1.5, 1).repeatForever());
        }.bind(this))
    }
}
