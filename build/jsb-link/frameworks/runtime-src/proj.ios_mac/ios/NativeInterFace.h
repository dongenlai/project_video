//
//  NativeInterFace.h
//

#import <Foundation/Foundation.h>

@interface NativeInterFace : NSObject

+ (BOOL)copyToClipboard:(NSString *)str;
+ (NSString*)getAppName;
+ (NSString*)getPackageName;
+ (NSString*)getCurVersion;
+ (NSString*)getBuildVersion;

+ (void)openWebURL:(NSString*)url;


@end
