---
title: Spring之WebClient
published: 2019-08-30 16:16:51
description: 'Spring之WebClient'
image: ''
tags: [java,spring]
category: java
draft: false 
lang: ''
---
# 参考链接
[URI Links——Spring/WebServlet](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/web.html#mvc-uri-building)

[WebClient——Spring/Web on Reactive Stack](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/web-reactive.html#webflux-client)

[玩转Spring全家桶——极客时间@丁雪丰  ](https://time.geekbang.org/course/detail/100023501-87035)

# 概述

WebClient包含在SpringWebflux中。SpringMVC和SpringWebFlux都是MVC框架，SpringWebFlux从官方文档的说明上是一种非阻塞式栈web框架。



```java
//实例创建
WebClient.create();
WebClient.builder();
//发起请求
get();
post();
put();
delete();
patch();
//基本用法
//获得结果 
retrieve();
exchange();
//处理Http Status
onStatus();
//应答正文
bodyToMono();
bodyToFlux();
```

# Getting Started
```java
package geektime.spring.reactor.webclient;

import geektime.spring.reactor.webclient.model.Coffee;
import lombok.extern.slf4j.Slf4j;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.Banner;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.concurrent.CountDownLatch;

@SpringBootApplication
@Slf4j
public class WebclientDemoApplication implements ApplicationRunner {
	@Autowired
	private WebClient webClient;

	public static void main(String[] args) {
		new SpringApplicationBuilder(WebclientDemoApplication.class)
				.web(WebApplicationType.NONE)
				.bannerMode(Banner.Mode.OFF)
				.run(args);
	}

	@Bean
	public WebClient webClient(WebClient.Builder builder) {
		return builder.baseUrl("http://localhost:8080").build();
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		CountDownLatch cdl = new CountDownLatch(2);

		webClient.get()
				.uri("/coffee/{id}", 1)
				.accept(MediaType.APPLICATION_JSON_UTF8)
				.retrieve()
				.bodyToMono(Coffee.class)
				.doOnError(t -> log.error("Error: ", t))
				.doFinally(s -> cdl.countDown())
				.subscribeOn(Schedulers.single())
				.subscribe(c -> log.info("Coffee 1: {}", c));

		Mono<Coffee> americano = Mono.just(
				Coffee.builder()
						.name("americano")
						.price(Money.of(CurrencyUnit.of("CNY"), 25.00))
						.build()
		);
		webClient.post()
				.uri("/coffee/")
				.body(americano, Coffee.class)
				.retrieve()
				.bodyToMono(Coffee.class)
				.doFinally(s -> cdl.countDown())
				.subscribeOn(Schedulers.single())
				.subscribe(c -> log.info("Coffee Created: {}", c));

		cdl.await();

		webClient.get()
				.uri("/coffee/")
				.retrieve()
				.bodyToFlux(Coffee.class)
				.toStream()
				.forEach(c -> log.info("Coffee in List: {}", c));
	}
}


```

