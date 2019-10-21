import BaseNode from "./BaseNode";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Load extends BaseNode {
    @property({
        type:cc.ProgressBar
    })
    progressBar: cc.ProgressBar 
    //进度条进度
    private progress:number = 0;
    onLoad () {
        //加载视频资源
        cc.loader.loadRes("json/video_try_play", (err, jsonAsset)=>{
            const json = jsonAsset.json || {}
            cc.loader.loadResDir("video/part1/", this._progressCallback.bind(this), this._completeCallback.bind(this));
        });
    }

    update (dt) {
        this._updateProgressBar()
    }

    start () {
        this.setWxInfo();
    }

    //设置微信相关信息
    private setWxInfo():void{
        cuckoo.WxInterFace.setAppID(cuckoo.GAME.cfg.wxAppId);
        cuckoo.WxInterFace.sendAuthRequest();
    }

    private _progressCallback(completeCount, totalCount, res) {
        const total = totalCount/2;
        this.progress = completeCount/total;
    }

    private _completeCallback(err, texture){
        console.log("进入登陆场景" + cc.loader.getRes("video/part1/cocosvideo"));
        cc.director.loadScene("Login"); 
    }   

    private _updateProgressBar(){
        this.progressBar.progress = this.progress;
    }
}
