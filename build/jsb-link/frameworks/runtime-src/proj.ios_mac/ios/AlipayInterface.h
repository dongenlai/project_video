//
//  AlipayInterface.h
//

#import <Foundation/Foundation.h>

@interface AlipayInterface : NSObject

//支付宝下单支付
+ (BOOL)doOrder: (NSString *) codeInfo;
+ (NSString *)generateTradeNO;

@end
