package com.shared.sdk;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import com.alipay.sdk.app.EnvUtils;
import com.alipay.sdk.app.PayTask;
import com.cuckoo.game.alipay.AuthResult;
import com.cuckoo.game.alipay.OrderInfoUtil2_0;
import com.cuckoo.game.alipay.PayResult;
import org.cocos2dx.javascript.AppActivity;
import android.widget.Toast;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import java.util.Map;
import android.net.Uri;

import com.cuckoo.game.alipay.AliPayActivity;
import com.cuckoo.game.R;

public class AlipayInterface {

    /**
     * 用于支付宝支付业务的入参 app_id。
     */
    public static final String APPID = "2016101600699562";

    private static Activity mActivity = null;
    private static Context myContext;

    private static String evalFunc = "cuckoo.AlipayInterface.payResNotify";

    private AlipayInterface(Activity activity) {
        AlipayInterface.mActivity = activity;
    }

    public static void init(Activity context) {
        Log.v("WXInterface ", "initInterface");
        myContext = context;
        mActivity = context;
    }

    public static boolean isWXAppInstalled() {
        Log.v("WXInterface", "isWXAppInstalled");
        Uri uri = Uri.parse("alipays://platformapi/startApp");
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        ComponentName componentName = intent.resolveActivity(myContext.getPackageManager());
        return componentName != null;
    }

    public static void setWXAppIDByClient(String appID){
        Log.v("WXInterface", "appID:" + appID);

    }

    public static void sendAuthRequest(String state) {
        Log.v("AlipayInterface", "支付宝授权登陆");
    }

    public static String getAppID() {
        return APPID;
    }

    public static void processIntent(final String code) {
        AppActivity.app.runOnGLThread(new Runnable() {
            public void run() {
              final String evalStr = evalFunc + "(" + code + ")";
              Cocos2dxJavascriptJavaBridge.evalString(evalStr);
           }
        });
    }

    //阿里支付
    public static void aliPay(String resCode){
        Log.v("AlipayInterface ", "支付宝支付" + resCode);
        //沙盒模式
        EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);

        //支付宝另外启动activity
        Intent intent = new Intent(myContext, AliPayActivity.class);
        //参数传递
        intent.putExtra("resCode", resCode);
        //弹出一个密码对话框
        myContext.startActivity(intent);
        //mActivity.overridePendingTransition(R.anim.in_from_right, R.anim.out_to_left);
    }
}

