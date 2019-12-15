//
//  AlipayInterface.m
//

#import "AlipayInterface.h"
#import <UIKit/UIKit.h>
#import <AlipaySDK/AlipaySDK.h>
#import "ZQStatusBarTool.h"


@implementation AlipayInterface

//支付宝单例
static AlipayInterface* _instance = nil;
+ (instancetype) alipayInterface
{
    static dispatch_once_t onceToken ;
    dispatch_once(&onceToken, ^{
        _instance = [[AlipayInterface alloc] init] ;
    }) ;
    return _instance ;
}

//支付宝支付
+ (BOOL)doOrder: (NSString *) codeInfo;
{
    NSString *appScheme = @"cuckooAlipay";
    [[AlipaySDK defaultService] payOrder:codeInfo dynamicLaunch:true fromScheme:appScheme callback:NULL];
    return true;
}

- (BOOL)payRes: (UIViewController *)view recDic: (NSDictionary *)recDic;
{
    NSLog(@"支付宝支付结果回调 %@", recDic);
    NSString *resCode = [recDic objectForKey:@"resultStatus"];
    
//    UIViewController * rootViewController = [AlipayInterface getCurrentVC];
//    if(rootViewController){
        [view aliPayResNotify:resCode];
//    }

    return true;
}

+(UIViewController *)getCurrentVC
{
    UIViewController *rootViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    UIViewController *currentVC = [self getCurrentVCFrom:rootViewController];
    return currentVC;
}

+(UIViewController *)getCurrentVCFrom:(UIViewController *)rootVC
{
    UIViewController *currentVC;
    if ([rootVC presentedViewController]) {
        rootVC = [rootVC presentedViewController];
    }
    if ([rootVC isKindOfClass:[UITabBarController class]]) {
        currentVC = [self getCurrentVCFrom:[(UITabBarController *)rootVC selectedViewController]];
    } else if ([rootVC isKindOfClass:[UINavigationController class]]){
        currentVC = [self getCurrentVCFrom:[(UINavigationController *)rootVC visibleViewController]];
    } else {
        currentVC = rootVC;
    }
    return currentVC;
}

@end
