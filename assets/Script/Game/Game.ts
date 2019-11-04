import VideoUtil from "./VideoUtil";
import VideoSplitUtil from "./VideoSplitUtil";
import BaseNode from "./BaseNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends BaseNode {
    //设置层
    @property(cc.Prefab)
    settingPrefab:cc.Prefab = null;
    settingLayer:cc.Node = null;
    //战绩层
    @property(cc.Prefab)
    recordPrefab:cc.Prefab = null;
    recordLayer:cc.Node = null;
    //玩家名字节点
    userName:cc.Label = null;
    rescue_progress:cc.ProgressBar = null;
    rescue_label:cc.Label = null;

    onLoad(){
       //设置预制节点 
       let settingPrefab = cc.instantiate(this.settingPrefab);
       settingPrefab.parent = this.node;
       this.settingLayer = settingPrefab;
       //战绩预制节点
       let recordPrefab = cc.instantiate(this.recordPrefab);
       recordPrefab.parent = this.node;
       this.recordLayer = recordPrefab;
       //大厅背景
       const gameBg = cc.find("bg", this.node);
       const leftNode = cc.find("leftNode", gameBg);
       //玩家用户名字
       this.userName = cc.find("userName", leftNode).getComponent(cc.Label);
       //营救进度条
       const hall_rescue_bg = cc.find("hall_rescue_bg", leftNode);
       this.rescue_progress = cc.find("rescue_progress", hall_rescue_bg).getComponent(cc.ProgressBar);
       this.rescue_label = cc.find("rescue_text", hall_rescue_bg).getComponent(cc.Label);
    }

    public onStory():void{
        this.showToast("故事线功能敬请期待！", 5);
    }

    public onChapter():void{
        this.showToast("章节功能敬请期待！", 5);
    }

    public onLockedChapter():void{
        this.showToast("解锁章节章节功能敬请期待！", 5);
    }

    //战绩入口
    public onRecord():void{
        this.recordLayer.active = true;
    }

    start () {
       this.init();
    }

    //用户信息入口 
    public onUserInput():void{
        this.settingLayer.active = true;
    }

    private init():void{
        this.initUserInfo();
    }

    private initUserInfo():void{
        this.userName.string = cuckoo.curUser.baseInfo.nickName;
        this.rescue_progress.progress = 100;
        this.rescue_label.string = "营救进度:"+"100%"
    }

}
