package com.shared.sdk;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.provider.Settings;
import android.support.annotation.RequiresApi;
import android.util.Log;
import android.widget.Toast;
import com.cuckoo.game.R;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.cocos2dx.javascript.AppActivity;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import pub.devrel.easypermissions.AppSettingsDialog;
import pub.devrel.easypermissions.EasyPermissions;
import pub.devrel.easypermissions.PermissionRequest;

public class PermissionManager {
    private static final String TAG = "xsdk.permissionManager";
    private static Activity mActivity = null;
    private static Context myContext = null;

    private static String origin = "";

    private static int permissionScriptHandler = -1;

    private static final int PERMISSION_NECESSARY = 1000;
    private static String[] PERMISSION_NECESSARY_GROUP = {Manifest.permission.READ_PHONE_STATE, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE};

    private static final int PERMISSION_CONTACTS = 10001;
    private static String[] PERMISSION_CONTACTS_GROUP = {Manifest.permission.GET_ACCOUNTS, Manifest.permission.WRITE_CONTACTS, Manifest.permission.READ_CONTACTS};

    private static final int PERMISSION_CAMERA = 10002;
    private static String[] PERMISSION_CAMERA_GROUP = {Manifest.permission.CAMERA};

    private static final int PERMISSION_LOCATION = 10003;
    private static String[] PERMISSION_LOCATION_GROUP = {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION};

    private static final int PERMISSION_MICROPHONE = 10004;
    private static String[] PERMISSION_MICROPHONE_GROUP = {Manifest.permission.RECORD_AUDIO};

    private static final int PERMISSION_PHONE = 10005;
    private static String[] PERMISSION_PHONE_GROUP = {Manifest.permission.READ_PHONE_STATE};

    private static final int PERMISSION_SMS = 10006;
    private static String[] PERMISSION_SMS_GROUP = {Manifest.permission.SEND_SMS};

    private static final int PERMISSION_STORAGE = 10007;
    private static String[] PERMISSION_STORAGE_GROUP = {Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE};

    private static final int PERMISSION_CALENDAR = 10008;
    private static String[] PERMISSION_CALENDAR_GROUP = {Manifest.permission.READ_CALENDAR, Manifest.permission.WRITE_CALENDAR};

    private static final int PERMISSION_CAMERA_WITHVIDEO = 10009;
    private static String[] PERMISSION_CAMERA_WITHVIDEO_GROUP = {Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO};

    private static Map<String, String[]> permissionGroup = null;

    public static void init(Activity activity) {
        mActivity = activity;
        myContext = activity;
        permissionGroup = new HashMap<String, String[]>();
        permissionGroup.put(String.valueOf(PERMISSION_NECESSARY), PERMISSION_NECESSARY_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_CONTACTS), PERMISSION_CONTACTS_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_CAMERA), PERMISSION_CAMERA_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_LOCATION), PERMISSION_LOCATION_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_MICROPHONE), PERMISSION_MICROPHONE_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_PHONE), PERMISSION_PHONE_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_SMS), PERMISSION_SMS_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_STORAGE), PERMISSION_STORAGE_GROUP);
        permissionGroup.put(String.valueOf(PERMISSION_CALENDAR), PERMISSION_CALENDAR_GROUP);
    }

    public static void registerLuaCallFunc(final int scriptHandler) {
        if (permissionScriptHandler != -1) {
            //Cocos2dxLuaJavaBridge.releaseLuaFunction(permissionScriptHandler);
        }
        permissionScriptHandler = scriptHandler;
    }

    public static void postMsgToLua(final int permissionId, final String msg) {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                ((AppActivity)mActivity).runOnGLThread(new Runnable() {

                    @Override
                    public void run() {
                    Log.d(TAG, "postMsgToLua");
                    JSONObject postMsg = new JSONObject();
                    try {
                        postMsg.put("permissionType", String.valueOf(permissionId));
                        postMsg.put("result", msg);
                        postMsg.put("origin", origin);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    //Cocos2dxLuaJavaBridge.callLuaFunctionWithString(permissionScriptHandler, postMsg.toString());
                    }
                });
            }
        }, 100);
    }

    public static boolean checkPermissions(final int permissionType) {
        String[] permissions = permissionGroup.get(String.valueOf(permissionType));
        if (permissions != null) {
            if (EasyPermissions.hasPermissions(mActivity, permissions)) {
                return true;
            }
        }
        return false;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public static void requestPermissions(final int permissionType, final String permissionDes) {
        String[] permissions = permissionGroup.get(String.valueOf(permissionType));
        if (permissions != null) {
            if (!EasyPermissions.hasPermissions(mActivity, permissions)) {
                mActivity.requestPermissions(permissions, permissionType);
            }
        } else {
            postMsgToLua(permissionType,"PERMISSION_NOT_EXIST");
        }
    }

    public static void onPermissionsGranted(int requestCode, List<String> perms) {
        origin = "game";
        postMsgToLua(requestCode,"PERMISSION_GRANTED");
    }

    public static void onPermissionsDenied(int requestCode, List<String> perms) {
        origin = "game";
        //权限被拒且勾选不再提示
        if (EasyPermissions.somePermissionPermanentlyDenied(mActivity, perms)) {
            //Toast.makeText(mActivity, "如需使用功能，请到设置中开启权限", Toast.LENGTH_LONG).show();
            postMsgToLua(requestCode,"PERMISSION_PERMANENTLY_DENIED");
        } else {
            postMsgToLua(requestCode,"PERMISSION_DENIED");
        }
    }

    public static void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.d(TAG, "onActivityResult");
        if (isPermissionRequest(requestCode)) {
            origin = "setting";
            if (checkPermissions(requestCode) == true) {
                postMsgToLua(requestCode,"PERMISSION_GRANTED");
            } else {
                postMsgToLua(requestCode,"PERMISSION_PERMANENTLY_DENIED");
            }
        }
    }

    public static boolean isPermissionRequest(final int requestCode) {
        String[] permissions = permissionGroup.get(String.valueOf(requestCode));
        if (permissions != null) {
            return true;
        }
        return false;
    }

    public static void gotoSettingLayer(final int permissionType, final String title, final String des) {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                .setData(Uri.fromParts("package", mActivity.getPackageName(), null));
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        mActivity.startActivityForResult(intent, permissionType);
    }
}