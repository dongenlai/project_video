//播放视频
const {ccclass, property} = cc._decorator;

@ccclass
export default class VideoUtil extends cc.Component {
    @property
    _videoType = cc.VideoPlayer.ResourceType.LOCAL;
    @property
    get videoType () {
        return this._videoType;
    }
    set videoType (type) {
        this._videoType = type;
    }

    callback : Function = null;
    progressCallback: Function = null; //进度条回调
    video_object:cc.VideoPlayer = null;
    playState:boolean = false;         //{true: 代表当时播放状态是完成， false： 原始状态}
    
    protected update(dt) {
        //如果节点处在激活状态的时候
        if ( !this.playState ){
            if ( this.isPlayFinish() ) {
                //如果播放完毕回调函数
                if (this.callback && typeof this.callback == "function"){
                    this.playState = true;
                    this.callback(this.node)
                }
            }
        }
    }

    private isPlayFinish(): boolean{
        const curPlayTime = parseFloat(this.video_object.currentTime.toPrecision(3));
        const totalTime = parseFloat( this.video_object.getDuration().toPrecision(3));
        
        if (isNaN(curPlayTime) || isNaN(totalTime)){
            return false;
        }
        if (totalTime > 0 && curPlayTime >= totalTime ) {
            return true;
        }
        if (this.progressCallback && typeof this.progressCallback == "function"){
            this.progressCallback(curPlayTime, totalTime);
        }
        return false; 
    }

    protected onLoad(){
        cc.Camera.main.backgroundColor = cc.color(0, 0, 0, 0);
        cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
        if( !cc.sys.isNative){
            this.node.zIndex = 5;
            // let gCanvas = document.getElementsByClassName('gameCanvas')[0];
            // gCanvas.style.position = 'relative';
            // gCanvas.style.zIndex = 10;
        }
        this.video_object = this.node.getComponent(cc.VideoPlayer);
        this.callback = null;
        this.playState = false;
        console.log("VideoPrefab init");
    }

    protected start () {
        //cc.log("播放视频组件");
    }

    play () {
        this.video_object.play();
    }

    pause () {
        this.video_object.pause();
    }

    stop () {
        this.video_object.stop();
    }

    isPlaying(){
        return this.video_object.isPlaying();
    }

    private setVideoClip( path:string ):void{
        const videoStr = cc.loader.getRes(path); 
        this.video_object.clip = videoStr; 
    }

    public playVideo(path: string, progressCallback?:Function , callback?:Function): void{
        this.playState = false;
        this.node.active = true;

        this.progressCallback = progressCallback;
        this.callback = callback;
        this.setVideoClip(path);
        this.play(); 
    }
   
    //分屏播放视频
    public playVideoBySplit(path1:string, path2:string, type:number){
        this.node.active = true;
    }

    private getVideoDuration():number{
        if (this.video_object) {
           return this.video_object.getDuration();
        }
        return 0;
    }
}
