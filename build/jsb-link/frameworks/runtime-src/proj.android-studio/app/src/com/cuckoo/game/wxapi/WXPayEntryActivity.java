package com.cuckoo.game.wxapi;


import com.shared.sdk.WXInterface;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.ConstString;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler {
	private IWXAPI api;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		api = WXAPIFactory.createWXAPI(this, ConstString.wxAppID, false);
		api.handleIntent(getIntent(), this);
		super.onCreate(savedInstanceState);
	}

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
		api.handleIntent(intent, this);
	}

	@Override
	public void onReq(BaseReq arg0) {
	}

	@Override
	public void onResp(BaseResp resp) {
		Intent intent = new Intent(this, AppActivity.class);
		intent.putExtra("from", "WX_Pay");
		int code = 3;
		if (resp.errCode == 0) {
			code = 1;
			Toast.makeText(this, "支付成功!", Toast.LENGTH_SHORT).show();
			startActivity(intent);
		} else if (resp.errCode == -2) {
			code = 2;
            Toast.makeText(this, "微信支付取消!", Toast.LENGTH_SHORT).show();
        }else {
			code = 3;
			Toast.makeText(this, "微信支付异常错误!", Toast.LENGTH_SHORT).show();
		}

		intent.putExtra("result", code);
		WXInterface.processIntent(intent);
		finish();
	}

	@Override
	public void onResume() {
		super.onResume();
	}

	@Override
	public void onPause() {
		super.onPause();
	}
}
