//
//  AlipayInterface.h
//

#import <Foundation/Foundation.h>


@interface AlipayInterface : NSObject


+ (instancetype) alipayInterface ;

//支付宝下单支付
+ (BOOL)doOrder: (NSString *) codeInfo;
- (BOOL)payRes:(UIViewController *)view recDic:(NSDictionary *) recDic;

+ (UIViewController *)getCurrentVC;
+ (UIViewController *)getCurrentVCFrom:(UIViewController *)rootVC;

@end
