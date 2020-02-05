const {ccclass, property} = cc._decorator;

@ccclass
export default class ChapterLayer extends cc.Component {
    chapterContent:cc.Node = null;
    chapterContentItem:cc.Node = null;
    gap:number = 10;

    onLoad () {
        this.chapterContent = cc.find("scrollView/view/content", this.node);
        this.chapterContentItem = cc.find("itemBtn", this.node);
    }

    start () {
        this.addItem()
    }

    public onBack(){
        this.node.active = false;
    }

    private addItem(){
        let gap = this.gap;
        let startPosx = this.chapterContentItem.width/2

        this.chapterContent.width = 10 * (this.chapterContentItem.width + gap) + gap; 
        for(let a = 0,len = 10; a < len; ++a){
            let item = cc.instantiate(this.chapterContentItem);
            item.x = startPosx + (this.chapterContentItem.width + gap) * a;
            item.y = 0;
            this.chapterContent.addChild(item);
        }
    }
}
