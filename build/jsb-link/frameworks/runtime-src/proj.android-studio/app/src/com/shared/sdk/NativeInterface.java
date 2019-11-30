package com.shared.sdk;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.ClipData;
import android.content.ClipDescription;
import android.content.ClipboardManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.os.Vibrator;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.multidex.MultiDex;
import android.support.v4.content.FileProvider;
import android.telecom.TelecomManager;
import android.telephony.PhoneStateListener;
import android.telephony.SignalStrength;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.View;

import com.cuckoo.game.R;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.FileDownloader;
import com.liulishuo.filedownloader.util.FileDownloadUtils;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.ConstString;
import org.cocos2dx.javascript.XsdkTool;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import android.view.WindowManager;
import android.view.Window;
import android.content.ContentResolver;


public class NativeInterface {
    private static Activity mActivity = null;
    private static Context myContext = null;
    private static boolean mIsBackKeyEnabled = true;
    private static final String TAG = "xsdk.NativeInterface";
    private static final int CAMERA_REQ_CODE = 40001;
    private static final int OPEN_OTHER_APP_REQ_CODE = 40002;
    private static Uri mPhotoUri;
    private static ClipboardManager myClipboard = null;
    //下载相关
    private static int curDownloadBytes = 0;
    private static int fileTotaBytes = 0;
    private static String downloadSpeed = "0";
    private static String downloadState = "none";
    private static String DOWNLOAD_URL = "";
    private static String downloadPath = "";
    private static int downloadId;
    private static BaseDownloadTask downloadTask = null;
    //电量
    private static BatteryReceiver mBatteryReceiver = null;
    private static int mBatteryLevel;
    //网络
    private static TelephonyManager Tel;// TelephonyManager类的对象
    private static MyPhoneStateListener MyListener;// MyPhoneStateListener类的对象，即设置一个监听器对象'
    // 信号强度
    private static int signalLevel;
    private static int noWifiSignalLevel;

    private static WifiInfo wifiInfo = null; // 获得的Wifi信息
    private static WifiManager wifiManager = null; // Wifi管理器
    private static Handler handler;
    private static int wifilevel; // 信号强度值

    private static LockScreenReceiver lockScreenReceiver = null;
    private static int gScreenCallFuncHandler = -1;

