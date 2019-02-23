package com.rn_j2;

import android.app.Application;


import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

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
import com.rn_j2.invokenative.DplusReactPackage;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.rn_j2.invokenative.AnalyticsModule;


public class MainApplication extends Application implements ReactApplication {
    {
        PlatformConfig.setWeixin("wx967daebe835fbeac", "5bb696d9ccd75a38c8a0bfe0675559b3");
        PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba");
        PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "http://sns.whalecloud.com");
    }

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
                    new ContextModuleReactPackage(), //与原生通讯
                    new ReactVideoPackage(),
                    new DplusReactPackage(),    // umeng
                    new LinearGradientPackage(), // linear gradient
                    new RNDeviceInfo(),
                    new ReactVideoPackage(),
                    new SplashScreenReactPackage(),
                    new JPushPackage(!BuildConfig.DEBUG, !BuildConfig.DEBUG),
                    new VectorIconsPackage(),
                    //			  new CodePush("yDc9U0TyC_aIzPGPP0DUTjpNrLG5100ffbc1-99f4-43dc-9fa8-4426a0c779ce", MainApplication.this, BuildConfig.DEBUG)
                    new CodePush("h4NhukveG7XQhe9baoHGIZvfiQNw100ffbc1-99f4-43dc-9fa8-4426a0c779ce", MainApplication.this, BuildConfig.DEBUG)
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
        RNUMConfigure.init(this, "5c6a1f84b465f5023600010b", "360", UMConfigure.DEVICE_TYPE_PHONE, "");

        //initUpush();
    }
}
