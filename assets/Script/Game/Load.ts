const {ccclass, property} = cc._decorator;

@ccclass
export default class Load extends cc.Component {
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
    }

    private _progressCallback(completeCount, totalCount, res) {
        const total = totalCount/2;
        this.progress = completeCount/total;
    }

    private _completeCallback(err, texture){
        console.log("进入登陆场景" + cc.loader.getRes("video/part1/AllPass"));
        cc.director.loadScene("Login");
    }

    private _updateProgressBar(){
        this.progressBar.progress = this.progress;
    }
}
