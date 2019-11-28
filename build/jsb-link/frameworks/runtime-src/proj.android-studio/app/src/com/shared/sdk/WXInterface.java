package com.shared.sdk;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.xianlai.mahjongguiyang.Util;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXMiniProgramObject;
import com.tencent.mm.opensdk.modelmsg.WXTextObject;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.cocos2dx.javascript.AppActivity;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import android.os.Bundle;
import java.io.UnsupportedEncodingException;

public class WXInterface {
    private static Activity mActivity = null;
    private static Context myContext;

    private static String APP_ID = "";
    private static IWXAPI wxApi;
    private static int authCodeScriptHandler = 0;
    private static final int THUMB_SIZE = 150;


    private WXInterface(Activity activity) {
        WXInterface.mActivity = activity;
    }

    public static void init(Activity context) {
        Log.v("WXInterface ", "initInterface");
        myContext = context;
        mActivity = context;
    }

    //userName:小程序id
    //path:拉起小程序页面的可带参路径，不填默认拉起小程序首页
    public static void openMiniProgram(final String userName, final String path, final int model) {
        WXLaunchMiniProgram.Req req = new WXLaunchMiniProgram.Req();
        req.userName = userName;
        req.path = path;
        if (model == 0) {
            req.miniprogramType = WXLaunchMiniProgram.Req.MINIPTOGRAM_TYPE_RELEASE;
        }
        else if (model == 1) {
            req.miniprogramType = WXLaunchMiniProgram.Req.MINIPROGRAM_TYPE_TEST;
        }
        else {
            req.miniprogramType = WXLaunchMiniProgram.Req.MINIPROGRAM_TYPE_PREVIEW;
        }

        wxApi.sendReq(req);
    }

