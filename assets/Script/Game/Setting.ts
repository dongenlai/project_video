const {ccclass, property} = cc._decorator;

@ccclass
export default class Setting extends cc.Component {
    onLoad () {
    }
    
    start () {

    }

    public onBack():void{
        this.node.active = false;
    }

    public onShare():void{

    }

    public onLightSlider(sender:cc.Slider, eventType:number):void{
        const silder_progress = cc.find("silder_progress", sender.node);
        if (silder_progress) 
            silder_progress.width = sender.progress * sender.node.width;

        cuckoo.NativeInterFace.setWindowBrightness(sender.progress );
    }

    public onMusicSlider(sender:cc.Slider, eventType:number):void{
        const silder_progress = cc.find("silder_progress", sender.node);
        if (silder_progress) 
            silder_progress.width = sender.progress * sender.node.width;
    }

    public onMusicCheckBox(toggle:cc.Toggle):void{
        const isSelect = toggle.isChecked;
        const Background = cc.find("Background", toggle.node);
        if (Background) 
           if(!isSelect)
              Background.active = true;
           else 
              Background.active = false;
    }

    public onSoundCheckBox(toggle:cc.Toggle):void{
        const isSelect = toggle.isChecked;
        const Background = cc.find("Background", toggle.node);
        if (Background) 
           if(!isSelect)
              Background.active = true;
           else 
              Background.active = false;
    }

    private setMusicState():void{

    }

    private setSoundState():void{

    }

    public onLogOut():void{

    }
  
}
