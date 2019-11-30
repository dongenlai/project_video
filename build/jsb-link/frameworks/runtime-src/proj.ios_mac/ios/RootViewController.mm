/****************************************************************************
 Copyright (c) 2013      cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#import "RootViewController.h"
#import "cocos2d.h"

#include "platform/CCApplication.h"
#include "platform/ios/CCEAGLView-ios.h"
#import "WXApiManager.h"
#import "wxInterface.h"
#import "Constant.h"
#import "cocos/scripting/js-bindings/jswrapper/SeApi.h"

@implementation RootViewController

/*
// The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
// Custom initialization
}
return self;
}
*/

// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
    // Set EAGLView as view of RootViewController
    self.view = (__bridge CCEAGLView *)cocos2d::Application::getInstance()->getView();
}

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
}


// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
#ifdef __IPHONE_6_0
- (NSUInteger) supportedInterfaceOrientations{
    return UIInterfaceOrientationMaskAllButUpsideDown;
}
#endif

- (BOOL) shouldAutorotate {
    return YES;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation {
    [super didRotateFromInterfaceOrientation:fromInterfaceOrientation];
}

//fix not hide status on ios7
- (BOOL)prefersStatusBarHidden {
    return YES;
}

// Controls the application's preferred home indicator auto-hiding when this view controller is shown.
- (BOOL)prefersHomeIndicatorAutoHidden {
    return YES;
}

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - WXApiManagerDelegate
- (void)managerDidRecvGetMessageReq:(GetMessageFromWXReq *)req {
    // 微信请求App提供内容， 需要app提供内容后使用sendRsp返回
    NSString *strTitle = [NSString stringWithFormat:@"微信请求App提供内容"];
    NSString *strMsg = [NSString stringWithFormat:@"openID: %@", req.openID];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:strTitle
                                                    message:strMsg
                                                   delegate:self
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil, nil];
    alert.tag = kRecvGetMessageReqAlertTag;
    [alert show];
    [alert release];
}

//显示微信传过来的内容
- (void)managerDidRecvShowMessageReq:(ShowMessageFromWXReq *)req {
    WXMediaMessage *msg = req.message;
    WXAppExtendObject *obj = msg.mediaObject;
    NSString *strTitle = [NSString stringWithFormat:@"微信请求App显示内容"];
    NSString *strMsg = [NSString stringWithFormat:@"openID: %@, 标题：%@ \n内容：%@ \n附带信息：%@ \n缩略图:%lu bytes\n附加消息:%@\n", req.openID, msg.title, msg.description, obj.extInfo, (unsigned long)msg.thumbData.length, msg.messageExt];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:strTitle
                                                    message:strMsg
                                                   delegate:self
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil, nil];
    [alert show];
    [alert release];
}

- (void)managerDidRecvLaunchFromWXReq:(LaunchFromWXReq *)req {
    WXMediaMessage *msg = req.message;
    //从微信启动App
    NSString *strTitle = [NSString stringWithFormat:@"从微信启动"];
    NSString *strMsg = [NSString stringWithFormat:@"openID: %@, messageExt:%@", req.openID, msg.messageExt];
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:strTitle
                                                    message:strMsg
                                                   delegate:self
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil, nil];
    [alert show];
    [alert release];
}

- (void)managerDidRecvAddCardResponse:(AddCardToWXCardPackageResp *)response {
    NSMutableString* cardStr = [[[NSMutableString alloc] init] autorelease];
    for (WXCardItem* cardItem in response.cardAry) {
        [cardStr appendString:[NSString stringWithFormat:@"cardid:%@ cardext:%@ cardstate:%u\n",cardItem.cardId,cardItem.extMsg,(unsigned int)cardItem.cardState]];
    }
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"add card resp"
                                                    message:cardStr
                                                   delegate:self
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil, nil];
    [alert show];
    [alert release];
}

+ (BOOL)loadHeadImage:(NSString *)fullpath;
{
    //ImageLoader::getInstance()->load([fullpath UTF8String]);
    return false; //test
}

+ (BOOL)screenShot:(NSString *)fullpath withInfo:(NSString *)filename;
{
    NSString* filePath = [NSHomeDirectory() stringByAppendingFormat:@"/Documents/%@", filename];
    UIImage *viewImage = [UIImage imageWithContentsOfFile:filePath];
    if (viewImage != nil) {
        UIImageWriteToSavedPhotosAlbum(viewImage, nil, nil, nil);
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"保存成功" message:filename delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
        [alertView show];
    }
}

//微信登陆认证返回结果
- (void)managerDidRecvAuthResponse:(SendAuthResp *)response {
    NSString *strCode = [NSString stringWithFormat:@"%@", response.code];
    NSString *strState = [NSString stringWithFormat:@"%@", response.state];
    NSString *strRes = @"1";
    NSLog(@"wx_strCode:%@,wx_strState:%@",strCode, strState);
    if(response.errCode==0)
        strRes = @"0";
    NSString *aimStr = [NSString stringWithFormat:@"\"%@\" , \"%@\" , \"%@\" ",strRes,strCode,strState];
    NSString* functionCall = [[NSString alloc] initWithFormat:@"cuckoo.WxInterFace.wXLoginRes(%@)",aimStr];
    se::ScriptEngine::getInstance()->evalString([functionCall cStringUsingEncoding:NSUTF8StringEncoding]);
}

//微信支付返回结果
- (void)managerDidRecvPayResultResponse:(PayResp *)response {
    //支付返回结果，实际支付结果需要去微信服务器端查询
    NSString *strMsg,*strTitle = [NSString stringWithFormat:@"支付结果"];
    switch (response.errCode) {
        case WXSuccess:
        {
            strMsg = @"支付结果：成功！";
            NSLog(@"支付成功－PaySuccess，retcode = %d", response.errCode);
            NSString *aimStr = [NSString stringWithFormat:@"\"%@\" , \"2\" , \"1\" ",[wxInterface shareInstance].lastOrderId];
            NSString* functionCall = [[NSString alloc] initWithFormat:@"PayBZ.notifyPayRes(%@)",aimStr];
            NSLog(@"%@",functionCall);
            se::ScriptEngine::getInstance()->evalString([functionCall cStringUsingEncoding:NSUTF8StringEncoding], NULL);
        }
            break;
        default:
            strMsg = [NSString stringWithFormat:@"支付结果：失败！retcode = %d, retstr = %@", response.errCode,response.errStr];
            NSLog(@"错误，retcode = %d, retstr = %@", response.errCode,response.errStr);
            break;
    }
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:strTitle message:strMsg delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    [alert show];
    [alert release];
}

//微信分享结果回调(微信官方调整无论w用户取消分享还是成功分享在回调结果中都是success)
- (void)managerDidRecvMessageResponse:(SendMessageToWXResp *)response {
    NSString *strRes = @"1";
    if(response.errCode==0)
        strRes = @"0";
    
    NSString *aimStr = [NSString stringWithFormat:@"\"%@\"",strRes];
    NSString* functionCall = [[NSString alloc] initWithFormat:@"cuckoo.WxInterFace.wXShareRes(%@)",aimStr];
    se::ScriptEngine::getInstance()->evalString([functionCall cStringUsingEncoding:NSUTF8StringEncoding]);
}

@end
