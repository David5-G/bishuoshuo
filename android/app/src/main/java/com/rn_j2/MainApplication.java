package com.rn_j2;

import android.app.Application;




import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import cn.jpush.reactnativejpush.JPushPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

// code push
import com.microsoft.codepush.react.CodePush;

// umeng
import com.rn_j2.invokenative.RNUMConfigure;
import com.rn_j2.invokenative.AnalyticsModule;
import com.rn_j2.invokenative.DplusReactPackage;

import com.umeng.commonsdk.UMConfigure;






public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

		@Override
		protected String getJSBundleFile() {
		  return CodePush.getJSBundleFile();
		}

	@Override
	public boolean getUseDeveloperSupport() {
	  return BuildConfig.DEBUG;
	}

	@Override
	protected List<ReactPackage> getPackages() {
	  return Arrays.<ReactPackage>asList(
		  	new MainReactPackage(),
            new ReactVideoPackage(),
			new DplusReactPackage(),	// umeng
			new LinearGradientPackage(), // linear gradient
			new RNDeviceInfo(),
			new ReactVideoPackage(),
			new SplashScreenReactPackage(),
			new JPushPackage(!BuildConfig.DEBUG, !BuildConfig.DEBUG),
			new VectorIconsPackage(),
//			  new CodePush("TSc12LV1GGpwnHEQC5f9coQLRrSg100ffbc1-99f4-43dc-9fa8-4426a0c779ce", MainApplication.this, BuildConfig.DEBUG)
				new CodePush("ZDzCjcx041zyeHRdbddRYjhSrx5100ffbc1-99f4-43dc-9fa8-4426a0c779ce", MainApplication.this, BuildConfig.DEBUG)
	  );
	}

	@Override
	protected String getJSMainModuleName() {
		return "index";
		}
	};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);
		RNUMConfigure.init(this,"5c613c4ab465f54ba7000092","Umeng", UMConfigure.DEVICE_TYPE_PHONE,"");

		//initUpush();
	}
}
