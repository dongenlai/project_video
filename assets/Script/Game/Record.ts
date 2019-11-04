import BaseNode from "./BaseNode";
const {ccclass, property} = cc._decorator;

enum LeftBtnType{
    RESCUE_BTN = 0,      //营救榜
    POINTPRAISE_BTN,     //点赞榜
    TUCAO_BTN            //吐槽榜
}

//点赞榜
enum PraiseTopBtnType{
    PRAISE_DAY_BTN = 0, //点赞日榜
    PRAISE_WEEK_BTN,    //点赞周榜
    PRAISE_TOTAL_BTN    //点赞日榜
}

//吐槽榜
enum TucaoBtnType{
    Tucao_DAY_BTN = 3, //吐槽日榜
    Tucao_WEEK_BTN,    //吐槽周榜
    Tucao_TOTAL_BTN    //吐槽日榜
}

enum PraiseDes{
    "点赞日榜",
    "点赞周榜",
    "点赞总榜"
}

enum TucaoDes{
    "吐槽日榜",
    "吐槽周榜",
    "吐槽总榜"
}

@ccclass
export default class Record extends BaseNode {
    //左侧区域记录当前点击的按钮对象 
    lastTouchLeftBtn:cc.Node = null;
    rescueListContent:cc.Node = null;
    rescuePanel_Item:cc.Node = null;
    //滑动列表之间的空格
    spacing:number = 10;
    panelList:cc.Node[] = []; //营救榜 奖励榜 吐槽榜

    //上一个Panel
    lastPanel:cc.Node = null;
    //点赞榜(点赞日榜、 点赞周榜、 点赞总榜切换)
    lastPraiseTopBtn:cc.Node = null;

    //(点赞日榜、 点赞周榜、 点赞总榜文本) 点赞榜和吐槽榜切换时候状态改变
    pointPraiseAndTucaoBtn_Texts:cc.Label[] = [];
    pointPraiseAndTucaoTexts:cc.Label[] = [];

    //(点赞日榜、 点赞周榜、 点赞总榜)切换滑动容器
    thumbAndTucaoContent:cc.Node = null;
    thumbAndTucaoContentItem:cc.Node = null;
    thumbNum:cc.Label = null;

    //点赞/吐槽角色排名
    thumbsListContent:cc.Node = null;
    thumbsListContentItem:cc.Node = null;

    //{0:营救榜  1:点赞榜  2:吐槽榜}
    curLeftPressType:number = LeftBtnType.RESCUE_BTN;   
    record_thumbs:cc.Node = null;
    record_tucao:cc.Node = null;

    onLoad () {
        const bg = cc.find("bg", this.node);
        //左侧竖排按钮区域
        const leftNode = cc.find("leftNode", bg);
        this.lastTouchLeftBtn = cc.find("rescueBtn", leftNode);
        //营救榜Panel
        const rescuePanel = cc.find("rescuePanel", bg);
        this.lastPanel = rescuePanel;
        //营救榜item
        this.rescuePanel_Item = cc.find("rescuePanel_Item", rescuePanel);
        const rescueList = cc.find("rescueList", rescuePanel);
        this.rescueListContent = cc.find("view/content", rescueList);
        //点赞榜Panel 
        const thumbsPanel = cc.find("thumbsPanel", bg);

        this.record_tucao = cc.find("role_rank/record_tucao", thumbsPanel);
        this.record_thumbs = cc.find("role_rank/record_thumbs", thumbsPanel);
        console.log(this.record_thumbs, "=--=-=-==--=-=-==-=")

        const topNode = cc.find("topNode", thumbsPanel)

        this.lastPraiseTopBtn = topNode.getChildByName("praiseDayBtn");
        //战绩panelList
        this.panelList.push(rescuePanel, thumbsPanel, thumbsPanel);

        //点赞日榜、 点赞周榜、 点赞总榜上面的 底部 Label 
        const praiseDayText =  cc.find("PraiseText", topNode).getComponent(cc.Label);
        const praiseWeekText =  cc.find("PraiseWeekText", topNode).getComponent(cc.Label);
        const praiseTotalText =  cc.find("PraiseTotalText", topNode).getComponent(cc.Label);
        this.pointPraiseAndTucaoTexts.push(praiseDayText, praiseWeekText, praiseTotalText);

        //点赞日榜、 点赞周榜、 点赞总榜上面的Label 
        const praiseDayBtn = cc.find("praiseDayBtn", topNode);
        const praiseWeekBtn = cc.find("praiseWeekBtn", topNode);
        const praiseTotalBtn = cc.find("praiseTotalBtn", topNode);
        const praiseDayBtn_Text = cc.find("Background/Label", praiseDayBtn).getComponent(cc.Label);
        const praiseWeekBtn_Text = cc.find("Background/Label", praiseWeekBtn).getComponent(cc.Label);;
        const praiseTotalBtn_Text = cc.find("Background/Label", praiseTotalBtn).getComponent(cc.Label);;
        this.pointPraiseAndTucaoBtn_Texts.push(praiseDayBtn_Text, praiseWeekBtn_Text, praiseTotalBtn_Text);


        //点赞/吐槽（日榜、周榜、总榜切换列表）
        const thumb_r_top =  cc.find("thumb_r_top", thumbsPanel);
        const rankList = cc.find("rankList", thumb_r_top);
        this.thumbAndTucaoContent = cc.find("view/content", rankList);
        this.thumbAndTucaoContentItem = cc.find("rankListItem", thumb_r_top);

        this.thumbNum = cc.find("thumbNum", thumb_r_top).getComponent(cc.Label);   

        const thumbsList = cc.find("thumbsList", thumbsPanel);
        this.thumbsListContent = cc.find("view/content", thumbsList);
        this.thumbsListContentItem = cc.find("thumbList_Item", thumbsPanel);
    }

