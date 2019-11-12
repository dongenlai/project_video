import BaseNode from "./BaseNode";
import Update from "./Update"

const {ccclass, property} = cc._decorator;
//资源预加载

@ccclass
export default class Load extends BaseNode {
    @property({type:cc.ProgressBar})
      private progressBar: cc.ProgressBar = null;
    @property({ type: cc.Asset }) 
      private manifestUrl: cc.Asset = null
    //进度条进度
    private progress:number = 0;
    private hotUpdate: Update = null;
    private storagePath = null

    //初始化热更新 
    private _init() {
        this.storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "remote-asset";
        this.hotUpdate = Update.instance;
        this.hotUpdate.init(this.manifestUrl, this.storagePath);
        this._addUpdateListener();
    }
    
    //初始化时间监听
    private _addUpdateListener() {
        this.hotUpdate.on("NEW_VERSION_FOUND", this._onNewVersionFound, this);
        this.hotUpdate.on("ALREADY_UP_TO_DATE", this._onAlredyUpToDate, this);
        this.hotUpdate.on("UPDATE_PROGRESSION", this._updataProgression, this);
        this.hotUpdate.on("UPDATE_FAILED", this._onUpdateFailed, this);
        this.hotUpdate.on("ERROR_NO_LOCAL_MANIFEST", this._onAlredyUpToDate, this);
        this.hotUpdate.on("ERROR_DOWNLOAD_MANIFEST", this._onDownloadError, this);
        this.hotUpdate.on("ERROR_PARSE_MANIFEST", this._onUpdateFailed, this);
        this.hotUpdate.on("ERROR_DECOMPRESS", this._onUpdateFailed, this);
        this.hotUpdate.on("ERROR_UPDATING", this._onUpdateFailed, this);
    }

    //移除事件监听
    private _removeUpdateListener() {
        this.hotUpdate.off("NEW_VERSION_FOUND", this._onNewVersionFound, this);
        this.hotUpdate.off("ALREADY_UP_TO_DATE", this._onAlredyUpToDate, this);
        this.hotUpdate.off("UPDATE_PROGRESSION", this._updataProgression, this);
        this.hotUpdate.off("UPDATE_FAILED", this._onUpdateFailed, this);
        this.hotUpdate.off("ERROR_NO_LOCAL_MANIFEST", this._onAlredyUpToDate, this);
        this.hotUpdate.off("ERROR_DOWNLOAD_MANIFEST", this._onDownloadError, this);
        this.hotUpdate.off("ERROR_PARSE_MANIFEST", this._onUpdateFailed, this);
        this.hotUpdate.off("ERROR_DECOMPRESS", this._onUpdateFailed, this);
        this.hotUpdate.off("ERROR_UPDATING", this._onUpdateFailed, this);
    }

    //发现新版本开始执行更新
    private _onNewVersionFound() {
        console.log("开始执行更新");
        this.node.active = true
        this.hotUpdate.execUpdate()
    }

    //当前已经是最新版本
    private _onAlredyUpToDate() {
        //@ts-ignore
        window.allreadyUpdate = true;
        console.log("当前已经是最新版本");
        this._completeCallback();
    }

    //更新数据同步进度
    private _updataProgression(data) {
        const progressData = data.progress
        if (progressData) {
            const { percent, filePercent, downloadedFiles, totalFiles, downloadedBytes, totalBytes } = progressData
        // cc.error("-----progressDataprogressDataprogressData-----", JSON.stringify(progressData))
        // this.pb.progress = percent
            JSON.stringify(progressData + "更新数据返回");
            this.progressBar.progress = percent;
        }
    }

    private _retry(count: number) {
        if (count > 0) {
            this.hotUpdate.retry()
            return this._retry(count - 1)
        }
        this._onDownloadError()
    }

    private _onDownloadError(event?) {
        JSON.stringify(event + "下载失败")
    }

    private _onUpdateFailed() {
        this._retry(3)
    }

    onLoad () {
        //@ts-ignore
        if (!window.allreadyUpdate) {
            if (cc.sys.isNative) {
                this._init()
                this.hotUpdate.checkUpdate()
            } else {
                this._onAlredyUpToDate()
            }
        } else {
            this.node.active = false
        }

        //现在热跟新流程
        // this.doUpdateProcess();
        // 加载视频资源
        // cc.loader.loadRes("json/video_try_play", (err, jsonAsset)=>{
        //     const json = jsonAsset.json || {}
        //     cc.loader.loadResDir("video/part1/", this._progressCallback.bind(this), this._completeCallback.bind(this));
        // });
    }

    onDestroy() {
        if (cc.sys.isNative) {
          if (this.hotUpdate) {
            this._removeUpdateListener()
            this.hotUpdate.destroy()
          }
        }
      }

    doUpdateProcess():void{
        // const updateScript = Update.  instance();
        // const _instance = new Update()
    }

    update (dt) {
        // this._updateProgressBar()
    }

    start () {
        this.setWxInfo();
    }

    //设置微信相关信息
    private setWxInfo():void{
        cuckoo.WxInterFace.setAppID(cuckoo.GAME.cfg.wxAppId);
    }

    private _progressCallback(completeCount, totalCount, res) {
        const total = totalCount/2;
        this.progress = completeCount/total;
    }

    private _completeCallback(err?, texture?){
        cc.director.loadScene("Login"); 
    }   

    private _updateProgressBar(){
        this.progressBar.progress = this.progress;
    }
}

