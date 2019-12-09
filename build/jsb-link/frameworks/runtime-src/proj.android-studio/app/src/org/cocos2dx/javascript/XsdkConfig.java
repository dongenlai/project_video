package org.cocos2dx.javascript;

import android.app.Application;
import android.content.res.AssetManager;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

public class XsdkConfig {
	private final static String TAG = "cocos2d-x";
	private final static String CONFIG_FILE = "xsdk_init.json";

	
	/* **
	 * 声网视频、高德地图、腾讯bugly、网易7鱼反馈、热云统计
	 * 友盟统计、友盟推送、呀呀云语音、微信登录分享、阿里云层
	 * **/
	private static boolean mIsUseAgora = true;
	private static boolean mIsUseAmap = true;
	private static boolean mIsUseBugly = true;
	private static boolean mIsUseQiYu = true;
	private static boolean mIsUseTracking = true;
	private static boolean mIsUseUmengAnalytic = true;
	private static boolean mIsUsePush = true;
	private static boolean mIsUseSysConfig = true;
	private static boolean mIsUseUmengPush = true;
	private static boolean mIsUsePushXiaomi = true;
	private static boolean mIsUsePushHuawei = true;
	private static boolean mIsUsePushMeizu = true;

	private static boolean mIsUseYaYa = true;
	private static boolean mIsUseWX = true;
	private static boolean mIsUseYunCeng = true;

	private static boolean mIsUseNoe = false;
	private static String mNoeChannelId = "";
	private static String mNoeKey = "";
	
	private static Application mApplication = null;
	private static JSONObject mJsonObject = null;

	private static String mPackagename = null;
	

	/** 初始化xsdk配置文件 java
	 * @param application
	 */
	public static void initXsdkConfig(Application application) {
		mApplication = application;

		mPackagename = mApplication.getPackageName();
		if(mJsonObject == null){
			readConfigFile();
		}
	}
	
