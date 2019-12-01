//
//  NativeInterFace.m
//

#import "NativeInterFace.h"
#import <UIKit/UIKit.h>
#import "ZQStatusBarTool.h"


@implementation NativeInterFace

//复制文案到剪贴板
+ (BOOL)copyToClipboard:(NSString *)str;
{
    NSLog(@"复制文本%@", str);
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    pasteboard.string = str;
}

+ (NSString*)getPackageName{
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *packageName = [infoDictionary objectForKey:@"CFBundleIdentifier"];
    return packageName;
}

//获取APP名字
+ (NSString*)getAppName{
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *appCurName = [infoDictionary objectForKey:@"CFBundleDisplayName"];
    return appCurName;
}

//获取当前应用到版本号
+ (NSString*)getCurVersion{
    NSDictionary *info= [[NSBundle mainBundle] infoDictionary];
    NSString *version = info[@"CFBundleShortVersionString"];
    return version;
}

//获取标识内部版本号
+ (NSString*)getBuildVersion{
    NSDictionary *info= [[NSBundle mainBundle] infoDictionary];
    NSString *version = info[@"CFBundleVersion"];
    return version;
}

+ (void)openWebURL:(NSString*) url{
    NSLog(@"url: %@", url);
    NSURL *URL = [NSURL URLWithString:url];
    [[UIApplication sharedApplication]openURL:URL];
}

@end
