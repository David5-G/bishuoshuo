package com.rn_j2;



import com.facebook.react.ReactActivity;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.umeng.analytics.MobclickAgent;   // umeng
import org.devio.rn.splashscreen.SplashScreen;  // splashscreen
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    
    /* umeng  start*/
    @Override
    protected void onCreate(Bundle savedInstanceState){
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        MobclickAgent.setSessionContinueMillis(1000);
        // MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_DUM_NORMAL);
        // MobclickAgent.openActivityDurationTrack(false);
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }
    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }
    /* umeng  end*/

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rn_j2";
    }

}