	 /**
     * 判断assets文件夹下的文件是否存在
     * @return false 不存在    true 存在
     */
	public static boolean isFileExistInAssets(String filename, String dirname) {
        AssetManager assetManager = mApplication.getAssets();
        try {
            String[] names = assetManager.list(dirname);
            for (int i = 0; i < names.length; i++) {
            	Log.w(TAG, "  "+TAG+" assets 文件存在 -- " + names[i]);
                if (names[i].equals(filename.trim())) {
                    Log.w(TAG, "  "+TAG+" assets 文件存在 -- ");
                    return true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            Log.w(TAG, "  "+TAG+" assets 文件不存在 -- ");
            return false;
        }
        
        Log.w(TAG, "  "+TAG+" assets 文件不存在 -- ");
        return false;
    }

	
	/**
	 * 读取配置文件 java
	 */
	public static void readConfigFile() {
		try {
			String writePath = mApplication.getFilesDir().getAbsolutePath() + "/res/" + CONFIG_FILE;
			InputStreamReader inputStreamReader = null;
			
			if(new File(writePath).exists()){
				FileInputStream fin = new FileInputStream(writePath);
				inputStreamReader = new InputStreamReader(fin, "UTF-8");
				Log.w(TAG, TAG + " 文件路径：" + writePath);
			}else{
				InputStream filePath = mApplication.getClass().getResourceAsStream("/assets/res/" + CONFIG_FILE);
				if (filePath != null){
					inputStreamReader = new InputStreamReader(mApplication.getAssets().open("res/" + CONFIG_FILE), "UTF-8");
					Log.w(TAG, TAG+"文件路径： " + writePath);
				} else {
					Log.w(TAG, TAG+"文件不存在");
					return;
				}
			}
			
			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
			
			String line;
			StringBuilder stringBuilder = new StringBuilder();
			while ((line = bufferedReader.readLine()) != null) {
				stringBuilder.append(line);
			}
			bufferedReader.close();
			inputStreamReader.close();
			
			JSONObject jsonObject = new JSONObject(stringBuilder.toString());
			mJsonObject = jsonObject;
			
			mIsUseAgora = jsonObject.optBoolean("is_android_agora", true);
			mIsUseAmap = jsonObject.optBoolean("is_android_amap", true);
			mIsUseBugly = jsonObject.optBoolean("is_android_bugly", true);
			mIsUseQiYu = jsonObject.optBoolean("is_android_qiyu", true);
			mIsUseTracking = jsonObject.optBoolean("is_android_tracking", true);
			
			mIsUseUmengAnalytic = jsonObject.optBoolean("is_android_umeng_analytic", true);

			mIsUsePush = jsonObject.optBoolean("is_android_push", true);
			mIsUseSysConfig = jsonObject.optBoolean("is_android_push_sysconfig", true);
			mIsUsePushXiaomi = jsonObject.optBoolean("is_android_xiaomi_push", true);
			mIsUsePushHuawei = jsonObject.optBoolean("is_android_huawei_push", true);
			mIsUsePushMeizu = jsonObject.optBoolean("is_android_meizu_push", true);
			mIsUseUmengPush = jsonObject.optBoolean("is_android_umeng_push", true);

			mIsUseYaYa = jsonObject.optBoolean("is_android_yaya", true);
			mIsUseWX = jsonObject.optBoolean("is_android_wx", true);
			mIsUseYunCeng = jsonObject.optBoolean("is_android_yunceng", true);

			mIsUseNoe = jsonObject.optBoolean("is_android_noe", false);
			JSONObject noeObj = jsonObject.optJSONObject("android_noe_info");
			if (noeObj != null && !noeObj.isNull(mPackagename)) {
				JSONObject noeInfo = noeObj.optJSONObject(mPackagename);
				mNoeChannelId = noeInfo.optString("noe_channel_id", "");
				mNoeKey = noeInfo.optString("noe_key", "");
			}

			Log.w(TAG, "  "+TAG+" 配置文件 "+jsonObject.toString());
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (Exception e){
			e.printStackTrace();
		}
	}
	
	
	
	/** 声网视频 java lua
	 * @return
	 */
	public static boolean isUseAgora(){
		return mIsUseAgora;
	}
	
	
	/** 高德地图 java lua
	 * @return
	 */
	public static boolean isUseAmap(){
		return mIsUseAmap;
	}
	
	
	/** 腾讯bugly java lua
	 * @return
	 */
	public static boolean isUseBugly(){
		return mIsUseBugly;
	}
	
	
	/** 网易7鱼反馈 java lua
	 * @return
	 */
	public static boolean isUseQiYu(){
		return mIsUseQiYu;
	}
	
	
	/** 热云统计 java lua
	 * @return
	 */
	public static boolean isUseTracking(){
		return mIsUseTracking;
	}
	
	
	/** 友盟统计 java lua
	 * @return
	 */
	public static boolean isUseUmengAnalytic(){
		return mIsUseUmengAnalytic;
	}

	/** 推送总开关 java lua
	 * @return
	 */
	public static boolean isUsePush(){
		return mIsUsePush;
	}
	public static boolean isUseSystemCfg(){
		return mIsUseSysConfig;
	}
	public static boolean isUseXiaomi(){
		return mIsUsePushXiaomi;
	}
	public static boolean isUseHuawei(){
		return mIsUsePushHuawei;
	}
	public static boolean isUseMeizu(){
		return mIsUsePushMeizu;
	}
	/** 友盟推送 java lua
	 * @return
	 */
	public static boolean isUseUmengPush(){
		return mIsUseUmengPush;
	}
	
	
	/** 呀呀云语音 java lua
	 * @return
	 */
	public static boolean isUseYaYa(){
		return mIsUseYaYa;
	}
	
	
	/** 微信登录分享 java lua
	 * @return
	 */
	public static boolean isUseWX(){
		return mIsUseWX;
	}
	
	
	/** 阿里云层 java lua
	 * @return
	 */
	public static boolean isUseYunCeng(){
		return mIsUseYunCeng;
	}

	public static boolean isUseNoe() {return  mIsUseNoe;}

	public static String getNoeChannelId() {
		return mNoeChannelId;
	}
	public static String getNoeKey() {
		return mNoeKey;
	}

}
