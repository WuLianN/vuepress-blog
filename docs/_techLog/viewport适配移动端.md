---
date: '2020-06-12'
slug: css
tag:
- CSS
- Vue

title: viewport适配移动端
description: viewport适配移动端
author: 夜深_静悟
location: 广州
image: 'https://api.bearcub.club/tag/rabbit-1.jpg'
meta:
  - name: title
    content: viewport适配移动端

  - name: description
    content: viewport适配移动端

  - name: keywords
    content: viewport

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese
---

## 解决适配的烦恼

本例是基于 Vue ，但主角是 **postcss-px-to-viewport**，是 postcss 的插件，PostCSS is a tool for transforming styles with JS plugins，是一个转换样式的工具。



<br>



## :package: 需要的依赖 

* **postcss-px-to-viewport**  将 px 转成 vw

```json
"devDependencies": {
  "@vue/cli-service": "~4.4.0",
  "less": "^3.11.3",
  "less-loader": "^6.1.1",
  "postcss-px-to-viewport": "^1.1.1", // 就这个
  "vue-template-compiler": "^2.6.11"
}
```



<br>



## :memo: ​配置 

**vue.config.js**

```js
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
    outputDir: 'dist',
    // publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
    
    // 本地测试
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', 
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtoviewport({
                        viewportWidth: 375 // 屏幕宽度
                    })
                ]
            }
        }
    }
};
```

<br>

如果开发者想让移动端浏览器使用屏幕宽度作为视口替换默认的 980px 宽度视口，则可以在 HTML 的头部添加以下标签：

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```





<br>



## :meat_on_bone: ​配合less，更香 

```less
@vw-width: 375px;

.block-2 {
    width: @vw-width; // 100vw
    font-size: 18px; // 4.8vw
}
```



<br>



## :yum: ​香，在哪里 

1. 开发中依然写 px，转化为 vw，自动适配屏幕宽度，自动变化。如`font-size: 18px`，18px 将转化为4.8vw，vw 是随着屏幕宽度变化的，也就是说，字体大小还是 18px，转化后是 4.8vw，此时字体大小会随着屏幕宽变化。



<br>



## :link: ​参考 

[vant-适配-viewport](https://github.com/youzan/vant-demo/tree/master/vant/viewport)