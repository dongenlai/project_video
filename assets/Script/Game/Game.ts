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
       const leftNode = cc.find("leftNode", this.node);
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

    //章节入口
    public onChapter():void{
        this.showToast("章节功能敬请期待！", 5);
    }

    //解锁章节
    public onLockedChapter():void{
        this.showToast("解锁章节章节功能敬请期待！", 5);
        
        cc.find("bg", this.node).active = false
        var test_video = cc.find("test_video", this.node);
        var video = test_video.getComponent(cc.VideoPlayer);
        test_video.getComponent(VideoUtil).playVideo(video.clip);
    }

    //立即行动
    public onAction():void{
        // this.showToast("立即行动功能敬请期待！", 5);
        cuckoo.Net.httpPostHs("/preOrder/v1", {"goodsId":1, "channel":1 }, {postEventName:"doOrderPre", postEventNode:this.node});
    }

    //战绩入口
    public onRecord():void{
        this.recordLayer.active = true;
    }

    start () {
       super.start(["doOrderPre", "doOrder_Wx", "doOrder_AliPay"], this.onHttpEvent);
       this.init();
    }

    //HttpEvent
    onHttpEvent(data:any){
        const eventName = data.postEventName;
        const errorCode = data.errorCode;

        const retStr = cuckoo.PubUtil.string2Obj(data.retStr);
        if (errorCode != 0) {
            this.showToast("http数据接口访问出错,eventName为" + "(" + eventName + ")", 5);
            return;
        }

        if (retStr.code && retStr.code != 10000){
            this.showToast(retStr.message, 5);
            return;
        }

        switch(eventName){
            case "doOrderPre":
                this.doOrderPre_Success(retStr);
                break;
            case "doOrder_Wx":
                this.doOrder_Wx_Success(retStr);
                break;
            case "doOrder_AliPay":
                this.doOrder_AliPay_Success(retStr);
                break;
            default:
                console.log("event is not exit");
                break    
        }
    }

    private doOrderPre_Success(msgTbl):void{
        console.log("预下单成功" + JSON.stringify(msgTbl));

        var result = msgTbl.result
        var data = {"orderId":result.orderId, "channel":result.channel, "token":cuckoo.curUser.token}
        cuckoo.Net.httpPostHs("/pay/v1",data , {postEventName:"doOrder_AliPay", postEventNode:this.node});
    }

    private doOrder_Wx_Success(msgTbl):void{
        console.log("微信预下单成功" + JSON.stringify(msgTbl));
    }

    private doOrder_AliPay_Success(msgTbl):void{
        console.log("支付宝预下单成功" + JSON.stringify(msgTbl));
        const resCode = msgTbl.result || ""
        // cuckoo.WxInterFace.doOrder(resCode);
        cuckoo.AlipayInterface.doOrder(resCode);
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
