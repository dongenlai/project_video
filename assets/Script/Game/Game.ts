import VideoUtil from "./VideoUtil";
import VideoSplitUtil from "./VideoSplitUtil";

const {ccclass, property} = cc._decorator;

//10个点临时写死 如果主线在相似范围就认为解锁
const controls = [
    {"pos":[1291, 1309], "des":"Y"},
    {"pos":[1163, 1182], "des":"N"},
    {"pos":[1020, 1044], "des":"A"},
    {"pos":[884, 908], "des":"Z"},
    {"pos":[748, 776], "des":"P"},
    {"pos":[614, 633], "des":"C"},
    {"pos":[480, 497], "des":"M"},
    {"pos":[342, 360], "des":"G"},
    {"pos":[195, 226], "des":"D"},
    {"pos":[71, 85], "des":"B"}
]

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    videoPrefab:cc.Prefab = null;

    @property(cc.Node)
    gameBg: cc.Node = null;

    @property(cc.Node)
    lockPanel: cc.Node = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    //失败界面 
    @property(cc.Node)
    failPanel:cc.Node = null;

    @property(cc.Node)
    SuccessPanel: cc.Node = null;

    //test
    @property(cc.Node)
    backBtn:cc.Node = null; 

    //test
    @property(cc.Prefab)
    split_video_obj:cc.Prefab = null;

    videoScript: VideoUtil = null;
    split_video_script: VideoSplitUtil = null;
    nexBtn: cc.Node = null;

    //触摸点击 
    @property(cc.Node)
    touchView: cc.Node = null;
    //点击起始点
    startPos:cc.Vec2 = null;
    beginPos:cc.Vec2 = null;

    //当前点击滑动对象
    curTouchCell:cc.Node = null;
    //下一个滑动节点
    nextTouchCell:cc.Node = null;
    moveState: number = null;  //{0:UP , 1: DOWN}

    //接过缓存 
    result:any = [];

    onLoad(){
        //视频组件相关
        let videoObject = cc.instantiate(this.videoPrefab);
        videoObject.parent = this.node;
        const videoScript = videoObject.getComponent(VideoUtil);
        this.videoScript = videoScript

        //分屏节点 
        let split_video_obj = cc.instantiate(this.split_video_obj);
        split_video_obj.parent = this.node;

        split_video_obj.x = -757/2;
        split_video_obj.y = -1386/2

        this.split_video_script = split_video_obj.getComponent(VideoSplitUtil);
        this.nexBtn = cc.find("nextBtn", this.node);
        //触摸移动
        this.node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            if(!this.lockPanel.active){
               return;
            }
            let touchPos = this.touchView.parent.convertTouchToNodeSpaceAR(event.touch);
            var viewBound = this.touchView.getBoundingBox();
            //判断当前点在锁视图内
            if (cc.rect(viewBound).contains(touchPos)){
                //判断当前点是处在那个滑动容器页面内部
                for(var i = 1, len = 4; i <= len; ++ i){
                    const curCell = this.touchView.getChildByName("content_" + i);
                    const nextCell = this.touchView.getChildByName("content_" + i + "_1");
                    const cellBound = curCell.getBoundingBox();
                    if (cc.rect(cellBound).contains(touchPos) || cc.rect(nextCell.getBoundingBox()).contains(touchPos)){
                        this.curTouchCell = curCell;
                        this.nextTouchCell = nextCell;

                        //代表当前是第几个cell滑动 
                        this.curTouchCell.curIdx = i;
                        this.nextTouchCell.curIdx = i;

                        break;
                    }
                }
               this.startPos = touchPos;
            }
            // this.beginPos = touchPos;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event: cc.Event.EventTouch) {
            if(!this.lockPanel.active){
                return;
            }
            let moveTouchPos = this.touchView.parent.convertTouchToNodeSpaceAR(event.touch);
            if (this.startPos && this.curTouchCell){
                let distance = this.startPos.sub(moveTouchPos).mag();
                //向上滑动
                if (moveTouchPos.y - this.startPos.y > 0){
                   this.moveState = 0;
                   this.curTouchCell.y += distance;
                   this.nextTouchCell.y += distance;
                   if (this.curTouchCell.y >= 153){
                      this.curTouchCell.y = this.nextTouchCell.y - 1386 + 20;
                   }
                   if (this.nextTouchCell.y >= 153){
                       this.nextTouchCell.y = this.curTouchCell.y - 1386 + 20;
                   }
                }
                //向下滑动
                if (moveTouchPos.y - this.startPos.y < 0){
                    this.moveState = 1;
                    this.curTouchCell.y -= distance;
                    this.nextTouchCell.y -= distance;
                    if (this.curTouchCell.y <= -1578){
                        this.curTouchCell.y = this.nextTouchCell.y + 1386 - 20;
                    }
                    if (this.nextTouchCell.y <= -1578){
                       this.nextTouchCell.y = this.curTouchCell.y + 1386 - 20;
                    }
                }
               this.startPos = moveTouchPos
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event.EventTouch) {
            //判断两个点点距离
            // let endTouchPos = this.touchView.parent.convertTouchToNodeSpaceAR(event.touch);
            // let distance = this.beginPos.sub(endTouchPos).mag()
            // if (distance <= 70){
            //     console.log("距离不合适往回移动" + "this.moveState= " + this.moveState + " this.lastDis= " + distance);
            //     if (this.moveState == 0){
            //         this.curTouchCell.y -= distance;
            //         this.nextTouchCell.y -= distance;
            //     }else if(this.moveState == 1){
            //         this.curTouchCell.y += distance;
            //         this.nextTouchCell.y += distance;
            //     }
            // }

            if(!this.lockPanel.active){
                return;
             }
            this.result[this.curTouchCell.curIdx - 1] = null;
            this.result[this.nextTouchCell.curIdx - 1] = null;

            const result = this.touchView.parent.getChildByName("result").getComponent(cc.Label);
            result.string = "";
            //接过缓存做最后校验
            for(let i = 0,len = controls.length; i < len; ++i){
                const data = controls[i];
                const pos = data.pos;
                if (  Math.abs(this.curTouchCell.y) <= pos[1] && Math.abs(this.curTouchCell.y) >= pos[0]){
                    this.result[this.curTouchCell.curIdx - 1] = data.des;
                }
                if( Math.abs(this.nextTouchCell.y) <= pos[1] && Math.abs(this.nextTouchCell.y) >= pos[0]) {
                    this.result[this.nextTouchCell.curIdx - 1] = data.des;
                }
            }
            for (let k = 0, len = this.result.length; k < len; ++k){
                if (k == 0){
                  result.string = result.string + this.result[k];
                }else
                  result.string = result.string + "," + this.result[k];
            }
        }, this);
    }

    public onChapterChoice(target, customEventData):void{
        const tag = parseInt(customEventData);
        switch(tag){
            case 1:
                this.playVideo("video/part1/H5START", 1);
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                cc.log("超出范围");
                break;
        }
    }

    private playVideo(path: string, chapterID:number):void{
        this.gameBg.active = false;
        this.nexBtn.active = true;
        this.videoScript.playVideo(path, function(curTime, totalTime){
        }.bind(this), function(videoObj){
            if (cc.isValid(videoObj)) {}
            this.onNext();
        }.bind(this))
    }

    //验证开锁结果
    isSuccess(){
        if(this.result[0] && this.result[1] && this.result[2] && this.result[3]){
            if(this.result[0] === this.result[1] && this.result[0] === this.result[2] && this.result[0] === this.result[3]){
               return true;
            }
        }
        return false;
    }

    showResult(){
        const isSuccess = this.isSuccess();
        this.lockPanel.active = false;
        const self = this;
        console.log("isSuccess = " + isSuccess);
        this.videoScript.playVideo(isSuccess ? "video/part1/UnLockS_ucess" : "video/part1/UnLock_Fail", null, function(videoObj){
            if (cc.isValid(videoObj)) {
                videoObj.active = false;
            }
            //失败
            if(!isSuccess){
                self.failPanel.active = true;
            }else{
                self.SuccessPanel.active = true
            }    
        })
    }

    //test
    onBack(){
        cc.director.loadScene("Game");
    }

    //test
    onSplitVideo(){
        this.gameBg.active = false;
        this.SuccessPanel.active = false;
        this.backBtn.active = true;
        this.split_video_script.PlayVideo("video/part1/Start", "video/part1/Start1") 
    }

    onTryAgain(){
        this.failPanel.active = false;
        this.onNext();
    }

    //点击跳过 
    onNext(){
        this.lockPanel.active = true;
        this.nexBtn.active = false;
        const self = this;

        this.videoScript.playVideo("video/part1/unlocking", function(curTime, totalTime){
            var sub = curTime/totalTime;
            self.progressBar.progress = 1 - sub;  
        }, function(videoObj){
            if (cc.isValid(videoObj)) {}
            self.showResult();
        })
    }

    onTouchStartCallback() :void{
        this.gameBg.active = false
    }
}