    start(){
        this.refreshRescueList();
    }
    
    //营救榜
    public RescueList(sender):void{
        this.checkShowLeftBtnHeightLight(sender, LeftBtnType.RESCUE_BTN);
    }

    //点赞榜
    public PointPraiseList(sender):void{
        this.checkShowLeftBtnHeightLight(sender, LeftBtnType.POINTPRAISE_BTN);
    }

    //吐槽榜
    public TucaoList(sender):void{
        this.checkShowLeftBtnHeightLight(sender, LeftBtnType.TUCAO_BTN);
    }

    //设置左侧按钮列表高亮状态
    private checkShowLeftBtnHeightLight(sender, type:number):void{
        if (this.lastTouchLeftBtn && sender !== this.lastTouchLeftBtn){
            this.lastTouchLeftBtn.opacity = 0;
        }
        if (this.lastPanel && this.lastPanel !== this.panelList[type]){
            this.lastPanel.active = false;
        }
        const curPanel = this.panelList[type];
        curPanel.active = true
        sender.target.opacity = 255;

        //设定最后一次点击对象 
        this.lastTouchLeftBtn = sender.target;
        this.lastPanel = curPanel;

        //当前状态是 营救榜、 点赞榜、 吐槽榜
        this.curLeftPressType = type;   

        //刷新数据
        const refreshTypes = [
            this.refreshRescueList.bind(this),
            this.refreshPointPraiseList.bind(this),
            this.refreshTucaoList.bind(this)
        ];

        if (refreshTypes[type])
            refreshTypes[type]();
    }

    //切换点赞榜和吐槽榜
    private switchPointPraiseAndTucao():void{

    }

    //返回当前状态
    private getRecordType():number{
        return this.curLeftPressType
    }

    //营救列表刷新
    private refreshRescueList():void{
        this.rescueListContent.height = 10 * (this.rescuePanel_Item.height + this.spacing) + this.spacing; 
        for(let i = 0;i < 10; i ++){
            const Item = cc.instantiate(this.rescuePanel_Item);
            Item.active = true;
            this.rescueListContent.addChild(Item);
            Item.setPosition(-this.rescueListContent.width/2, 0 - Item.height * i - this.spacing * (i + 1));
        }
    }

    //点赞榜列表刷新
    private refreshPointPraiseList():void{
        this.thumbNum.string = "点赞数";
        this.record_thumbs.active = true;
        this.record_tucao.active = false;


        this.pointPraiseAndTucaoBtn_Texts.forEach((target:cc.Label, index: number, array:[]) => {
            target.string = PraiseDes[index];
        }); 
        this.pointPraiseAndTucaoTexts.forEach((target:cc.Label, index: number, array:[]) => {
            target.string = PraiseDes[index];
        }); 
        this.roleRankList(LeftBtnType.POINTPRAISE_BTN);
    }

