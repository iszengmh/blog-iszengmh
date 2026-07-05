---
title: android 报自定义的application无法强制转换成application问题细节解决
published: 2017-08-30 16:16:51
description: 'android 报自定义的application无法强制转换成application问题细节解决'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---

```plain
android.app.Application cannot be cast to com.tc.dragger2mystudyproject.APPApplication
```



我在项目中定义了一个AppApplication继承自Application，在项目中的某一个地方通过getApplicationContext()强制转换成自定义的AppApplication，安正常逻辑AppApplication即是Application的实例，但是报了上面这个错误



问题就在于——

需要在AndroidManifests.xml里面注册我们自己定义的Application



```plain
 <!--加上android:name=".APPApplication"，这是我们自定义的Application，也就是取消默认的application-->
    <application
        android:name=".APPApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
```

