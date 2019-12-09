namespace cuckoo {

    const PAY_RES_CODE = {
        "6001":"支付取消",
        "9000":"支付成功",
    }

    export const AlipayInterface = {
        _classAndroidName:"com/shared/sdk/AlipayInterface",
        _classIOSName:"AlipayInterface",

        doOrder:function(resCode:string):void{
            console.log("支付宝下单支付" + resCode);
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod(this._classAndroidName, "aliPay", "(Ljava/lang/String;)V", resCode);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod(this._classIOSName, "doOrder:", resCode);
            }
        },

        payResNotify:function (code:string) {
            const resCode = parseInt(code);
            console.log("支付宝支付" + resCode);
        },

    }
}