package com.rn_j2;



import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;   // umeng
import org.devio.rn.splashscreen.SplashScreen;  // splashscreen
import android.os.Bundle;




import cn.jpush.android.api.BasicPushNotificationBuilder;
import cn.jpush.android.api.CustomPushNotificationBuilder;
import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.api.JPushMessage;
import cn.jpush.android.data.JPushLocalNotification;
import cn.jpush.android.service.JPushMessageReceiver;


public class MainActivity extends ReactActivity {

    
    /* umeng  start*/
    @Override
    protected void onCreate(Bundle savedInstanceState){
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        MobclickAgent.setSessionContinueMillis(1000);
        // MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_DUM_NORMAL);
        // MobclickAgent.openActivityDurationTrack(false);


        JPushInterface.init(this); //jpush
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);

        JPushInterface.onResume(this);
    }
    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
        JPushInterface.onPause(this); //jpush

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
