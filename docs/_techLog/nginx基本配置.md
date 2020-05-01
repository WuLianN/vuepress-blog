---
date: '2020-04-16'
slug: nginx
tag:
- Nginx

title: nginx的基本配置
description: nginx的基本配置!
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/snail.jpg'
meta:
  - name: title
    content: nginx

  - name: description
    content: nginx的基本配置!

  - name: keywords
    content: nginx

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese & English
---

##  nginx 基本配置

搭建了node服务器，使用nginx反向代理，记录一下nginx的基本配置，慢慢学习！


<br /> 

## https 配置

```nginx
server {
    listen              443 ssl;
    server_name         www.example.com;
    ssl_certificate     www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    
    # Session Ticket”会话复用
    ssl_session_timeout 5m;
    ssl_session_tickets on;
    #ssl_session_ticket_key ticket.key; (ticket.key要自己生成)
    
    ssl_prefer_server_ciphers on;
    ssl_ciphers         ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:
    ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:ECDHE+AES128:!MD5:!SHA1;
   
    #相当于告诉浏览器：我这个网站必须严格使用 HTTPS 协议，在半年之内（182.5 天）都不允许用 HTTP，
    #你以后就自己做转换吧，不要再来麻烦我了。
    add_header Strict-Transport-Security max-age=15768000;
    ...
}
```

<br /> 

## 重定向跳转(在http中配置)

```nginx
return 301 https://$host$request_uri;             #永久重定向
rewrite ^  https://$host$request_uri permanent;   #永久重定向
```


<br />  

## 反向代理(HttpProxy模块)

```nginx
# http
server {
    listen              80;
    server_name         example.com;
    location / {
    proxy_pass   http://private_ip_address:3000; # 要代理的服务器
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr; # 获取ip
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 获取代理后ip
   } 
}

# https
server {
    listen              443 ssl;
    server_name         example.com;
    ssl_certificate     example.com.crt;
    ssl_certificate_key example.com.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    location / {
    proxy_pass   https://private_ip_address:3000;
    proxy_set_header Host $host
   } 
}

# 差别在 端口 ssl配置
```

<br /> 

##  限制IP频繁请求

```nginx
http {
    limit_req_zone  $binary_remote_addr  zone=one:10m   rate=20r/s;

    ...
 
    server {
 
        ...
 
        location /search/ {

            limit_req   zone=one  burst=5 nodelay(可选);
        }
    }
```
**limit_req_zone 参数**

* $binary_remote_addr ：表示通过remote_addr这个标识来做限制，“binary_”的目的是缩写内存占用量，是限制同一客户端ip地址。

* zone=one:10m：表示生成一个大小为10M，名字为one的内存区域，用来存储访问的频次信息。

* rate=20r/s：表示允许相同标识的客户端的访问频次，这里限制的是每秒20次，即每秒只处理20个请求，还可以有比如30r/m的，即限制每2秒访问一次，即每2秒才处理一个请求。

<br />

**limit_req 参数**

* zone=one ：设置使用哪个配置区域来做限制，与上面limit_req_zone 里的name对应。

* burst=5：设置一个大小为5的缓冲区，超过了访问频次限制的请求可以先放到这个缓冲区内等待，但是这个等待区里的位置只有5个，超过的请求会直接报503的错误然后返回。

* nodelay：
    * 如果设置，会在瞬时提供处理(burst + rate)个请求的能力，请求超过（burst + rate）的时候就会直接返回503，永远不存在请求需要等待的情况。（这里的rate的单位是：r/s）
    * 如果没有设置，则所有请求会依次等待排队



<br /> 



## 防盗链

```nginx
location ~* \.(gif|jpg|png|swf|flv)$ {
  valid_referers none blocked *.bearcub.club;
  if ($invalid_referer) {
    return 404;
  }
}
```

<br /> 

## 防盗链+静态资源

```nginx
location ~* \.(gif|jpg|png|swf|flv)$ {
  root /assets; # 目录
  expires 24h;  # 缓存时间
    
  valid_referers none blocked www.bearcub.club bearcub.club;
  if ($invalid_referer) {
    return 404;
  }
}
# 注：不知道为什么 *.bearcub.club 把自己给防了  
```

