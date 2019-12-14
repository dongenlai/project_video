//
//  AlipayInterface.m
//

#import "AlipayInterface.h"
#import <UIKit/UIKit.h>
#import <AlipaySDK/AlipaySDK.h>
#import "ZQStatusBarTool.h"
#import "AlipaySdk/APOrderInfo.h"
#import"AlipaySdk/Utils/APRSASigner.h"


@implementation AlipayInterface

//支付宝支付
+ (BOOL)doOrder: (NSString *) codeInfo;
{
//    codeInfo = [codeInfo substringFromIndex:11];
    NSString *appScheme = @"cuckoo_alipay";
    [[AlipaySDK defaultService] payOrder:codeInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
        NSLog(@"reslut 1= %@",resultDic);
    }];
    return true;
}

+ (NSString *)generateTradeNO
{
    static int kNumber = 15;
    NSString *sourceStr = @"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    NSMutableString *resultStr = [[NSMutableString alloc] init];
    srand((unsigned)time(0));
    for (int i = 0; i < kNumber; i++)
    {
        unsigned index = rand() % [sourceStr length];
        NSString *oneStr = [sourceStr substringWithRange:NSMakeRange(index, 1)];
        [resultStr appendString:oneStr];
    }
    return resultStr;
}


@end
