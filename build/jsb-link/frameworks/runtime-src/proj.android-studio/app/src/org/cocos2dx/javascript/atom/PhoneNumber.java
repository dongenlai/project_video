package org.cocos2dx.javascript.atom;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.os.Build;
import android.provider.ContactsContract.CommonDataKinds.Phone;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.PermissionChecker;
import android.text.TextUtils;
import com.shared.sdk.GlobalVariables;
import org.cocos2dx.javascript.XsdkTool;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.UnsupportedEncodingException;

public class PhoneNumber {
	/**
	 * 成功、出错、不能得到通讯录(可能是未授权)
	 */
	private static String PHONENUMBER_SUCCESS = "0|";
	private static String PHONENUMBER_ERR_FAIL = "-1|";
	private static String PHONENUMBER_ERR_GET_FAIL = "-3|";
	private static Activity mActivity = null;
	public static void initPhoneNumber(Activity activity) {
		mActivity = activity;
	}

	/**
	 * 是否能获取到通讯录
	 * 
	 * @return
	 */
	public static boolean isAddressBookAuthorize() {
		boolean isAuth = false;
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
			if (PermissionChecker.checkSelfPermission(GlobalVariables.application, Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED) {
				isAuth = true;
            }
		}
		else {
			if (ContextCompat.checkSelfPermission(GlobalVariables.application, Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED) {
				isAuth = true;
			}
		}
		return isAuth;
	}

	/**
	 * 得到手机通讯录联系人信息
	 * 
	 * @return
	 */
	public static String callBackAddressBook() {
		ContentResolver resolver = mActivity.getContentResolver();
		JSONArray array = new JSONArray();
		// 获取手机联系人
		Cursor phoneCursor = resolver.query(Phone.CONTENT_URI, null, null,
				null, null);
		if (phoneCursor != null) {
			if (phoneCursor.getCount() == 0) {
				phoneCursor.close();
				return PHONENUMBER_ERR_GET_FAIL;
			}
			while (phoneCursor.moveToNext()) {
				// 读取通讯录的姓名
				String name = phoneCursor.getString(phoneCursor
						.getColumnIndex(Phone.DISPLAY_NAME));
				// 读取通讯录的号码
				String number = phoneCursor.getString(phoneCursor
						.getColumnIndex(Phone.NUMBER));
				if (TextUtils.isEmpty(number))
					continue;
				number = number.replaceAll(" ", "");
				JSONObject jsonObject = new JSONObject();
				try {
					jsonObject.put("name", name);
					jsonObject.put("phone", number);
				} catch (JSONException e) {
					e.printStackTrace();
					return PHONENUMBER_ERR_FAIL;
				}
				array.put(jsonObject);
			}
			phoneCursor.close();
			try {
				return PHONENUMBER_SUCCESS + XsdkTool.getUTF8String(array.toString());
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}

		return PHONENUMBER_ERR_FAIL;
	}
}
