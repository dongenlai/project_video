const {ccclass, property} = cc._decorator;

@ccclass
export default class VideoSplitUtil extends cc.Component {
    // onLoad () {}
    // update (dt) {}

    videoPlayer_1: cc.VideoPlayer = null;
    videoPlayer_2: cc.VideoPlayer = null;

    start () {
    }

    onLoad(){
        cc.Camera.main.backgroundColor = cc.color(0, 0, 0, 0);
        cc.macro.ENABLE_TRANSPARENT_CANVAS = true;

        const video_1 = cc.find("video1", this.node);
        const video_2 = cc.find("video2", this.node);

        if( !cc.sys.isNative){
            this.node.zIndex = 5;
            let gCanvas = document.getElementsByClassName('gameCanvas')[0];
            gCanvas.style.position = 'relative';
            gCanvas.style.zIndex = 10;
        }

        this.videoPlayer_1 = video_1.getComponent(cc.VideoPlayer);
        this.videoPlayer_2 = video_2.getComponent(cc.VideoPlayer);
    }

    public PlayVideo(path1:string, path2:string, type?:number){
        this.node.active = true;

        this.videoPlayer_1.clip = cc.loader.getRes(path1);
        this.videoPlayer_2.clip = cc.loader.getRes(path2);
        console.log("视频1: "+ this.videoPlayer_1.clip);
        console.log("视频2: "+ this.videoPlayer_2.clip);

        this.videoPlayer_1.play();
        this.videoPlayer_2.play();
    }

}
