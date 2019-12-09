package org.cocos2dx.javascript;

import android.app.Activity;
import android.view.View;

import com.shared.sdk.WXInterface;
import com.shared.sdk.PermissionManager;
import com.shared.sdk.NativeInterface;
import com.shared.sdk.AlipayInterface;

import org.cocos2dx.javascript.atom.AppList;
import org.cocos2dx.javascript.atom.PhoneNumber;

public class XsdkNative {
	private static Activity mActivity = null;

	public static void initXsdkNative(Activity activity) {
		mActivity = activity;

		PhoneNumber.initPhoneNumber(mActivity);
		WXInterface.init(activity);
		NativeInterface.init(activity);
		PermissionManager.init(activity);
		AlipayInterface.init(activity);

		AppList.initAppList(mActivity);
		hideNavigationBar();

	}
	
	public static void hideNavigationBar() {  
	    View decorView = mActivity.getWindow().getDecorView();  
	    int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION  
	            | View.SYSTEM_UI_FLAG_FULLSCREEN;  
	    decorView.setSystemUiVisibility(uiOptions);  
	} 
	
	public static void showNavigationBar() {  
	    View decorView = mActivity.getWindow().getDecorView();  
	    int uiOptions = View.SYSTEM_UI_FLAG_VISIBLE;  
	    decorView.setSystemUiVisibility(uiOptions);  
	} 
}
