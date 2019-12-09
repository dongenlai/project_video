//  wxInterface.h

#ifndef wxInterface_h
#define wxInterface_h

#import <Foundation/Foundation.h>

@interface wxInterface : NSObject
@property (nonatomic, assign) UIViewController* viewController;
@property (nonatomic, strong) NSString *lastOrderId;

+ (instancetype) shareInstance ;
- (void)attemptDealloc;
- (BOOL)initWeiXinSDK: (UIViewController *) view;

+ (void)sendWXLoginRequest: (NSString *) userSession;
+ (BOOL)checkAppIsInstall: (NSString*) packetName;
- (void)sendAuthRequest;
- (BOOL) isBlankString:(NSString *)string;

+ (UIImage *)thumbnailWithImage:(UIImage *)image size:(CGSize)asize;
+ (BOOL)doOrder:(NSString *)productID withInfo:(NSString *)orderId;
+ (void)doShare:(NSString *)pathName title: (NSString *)title url: (NSString *)url description: (NSString *)description flag: (NSString *)flag;

@end


#endif /* wxInterface_h */
