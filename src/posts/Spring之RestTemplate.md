---
title: Spring之RestTemplate
published: 2019-08-30 16:16:51
description: 'Spring之RestTemplate'
image: ''
tags: [java,spring]
category: java
draft: false 
lang: ''
---
# 参考链接
[URI Links——Spring/WebServlet](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/web.html#mvc-uri-building)

[RestClient——Spring/WebServlet](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/web.html#webmvc-client)

[玩转Spring全家桶——极客时间@丁雪丰    
](https://time.geekbang.org/course/detail/100023501-87035)


# Summary 
>  	As of 5.0 the RestTemplate is in maintenance mode, with only minor requests for changes and bugs to be accepted going forward. Please, consider using the [WebClient](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/web-reactive.html#webflux-client) which offers a more modern API and supports sync, async, and streaming scenarios. 
>
> 从RestTemplate5.0开始处于维护模式中，仅接受较小的变更请求和bug处理。请关注使用WebClient参考一个更现代的API，它同样支持同步、异步和流场景。
>

Spring官方已经不再对RestTemplate做新特性开发，处理维护模式，而且只接受小改动和bug。个人认为更像是说明不再进行维护了。

# Getting Started 
## Dependency 

```xml
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## RestTemplate for Get 
```java
URI uri = UriComponentsBuilder
		.fromUriString("http://localhost:8080/coffee/{id}")
    	.build(1);
ResponseEntity<Coffee> c = restTemplate.getForEntity(uri, Coffee.class);
log.info("Response Status: {}, Response Headers: {}", c.getStatusCode(), c.getHeaders().toString());
log.info("Coffee: {}", c.getBody());
```

## RestTemplate for Post 
```java
String coffeeUri = "http://localhost:8080/coffee/";
Coffee request = Coffee.builder()
    .name("Americano")
    .price(BigDecimal.valueOf(25.00))
    .build();
Coffee response = restTemplate.postForObject(coffeeUri, request, Coffee.class);
log.info("New Coffee: {}", response);

String s = restTemplate.getForObject(coffeeUri, String.class);
log.info("String: {}", s);
```

# Advanced feature 
+ 可对请求头进行设置
+ 可对泛型进行解析

## Add Header to request 
```java
URI uri = UriComponentsBuilder
				.fromUriString("http://localhost:8080/coffee/?name={name}")
				.build("mocha");
RequestEntity<Void> req = RequestEntity.get(uri)
    .accept(MediaType.APPLICATION_XML)
    .build();
ResponseEntity<String> resp = restTemplate.exchange(req, String.class);
log.info("Response Status: {}, Response Headers: {}", resp.getStatusCode(), resp.getHeaders().toString());
log.info("Coffee: {}", resp.getBody());
```

## 泛型解析 
```java
ParameterizedTypeReference<List<Coffee>> ptr =
				new ParameterizedTypeReference<List<Coffee>>() {};
ResponseEntity<List<Coffee>> list = restTemplate
				.exchange(coffeeUri, HttpMethod.GET, null, ptr);
//设置泛型为List<Coffee>
list.getBody().forEach(c -> log.info("Coffee: {}", c));
```

## 定制RestTemplate 
RestTemplate是可以基于okhttp、httpclient、Netty或者是java默认的HttpConnection来实现的，也就是你也可以自己选择低层依赖。

### 通过接口ClientHttpRequestFactory 
可以基于RestTemplate实现底层依赖

### RestTemplate的默认实现SimpleClientHttpRequestFactory 
SimpleClientHttpRequestFactory从名字上就可以看出是实现了ClientHttpRequestFactory，是Spring默认提供的，基于原始java的HttpConnection编写的。

### 基于Apache HttpClient的HttpComponentsClientHttpRequestFactory 
众所周知的Apache HttpClient已经改名为HttpComponents，所以是基于HttpComponents开发的RestTemplate

### 基于Netty4开发的Netty4ClientHttpRequestFactory 
Netty4ClientHttpRequestFactory基于Netty4开发

### 示例：基于HttpComponents的RestTemplate 
在spring中创建HttpComponentsClientHttpRequestFactory的Bean，即可完成对RestTemplate的底层依赖的切换。

```java
	@Bean
	public HttpComponentsClientHttpRequestFactory requestFactory() {
		PoolingHttpClientConnectionManager connectionManager =
				new PoolingHttpClientConnectionManager(30, TimeUnit.SECONDS);
		connectionManager.setMaxTotal(200);
		connectionManager.setDefaultMaxPerRoute(20);

		CloseableHttpClient httpClient = HttpClients.custom()
				.setConnectionManager(connectionManager)
				.evictIdleConnections(30, TimeUnit.SECONDS)
				.disableAutomaticRetries()
				// 有 Keep-Alive 认里面的值，没有的话永久有效
				//.setKeepAliveStrategy(DefaultConnectionKeepAliveStrategy.INSTANCE)
				// 换成自定义的
				.setKeepAliveStrategy(new CustomConnectionKeepAliveStrategy())
				.build();

		HttpComponentsClientHttpRequestFactory requestFactory =
				new HttpComponentsClientHttpRequestFactory(httpClient);

		return requestFactory;
	}

	/**
	 * RestTemplate的bean初始化
	 * @param builder
	 * @return
	 */
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
//		return new RestTemplate();

		return builder
				.setConnectTimeout(Duration.ofMillis(100))
				.setReadTimeout(Duration.ofMillis(500))
				.requestFactory(this::requestFactory)
				.build();
	}

```

调用方式跟平常的RestTemplate调用没有区别

```java
@SpringBootApplication
@Slf4j
public class CustomerServiceApplication implements ApplicationRunner {
	@Autowired
	private RestTemplate restTemplate;

	public static void main(String[] args) {
		new SpringApplicationBuilder()
				.sources(CustomerServiceApplication.class)
				.bannerMode(Banner.Mode.OFF)
				.web(WebApplicationType.NONE)
				.run(args);
	}

	@Bean
	public HttpComponentsClientHttpRequestFactory requestFactory() {
		PoolingHttpClientConnectionManager connectionManager =
				new PoolingHttpClientConnectionManager(30, TimeUnit.SECONDS);
		connectionManager.setMaxTotal(200);
		connectionManager.setDefaultMaxPerRoute(20);

		CloseableHttpClient httpClient = HttpClients.custom()
				.setConnectionManager(connectionManager)
				.evictIdleConnections(30, TimeUnit.SECONDS)
				.disableAutomaticRetries()
				// 有 Keep-Alive 认里面的值，没有的话永久有效
				//.setKeepAliveStrategy(DefaultConnectionKeepAliveStrategy.INSTANCE)
				// 换成自定义的，这是底层策略的自定义配置
				.setKeepAliveStrategy(new CustomConnectionKeepAliveStrategy())
				.build();

		HttpComponentsClientHttpRequestFactory requestFactory =
				new HttpComponentsClientHttpRequestFactory(httpClient);

		return requestFactory;
	}

	/**
	 * RestTemplate的bean初始化
	 * @param builder
	 * @return
	 */
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
//		return new RestTemplate();

		return builder
				.setConnectTimeout(Duration.ofMillis(100))
				.setReadTimeout(Duration.ofMillis(500))
				.requestFactory(this::requestFactory)
				.build();
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		URI uri = UriComponentsBuilder
				.fromUriString("http://localhost:8080/coffee/?name={name}")
				.build("mocha");
		RequestEntity<Void> req = RequestEntity.get(uri)
				.accept(MediaType.APPLICATION_XML)
				.build();
		ResponseEntity<String> resp = restTemplate.exchange(req, String.class);
		log.info("Response Status: {}, Response Headers: {}", resp.getStatusCode(), resp.getHeaders().toString());
		log.info("Coffee: {}", resp.getBody());

		String coffeeUri = "http://localhost:8080/coffee/";
		Coffee request = Coffee.builder()
				.name("Americano")
				.price(Money.of(CurrencyUnit.of("CNY"), 25.00))
				.build();
		Coffee response = restTemplate.postForObject(coffeeUri, request, Coffee.class);
		log.info("New Coffee: {}", response);

		ParameterizedTypeReference<List<Coffee>> ptr =
				new ParameterizedTypeReference<List<Coffee>>() {};
		ResponseEntity<List<Coffee>> list = restTemplate
				.exchange(coffeeUri, HttpMethod.GET, null, ptr);
		list.getBody().forEach(c -> log.info("Coffee: {}", c));
	}
}

```

### 底层策略的配置 
底层策略支持对连接的管理（PoolingHttpClientConnectionManager、KeepAlive策略）、超时设置（ConnectTimeout/readTimeout）、SSL校验（证书检查策略）

#### 连接复用 
```java
package geektime.spring.springbucks.customer.support;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.http.HttpResponse;
import org.apache.http.conn.ConnectionKeepAliveStrategy;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;

import java.util.Arrays;

public class CustomConnectionKeepAliveStrategy implements ConnectionKeepAliveStrategy {
    private final long DEFAULT_SECONDS = 30;

    @Override
    public long getKeepAliveDuration(HttpResponse response, HttpContext context) {
        return Arrays.asList(response.getHeaders(HTTP.CONN_KEEP_ALIVE))
                .stream()
                .filter(h -> StringUtils.equalsIgnoreCase(h.getName(), "timeout")
                        && StringUtils.isNumeric(h.getValue()))
                .findFirst()
                .map(h -> NumberUtils.toLong(h.getValue(), DEFAULT_SECONDS))
                .orElse(DEFAULT_SECONDS) * 1000;
    }
}

```



