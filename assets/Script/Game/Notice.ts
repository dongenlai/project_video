const {ccclass, property} = cc._decorator;

@ccclass
export default class Notice extends cc.Component {
    protected scrollView:cc.ScrollView = null;
    protected item:cc.Label = null;

    private onKnown():void{
        this.node.destroy();
    }

    public showNotice():void{
        this.node.active = true;
    }

    onLoad () {

    }

    start () {

    }
}
