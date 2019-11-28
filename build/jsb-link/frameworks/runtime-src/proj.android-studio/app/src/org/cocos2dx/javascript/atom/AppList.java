package org.cocos2dx.javascript.atom;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Log;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author oswin
 * 获取手机安装了那些应用信息
 */
public class AppList {
	private static Activity mActivity = null;
	private final static String TAG = "cocos2d-x";
	public static void initAppList(Activity activity) {
		mActivity = activity;
	}
	
	/**
	 * @param 去掉无用字符
	 * @return
	 */
	private static String replaceBlank(String str) {  
        String dest = "";  
        if (str != null) {  
        	Pattern p = Pattern.compile("\t|\r|\n|/|\\\\");
            Matcher m = p.matcher(str);  
            dest = m.replaceAll(""); 
            dest = dest.replace("/","");
        }  
        return dest;  
    } 
	
	private static String getAppMsgJson(boolean isFilter){
		try {
			PackageManager packageManager = mActivity.getPackageManager();
			JSONArray array = new JSONArray();
            List<PackageInfo> packageInfos = packageManager.getInstalledPackages(0);
            
            for (int i = 0; i < packageInfos.size(); i++) {
                PackageInfo packageInfo = packageInfos.get(i);
                boolean isSystemApp = false;

                //系统app
                if ((ApplicationInfo.FLAG_SYSTEM & packageInfo.applicationInfo.flags) != 0) {
                	isSystemApp = true;
                }
                
                String appName = packageInfo.applicationInfo.loadLabel(mActivity.getPackageManager()).toString();
                String packageName = packageInfo.packageName;
                String versionName = packageInfo.versionName;
                
                if(isFilter){
                	appName = appName.replace("/","");
                	packageName = packageName.replace("/","");
                	versionName = versionName.replace("/","");
                }
                
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("appName", appName);
                jsonObject.put("isSystemApp", isSystemApp);
                jsonObject.put("packageName", packageName);
                jsonObject.put("versionName", versionName);
                                
                array.put(jsonObject);                
            }
            
            return array.toString();
        }catch (Exception e){
            Log.e(TAG,TAG+"===============获取应用包信息失败");
            return "";
        }
	}
	
	
	/**
	 * 得到手机其他应用信息
	 * @return
	 */
	public static String getInstallAppMsg(){
		try {
			String strJson = getAppMsgJson(true); 
			strJson = replaceBlank(strJson);
			return strJson;
		}
		catch (Exception e){
            return "";
        }
	}
	
}