    //吐槽榜列表刷新
    private refreshTucaoList():void{
        this.thumbNum.string = "吐槽数";
        this.record_thumbs.active = false;
        this.record_tucao.active = true;
        this.pointPraiseAndTucaoBtn_Texts.forEach((target:cc.Label, index: number, array:[]) => {
            target.string = TucaoDes[index];
        }); 
        this.pointPraiseAndTucaoTexts.forEach((target:cc.Label, index: number, array:[]) => {
            target.string = TucaoDes[index];
        });
        this.roleRankList(LeftBtnType.TUCAO_BTN);
    }

    //点赞/吐槽日榜
    public PraiseDayList(sender):void{
        //当前状态不在营救榜标签下
        if(this.curLeftPressType != LeftBtnType.RESCUE_BTN){
           this.checkPraiseTopBtnSelected(sender, this.curLeftPressType == LeftBtnType.POINTPRAISE_BTN ? PraiseTopBtnType.PRAISE_DAY_BTN : TucaoBtnType.Tucao_DAY_BTN);
        }
    }

    //点赞/吐槽周榜
    public PraiseWeekList(sender):void{
        //当前状态不在营救榜标签下
        if(this.curLeftPressType != LeftBtnType.RESCUE_BTN){
            this.checkPraiseTopBtnSelected(sender, this.curLeftPressType == LeftBtnType.POINTPRAISE_BTN ? PraiseTopBtnType.PRAISE_WEEK_BTN : TucaoBtnType.Tucao_WEEK_BTN);
        }
    }

    //点赞/吐槽总榜
    public PraiseTotalList(sender):void{
        //当前状态不在营救榜标签下
        if(this.curLeftPressType != LeftBtnType.RESCUE_BTN){
            this.checkPraiseTopBtnSelected(sender, this.curLeftPressType == LeftBtnType.POINTPRAISE_BTN ? PraiseTopBtnType.PRAISE_TOTAL_BTN : TucaoBtnType.Tucao_TOTAL_BTN);
        }
    }

    //设置（点赞日榜、 点赞周榜、点赞总榜状态切换）
    private checkPraiseTopBtnSelected(sender, type:number):void{
        const curTouchBtn = sender.target;
        if(this.lastPraiseTopBtn && this.lastPraiseTopBtn !== curTouchBtn){
            this.lastPraiseTopBtn.opacity = 0;
        }
        curTouchBtn.opacity = 255;
        this.lastPraiseTopBtn = curTouchBtn;
        this.refreshThumbAndTucaoList(this.curLeftPressType, type);
    }

    /*
       @param leftBtnType {点赞榜、吐槽榜}
       @param smBtnType   {0 点赞日榜、1 点赞周榜、 2 点赞总榜  3 吐槽日榜、4 吐槽周榜、5 吐槽总榜}
    */
    private refreshThumbAndTucaoList(leftBtnType:number,  smBtnType:number):void{
        console.log("当前大标签: " + leftBtnType + " 小标签页: " + smBtnType + this.thumbAndTucaoContent);

        this.thumbAndTucaoContent.removeAllChildren();
        this.thumbAndTucaoContent.height = 10 * (this.thumbAndTucaoContentItem.height + this.spacing) + this.spacing; 
        for(let i = 0;i < 10; i ++){
            const Item = cc.instantiate(this.thumbAndTucaoContentItem);
            Item.active = true;
            this.thumbAndTucaoContent.addChild(Item);
            Item.setPosition(-this.thumbAndTucaoContent.width/2, 0 - Item.height * i - this.spacing * (i + 1));
        }
    }

    /*
       @param leftBtnType {点赞榜、吐槽榜}排名
    */
    private roleRankList(leftBtnType:number):void{
        this.thumbsListContent.removeAllChildren();
        this.thumbsListContent.height = 10 * (this.thumbsListContentItem.height + this.spacing) + this.spacing; 
        for(let i = 0;i < 10; i ++){
            const Item = cc.instantiate(this.thumbsListContentItem);
            Item.active = true;
            this.thumbsListContent.addChild(Item);
            Item.setPosition(-this.thumbsListContent.width/2, 0 - Item.height * i - this.spacing * (i + 1));
        }
    }

    public onBack():void{
        this.node.active = false;
    }
}
