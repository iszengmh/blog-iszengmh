---
title: ListView issue
published: 2017-08-30 16:16:51
description: 'ListView issue'
image: ''
tags: [android]
category: android
draft: false 
lang: ''
---
10-10 04:25:59.813: E/AndroidRuntime(5300): java.lang.IllegalStateException:

> The content of the adapter has changed but ListView did not receive a notification. Make sure the content of your adapter is not modified from a background thread, but only from the UI thread. [in ListView(2131427405, class android.widget.ListView) with Adapter(class android.widget.HeaderViewListAdapter)]
>



上面这段是我在自定义swipeRefreshLayout里面做上拉加载时报错的；意思大概是**adapter的源数据和listView的条目不一样**



在网上查了一些资料，大部分的解决方式是**更新数据**和**adapter.notifyDataSetChanged();**必须在UI线程中执行，但是我并不是这个问题。



```plain
listView.removeFooterView(loadLayout);
```



我的情况是这样的，我在某一情况下，执行**listView.removeFooterView(loadLayout);**，但是没有及时**adapter.notifyDataSetChanged();**,所以导致了报错



有人会问，执行**listView.addFooterView(loadLayout);**需要 及时**adapter.notifyDataSetChanged();**吗？其实不需要的，因为**listView.addFooterView(loadLayout);**需要在_setAdapter()_方法之前执行。所以在绑定适配器之前是不用通知adapter的

