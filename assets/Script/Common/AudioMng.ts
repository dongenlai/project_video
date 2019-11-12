const {ccclass, property} = cc._decorator;
/*
   音乐/音效组件
*/
@ccclass
export default class AudioMng extends cc.Component {
    //背景音乐
    @property(cc.AudioClip)
    bgm:cc.AudioClip = null;

    //音效
    @property(cc.AudioClip)
    buttonAudio:cc.AudioClip = null;

    onLoad () {

    }

    start () {

    }

    public playMusic():void{
        cc.audioEngine.playMusic(this.bgm, true );
    }

    public pauseMusic():void{
        cc.audioEngine.pauseMusic();
    }

    public resumeMusic():void{
        cc.audioEngine.resumeMusic();
    }

    private _playSFX(clip:cc.AudioClip):void{
        cc.audioEngine.playEffect(clip, false );
    }

    public playButton():void{
        this._playSFX(this.buttonAudio);
    }
}
