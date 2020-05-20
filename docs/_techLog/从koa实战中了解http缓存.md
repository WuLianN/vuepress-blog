---
date: '2020-05-18'
slug: http
tag:
- HTTP 
- Koa

title: 从 koa 实战中了解 http 缓存
description: 从 koa 实战中了解 http 缓存
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/whiteFox.jpg'
meta:
  - name: title
    content: 从 koa 实战中了解 http 缓存

  - name: description
    content: 从 koa 实战中了解 http 缓存

  - name: keywords
    content: Koa HTTP缓存

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese

---

## 从 koa 实战中了解 http 缓存

根据不同场景使用不同的方案，一通百通。

浏览器的 “**前进**” “**后退**” 按钮，再看开发者工具，你就会惊喜地发现 “from disk cache” 的字样，意思是没有发送网络请求，而是读取的磁盘上的缓存。

**条件刷新**：会造成一个 http 请求，此时服务端可以做验证，验证过期时间、文件完整性。

**强制刷新**：请求头里的 **If-Modified-Since** 和 **If-None-Match** 会被**清空**，所以会返回最新数据。


<br>


## Cache-Control 参数

* **max-age**:  标记资源的有效期。

* **no-store**：不允许缓存，用于某些变化非常频繁的数据，例如秒杀页面；
* **no-cache**：它的字面含义容易与 no-store  搞混，实际的意思并不是不允许缓存，而是可以缓存，但在使用之前必须要去服务器验证是否过期，是否有最新的版本；
* **must-revalidate**：又是一个和 no-cache 相似的词，它的意思是如果缓存不过期就可以继续使用，但过期了如果还想用就必须去服务器验证。

<img width="600" height="700" src="https://api.bearcub.club/tech/http/http-10.png">


<br>


## 前端请求

``` js
 fetch('http://localhost:3001/userRepo')
     .then(res => {
         return res.text()
     }).then(data => {
         console.log(data)
     })
```


<br>


## 后端响应（koa-router）

``` js
   router.get('/userRepo', transitUserRepo)
```

``` js
transitUserRepo: async (ctx) => {
    // 查看请求头
    console.log(ctx.headers)

    // 获取 请求头 if-none-match、if-modified-since
    const ifNoneMatch = ctx.headers['if-none-match']
    const ifModifiedSince = ctx.headers['if-modified-since']

    if (ifModifiedSince && ifNoneMatch) {
        // 检查是否过期
        checkLastModified(ctx, ifModifiedSince)
    } else {
        // 第一次访问
        return transitUserRepo().then(res => {
            ctx.body = res

            ctx.set({
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=43200', // 缓存12小时 43200
                'Last-Modified': new Date(), // 最后更改时间
                'Etag': crypto.createHash('md5').update(res).digest('hex')
            })
        })
    }
}
```

* 'Cache-Control': 'max-age=43200'   缓存控制，最长缓存时间为 43000 **秒**，即 12 **小时**
* 'Last-Modified': new Date()   最后修改时间，从**执行时**开始计算，而不是**响应后**
* 'Etag': crypto.createHash('md5').update(res).digest('hex')   保证**内容完整性**，即检查内容是否更改

<br>


注：此次没有验证内容完整性，无这个需求


<br>


## 检查缓存是否过期

``` js
function checkLastModified(ctx, ifModifiedSince) {
    if (ifModifiedSince) {
        const lastTimestamp = +new Date(ifModifiedSince) // 转化为时间戳 单位为 毫秒
        const nowTimestamp = +new Date()

        if (nowTimestamp - lastTimestamp > 43200 * 1000) {
            // 过期了 -> 更新
            return transitUserRepo().then(res => {

                ctx.body = res

                ctx.set({
                    'Content-Type': 'application/json',
                    'Cache-Control': 'max-age=43200', // 缓存12小时 43200
                    'Last-Modified': new Date(), // 最后更改时间
                    'Etag': crypto.createHash('md5').update(res).digest('hex') // 保证内容完整性，即检查内容是否更改
                })
            })
        } else {
            // 没过期 -> 304
            return ctx.status = 304
        }
    }
}
```


<br>


## 检查内容是否更改

``` js
function checkEtag(ctx, ifNoneMatch) {
    if (ifNoneMatch) {
        // 要去检查文件是否更改，生成md5（hash），再转化为 hex （16进制）
        return transitUserRepo().then(res => {
            const etag = crypto.createHash('md5').update(res).digest('hex')
            // 没更改
            if (ifNoneMatch === etag) {
                // 304 继续使用缓存
                ctx.status === 304
            } else {
                ctx.body = res
                ctx.set({
                    'Cache-Control': 'max-age=43200',
                    'Last-Modified': new Date(),
                    'Etag': etag
                })
            }
        })
    }
}
```


<br>


## 前端请求头

``` json
{
  host: 'localhost:3001',
  connection: 'keep-alive',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.7 Safari/537.36',
  accept: '*/*',
  origin: 'null',
  'sec-fetch-site': 'cross-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9',
  'if-none-match': 'a1dc5ce5ec7df59e9dd036606998dd59',
  'if-modified-since': 'Mon May 18 2020 15:13:46 GMT+0800 (GMT+08:00)'
}
```

* 'if-none-match': 'a1dc5ce5ec7df59e9dd036606998dd59' 对应 **Etag**
*  'if-modified-since': 'Mon May 18 2020 15:13:46 GMT+0800 (GMT+08:00)'  对应 **Last-Modified**
