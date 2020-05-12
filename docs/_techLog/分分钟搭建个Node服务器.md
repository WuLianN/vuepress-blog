---
date: '2020-04-26'
slug: node
tag:
- Node

title: 分分钟搭建node服务器
description: 搭建node服务器，提供微服务，自动化部署
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/cat.jpg'
meta:
  - name: title
    content: node

  - name: description
    content: 搭建node服务器，提供微服务，自动化部署

  - name: keywords
    content: node

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

## 分分钟搭建个Node服务器

:syringe:  :sweat_drops:  :cow:  :beer:

```nginx
我的博客是使用 vuepress 搭建的静态网站，为了使博客内容更加丰富和易于管理，
自己搭建node服务器和后台管理系统，node服务器是基于 Koa 开发，
后台管理系统是基于 Vue-admin-template 二次开发。
```



## 需求1 静态资源服务

有些东西，文字解释不了，只能让图片来撑场面。

可以使用 koa-static 提供静态资源服务。3行代码 :kissing_smiling_eyes:

```javascript
const static = require('koa-static')
const staticPath = './assets' // 存放静态资源的路径
app.use(static(path.join(__dirname, staticPath), { maxAge: 31536000000 }))

注意：url不用拼接assets 
更多详见 https://www.npmjs.com/package/koa-static
```



<br>



## 需求2 定时抓取数据填充博客 

博客没点文学的东西，是不是有点失格调:joy:啊！

node-schedule 简简单单解决 :hand:

```javascript
const schedule = require('node-schedule')
const axios = require('axios')

// 每天12点去抓取数据
schedule.scheduleJob('0 0 12 * * *', () => {
     axios.get(xxx).then(res => {
         // 存储数据
     })
})

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)


更多详见 https://www.npmjs.com/package/node-schedule
```



<br>



## 需求3 获取请求的body 

koa-bodyparser  解析body 2行代码 :relaxed:

```javascript
const bodyParser = require('koa-bodyparser')
// 解析请求体
app.use(bodyParser())

使用ctx.request.body获取 
```



<br>



## 需求4 路由

提供微服务靠这个中间件 koa-router :muscle:

```js
const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx, next) => {
  // ctx.router available
})

app
  .use(router.routes())
  .use(router.allowedMethods())

更多详见 https://github.com/ZijianHe/koa-router
        https://www.npmjs.com/package/koa-router
```



<br>



## 需求5 配置跨域

```js
const cors = require('koa2-cors')
// 配置跨域
app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
}))
```



<br>



## 需求6 数据库

使用mongoose，就是mongoDB啦！

```js
const mongoose = require('mongoose');
const { target } = require('../xx').db

module.exports = {
  open() {
    return mongoose.connect(
      target,
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
      .then(() => {
        console.log('[ok] Database connection successful')
      })
      .catch(err => {
        console.error('[error] Database connection error')
      })
  },

  close() {
    return mongoose.connection.close()
  }
}

-----------------------------------------------------------
    
const database = 'db' // 数据库
const host = '127.0.0.1'
const port = 27017
const user = 'user'
const password = '123456'

const db = {
    target: `mongodb://${user}:${password}@${host}:${port}/${database}`
}
```



<br>



## 需求7 自动化部署 

博客打包后压缩成zip，上传到服务器，再解压要nginx映射的目录 :stuck_out_tongue_winking_eye:

上传 使用 koa-multer 

```js
multer.js

const multer = require('@koa/multer')
const upload = multer({ dest: 'assets/' }) // 要上传的目录
module.exports = upload.single('file') // 上传的方式

注：需要下载两个模块 npm install --save @koa/multer multer 
更多详见 https://www.npmjs.com/package/@koa/multer
```

<br>

压缩/解压 

只要解压就行了，本地压缩，服务器解压到指定目录

使用 compressing

```js
// 解压
function uncompress(ctx) {
    return compressing.zip.uncompress('file/path/to/uncompress.tgz', 'path/to/destination/dir')
        .then(() => {
            console.log('success')
            return ctx.body = 200
        })
        .catch(err => {
            console.error(err);
            return ctx.body = 404
        })
}

第一个参数为 存放zip的路径，第二个参数为 解压的路径

更多详见 https://www.npmjs.com/package/compressing
```

<br>

## 监听端口
使用http和https两种协议
https 需要配置ssl证书
```js
const https = require('https')

app.listen(3001) // http
https.createServer(config.httpsOptions, app.callback()).listen(3000) // https

更多详见 koa
```

<br>

## 总结
1. 记录一些好用的中间件
2. 要巩固基础，才能快速上手
3. 自动化部署真香