    //userName:小程序id
    //path:拉起小程序页面的可带参路径，不填默认拉起小程序首页
    public static void shareMiniProgram(final String webpageUrl, final String userName, final String path, final String imagePath, final String title, final String desc, final int model) {
        WXMiniProgramObject miniProgramObj = new WXMiniProgramObject();
        miniProgramObj.webpageUrl = webpageUrl; // 兼容低版本的网页链接
        if (model == 0) {// 正式版:0，测试版:1，体验版:2
            miniProgramObj.miniprogramType = WXLaunchMiniProgram.Req.MINIPTOGRAM_TYPE_RELEASE;
        }
        else if (model == 1) {
            miniProgramObj.miniprogramType = WXLaunchMiniProgram.Req.MINIPROGRAM_TYPE_TEST;
        }
        else {
            miniProgramObj.miniprogramType = WXLaunchMiniProgram.Req.MINIPROGRAM_TYPE_PREVIEW;
        }

        miniProgramObj.userName = userName;     // 小程序原始id
        miniProgramObj.path = path;            //小程序页面路径
        WXMediaMessage msg = new WXMediaMessage(miniProgramObj);
        msg.title = title;                    // 小程序消息title
        msg.description = desc;               // 小程序消息desc
        Bitmap bmp = BitmapFactory.decodeFile(imagePath);
        int width = THUMB_SIZE;
        int height = THUMB_SIZE;
        if(bmp.getWidth() > bmp.getHeight()){
            height = (int) (THUMB_SIZE / (double) bmp.getWidth() * bmp.getHeight());
        }else{
            width = (int) (THUMB_SIZE / (double) bmp.getHeight() * bmp.getWidth());
        }

        Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, width,
                height, true);
        msg.thumbData = Util.bmpToByteArray(thumbBmp, true);;                      // 小程序消息封面图片，小于128k

        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("webpage");
        req.message = msg;
        req.scene = SendMessageToWX.Req.WXSceneSession;  // 目前支持会话
        wxApi.sendReq(req);
    }

    public static void toWeChatScanDirect() {
        try {
            Intent intent = new Intent();
            intent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.LauncherUI"));
            intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.setAction("android.intent.action.VIEW");
            myContext.startActivity(intent);
        } catch (Exception e) {
        }
    }

    public static boolean isWXAppInstalled() {
        Log.v("WXInterface", "isWXAppInstalled");
        return wxApi.isWXAppInstalled();
    }

    public static void setWXAppIDByClient(String appID){
        Log.v("WXInterface", "appID:" + appID);
        wxApi = WXAPIFactory.createWXAPI(mActivity, appID, true);
        APP_ID = appID;
        wxApi.registerApp(appID);
    }

    public static void sendAuthRequest(String state) {
        Log.v("WXInterface", "sendAuthRequest");
        final SendAuth.Req req = new SendAuth.Req();
        req.scope = "snsapi_userinfo";
        req.state = "none";
        wxApi.sendReq(req);
    }

    public static void registerGetAuthCodeHandler(int scriptHandler) {
        Log.v("WXInterface", "registerGetAuthCodeHandler" + scriptHandler);
        authCodeScriptHandler = scriptHandler;
    }

    public static String getAppID() {
        return APP_ID;
    }

    //分享图片到好友
    public static void shareImageToWX(final String filePath) {
        Log.v("WXInterface", "filePath:" + filePath);
        Bitmap bmp = BitmapFactory.decodeFile(filePath);
        WXImageObject imgObj = new WXImageObject(bmp);
        WXMediaMessage msg = new WXMediaMessage();
        msg.mediaObject = imgObj;
        int width = THUMB_SIZE;
        int height = THUMB_SIZE;
        if(bmp.getWidth() > bmp.getHeight()){
            height = (int) (THUMB_SIZE / (double) bmp.getWidth() * bmp.getHeight());
        }else{
            width = (int) (THUMB_SIZE / (double) bmp.getHeight() * bmp.getWidth());
        }
        Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, width,
                height, true);
        msg.thumbData = Util.bmpToByteArray(thumbBmp, true);
        bmp.recycle();
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("img");
        req.message = msg;
        req.scene = SendMessageToWX.Req.WXSceneSession;
        wxApi.sendReq(req);
    }

    private static String buildTransaction(final String type) {
        return (type == null) ? String.valueOf(System.currentTimeMillis()) : type + System.currentTimeMillis();
    }

    /**
     * 根据图片的url路径获得Bitmap对象
     * @param url
     * @return
     */
    private static Bitmap decodeUriAsBitmapFromNet(String url) {
        URL fileUrl = null;
        Bitmap bitmap = null;
        try {
            fileUrl = new URL(url);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        try {
            HttpURLConnection conn = (HttpURLConnection) fileUrl
                    .openConnection();
            conn.setDoInput(true);
            conn.connect();
            InputStream is = conn.getInputStream();
            bitmap = BitmapFactory.decodeStream(is);
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bitmap;
    }

    //分享图片到朋友圈 通过图片url
    public static void shareImageToWXPYQByUrl(final String url) {
        Thread thread = new Thread(){
            public void run(){
                Bitmap bmp = decodeUriAsBitmapFromNet(url);
                WXImageObject imgObj = new WXImageObject(bmp);
                WXMediaMessage msg = new WXMediaMessage();
                msg.mediaObject = imgObj;
                int width = THUMB_SIZE;
                int height = THUMB_SIZE;
                if(bmp.getWidth() > bmp.getHeight()){
                    height = (int) (THUMB_SIZE / (double) bmp.getWidth() * bmp.getHeight());
                }else{
                    width = (int) (THUMB_SIZE / (double) bmp.getHeight() * bmp.getWidth());
                }
                Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, width,
                        height, true);
                msg.thumbData = Util.bmpToByteArray(thumbBmp, true);
                bmp.recycle();

                SendMessageToWX.Req req = new SendMessageToWX.Req();
                req.transaction = buildTransaction("img");
                req.message = msg;
                req.scene = SendMessageToWX.Req.WXSceneTimeline;
                wxApi.sendReq(req);
            }
        };
        thread.start();
    }

    //图片分享(朋友圈)
    public static void shareImageToWXPYQ(final String filePath) {
        Log.v("WXInterface", "filePath:" + filePath);
        Bitmap bmp = BitmapFactory.decodeFile(filePath);
        WXImageObject imgObj = new WXImageObject(bmp);
        WXMediaMessage msg = new WXMediaMessage();
        msg.mediaObject = imgObj;
        int width = THUMB_SIZE;
        int height = THUMB_SIZE;
        if(bmp.getWidth() > bmp.getHeight()){
            height = (int) (THUMB_SIZE / (double) bmp.getWidth() * bmp.getHeight());
        }else{
            width = (int) (THUMB_SIZE / (double) bmp.getHeight() * bmp.getWidth());
        }
        Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, width,
                height, true);
        msg.thumbData = Util.bmpToByteArray(thumbBmp, true);
        bmp.recycle();
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("img");
        req.message = msg;
        req.scene = SendMessageToWX.Req.WXSceneTimeline;
        wxApi.sendReq(req);
    }

    //处理微信环节(登陆、分享、支付后续集合支付宝)
    public static void processIntent(Intent intent) {
        final Bundle bundle = intent.getExtras();
        String from = bundle.getString("from");
        Log.v("WXInterface", "渠道来源: " + from + "分享结果: " +  bundle.getInt("result"));
        try {
            if ("WX_Share".equals(from)) {
                final int shareResult = bundle.getInt("result");
                AppActivity.app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                       //todo分享结果回调
                    }
                });
            } else if ("WX_Login".equals(from)) {
                int res = bundle.getInt("result");
                String state = bundle.getString("state") == null ? "" : bundle.getString("state");
                String code = bundle.getString("code") == null ? "" : bundle.getString("code");
                final String evalStr = "cuckoo.WxInterFace.wXLoginRes(" + res + ",\"" + code + "\",\"" + state + "\")";
                AppActivity.app.runOnGLThread(new Runnable() {
                    public void run() {
                    Cocos2dxJavascriptJavaBridge.evalString(evalStr);
                    }
                });
            } else if ("WX_Pay".equals(from)) {
                AppActivity.app.runOnGLThread(new Runnable() {
                    public void run() {
                        //todo 支付
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Bitmap getWechatShareIconBtimap(final String iconpath)  {
        Bitmap  thumb = null;
        String headerStr = "assets/";
        if ("".equals(iconpath) ){
            thumb = BitmapFactory.decodeResource(mActivity.getResources(), getIconID("ic_launcher"));
        }else if (iconpath.startsWith("assets/") || iconpath.startsWith("res/")){
             String realPath = iconpath;
             if (iconpath.startsWith(headerStr)){
                 realPath = iconpath.substring(headerStr.length());
             }
             AssetManager am =  mActivity.getResources().getAssets();
             InputStream is = null;
             try {
                 is = am.open(realPath);
             } catch (IOException e) {
                 e.printStackTrace();
             }
             thumb = BitmapFactory.decodeStream(is);
        }else{
            thumb = BitmapFactory.decodeFile(iconpath);
        }
        return  thumb;
    }

    //分享给好友
    public static void shareURLToWX(final String url, final String title, final String description,  String iconpath) {
        Log.v("WXInterface", "url:" + url + " title:" + title + " description:" + description);
        WXWebpageObject webpage = new WXWebpageObject();
        webpage.webpageUrl = url;
        WXMediaMessage msg = new WXMediaMessage(webpage);
        msg.title = title;
        msg.description = description;
        int WX_THUMB_SIZE = 120;
        Bitmap thumb = getWechatShareIconBtimap(iconpath);
        Log.v("WXInterface", "thumb:" + thumb );
        Bitmap thumbBmp = Bitmap.createScaledBitmap(thumb, WX_THUMB_SIZE, WX_THUMB_SIZE, true);
        msg.thumbData = Util.bmpToByteArray(thumbBmp, true);
        thumb.recycle();
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("url");
        req.message = msg;
        req.scene = SendMessageToWX.Req.WXSceneSession;
        wxApi.sendReq(req);
    }

    // 根据id 获取图片
    public static int getIconID(String name)
    {
        if(myContext != null){
            //"drawable"
            return myContext.getResources().getIdentifier(name,"mipmap", myContext.getPackageName());
        }else{
            return 0;
        }
    }

    public static void shareURLToWXPYQ(final String url, final String title, final String description, final String iconpath) {
        Log.v("WXInterface", "url:" + url + " title:" + title + " description:" + description);
        WXWebpageObject webpage = new WXWebpageObject();
        webpage.webpageUrl = url;
        WXMediaMessage msg = new WXMediaMessage(webpage);
        msg.title = title;
        msg.description = description;
        int WX_THUMB_SIZE = 120;
        Bitmap thumb = getWechatShareIconBtimap(iconpath);
        Bitmap thumbBmp = Bitmap.createScaledBitmap(thumb, WX_THUMB_SIZE, WX_THUMB_SIZE, true);
        msg.thumbData = Util.bmpToByteArray(thumbBmp, true);
        thumb.recycle();

        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("url");
        req.message = msg;
        req.scene = SendMessageToWX.Req.WXSceneTimeline;
        wxApi.sendReq(req);
    }

    public static void shareText(final String text, final String shareType) {
        WXTextObject textObject = new WXTextObject();
        textObject.text = text;
        WXMediaMessage msg = new WXMediaMessage();
        msg.mediaObject = textObject;
        msg.description = text;
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("text");
        req.message = msg;
        if ("wechat".equals(shareType)) {
            req.scene = SendMessageToWX.Req.WXSceneSession;
        } else if ("wx_pyq".equals(shareType)) {
            req.scene = SendMessageToWX.Req.WXSceneTimeline;
        }
        wxApi.sendReq(req);
    }
}

