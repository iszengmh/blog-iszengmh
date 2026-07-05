---
title: 继承SwipeRefreshLayout实现上拉刷新
published: 2017-08-30 16:16:51
description: '继承SwipeRefreshLayout实现上拉刷新'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
![](https://cdn.nlark.com/yuque/0/2020/jpeg/244275/1586007339871-27da9544-b5ae-4c35-b61a-1f0b001b7db1.jpeg)



[来自掘金请点击](https://gold.xitu.io/entry/57ea6d6d8ac247005be4c0e5)

对了，我就通过这篇文章写出这个上拉刷新的，非常感谢他，但是我还是要吐槽一下，因为他里面有个问题并没有提及怎么解决，addFooterView()在setAdapter()后调用无法显示的问题，后面我自己也有写错一个，出现问题，文末我会提示注意事项，下面请看我如何写。



基本逻辑就是：

触摸滚动时，滚动到最后一条数据时，显示底部加载条，并加载数据，数据加载完成隐藏底部加载条



一开始当然是要获取自定义布局所嵌套的子控件，即嵌套的listView嘛，因为要需要addFooterView()嘛



<!--more-->
```plain
if (listView==null) {//这里listview是一个全局变量
			if (getChildCount()>0) {
				for (int i = 0; i < getChildCount(); i++) {
					if (getChildAt(i) instanceof ListView) {
						listView=(ListView) getChildAt(i);
						Log.i(CustomSwipeRefreshLayout, "找到了LIstView");
						initLoadLayout();//初始化加载控件
						setListViewOnScroll();//滚动监听
						break;
					}else {
						Log.i(CustomSwipeRefreshLayout, "不是LIstView的实例");
					}
				}
				Log.i(CustomSwipeRefreshLayout, "LIstView是否为空："+(listView==null));
			}
		}
```



底部刷新的View，我是自己用java写，这样有个好处，下次要用直接一个类拷走，代码看起来好像有点多，其实很简单



```plain
	/**
	 * 初始化底部加载视图
	 */
	private void initLoadLayout() {
		//布局，由于父控件是ListView，所以 LayoutParams 是AbsListView的LayoutParams
		AbsListView.LayoutParams listLayoutParams =new AbsListView.LayoutParams(listView.getLayoutParams()); 
		listLayoutParams.width=LayoutParams.MATCH_PARENT;
		listLayoutParams.height=100;
		loadLayout=new LinearLayout(context);//这里是一个全局变量哦，初始化这个，其他地方就可以用了
		loadLayout.setOrientation(LinearLayout.HORIZONTAL);
		loadLayout.setLayoutParams(listLayoutParams);
		loadLayout.setGravity(Gravity.CENTER_HORIZONTAL);
		//dialog
		android.view.ViewGroup.LayoutParams layoutParams =new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
		ProgressBar progressBar=new ProgressBar(context,null,android.R.attr.progressBarStyleInverse);
		progressBar.setLayoutParams(layoutParams);
		//textview
		android.view.ViewGroup.LayoutParams layoutParams2 =new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
		TextView textView=new TextView(context);
		textView.setText("正在加载.....");
		textView.setTextSize(15);
		textView.setLayoutParams(layoutParams2);
		textView.setGravity(Gravity.CENTER_VERTICAL);
		//设置子控件
		loadLayout.addView(progressBar);
		loadLayout.addView(textView);
	}
```



基本上靠这段代码来判断是否加载的



```plain
/**
	 * 设置滚动监听
	 */
	private void setListViewOnScroll() {
		if (listView!=null) {
			listView.setOnScrollListener(new OnScrollListener() {
				//正在移动
				@Override
				public void onScrollStateChanged(AbsListView view, int scrollState) {
					Log.i(CustomSwipeRefreshLayout, ""+listView.getLastVisiblePosition());
					if (canLoadMore()) {//判断加载条件是否成立
						loadData();//加载数据
					}else {
						Log.i(CustomSwipeRefreshLayout, "不可以加载新数据");	
					}
				}
				
				@Override
				public void onScroll(AbsListView view, int firstVisibleItem,
						int visibleItemCount, int totalItemCount) {
					// TODO Auto-generated method stub
					
				}
			});
		}
	}
```



我们需要先把所有条件成立，即什么时候可以加载数据的条件：

1、是否已经正在加载数据了，正在加载，我们不允许再次加载的，因为一般都执行线程，所以执行太多会卡的

2、是否滑动到最后一个item，所以使用listview.getLastVisblePosition()==(listview.getCount()-1)

3、触摸滑动的距离是否符合我们的标准的



获取触摸，用来判断是否符合滑动距离



```plain
	//获取startY和endY
	@Override
	public boolean dispatchTouchEvent(MotionEvent ev) {
		//按下时
		if (ev.getAction()==MotionEvent.ACTION_DOWN) {
			startY=ev.getY();
		}
		//手指离开时
		else if(ev.getAction()==MotionEvent.ACTION_UP){
			endY=ev.getY();
		}
		return super.dispatchTouchEvent(ev);
	}
```



这个就是加载条件的代码



```plain
/**
	 * 三个条件可以加载数据
	 * 1、滑动距离合适的时候
	 * 2、最后一个条目
	 * 3、没有正在加载数据
	 * @return
	 */
	protected boolean canLoadMore() {
		//判断没有在加载
		boolean condition1=false;
		if (!isLoading){
			condition1=true;
		}
		//判断是最后item并且已显示
		boolean condition2=false;
		if (listView.getLastVisiblePosition()==(listView.getCount()-1)) {
			condition2=true;
		}
		//判断滑动距离是否合适，touchInstance这个设置个差不多就行
		boolean condition3=false;
		if ((startY-endY)>touchInstance) {
			condition3=true;	
		}
		Log.i(CustomSwipeRefreshLayout, "是否正在加载"+condition1+"是否是最后一个并且已经显示出来"+condition2+"触摸距离是否合适"+condition3);		
		return condition1&&condition2&&condition3;
	}
```



所有条件成立之后我们就可以加载数据了



```plain
/**
	 * 接口回调实现自定义加载数据
	 */
	protected void loadData() {
		
		if (onLoadListener!=null) {
			if (loadLayout!=null) {
				addLoadLayout();//添加footerView
			}
			onLoadListener.onLoad();
		}
		
	}
	//调用这个我们自定义刷新控件
		public void setOnLoadListener(OnLoadListener onLoadListener) {
		this.onLoadListener = onLoadListener;
	}
```



那什么时候remove加载条呢



```plain
//外部调用，即用户重写onLoadListener在onload方法中调用即可
	public void setOnload(boolean isLoad){
		isLoading=isLoad;
		if (!isLoad) {
			removeLoadLayout();
		}
	}
```



以下使用方法

XML写法



```plain
<com.tc.customswiperefreshview.CustomSwipeRefreshLayout 
    android:id="@+id/customSwipeRefreshLayout "
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.tc.customswiperefreshview.MainActivity" >
	<ListView 
	    android:id="@+id/listView"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    >
	</ListView>
</com.tc.customswiperefreshview.CustomSwipeRefreshLayout>
```



activity调用



```plain
customSwipeRefreshLayout.setOnLoadListener(new CustomSwipeRefreshLayout.OnLoadListener() {
			
			@Override
			public void onLoad() {
				new Handler().postDelayed(new Runnable() {
					
					@Override
					public void run() {
						if (test) {
							for (int i = 15; i <20; i++) {
								data.add("我是天才"+i);
								test=false;
							}
						}else {
							Toast.makeText(MainActivity.this, "没有数据啦", Toast.LENGTH_SHORT).show();
						}
						customSwipeRefreshLayout.setOnload(false);
						adapter.notifyDataSetChanged();
					}
				}, 1000);
			}
		});
```



接下来是两点注意问题：

1、addFooterView()需要在setAdapter之前调用怎么解决呢，其实我的这个解决也是不怎么好，对，就是重新获取adapter重新适配



```plain
private void addLoadLayout() {
		listView.addFooterView(loadLayout);
		if ( listView.getAdapter() instanceof BaseAdapter) {
			BaseAdapter adapter=(BaseAdapter) listView.getAdapter() ;
			listView.setAdapter(adapter);
			Log.i(CustomSwipeRefreshLayout, "是baseAdapter");
		}else{
			Log.i(CustomSwipeRefreshLayout, "不是baseAdapter");
		}
	}
```



2、之前一直报这个错误

Caused by: java.lang.NoSuchMethodException:  [class android.content.Context, interface android.util.AttributeSet]

出错原因

1）



```plain
public CustomSwipeRefreshLayout(Context context) {
		super(context);
	}
	public CustomSwipeRefreshLayout(Context context, AttributeSet attrs) {//没有生成这个构造方法，所以报错
		super(context, attrs);
		this.context=context;
	}
```



2）



```plain
	private CustomSwipeRefreshLayout(Context context, AttributeSet attrs) {
		super(context, attrs);
		this.context=context;
	}
```



不知道有没有发现什么不一样的，就访问权限，private，说起来也是奇葩，eclipse快捷键自动生成的，居然是private



接下来贴出全部代码



```plain
package com.tc.customswiperefreshview;

import android.content.Context;
import android.support.v4.widget.SwipeRefreshLayout;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.widget.AbsListView;
import android.widget.AbsListView.OnScrollListener;
import android.widget.LinearLayout.LayoutParams;
import android.widget.BaseAdapter;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

public class CustomSwipeRefreshLayout extends SwipeRefreshLayout {
	private static final String CustomSwipeRefreshLayout = "CustomSwipeRefreshLayout";
	public OnLoadListener onLoadListener;
	Context context;
	ListView listView;
	float startY=0;
	float endY=0;
	private static  float touchInstance=150;
	boolean isLoading=false;
	LinearLayout loadLayout;
	public CustomSwipeRefreshLayout(Context context) {
		super(context);
	}
	public CustomSwipeRefreshLayout(Context context, AttributeSet attrs) {
		super(context, attrs);
		this.context=context;
	}
	@Override
	protected void onLayout(boolean changed, int left, int top, int right,
			int bottom) {
		if (listView==null) {
			if (getChildCount()>0) {
				for (int i = 0; i < getChildCount(); i++) {
					if (getChildAt(i) instanceof ListView) {
						listView=(ListView) getChildAt(i);
						Log.i(CustomSwipeRefreshLayout, "找到了LIstView");
						initLoadLayout();//初始化加载控件
						setListViewOnScroll();//滚动监听
						break;
					}else {
						Log.i(CustomSwipeRefreshLayout, "不是LIstView的实例");
					}
				}
				Log.i(CustomSwipeRefreshLayout, "LIstView是否为空："+(listView==null));
			}
		}
		super.onLayout(changed, left, top, right, bottom);
	}



	public OnLoadListener getOnLoadListener() {
		return onLoadListener;
	}

	public void setOnLoadListener(OnLoadListener onLoadListener) {
		this.onLoadListener = onLoadListener;
	}

	/**
	 * 设置滚动监听
	 */
	private void setListViewOnScroll() {
		if (listView!=null) {
			listView.setOnScrollListener(new OnScrollListener() {
				//正在移动
				@Override
				public void onScrollStateChanged(AbsListView view, int scrollState) {
					Log.i(CustomSwipeRefreshLayout, ""+listView.getLastVisiblePosition());
					if (canLoadMore()) {
						loadData();
					}else {
						Log.i(CustomSwipeRefreshLayout, "不可以加载新数据");	
					}
				}
				
				@Override
				public void onScroll(AbsListView view, int firstVisibleItem,
						int visibleItemCount, int totalItemCount) {
					// TODO Auto-generated method stub
					
				}
			});
		}
	}
	/**
	 * 三个条件可以加载数据
	 * 1、滑动距离合适的时候
	 * 2、最后一个条目
	 * 3、没有正在加载数据
	 * @return
	 */
	protected boolean canLoadMore() {
		boolean condition1=false;
		if (!isLoading){
			condition1=true;
		}
		boolean condition2=false;
		if (listView.getLastVisiblePosition()==(listView.getCount()-1)) {
			condition2=true;
		}
		boolean condition3=false;
		if ((startY-endY)>touchInstance) {
			condition3=true;	
		}
		Log.i(CustomSwipeRefreshLayout, "是否正在加载"+condition1+"是否是最后一个并且已经显示出来"+condition2+"触摸距离是否合适"+condition3);		
		return condition1&&condition2&&condition3;
	}
	/**
	 * 接口回调实现自定义加载数据
	 */
	protected void loadData() {
		
		if (onLoadListener!=null) {
			if (loadLayout!=null) {
				addLoadLayout();//添加footerView
			}
			onLoadListener.onLoad();
		}
		
	}
	private void addLoadLayout() {
		listView.addFooterView(loadLayout);
		if ( listView.getAdapter() instanceof BaseAdapter) {
			BaseAdapter adapter=(BaseAdapter) listView.getAdapter() ;
			listView.setAdapter(adapter);
			Log.i(CustomSwipeRefreshLayout, "是baseAdapter");
		}else{
			Log.i(CustomSwipeRefreshLayout, "不是baseAdapter");
		}
	}
	private void removeLoadLayout() {
		listView.removeFooterView(loadLayout);
	}
	
	public void setOnload(boolean isLoad){
		isLoading=isLoad;
		if (!isLoad) {
			removeLoadLayout();
		}
	}
	
	
	@Override
	public boolean dispatchTouchEvent(MotionEvent ev) {
		//按下时
		if (ev.getAction()==MotionEvent.ACTION_DOWN) {
			startY=ev.getY();
		}
		//离开时
		else if(ev.getAction()==MotionEvent.ACTION_UP){
			endY=ev.getY();
		}
		return super.dispatchTouchEvent(ev);
	}
	
	/**
	 * 初始化底部加载视图
	 */
	private void initLoadLayout() {
		//布局，由于父控件是ListView，所以 LayoutParams 是AbsListView的LayoutParams
		AbsListView.LayoutParams listLayoutParams =new AbsListView.LayoutParams(listView.getLayoutParams()); 
		listLayoutParams.width=LayoutParams.MATCH_PARENT;
		listLayoutParams.height=100;
		loadLayout=new LinearLayout(context);
		loadLayout.setOrientation(LinearLayout.HORIZONTAL);
		loadLayout.setLayoutParams(listLayoutParams);
		loadLayout.setGravity(Gravity.CENTER_HORIZONTAL);
		//dialog
		android.view.ViewGroup.LayoutParams layoutParams =new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
		ProgressBar progressBar=new ProgressBar(context,null,android.R.attr.progressBarStyleInverse);
		progressBar.setLayoutParams(layoutParams);
		//textview
		android.view.ViewGroup.LayoutParams layoutParams2 =new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
		TextView textView=new TextView(context);
		textView.setText("正在加载.....");
		textView.setTextSize(15);
		textView.setLayoutParams(layoutParams2);
		textView.setGravity(Gravity.CENTER_VERTICAL);
		//设置子控件
		loadLayout.addView(progressBar);
		loadLayout.addView(textView);
	}
	 interface OnLoadListener{
		public void onLoad();
	}

}
```

