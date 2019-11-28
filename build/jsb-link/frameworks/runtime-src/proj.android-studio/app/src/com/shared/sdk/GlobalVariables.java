package com.shared.sdk;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.Application;
import android.content.pm.PackageInfo;

public class GlobalVariables
{
    public static Application application = null;
    public static String packageName = null;
    public static Activity currentActivity = null;
    public static PackageInfo packageInfo = null;
    public static ActivityManager activityManager = null;
}