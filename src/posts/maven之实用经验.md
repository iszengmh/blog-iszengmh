---
title: maven之实用经验
published: 2019-08-30 16:16:51
description: 'maven之实用经验'
image: ''
tags: [maven]
category: 持续集成与部署
draft: false 
lang: ''
---
# >参考链接
[Maven打包时跳过测试（maven-surefire-plugin）——CSDN@ wisdom-chen ](https://blog.csdn.net/qq_38423105/article/details/82701242)

# build时跳过测试
## xml配置
```xml
<build>
  <plugins>
  	  <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>${plugin.version}</version>
        <configuration>
              <skipTests>true</skipTests>
        </configuration>
      </plugin>
  </plugins>
</build>
```

## 命令行
```shell 
mvn clean package -Dmaven.test.skip=true
```



