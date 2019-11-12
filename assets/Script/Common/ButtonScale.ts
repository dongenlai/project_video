const {ccclass, property} = cc._decorator;

/**
 * 按钮缩放组件
 */

@ccclass
export default class ButtonScale extends cc.Component {
    @property
    pressedScale:number = 1;   //按压缩放

    @property
    transDuration:number = 0;  //持续时间

    initScale:number = 0;
    button:cc.Button = null;
    scaleDownAction:cc.Action = null;
    scaleUpAction:cc.Action = null;

    onLoad () {
        var self = this;
        var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng')
        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng');
        }
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        
        function onTouchDown (event) {
            this.stopAllActions();
            // if (audioMng) audioMng.playButton();
            this.runAction(self.scaleDownAction);
        }

        function onTouchUp (event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
}
