---
title: 利用FragmentTabHost完成底部菜单
published: 2018-08-30 16:16:51
description: '利用FragmentTabHost完成底部菜单'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
![](https://cdn.nlark.com/yuque/0/2020/jpeg/244275/1586007864857-d7c60c69-b8a8-48fb-899c-386be51e22d1.jpeg)



<h1 id="iIdlf">利用FragmentTabHost完成底部菜单</h1>
<h2 id="IF9k9">activity_main.xml</h2>


<!--more-->
```plain
<?xml version="1.0" encoding="utf-8"?>
<!--注意id是系统内部的tabhost-->
<android.support.v4.app.FragmentTabHost xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@android:id/tabhost"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/white">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">
        <!--注意id是系统内部的tabcontent-->
        <FrameLayout
            android:id="@android:id/tabcontent"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:background="@color/tabbar_content_bg" />

        <View
            android:layout_width="match_parent"
            android:layout_height="@dimen/margin_1_dp"
            android:background="@color/tabbar_line_color" />
        <!--注意id是系统内部的tabs-->
        <TabWidget
            android:id="@android:id/tabs"
            android:layout_width="match_parent"
            android:layout_height="@dimen/tabbar_height"
            android:layout_gravity="bottom" />

    </LinearLayout>

</android.support.v4.app.FragmentTabHost>
```



<h2 id="fvDoj">tab_indicator.xml（每个tab对应的布局视图）</h2>


```plain
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:gravity="center"
    android:background="@android:color/white">

    <ImageView
        android:id="@+id/iv_tab"
        android:layout_width="24dp"
        android:layout_height="24dp"
        android:contentDescription="@null"
        android:src="@mipmap/apk_bottom_ic_first"/>

    <TextView
        android:id="@+id/tv_tab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/tabbar_home_text"
        android:textColor="@color/tabbar_text_normal_color"
        android:layout_marginTop="@dimen/margin_2_dp"
        android:textSize="10sp"/>

</LinearLayout>
```



<h2 id="kGxiD">4个fragment</h2>
fragment中大家可能会发现没onCreare()、onCreateView()这些方法，是因为我是基于自己定义的BaseFragment，省去了大部分的写法，大家可以不用太在意

<h3 id="YiuhA">CartFragment.class</h3>


```plain
package com.tc.mobileshop.project.cart.view;

import android.view.View;

import com.tc.mobileshop.R;
import com.tc.mobileshop.mvp.presenter.MvpPresenter;
import com.tc.mobileshop.mvp.view.MvpView;
import com.tc.mobileshop.project.base.view.BaseFrament;

/**
 * 购物车
 * Created by 辉神 on 2016/8/8.
 */

public class CartFragment extends BaseFrament {
    @Override
    protected void initContentView(View contentView) {

    }

    @Override
    public int bindeLayoutId() {
        return R.layout.fragment_cart;
    }


}
```



<h3 id="IMdUI">HomeFragment.class</h3>


```plain
package com.tc.mobileshop.project.home.view;

import android.view.View;

import com.tc.mobileshop.R;
import com.tc.mobileshop.project.base.view.BaseFrament;

/**
 * 主页
 * Created by 辉神 on 2016/8/8.
 */

public class HomeFragment extends BaseFrament {
    @Override
    protected void initContentView(View contentView) {

    }

    @Override
    public int bindeLayoutId() {
        return R.layout.fragment_home;
    }


}
```



<h3 id="zhvJj">MineFragment.class</h3>


```plain
package com.tc.mobileshop.project.mine.view;

import android.view.View;

import com.tc.mobileshop.R;
import com.tc.mobileshop.project.base.view.BaseFrament;

/**
 * 我的
 * Created by 辉神 on 2016/8/8.
 */

public class MineFragment extends BaseFrament {
    @Override
    protected void initContentView(View contentView) {

    }

    @Override
    public int bindeLayoutId() {
        return R.layout.fragment_mine;
    }


}
```



<h3 id="E74KS">TataFragment.class</h3>


```plain
package com.tc.mobileshop.project.tata.view;

import android.view.View;

import com.tc.mobileshop.R;
import com.tc.mobileshop.project.base.view.BaseFrament;

/**
 * 她她圈
 * Created by 辉神 on 2016/8/8.
 */

public class TataFragment extends BaseFrament {
    @Override
    protected void initContentView(View contentView) {

    }

    @Override
    public int bindeLayoutId() {
        return R.layout.fragment_tata;
    }


}
```



<h2 id="e35OD">TabItem.class</h2>


```plain
    /**
     * tab数据
     */
    private class TabItem {
        //正常的tab图片
        private int tabImageNomalRes;
        //tab被点击时的图片
        private int tabImagePressRes;
        //tab标题
        private int tabtextRes;
        //当前tab所属的fragment
        private Class<? extends Fragment> fragmentClass;
        //当前tab的视图
        private View view;
        //当前tab的文字标题
        private TextView tabTitle;
        //当前tab的图标
        private ImageView tabImage;

        public TabItem(
                int tabImageNomalRes,
                int tabImagePressRes,
                int tabtext,
                Class<? extends Fragment> fragmentClass) {
            this.tabImageNomalRes = tabImageNomalRes;
            this.tabImagePressRes = tabImagePressRes;
            this.tabtextRes = tabtext;
            this.fragmentClass = fragmentClass;
        }

        /***
         * 返回tab标题
         *
         * @return
         */
        private String getTitleStr() {
            return (String) getResources().getText(tabtextRes);
        }

        /**
         * 初始化tab中的View，并返回View
         * @return
         */
        public View getIndicator() {
            if (view == null) {
                view = getLayoutInflater().inflate(R.layout.tab_indicator, null);
                tabTitle = (TextView) view.findViewById(R.id.tv_tab);
                tabImage = (ImageView) view.findViewById(R.id.iv_tab);
                tabImage.setImageResource(tabImageNomalRes);//默认正常图片
                tabTitle.setText(getTitleStr());
            }
            return view;
        }

        /**
         * 通过判断是否选中，来变更图片
         *
         * @param checked
         */
        private void setChecked(boolean checked) {
            if (checked) {
                tabTitle.setTextColor(getResources().getColor(R.color.tabbar_text_press_color));
                tabImage.setImageResource(tabImagePressRes);
            } else {
                tabTitle.setTextColor(getResources().getColor(R.color.tabbar_text_normal_color));
                tabImage.setImageResource(tabImageNomalRes);
            }
        }
    }
```



<h2 id="J3v3w">初始化tab数据</h2>


```plain
    /**
     * 初始化tab数据
     */
    private void initTabItemData() {
        tabItems = new ArrayList<>();
        tabItems.add(
				new TabItem(R.mipmap.apk_bottom_ic_first, R.mipmap.apk_bottom_ic_first_up, R.string.tabbar_home_text, HomeFragment.class));
        tabItems.add(
		        new TabItem(R.mipmap.apk_bottom_ic_tata, R.mipmap.apk_bottom_ic_tata_up, R.string.tabbar_tata_text, TataFragment.class));
        tabItems.add(
                new TabItem(R.mipmap.apk_bottom_ic_buy, R.mipmap.apk_bottom_ic_buy_up, R.string.tabbar_cart_text, CartFragment.class));
        tabItems.add(
                new TabItem(R.mipmap.apk_bottom_ic_mine, R.mipmap.apk_bottom_ic_mine_up, R.string.tabbar_mine_text, MineFragment.class));
    }
```



<h2 id="4Yj3P">初始化tabHost</h2>


```plain
    /**
     * 初始化tabHost
     */
    private void initTabHost() {
        fragmentTabHost = (FragmentTabHost) findViewById(android.R.id.tabhost);
        fragmentTabHost.setup(this, getSupportFragmentManager(), android.R.id.tabcontent);
        //去掉tab的分隔线
        fragmentTabHost.getTabWidget().setDividerDrawable(null);
        for (int i = 0; i < tabItems.size(); i++) {
            TabItem tabitem = tabItems.get(i);
            //创建一个Tab
            TabHost.TabSpec tabSpec = fragmentTabHost.newTabSpec(tabitem.getTitleStr()).setIndicator(tabitem.getIndicator());
            //将tab添加到tabHost中
            fragmentTabHost.addTab(tabSpec, tabitem.fragmentClass, null);
            //指定Tab的北景
            fragmentTabHost.getTabWidget().setBackgroundColor(Color.WHITE);
            //设置tab改变的监听
            fragmentTabHost.setOnTabChangedListener(this);
            //首页是默认选中，所以应该设置首页为选中的图片
            if (i == 0) {
                tabitem.setChecked(true);
            }
        }

    }
    /**
     * 监听改变，用于点击时改变图标
     * @param tabId
     */
    @Override
    public void onTabChanged(String tabId) {
        for (int i = 0; i < tabItems.size(); i++) {
            TabItem tabItem = tabItems.get(i);
            if (tabId.equals(tabItem.getTitleStr())) {
                tabItem.setChecked(true);
            } else {
                tabItem.setChecked(false);
            }
        }
    }
```

