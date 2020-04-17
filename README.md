## 我的博客

[https://bearcub.club](https://bearcub.club)



## vuepress 踩坑之旅

[vuepress中文文档](https://www.vuepress.cn/)

[官方blog插件](https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html)



**所有的markdown文件都会被转化为html**

| 文件的相对路径   | 页面路由地址 |
| ---------------- | ------------ |
| /README.md       | /            |
| /guide/README.md | /guide/      |
| /config.md       | /config.html |



**docs目录介绍**

| 目录/文件 | 功能                                 |
| --------- | ------------------------------------ |
| .vuepress | 搭建博客的入口                       |
| _techLog  | 存储编程技术文章                     |
| 其他      | 路由功能->链接跳转(编程、摄影、生活) |



**.vuepress目录介绍**

| 目录/文件     | 功能                  |
| ------------- | --------------------- |
| theme         | 用于存放本地主题(vue) |
| public        | 静态资源目录          |
| templates     | 存储 HTML 模板文件    |
| config.js     | 配置文件的入口文件    |
| enhanceApp.js | 客户端应用的增强      |



**theme目录介绍**

| 目录/文件   | 功能                 |
| ----------- | -------------------- |
| Layout.vue  | 博客主入口           |
| Tags.vue    | 标签路由入口         |
| Tag.vue     | 该标签的详细信息入口 |
| TechLog.vue | 渲染编程md文件入口   |
| 404.vue     | 处理404页面          |

注：Tags、Tag、TechLog需要安装@vuepress/blog插件，并且在comfig.js中配置。




## blog插件的功能

* 分类：强大的分类系统让你快速将贴文分类。
* 分页：极其简单的开箱即用的分页功能。



## :pensive：坑

**代码块中的语法 无法 高亮**

```html
这个坑惨我了，百度无答案，花了我超多时间，最后，在其他博客主题找到这段代码，cv上去，瞬间真香。
可以替换okaidia，更换主题。详细见https://prismjs.com/

<style src="prismjs/themes/prism-okaidia.css"></style>
```

