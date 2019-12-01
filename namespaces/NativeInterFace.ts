namespace cuckoo {
    //网络类型
    enum NET_TYPE{
        NO_NET = 0, 
        NET_2G,
        NET_3G,
        NET_4G,
        NET_WIFI = 5
    }

    //网络状态描述
    const NET_DES = [
        "无网络",
        "2G",
        "3G",
        "4G",
        "未知",
        "WIFI"
    ]

    export const NativeInterFace = {
         _className_ANDROID:"com/shared/sdk/NativeInterface",
         _className_IOS:"ZQStatusBarTool",
         _callFunc:null, 

         //获取电量
         getCurrentBattery():number{
            let battery; 
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                battery = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceBattery", "()Ljava/lang/String;");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                battery = jsb.reflection.callStaticMethod(this._className_IOS, "currentBatteryPercent");
            }
            console.log("当前电量: " + battery) 
            return battery;
         },

         //获取网络类型 0 - 无网络 ; 1 - 2G; 2 - 3G; 3 - 4G; 5 - WIFI; -1 - 未知
         getCurrentNetworkType():number{
            let netType:string = "0";
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                netType = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceSignalStatus", "()Ljava/lang/String;");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                netType = jsb.reflection.callStaticMethod(this._className_IOS, "currentNetworkType");
            }
            var nType = parseInt(netType);
            if (nType == -1){
                //未知
            }
            console.log("当前网络类型:" + "netType: " + nType + " NET_DES: " + NET_DES[nType] )
            return nType
         },

         //获取信号强度
         getSignalStrength():number{
            let singleStrength:number = 0;
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                singleStrength = jsb.reflection.callStaticMethod(this._className_ANDROID, "getDeviceSignalLevel", "()Ljava/lang/String;");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                singleStrength = jsb.reflection.callStaticMethod(this._className_IOS, "getSignalStrength");
            }
            console.log("信号强度: " + singleStrength )
            return singleStrength
         },

         //获取运营公司(移动、电信、联通)  
         getServiceCompany():string{
            let company = "";
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                company = jsb.reflection.callStaticMethod(this._className_ANDROID, "getMobileType", "()Ljava/lang/String;");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                company = jsb.reflection.callStaticMethod(this._className_IOS, "serviceCompany");
            }
            console.log("运营商: " +company );
            return company
         },

         //锁屏通知针对android设备
         onLockNotify(screenEvent){
            console.log("native-锁屏通知"); 
            if (cc.sys.os == cc.sys.OS_ANDROID) {
            } else if (cc.sys.os == cc.sys.OS_IOS) {
            }
         },

         //设置屏幕亮度
         setWindowBrightness(light:number){
            console.log("设置屏幕亮度:" + light); 
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                 jsb.reflection.callStaticMethod(this._className_ANDROID, "setWindowBrightness", "(Ljava/lang/String;)V", light);
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                 jsb.reflection.callStaticMethod(this._className_IOS, "setWindownBrightness:", light);
            }
         },

         //获取应用包名
         getPackageName():string{
            let packageName = ""; 
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                packageName = jsb.reflection.callStaticMethod(this._className_ANDROID, "getPackageName", "()Ljava/lang/String;");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                packageName = jsb.reflection.callStaticMethod("NativeInterFace", "getPackageName");
            }
            return packageName;
         },
      
         //获取版本号
         getVersionCode():string{
           let verCode:string = "0.0";  
           if (cc.sys.os == cc.sys.OS_ANDROID) {
                verCode = jsb.reflection.callStaticMethod(this._className_ANDROID, "getAppVersionName", "()Ljava/lang/String;");
           } else if (cc.sys.os == cc.sys.OS_IOS) {
                verCode = jsb.reflection.callStaticMethod("NativeInterFace", "getCurVersion");
           }
           return verCode 
         },

         //复制文案
         copyStr(str:string){
           if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod(this._className_ANDROID, "copyStr", "(Ljava/lang/String;)V", str);
           } else if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeInterFace", "copyToClipboard:", str);
           }
         },

         //跳转浏览器
         openWebURL(url:string){
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod(this._className_ANDROID, "openWebURL", "(Ljava/lang/String;)V", url);
           } else if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeInterFace", "openWebURL:", url);
           }
         }
    }
}