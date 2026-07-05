---
title: 自动化给喜欢的b站番剧自动投币
published: 2025-08-23 16:16:51
description: '自动化给喜欢的b站番剧自动投币'
image: ''
tags: [python]
category: python
draft: false 
lang: ''

---

<h1 id="hISip">参考链接</h1>
[https://www.selenium.dev/zh-cn/](https://www.selenium.dev/zh-cn/)

[ddddocr基本使用和介绍——CSDN@普通网友](https://blog.csdn.net/2401_84038983/article/details/137982755)

<h1 id="rpobH">自动化给喜欢的b站番剧自动投币</h1>
<h1 id="pBfV2">前言</h1>
本文没有实现自动识别验证码，本来想当作学习内容的，但是由于开源的识别模型对汉字的识别有限，容易出现乱码，所以果断放弃了，本次编程只达到学习Selenium的自动化测试基本使用方法和逻辑。

<h2 id="l8Z2g">环境信息</h2>
Python 3.12.3

Chrome/136.0.7103.114

python依赖包：    

undetected-chromedriver 3.5.5

<h2 id="dQ3yl">登录功能没有，换成等用户登录完成自动往下执行</h2>
<!--more-->
```python
    # 当登录成功自动继续执行
    WebDriverWait(wd, 3600).until(ec.presence_of_element_located((By.CLASS_NAME, 'header-entry-mini')))

```
<h2 id="vbObd">先行排序番剧清单，从最新一集开始</h2>
```python

    sort_btn = WebDriverWait(wd, 3).until(ec.element_to_be_clickable((By.CLASS_NAME, 'eplist_ep_list_order__TfnoF')))
    sort_btn.click()
```

<h2 id="PKlRx">Chrome版本必须一致</h2>
我的版本是136.0.7103.114,所以传入参数是136

```python
    options.add_argument('user-agent="Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.114 Safari/537.36"')
    # use_subprocess=False,
    wd = uc.Chrome(options=options,version_main=136)
```

<h2 id="KuEBL">完整脚本信息</h2>
```python
import time
from typing import List

import ddddocr
import undetected_chromedriver as uc
from selenium.common import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from undetected_chromedriver import WebElement

# 输入你喜欢的番剧地址

TARGET_URL = 'https://www.bilibili.com/bangumi/play/ss28747?from_spmid=666.5.mylist.1'

# def login(wd):

# 

# header_login_btn = WebDriverWait(wd, 3).until(ec.presence_of_element_located((By.CLASS_NAME,'header-login-entry')))

# header_login_btn.click()

# 

# login_btn = WebDriverWait(wd, 3).until(ec.element_to_be_clickable((By.CLASS_NAME,'btn_primary')))

# input_account = (wd.find_element(By.XPATH,'/html/body//form[@class="tab__form"]/div[1]/input')

# .send_keys(bilibili_account))

# input_pwd = (wd.find_element(By.XPATH,'/html/body//form[@class="tab__form"]/div[3]/input')

# .send_keys(bilibili_pwd))

# login_btn.click()

# 

# WebDriverWait(wd, 5).until(ec.presence_of_element_located((By.CLASS_NAME,'geetest_tip_img')))

# tip_validation_img = wd.find_element(By.CLASS_NAME,'geetest_tip_img')

# tip_validation_img.screenshot('tip_validation_img.png')

# validation_img = wd.find_element(By.CLASS_NAME,'geetest_item_wrap')

# validation_img.screenshot('validation_img.png') # 截图

# 

# #sucess if header picture is shown

# WebDriverWait(wd, 3).until(ec.presence_of_element_located((By.CLASS_NAME,'header-entry-mini')),

# message="找不到登录按钮（class_name='btn_primary'），程序终止"

# )

# print('login success')

def main ():
    options = uc.ChromeOptions()
    options.add_argument('user-agent="Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.114 Safari/537.36"')
    # use_subprocess=False,
    wd = uc.Chrome(options=options,version_main=136)
    wd.get(TARGET_URL)
    wd.implicitly_wait(2)
    time.sleep(3)
    # success to show index page from the screenshot saved
    wd.save_screenshot( 'bilibili.png' )

    # login
    # login(wd)
    
    # 当登录成功自动继续执行
    WebDriverWait(wd, 3600).until(ec.presence_of_element_located((By.CLASS_NAME, 'header-entry-mini')))
    
    sort_btn = WebDriverWait(wd, 3).until(ec.element_to_be_clickable((By.CLASS_NAME, 'eplist_ep_list_order__TfnoF')))
    sort_btn.click()
    
    number_list_items=wd.find_elements(By.CLASS_NAME,'numberListItem_number_list_item__T2VKO')
    for index, childItem in enumerate(number_list_items):
        if not isinstance(childItem, WebElement):
            raise ValueError("番剧列表必须是一个包含 WebElement 对象的列表")
        try:
            # 滚动到元素可见区域
            wd.execute_script("arguments[0].scrollIntoView({ behavior: 'auto', block: 'center' });", childItem)
            WebDriverWait(wd, 3).until(
                ec.element_to_be_clickable(childItem)  # 直接传入 WebElement
            )
            childItem.click()
        except TimeoutException:
            print("childItem 在指定时间内不可点击")
        coin_btn = WebDriverWait(wd, 3).until(ec.element_to_be_clickable((By.CLASS_NAME, 'coin')))#直到页面出来投币按钮
        coin_btn.click()
        try:
            #投币
            popup_windown_coin = WebDriverWait(wd, 3).until(ec.element_to_be_clickable((By.CLASS_NAME, 'dialogcoin_coin_btn__be9sU')))
            popup_windown_coin.click()
        except TimeoutException:
            print('投币失败！或许可能是已经投币')
        #投币成功
        # WebDriverWait(wd, 5).until(ec.presence_of_element_located((By.CSS_SELECTOR, 'span.coin.on')))
        time.sleep(1)
        print(f'donatingCoinResult/bilibili_{index} '+'投币成功！')
        wd.save_screenshot(f'donatingCoinResult/bilibili_{index}.png')
    
    
    
    
    
    input("Press Enter to quit...")  # 手动按回车后再关闭浏览器
    wd.quit()
    
    #

if __name__ == '__main__':
    main()

```

```
