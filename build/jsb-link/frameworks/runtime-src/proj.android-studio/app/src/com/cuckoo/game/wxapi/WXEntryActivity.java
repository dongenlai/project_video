package com.cuckoo.game.wxapi;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;
import com.tencent.mm.opensdk.modelmsg.WXAppExtendObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.shared.sdk.WXInterface;
import org.cocos2dx.javascript.AppActivity;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler{
	// IWXAPI 是第三方app和微信通信的openapi接口
	private static IWXAPI wxApi;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.v("WXEntryActivity", "onCreate");
		// 通过WXAPIFactory工厂，获取IWXAPI的实例
		wxApi = WXAPIFactory.createWXAPI(this, WXInterface.getAppID(), false);
		try {
			wxApi.handleIntent(getIntent(), this);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
		wxApi.handleIntent(intent, this);
	}

	// 微信发送请求到第三方应用时，会回调到该方法
	@Override
	public void onReq(BaseReq req) {
		switch (req.getType()) {
		}
	}

	//第三方应用发送到微信的请求处理后的响应结果，会回调到该方法
	@Override
	public void onResp(BaseResp resp) {
		if (resp.getType() == ConstantsAPI.COMMAND_LAUNCH_WX_MINIPROGRAM) {
			WXLaunchMiniProgram.Resp launchMiniProResp = (WXLaunchMiniProgram.Resp) resp;
			String extraData =launchMiniProResp.extMsg; // 对应JsApi navigateBackApplication中的extraData字段数据
			Log.v("wx mini extra:", extraData);
		}

		Intent intent = new Intent(this, AppActivity.class);
		if (resp instanceof SendAuth.Resp) {
			int res = 3;
			switch (resp.errCode) {
				case BaseResp.ErrCode.ERR_OK:
					SendAuth.Resp rep = (SendAuth.Resp) resp;
					res = 1;
					intent.putExtra("code", rep.code);
					intent.putExtra("state", rep.state);
					break;
				case BaseResp.ErrCode.ERR_USER_CANCEL:
					res = 2;
					break;
				case BaseResp.ErrCode.ERR_AUTH_DENIED:
					res = 0;
					break;
			}
			intent.putExtra("from", "WX_Login");
			intent.putExtra("result", res);
		} else {
			int shareResult = 3;
			switch (resp.errCode) {
				case BaseResp.ErrCode.ERR_OK:
					// 分享成功
					shareResult = 1;
					break;
				case BaseResp.ErrCode.ERR_USER_CANCEL:
					// 分享取消
					shareResult = 2;
					break;
				case BaseResp.ErrCode.ERR_AUTH_DENIED:
					// 分享拒绝
					shareResult = 0;
					break;
			}
			intent.putExtra("from", "WX_Share");
			intent.putExtra("result", shareResult);
		}

        WXInterface.processIntent(intent);
		this.finish();
	}
}
