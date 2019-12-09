//
//  wxInterface.m
//
#import "wxInterface.h"
#import "WXApi.h"
#import "Constant.h"
#import "WXApiManager.h"
#import "WXApiRequestHandler.h"
#import <UIKit/UIKit.h>

@interface wxInterface ()<WXApiManagerDelegate,UITextViewDelegate>
@property (nonatomic) enum WXScene currentScene;
@property (nonatomic, strong) NSString *appId;
@property (nonatomic, strong) UIScrollView *footView;
@end
@implementation wxInterface

static wxInterface* _instance = nil;
+ (instancetype) shareInstance
{
    static dispatch_once_t onceToken ;
    dispatch_once(&onceToken, ^{
        _instance = [[wxInterface alloc] init] ;
    }) ;
    return _instance ;
}

- (void)attemptDealloc
{
    if ([_instance retainCount] != 1)
        return;
    [_instance release];
    _instance = nil;
}

//向微信注册
- (BOOL)initWeiXinSDK: (UIViewController *) view
{
    NSLog(@"微信注册AppID ");
    [WXApi registerApp:@"wxadf0ba8a4e984ce8" universalLink:@"https://"];
    self.viewController = view;
    [WXApiManager sharedManager].delegate = view;
    return TRUE;
}

/*
 * fun: 微信请求登陆
 * @params: userSession
 * 防止跨战
 */
+ (void)sendWXLoginRequest:(NSString *)userSession
{
    kAuthScope = @"snsapi_userinfo";
    kAuthState = [NSString stringWithFormat:@"%@",userSession];
    [[wxInterface shareInstance] sendAuthRequest];
}

/*
 * fun: 检测是否安装微信应用
 * @params: packetName
 * 固定写死包名，方法与安卓统一
 */
+ (BOOL)checkAppIsInstall:(NSString *)packetName
{
    NSLog(@"checkAppIsInstall %@",packetName);
    BOOL bRet = [WXApi isWXAppInstalled];;
    NSLog(@"bRetIsinstall: %@" ,bRet?@"YES":@"NO");
    return bRet;
}

/*
 * fun: 微信下定单
 */

+ (BOOL)doOrder:(NSString *) data withInfo:(NSString *)orderId;
{
   
    NSData* dataFromString = [[NSData alloc] initWithBase64EncodedString:data options:0];
    NSDictionary *dict;
    NSError* error = nil;
    dict = [NSJSONSerialization JSONObjectWithData: dataFromString
                                           options: NSJSONReadingMutableContainers
                                             error: &error];
    NSLog(@"微信支付： %@", dict);
    int ValueString = [[dict objectForKey:@"timestamp"] intValue];
    //调起微信支付
    PayReq* req             = [[[PayReq alloc] init]autorelease];
    req.partnerId           = [dict objectForKey:@"partnerid"];
    req.prepayId            = [dict objectForKey:@"prepayid"];
    req.nonceStr            = [dict objectForKey:@"noncestr"];
    req.timeStamp           = ValueString;
    req.sign                = [dict objectForKey:@"sign"];
    req.package              = @"Sign=WXPay";
    
    [WXApi sendReq:req completion:NULL];
    return true;
}

//判断字符串是否为空
- (BOOL) isBlankString:(NSString *)string {
    if (string == nil || string == NULL) {
        return YES;
    }
    if ([string isKindOfClass:[NSNull class]]) {
       return YES;
    }
    if ([[string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]] length]==0) {
       return YES;
    }
    return NO;
}

/*
 * fun: 微信分享
 * 字符串参数如果没有的就传空字符串
 * @param {String} pathName 分享图片的本地路径
 * @param {String} title 分享标题
 * @param {String} url 分享的url地址
 * @param {String} description 分享的具体描述
 * @param {int} 分享方式,对于微信而言 0:分享到微信好友，1：分享到微信朋友圈
 * @param {Function} 分享结果的回调方法,参数为channel(渠道),sharePoint(分享点),shareResult(分享结果),awardBean(奖励的游戏豆)
 */
+ (void)doShare: (NSString *)pathName title: (NSString *)title url: (NSString *)url description: (NSString *)description flag: (NSString *)flag
{
    NSString *newPathName = [NSString stringWithFormat:@"%@",pathName];
    NSString *newTitle = [NSString stringWithFormat:@"%@",title];
    NSString *newUrl = [NSString stringWithFormat:@"%@",url];
    NSString *newDescription = [NSString stringWithFormat:@"%@",description];
    int newFlag = [flag intValue];
    //NSString* filePath = [NSHomeDirectory() stringByAppendingFormat:@"/Documents/%@", pathName];
    //NSData *imageData = [NSData dataWithContentsOfFile:filePath];
    //分享图片
    WXImageObject *imageObject = [WXImageObject object];
    imageObject.imageData = UIImageJPEGRepresentation([UIImage imageNamed:pathName], 0.7);
    //标题/icon
    WXMediaMessage *message = [WXMediaMessage message];
    message.title = title;
    [message setThumbImage:[UIImage imageNamed:pathName]];
    //分享网页
    WXWebpageObject *webObject = [WXWebpageObject object];
    webObject.webpageUrl = url;
    BOOL isBlank = [[wxInterface shareInstance] isBlankString:newUrl];
    if (isBlank){
        message.mediaObject = imageObject;
    }else{
        message.mediaObject = webObject;
    }
    SendMessageToWXReq *req = [[SendMessageToWXReq alloc] init];
    req.bText = NO;
    req.message = message;
    req.scene = newFlag;
    [WXApi sendReq:req completion:NULL];
}

+ (UIImage *)thumbnailWithImage:(UIImage *)image size:(CGSize)asize
{
    UIImage *newimage;
    if (nil == image) {
        newimage = nil;
    }
    else{
        UIGraphicsBeginImageContext(asize);
        [image drawInRect:CGRectMake(0, 0, asize.width, asize.height)];
        newimage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
    }
    return newimage;
}

- (void)sendAuthRequest {
    NSLog(@"微信请求登陆");
    SendAuthReq* req =[[[SendAuthReq alloc ] init ] autorelease ];
    req.scope = @"snsapi_userinfo" ;
    req.state = @"" ;
    [WXApi sendReq:req completion:NULL];
}
@end
