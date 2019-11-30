//
//  ZQStatusBarTool.m
//

#import "ZQStatusBarTool.h"
#import <UIKit/UIKit.h>
@implementation ZQStatusBarTool

//获取当前电量百分比
+(NSString *)currentBatteryPercent{
    NSArray *infoArray = [[[[UIApplication sharedApplication] valueForKeyPath:@"statusBar"] valueForKeyPath:@"foregroundView"] subviews];
    for (id info in infoArray)
    {
        if ([info isKindOfClass:NSClassFromString(@"UIStatusBarBatteryPercentItemView")])
        {
            NSString *percentString = [info valueForKeyPath:@"percentString"];
            return percentString;
        }
    }
    return @"";
}

//获取当前网络状态
+(NetWorkType )currentNetworkType{
    NSArray *infoArray = [[[[UIApplication sharedApplication] valueForKeyPath:@"statusBar"] valueForKeyPath:@"foregroundView"] subviews];
    NetWorkType type;
    for (id info in infoArray)
    {
        if ([info isKindOfClass:NSClassFromString(@"UIStatusBarDataNetworkItemView")]) {
            type = [[info valueForKeyPath:@"dataNetworkType"] integerValue];
            NSLog(@"----%lu", (unsigned long)type);
            return (NetWorkType)type;
        }
    }
    return NetWorkTypeNone;
}

//获取当前系统时间
+(NSString *)currentTimeString{
    NSArray *infoArray = [[[[UIApplication sharedApplication] valueForKeyPath:@"statusBar"] valueForKeyPath:@"foregroundView"] subviews];
    for (id info in infoArray)
    {
        if ([info isKindOfClass:NSClassFromString(@"UIStatusBarTimeItemView")])
        {
            NSString *timeString = [info valueForKeyPath:@"timeString"];
            NSLog(@"当前显示时间为：%@",timeString);
            return timeString;
        }
    }
    return @"";
}

//获取运营商
+(NSString *)serviceCompany{
    NSArray *infoArray = [[[[UIApplication sharedApplication] valueForKeyPath:@"statusBar"] valueForKeyPath:@"foregroundView"] subviews];
    for (id info in infoArray)
    {
        if ([info isKindOfClass:NSClassFromString(@"UIStatusBarServiceItemView")])
        {
            NSString *serviceString = [info valueForKeyPath:@"serviceString"];
            NSLog(@"运营商为：%@",serviceString);
            return serviceString;
        }
    }
    return @"";
}

//获取信号x强度
+ (int )getSignalStrength{
    UIApplication *app = [UIApplication sharedApplication];
    NSArray *subviews = [[[app valueForKey:@"statusBar"] valueForKey:@"foregroundView"] subviews];
    UIView *dataNetworkItemView = nil;
    for (UIView * subview in subviews) {
        if([subview isKindOfClass:[NSClassFromString(@"UIStatusBarDataNetworkItemView") class]]) {
            dataNetworkItemView = subview;
            break;
        }
    }
    int signalStrength = [[dataNetworkItemView valueForKey:@"_wifiStrengthBars"] intValue];
    NSLog(@"signal %d", signalStrength);
    return signalStrength;
}

//调整屏幕亮度
+ (void)setWindownBrightness: (NSString*) lightValue{
     float value = [lightValue floatValue];
     [[UIScreen mainScreen] setBrightness: value];
}

@end
