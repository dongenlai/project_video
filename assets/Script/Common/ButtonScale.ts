const {ccclass, property} = cc._decorator;

/**
 * 按钮缩放组件
 */

@ccclass
export default class ButtonScale extends cc.Component {
    @property
    pressedScale:number = 0.95;   //按压缩放
    @property
    transDuration:number = 0.1;  //持续时间

    onLoad () {
        var self = this;

        //按钮上面挂在音效脚本todo
        var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng');

        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng');
        }

        const initScale = this.node.scale;
        const scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        const scaleUpAction = cc.scaleTo(self.transDuration, initScale);
        
        function onTouchDown (event) {
            this.stopAllActions();
            // if (audioMng) audioMng.playButton();
            this.runAction(scaleDownAction);
        }

        function onTouchUp (event) {
            this.stopAllActions();
            this.runAction(scaleUpAction);
        }

        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
}