    public static void init(Activity activity) {
        mActivity = activity;
        myContext = activity;
        myClipboard = (ClipboardManager) myContext.getSystemService(Context.CLIPBOARD_SERVICE);
        // 注册电量的广播监听
        mBatteryReceiver = new BatteryReceiver();
        MyListener = new MyPhoneStateListener();// 初始化对象
        Tel = (TelephonyManager) myContext.getSystemService(Context.TELEPHONY_SERVICE);
        Tel.listen(MyListener, PhoneStateListener.LISTEN_SIGNAL_STRENGTHS);
        wifiManager = (WifiManager) myContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        registerSignalListener();
        MultiDex.install(GlobalVariables.application);
        FileDownloader.setup(mActivity);
        lockScreenReceiver = new LockScreenReceiver();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_SCREEN_OFF);
        myContext.registerReceiver(lockScreenReceiver, intentFilter);
    }

    public static void onPause() {
        Tel.listen(MyListener, PhoneStateListener.LISTEN_NONE);
        try {
            myContext.unregisterReceiver(mBatteryReceiver);
        }
        catch (IllegalArgumentException e) {
            Log.v("unregisterReceiver","IllegalArgumentException");
        }
    }

    public static void onResume() {
        Tel.listen(MyListener, PhoneStateListener.LISTEN_SIGNAL_STRENGTHS);
        // 注册电量的广播监听
        IntentFilter intentFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        myContext.registerReceiver(mBatteryReceiver, intentFilter);
    }

    public static void onDestory() {
        myContext.unregisterReceiver(lockScreenReceiver);
    }

    private static void registerSignalListener() {
        // 使用定时器,每隔5秒获得一次信号强度值
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                try {
                    wifiInfo = wifiManager.getConnectionInfo();
                    // 获得信号强度值
                    wifilevel = wifiInfo.getRssi();
                } catch (Exception e) {
                    Message msg = new Message();
                    msg.what = 0;
                    handler.sendMessage(msg);
                    return;
                }
                // 根据获得的信号强度发送信息
                if (wifilevel <= 0 && wifilevel >= -50) {
                    Message msg = new Message();
                    msg.what = 1;
                    handler.sendMessage(msg);
                } else if (wifilevel < -50 && wifilevel >= -70) {
                    Message msg = new Message();
                    msg.what = 2;
                    handler.sendMessage(msg);
                } else if (wifilevel < -70 && wifilevel >= -80) {
                    Message msg = new Message();
                    msg.what = 3;
                    handler.sendMessage(msg);
                } else if (wifilevel < -80 && wifilevel >= -100) {
                    Message msg = new Message();
                    msg.what = 4;
                    handler.sendMessage(msg);
                } else {
                    Message msg = new Message();
                    msg.what = 5;
                    handler.sendMessage(msg);
                }
            }

        }, 1000, 1000);

        // 使用Handler实现UI线程与Timer线程之间的信息传递,每5秒告诉UI线程获得wifiInto
        handler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    // 如果收到正确的消息就获取WifiInfo，改变图片并显示信号强度
                    case 1:
                        signalLevel = 3;
                        break;
                    case 2:
                        signalLevel = 2;
                        break;
                    case 3:
                        signalLevel = 2;
                        break;
                    case 4:
                        signalLevel = 1;
                        break;
                    case 5:
                        signalLevel = 0;
                        break;
                    default:
                        // 以防万一
                        signalLevel = 0;
                }
            }

        };
    }

    //-----------------------------------
    //----------设备信息------------------
    //-----------------------------------
    public static String getMobileType()
    {
        String type = "未知";
        TelephonyManager iPhoneManager = (TelephonyManager) myContext.getSystemService(Context.TELEPHONY_SERVICE);
        String iNumeric = iPhoneManager.getSimOperator();
        if (iNumeric.length() > 0)
        {
            if (iNumeric.equals("46000") || iNumeric.equals("46002"))
            {
                type =  "中国移动";
            }
            else if (iNumeric.equals("46001"))
            {
                type =  "中国联通";
            }
            else if (iNumeric.equals("46003"))
            {
                type =  "中国电信";
            }
        }
        return type;
    }

    public static String getDeviceBrand() {
        String brand =  "";
        try {
            brand = android.os.Build.BRAND;
        }  catch (Exception e) {
            System.out.println("getDeviceBrand error");
            e.printStackTrace();
        }
        return brand;
    }

    public String getHostIpAddress() {
        WifiManager wifiMgr = (WifiManager) myContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        try {
            WifiInfo wifiInfo = wifiMgr.getConnectionInfo();
            int ip = wifiInfo.getIpAddress();
            return ((ip & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF));
        } catch (Exception e) {
        }
        return "0.0.0.0";
    }

    public static boolean hasSdcard() {
        String status = Environment.getExternalStorageState();
        if (status.equals(Environment.MEDIA_MOUNTED)) {
            return true;
        } else {
            return false;
        }
    }

    public static String getSystemVersion() {
        String verStr = "";
        try {
            verStr = android.os.Build.VERSION.RELEASE;
        }  catch (Exception e) {
            System.out.println("getSystemVersion error");
            e.printStackTrace();
        }
        return verStr;
    }

    /**
     * 获取手机型号
     *
     * @return  手机型号
     */
    public static String getSystemModel() {
        String model =  "";
        try {
            model = android.os.Build.MODEL;
        }  catch (Exception e) {
            System.out.println("getSystemModel error");
            e.printStackTrace();
        }
        return model;
    }

    //-----------------------------------
    //----------系统功能------------------
    //-----------------------------------
    public static String getBundleID() {
        String packageName = "";
        try {
            // ---get the package info---
            packageName = myContext.getPackageName();
            if (packageName == null || packageName.length() <= 0) {
                return "";
            }
        } catch (Exception e) {
            Log.e("VersionInfo", "Exception", e);
        }
        return packageName;
    }

    private boolean isNetworkConnected() {
        ConnectivityManager cm = (ConnectivityManager) myContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm != null) {
            NetworkInfo networkInfo = cm.getActiveNetworkInfo();
            ArrayList networkTypes = new ArrayList();
            networkTypes.add(ConnectivityManager.TYPE_WIFI);
            try {
                networkTypes.add(ConnectivityManager.class.getDeclaredField("TYPE_ETHERNET").getInt(null));
            } catch (NoSuchFieldException nsfe) {
            } catch (IllegalAccessException iae) {
                throw new RuntimeException(iae);
            }
            if (networkInfo != null && networkTypes.contains(networkInfo.getType())) {
                return true;
            }
        }
        return false;
    }

    @SuppressLint("MissingPermission")
    public static String getOpenUDID() {
        if (!PermissionManager.checkPermissions(10005)) {
            return "null|null|null";
        }
        final TelephonyManager tm = (TelephonyManager) myContext.getSystemService(Context.TELEPHONY_SERVICE);
        final String tmDevice, tmSerial, tmPhone, androidId;
        tmDevice = "" + tm.getDeviceId();
        tmSerial = "" + tm.getSimSerialNumber();
        WifiManager wm = (WifiManager) myContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        String new_mac = XsdkTool.getAdresseMAC(myContext);
        String uniqueId = tmDevice+"|" + tmSerial+"|" + new_mac;
        Log.d("debug","uuid="+uniqueId);
        return uniqueId;
    }

    public static String getAppVersionName() {
        String versionName = "";
        try {
            // ---get the package info---
            PackageManager pm = myContext.getPackageManager();
            PackageInfo pi = pm.getPackageInfo(myContext.getPackageName(), 0);
            versionName = pi.versionName;
            if (versionName == null || versionName.length() <= 0) {
                return "";
            }
        } catch (Exception e) {
            Log.e("VersionInfo", "Exception", e);
        }
        return versionName;
    }

    public static void openWebURL(String url) {
        Log.v("NativeInterface", "openWebURL:" + url);
        Intent mIntent = new Intent(Intent.ACTION_VIEW);
        mIntent.setData(Uri.parse(url));
        mActivity.startActivity(mIntent);
    }

    public static void copyStr(String copys) {
        ClipData myClip = ClipData.newPlainText("text", copys);
        myClipboard.setPrimaryClip(myClip);
    }

    public static String getBoardString()
    {
        ClipData.Item item= null;
        //无数据的时候直接返回
        if(!myClipboard.hasPrimaryClip())
        {
            return "";
        }
        if(myClipboard.getPrimaryClipDescription().hasMimeType(ClipDescription.MIMETYPE_TEXT_PLAIN))
        {
            ClipData cdText = myClipboard.getPrimaryClip();
            if (cdText!=null){
                item = cdText.getItemAt(0);
                if(item.getText()!=null)
                {
                    return item.getText().toString().trim();
                }
            }
        }
        return "";
    }

    /**
     * 手机震动
     */
    public static void shakePhone(int shakeTime){
        Vibrator vib = (Vibrator) mActivity
                .getSystemService(Service.VIBRATOR_SERVICE);
        vib.vibrate(shakeTime);
    }

    /**
     * 根据包名查看app是否安装
     */
    public static boolean checkIsAppInstalled(String packageName) {
        boolean isInstalled = false;
        final PackageManager packageManager = myContext.getPackageManager();
        List<PackageInfo> packageInfos = packageManager.getInstalledPackages(0);
        if (packageInfos != null) {
            for (int i = 0; i < packageInfos.size(); i++) {
                String packName = packageInfos.get(i).packageName;
                if (packName.equals(packageName)) {
                    isInstalled = true;
                    break;
                }
            }
        }
        return isInstalled;
    }

    public static String checkIsAppsInstalled(final String packageNameList) {
        String result = "";
        String[] packageList = packageNameList.split(",");
        for (int i = 0; i < packageList.length; i++) {
            boolean isInstalled = checkIsAppInstalled(packageList[i]);
            String tmpResult = packageList[i] + ":" + (isInstalled ? "true" : "false");
            result = result + tmpResult + ",";
        }
        if (result.length() > 1) {
            result = result.substring(0, result.length() -1);
        }
        return result;
    }

    public static void openApp(final String bundleid, final String sendData) {
        PackageManager pm = mActivity.getPackageManager();
        Intent intent = new Intent();
        intent = pm.getLaunchIntentForPackage(bundleid);
        if (intent != null) {
            if (!"".equals(sendData)) {
                intent.putExtra("data_xianlai", sendData);
            }
            mActivity.startActivityForResult(intent, OPEN_OTHER_APP_REQ_CODE);
        }
    }

    public static String getAppList() {
        String appListStr = "";
        String mManufacturer = android.os.Build.MANUFACTURER;
        String ignoreKey = "com." + mManufacturer.toLowerCase() + ".";
        final PackageManager packageManager = myContext.getPackageManager();
        List<PackageInfo> packageInfos = packageManager.getInstalledPackages(0);
        if (packageInfos != null) {
            for (int i = 0; i < packageInfos.size(); i++) {
                String packName = packageInfos.get(i).packageName;
                if (!packName.contains("com.android.") && !"android".equals(packName) && !packName.contains("com.google.") && !packName.contains(ignoreKey)) {
                    appListStr = appListStr + packName + ",";
                }
            }
        }
        if (appListStr.length() > 1) {
            appListStr = appListStr.substring(0, appListStr.length()-1);
        }
        return appListStr;
    }

    public static void openAppFromMarket(String packageName) {
        try {
            if ("".equals(packageName) || packageName == null) {
                packageName = myContext.getPackageName();
            }
            Intent i = new Intent(Intent.ACTION_VIEW);
            i.setData(Uri.parse("market://details?id="+packageName));
            if (checkIsAppInstalled("com.tencent.android.qqdownloader")) {
                i.setPackage("com.tencent.android.qqdownloader");
                myContext.startActivity(i);
            }

        } catch (Exception e) {
            //Toast.makeText(myContext, "您的手机上没有安装Android应用市场", Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        }
    }

    public static boolean saveImageToSystemAlbum(final String imagePath, String dirName) {
        Bitmap bmp =  BitmapFactory.decodeFile(imagePath);
        // 首先保存图片
        String storePath = Environment.getExternalStorageDirectory().getAbsolutePath();
        if (!"".equals(dirName)) {
            storePath = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + dirName;
        }
        // 首先保存图片
        File appDir = new File(storePath);
        if (!appDir.exists()) {
            appDir.mkdir();
        }
        String fileName = System.currentTimeMillis() + ".jpg";
        File file = new File(appDir, fileName);
        try {
            FileOutputStream fos = new FileOutputStream(file);
            //通过io流的方式来压缩保存图片
            boolean isSuccess = bmp.compress(Bitmap.CompressFormat.JPEG, 60, fos);
            fos.flush();
            fos.close();
            //保存图片后发送广播通知更新数据库
            Uri uri = Uri.fromFile(file);
            myContext.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, uri));
            if (isSuccess) {
                return true;
            } else {
                return false;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CAMERA_REQ_CODE && resultCode == Activity.RESULT_OK) {
            Log.v(TAG, "拍摄完成");
            myContext.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, mPhotoUri));
            new AlertDialog.Builder(myContext)
                    .setTitle("保存成功")
                    .setMessage("请到相册中查看保存的图片。")
                    .setPositiveButton("确定", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                        }
                    })
                    .create().show();
        }
        else if (requestCode == OPEN_OTHER_APP_REQ_CODE && resultCode == Activity.RESULT_OK) {
            Log.d(TAG, "send data to app success");
        }
    }

    public static void openCamera() {
        String cameraPath= Environment.getExternalStorageDirectory() + File.separator + Environment.DIRECTORY_DCIM+File.separator+"Camera"+File.separator;
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date = new Date(System.currentTimeMillis());
        String fileName = format.format(date);
        File photoFile = new File(cameraPath, fileName + ".jpg");
        mPhotoUri = Uri.fromFile(photoFile);
        cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, mPhotoUri);
        mActivity.startActivityForResult(cameraIntent, CAMERA_REQ_CODE);
    }

    public static void sendMsgBySMS(final String phonenum, final String msg) {
        Uri uri2 = Uri.parse("smsto:"+phonenum);
        Intent intentMessage = new Intent(Intent.ACTION_SENDTO,uri2);
        intentMessage.putExtra("sms_body", msg);
        mActivity.startActivity(intentMessage);
    }

    public static String getMyPhoneNum() {
        if (!PermissionManager.checkPermissions(10005)) {
            return null;
        }
        TelephonyManager tm = (TelephonyManager)mActivity.getSystemService(Context.TELEPHONY_SERVICE);
        @SuppressLint("MissingPermission") String te1  = tm.getLine1Number();//获取本机号码
        if (te1 == null) {
            te1 = "";
        }
        return te1;
    }

    @SuppressLint("MissingPermission")
    public static boolean phoneIsInUse(){
        boolean phoneInUse = false;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            TelecomManager tm = (TelecomManager)myContext.getSystemService(Context.TELECOM_SERVICE);
            phoneInUse = tm.isInCall();
        } else {
            phoneInUse = false;
        }
        return phoneInUse;
    }

    public static boolean isMicAvailability() {
        boolean available = true;
        if (phoneIsInUse()) {
            return false;
        }
        AudioRecord recorder = new AudioRecord(MediaRecorder.AudioSource.MIC, 44100, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_DEFAULT, 44100);
        try {
            if (recorder.getRecordingState() != AudioRecord.RECORDSTATE_STOPPED) {
                available = false;
            }
            recorder.startRecording();
            if(recorder.getRecordingState() != AudioRecord.RECORDSTATE_RECORDING){
                recorder.stop();
                available = false;

            }
            recorder.stop();
        } finally {
            recorder.release();
            recorder = null;
        }
        return available;
    }

    public static void setBackKeyEnabled(boolean isenable) {
        mIsBackKeyEnabled = isenable;
    }

    public static boolean isBackKeyEnabled() {
        return mIsBackKeyEnabled;
    }

    public static String getGameName() {
        return mActivity.getString(R.string.app_name);
    }

    private static void startInstallPermissionSettingActivity() {
        //注意这个是8.0新API
        Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
        mActivity.startActivityForResult(intent, 1000);
    }

    public static void installApk(final String apkPath) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        File apk = new File(apkPath);
        if (apk.exists()) {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N) {
                intent.setDataAndType(Uri.fromFile(apk), "application/vnd.android.package-archive");
            } else {//Android7.0之后获取uri要用contentProvider
                String authority = getBundleID()+".fileprovider";
                Uri uri = FileProvider.getUriForFile(myContext, authority, apk);
                intent.setDataAndType(uri, "application/vnd.android.package-archive");
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            }
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            myContext.startActivity(intent);
        }
    }

    public static void downloadPause() {
        FileDownloader.getImpl().pause(downloadId);
    }

    public static void downloadCancel() {
        resetDownloadState();
        FileDownloader.getImpl().clear(downloadId, downloadPath);
        new File(downloadPath).delete();
        new File(FileDownloadUtils.getTempPath(downloadPath)).delete();
    }

    //下载进度
    public static String getDownloadProgress() {
        JSONObject downloadInfo = new JSONObject();
        try {
            downloadInfo.put("speed", downloadSpeed);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            downloadInfo.put("downloadState", downloadState);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            downloadInfo.put("downloadPath", downloadPath);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            downloadInfo.put("curDownloadBytes", curDownloadBytes);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            downloadInfo.put("totalBytes", fileTotaBytes);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if ("success".equals(downloadState)) {
            resetDownloadState();
        }

        return downloadInfo.toString();
    }

    public static void resetDownloadState() {
        curDownloadBytes = 0;
        fileTotaBytes = 0;
        downloadSpeed = "0";
        downloadState = "none";
        downloadPath = "";
        DOWNLOAD_URL = "";
    }

    //检测根目录下是否存在某文件
    public static boolean checkFileExist(final String fileName) {
        try
        {
            String strFile = Environment.getExternalStorageDirectory().getPath() + "/" + fileName;
            File f=new File(strFile);
            if(!f.exists())
            {
                return false;
            }
        }
        catch (Exception e)
        {
            return false;
        }
        return true;
    }

    public static boolean deleteFile(final String fileName) {
        try
        {
            String strFile = Environment.getExternalStorageDirectory().getPath() + "/" + fileName;
            File f=new File(strFile);
            if (f.exists()) {
                return f.delete();
            }
        }
        catch (Exception e)
        {
            return false;
        }
        return true;
    }

    public static void downloadFile(String downloadUrl, final String fileName) {
        DOWNLOAD_URL = downloadUrl;
        downloadPath = Environment.getExternalStorageDirectory().getPath() + "/" + fileName;
        downloadTask = FileDownloader.getImpl().create(downloadUrl)
                .setPath(downloadPath)
                .setCallbackProgressTimes(300)
                .setListener(new FileDownloadListener() {
                    @Override
                    protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        curDownloadBytes = soFarBytes;
                        fileTotaBytes = totalBytes;
                    }
                    @Override
                    protected void progress(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        curDownloadBytes = soFarBytes;
                        fileTotaBytes = totalBytes;
                        downloadSpeed = task.getSpeed()+"KB/s";
                        downloadState = "running";
                    }
                    @Override
                    protected void completed(BaseDownloadTask task) {
                        downloadState = "success";
                        downloadPath = task.getTargetFilePath();
                        downloadTask = null;
                    }
                    @Override
                    protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        curDownloadBytes = soFarBytes;
                        fileTotaBytes = totalBytes;
                        downloadState = "pause";
                        downloadSpeed = task.getSpeed()+"KB/s";
                    }
                    @Override
                    protected void error(BaseDownloadTask task, Throwable e) {
                        resetDownloadState();
                        downloadState = String.format("fail");
                    }
                    @Override
                    protected void warn(BaseDownloadTask task) {
                        Log.d("down state:", task.getStatus()+"");
                    }
                });
        downloadId = downloadTask.start();
    }

    //检测是否是模拟器
    public static String CheckEmulatorBuild(){
        String BOARD =android.os.Build.BOARD;
        String BOOTLOADER =android.os.Build.BOOTLOADER;
        String BRAND =android.os.Build.BRAND;
        String DEVICE =android.os.Build.DEVICE;
        String HARDWARE =android.os.Build.HARDWARE;
        String MODEL =android.os.Build.MODEL;
        String PRODUCT =android.os.Build.PRODUCT;
        String SERIAL = android.os.Build.SERIAL;
        if(BRAND.equals("generic") ||DEVICE.equals("generic")
                ||MODEL.equals("sdk") ||PRODUCT.equals("sdk")
                ||HARDWARE.equals("goldfish") || BRAND.toLowerCase().equals("android")
                || MODEL.toLowerCase().contains("sdk"))
        {
            Log.v("Result:","Find Emulator by EmulatorBuild!");
            return "1";
        }
        if (hasEmulatorFile()) {
            Log.v(TAG, "fount Emulator file");
            return "1";
        }
        return "0";
    }

    private static boolean hasEmulatorFile() {
        for (String filepath : ConstString.emulatorFiles) {
            File emulatorfile = new File(filepath);
            if (emulatorfile.exists()) {
                return true;
            }
        }
        return false;
    }

    private static String insertImageToSystem(Context context, String imagePath) {
        String url = "";
        try {
            url = MediaStore.Images.Media.insertImage(context.getContentResolver(), imagePath, "", "shareimage");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return url;
    }

    public static void shareFromSystem(String sType, String imgPath, String desc, String pName) {
        Intent shareIntent = new Intent(Intent.ACTION_SEND);
        shareIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if ("text".equals(sType)) {
            shareIntent.setType("text/plain");
            shareIntent.putExtra(Intent.EXTRA_TEXT, desc);
        }
        else {
            shareIntent.setType("image/*");
            Log.d("imagepath:", imgPath);
            // 首先保存图片
            String storePath = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "Pictures";
            // 首先保存图片
            File appDir = new File(storePath);
            if (!appDir.exists()) {
                appDir.mkdir();
            }
            String imageUri = insertImageToSystem(myContext, imgPath);
            shareIntent.putExtra(Intent.EXTRA_STREAM,Uri.parse(imageUri));
        }

        if ("wechat".equals(pName)) {
            shareIntent.setPackage("com.tencent.mm");
            ComponentName comp = new ComponentName("com.tencent.mm",
                    "com.tencent.mm.ui.tools.ShareImgUI");
            shareIntent.setComponent(comp);
            List<ResolveInfo> activities = myContext.getPackageManager().queryIntentActivities(shareIntent, 0);
            if (!activities.isEmpty()) {
                myContext.startActivity(shareIntent);
            }
        }
        else if ("wechatpyq".equals(pName) && "image".equals(sType)) {
            shareIntent.setPackage("com.tencent.mm");
            ComponentName comp = new ComponentName("com.tencent.mm",
                    "com.tencent.mm.ui.tools.ShareToTimeLineUI");
            shareIntent.setComponent(comp);
            List<ResolveInfo> activities = myContext.getPackageManager().queryIntentActivities(shareIntent, 0);
            if (!activities.isEmpty()) {
                myContext.startActivity(shareIntent);
            }
        }
        else if ("cnchat".equals(pName)) {
            shareIntent.setPackage("com.aides.brother.brotheraides");
            List<ResolveInfo> activities = myContext.getPackageManager().queryIntentActivities(shareIntent, 0);
            if (!activities.isEmpty()) {
                myContext.startActivity(shareIntent);
            }
        }
        else {
            myContext.startActivity(Intent.createChooser(shareIntent, "分享"));
        }
    }

    public static void hideNavigationBar() {
        View decorView = mActivity.getWindow().getDecorView();
        int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_FULLSCREEN;
        decorView.setSystemUiVisibility(uiOptions);
    }

    //-----------------------------------
    //----------电量------------------
    //-----------------------------------
    public static class BatteryReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context arg0, Intent arg1) {
            int rawlevel = arg1.getIntExtra("level", -1);// 获得当前电量
            int scale = arg1.getIntExtra("scale", -1); // 获得总电量
            int level = -1;
            if (rawlevel >= 0 && scale > 0) {
                level = (rawlevel * 100) / scale;
            }
            mBatteryLevel = level;
        }
    }

    // 电量
    public static String getDeviceBattery() {
        Log.v("NativeInterface", "mBatteryLevel:" + String.valueOf(mBatteryLevel));
        return String.valueOf(mBatteryLevel);
    }

    //-----------------------------------
    //----------网络------------------
    //-----------------------------------
    // 网络类型
    private static final int NETWORK_TYPE_UNAVAILABLE = -1;
    private static final int NETWORK_TYPE_WIFI = -101;
    private static final int NETWORK_CLASS_WIFI = -101;
    private static final int NETWORK_CLASS_UNAVAILABLE = -1;
    /** Unknown network class. */
    private static final int NETWORK_CLASS_UNKNOWN = 0;
    /** Class of broadly defined "2G" networks. */
    private static final int NETWORK_CLASS_2_G = 1;
    /** Class of broadly defined "3G" networks. */
    private static final int NETWORK_CLASS_3_G = 2;
    /** Class of broadly defined "4G" networks. */
    private static final int NETWORK_CLASS_4_G = 3;
    // 适配低版本手机
    /** Network type is unknown */
    public static final int NETWORK_TYPE_UNKNOWN = 0;
    /** Current network is GPRS */
    public static final int NETWORK_TYPE_GPRS = 1;
    /** Current network is EDGE */
    public static final int NETWORK_TYPE_EDGE = 2;
    /** Current network is UMTS */
    public static final int NETWORK_TYPE_UMTS = 3;
    /** Current network is CDMA: Either IS95A or IS95B */
    public static final int NETWORK_TYPE_CDMA = 4;
    /** Current network is EVDO revision 0 */
    public static final int NETWORK_TYPE_EVDO_0 = 5;
    /** Current network is EVDO revision A */
    public static final int NETWORK_TYPE_EVDO_A = 6;
    /** Current network is 1xRTT */
    public static final int NETWORK_TYPE_1xRTT = 7;
    /** Current network is HSDPA */
    public static final int NETWORK_TYPE_HSDPA = 8;
    /** Current network is HSUPA */
    public static final int NETWORK_TYPE_HSUPA = 9;
    /** Current network is HSPA */
    public static final int NETWORK_TYPE_HSPA = 10;
    /** Current network is iDen */
    public static final int NETWORK_TYPE_IDEN = 11;
    /** Current network is EVDO revision B */
    public static final int NETWORK_TYPE_EVDO_B = 12;
    /** Current network is LTE */
    public static final int NETWORK_TYPE_LTE = 13;
    /** Current network is eHRPD */
    public static final int NETWORK_TYPE_EHRPD = 14;
    /** Current network is HSPA+ */
    public static final int NETWORK_TYPE_HSPAP = 15;

    private static String networkType;
    public static String getInternetStatus() {
        int networkClass = getNetworkClass();
        String type = "-1";  //未知
        switch (networkClass) {
            case NETWORK_CLASS_UNAVAILABLE:
                type = "0";
                break;
            case NETWORK_CLASS_WIFI:
                type = "5";
                break;
            case NETWORK_CLASS_2_G:
                type = "1";
                break;
            case NETWORK_CLASS_3_G:
                type = "2";
                break;
            case NETWORK_CLASS_4_G:
                type = "3";
                break;
            case NETWORK_CLASS_UNKNOWN:
                type = "-1";
                break;
        }
        networkType = type;
        return type;
    }

    private static int getNetworkClass() {
        int networkType = NETWORK_TYPE_UNKNOWN;
        ConnectivityManager connectMgr = (ConnectivityManager) myContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo network = connectMgr.getActiveNetworkInfo();
        if (network == null) {
            return NETWORK_TYPE_UNAVAILABLE;
        }
        int type = network.getType();
        if (type == ConnectivityManager.TYPE_WIFI) {
            networkType = NETWORK_TYPE_WIFI;
        } else if (type == ConnectivityManager.TYPE_MOBILE) {
            TelephonyManager telephonyManager = (TelephonyManager) myContext
                    .getSystemService(Context.TELEPHONY_SERVICE);
            networkType = telephonyManager.getNetworkType();
        }
        return getNetworkClassByType(networkType);
    }

    // wifi信号强度
    @NonNull
    public static String getDeviceSignalLevel() {
        Log.v("NativeInterface", "signalLevel:" + String.valueOf(signalLevel));
        return String.valueOf(signalLevel);
    }

    // 非wifi信号强度
    @NonNull
    public static String getDeviceNoWifiLevel() {
        return String.valueOf(noWifiSignalLevel);
    }

    // 网络类型
    public static String getDeviceSignalStatus() {
        return getInternetStatus();
    }

    private static int getNetworkClassByType(int networkType) {
        switch (networkType) {
            case NETWORK_TYPE_UNAVAILABLE:
                return NETWORK_CLASS_UNAVAILABLE;
            case NETWORK_TYPE_WIFI:
                return NETWORK_CLASS_WIFI;
            case NETWORK_TYPE_GPRS:
            case NETWORK_TYPE_EDGE:
            case NETWORK_TYPE_CDMA:
            case NETWORK_TYPE_1xRTT:
            case NETWORK_TYPE_IDEN:
                return NETWORK_CLASS_2_G;
            case NETWORK_TYPE_UMTS:
            case NETWORK_TYPE_EVDO_0:
            case NETWORK_TYPE_EVDO_A:
            case NETWORK_TYPE_HSDPA:
            case NETWORK_TYPE_HSUPA:
            case NETWORK_TYPE_HSPA:
            case NETWORK_TYPE_EVDO_B:
            case NETWORK_TYPE_EHRPD:
            case NETWORK_TYPE_HSPAP:
                return NETWORK_CLASS_3_G;
            case NETWORK_TYPE_LTE:
                return NETWORK_CLASS_4_G;
            default:
                return NETWORK_CLASS_UNKNOWN;
        }
    }

    private static class MyPhoneStateListener extends PhoneStateListener {
        // 监听器类
        /* 得到信号的强度由每个tiome供应商,有更新 */
        @Override
        public void onSignalStrengthsChanged(SignalStrength signalStrength) {
            super.onSignalStrengthsChanged(signalStrength);// 调用超类的该方法，在网络信号变化时得到回答信号
            String str;
            if (!signalStrength.isGsm()) {
                int dBm = signalStrength.getCdmaDbm();
                if (dBm >= -75) {
                    str = "信号强大";
                    noWifiSignalLevel = 3;
                } else if (dBm >= -85) {
                    str = "信号好";
                    noWifiSignalLevel = 2;
                } else if (dBm >= -95) {
                    str = "信号适中";
                    noWifiSignalLevel = 2;
                } else if (dBm >= -100) {
                    str = "信号差";
                    noWifiSignalLevel = 1;
                } else {
                    str = "没有信号或者未知信号";
                    noWifiSignalLevel = 0;
                }
            } else {
                int asu = signalStrength.getGsmSignalStrength();
                if (asu <= 2 || asu == 99) {
                    str = "没有信号或者未知信号";
                    noWifiSignalLevel = 0;
                } else if (asu >= 12) {
                    str = "信号强大";
                    noWifiSignalLevel = 3;
                } else if (asu >= 8) {
                    str = "信号好";
                    noWifiSignalLevel = 2;
                } else if (asu >= 5) {
                    str = "信号适中";
                    noWifiSignalLevel = 2;
                } else {
                    str = "信号差";
                    noWifiSignalLevel = 1;
                }
            }
        }
    }

    //锁屏监听
    private static class LockScreenReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action=intent.getAction();
            String screenEvent = "";
            if(action.equals(Intent.ACTION_SCREEN_ON)){
                screenEvent = "ACTION_SCREEN_ON";
            }else if(action.equals(Intent.ACTION_SCREEN_OFF)){
                screenEvent = "ACTION_SCREEN_OFF";
            }else if(action.equals(Intent.ACTION_USER_PRESENT)){
                screenEvent = "ACTION_USER_PRESENT";
            }
            final String finalScreenEvent = screenEvent;
            ((AppActivity) myContext).runOnGLThread(new Runnable(){
                @Override
                public void run() {
                    final String evalStr = "cuckoo.NativeInterFace.onLockNotify(" + finalScreenEvent + ")";
                    Log.v("NativeInterface", "锁屏通知:" + evalStr);
                    Cocos2dxJavascriptJavaBridge.evalString(evalStr);
                }
            });
        }
    }

    private static void setWindowBrightness(int brightness) {
        Log.v("NativeInterface", "设置电量:" + brightness);
//        Window window = mActivity.getWindow();
//        WindowManager.LayoutParams lp = window.getAttributes();
//        lp.screenBrightness = brightness / 255.0f;
//        window.setAttributes(lp);
    }

    private static int getScreenBrightness() {
        ContentResolver contentResolver = mActivity.getContentResolver();
        int defVal = 125;
        return Settings.System.getInt(contentResolver,
                Settings.System.SCREEN_BRIGHTNESS, defVal);
    }


}