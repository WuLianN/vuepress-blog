---
date: '2020-04-28'
slug: jwt
tag:
- Other

title: 学习jwt，顺便翻译成中文!
description: 学习jwt，顺便翻译成中文!
author: 夜深_静悟
location: 东莞
image: 'https://api.bearcub.club/tag/duck.jpg'
meta:

  - name: title
    content: jwt

  - name: description
    content: 学习jwt，顺便翻译成中文！

  - name: keywords
    content: jwt

  - name: author
    content: 夜深_静悟

  - name: language
    content: Chinese

---

具体可见：[jwt](https://jwt.io/introduction/)

## JSON Web Token 是什么？

JSON Web Token (JWT) 是一种开放标准([RFC 7519](https://tools.ietf.org/html/rfc7519))，

它定义了一种紧凑且自包含的方式，以 JSON 对象的形式在各方之间安全地传输信息。

可以验证和信任这些信息，因为它是数字签名的。

JWTs 可以使用秘密(使用 **HMAC** 算法)或使用 **RSA** 或 **ECDSA** 的公钥/私钥对进行签名。

<br>

虽然可以对 JWTs 进行加密以在各方之间提供保密性，但我们将重点关注已签名的令牌。

签名的令牌可以验证其中包含的声明的完整性，而加密的令牌则可以向其他方隐藏这些声明。

当使用公钥/私钥对对令牌进行签名时，签名还将确保只有持有私钥的一方才是签名的一方。

<br>

##  JSON Web Tokens 什么时候使用?

下面是一些JSON Web Token很有用的场景:

* 授权: 

``` 
 这是使用JWT最常见的场景。用户登录后，每个后续请求将包括JWT，
 允许用户访问该令牌允许的路由、服务和资源。单点登录是JWT目前广泛使用的一个特性，
 因为它的开销很小，而且可以跨不同的域轻松使用。
```

* 信息交换: 

``` 
 JSON Web Token是在各方之间安全地传输信息的好方法。
 因为可以对 JWTs 进行签名(例如，使用公钥/私钥对)，所以可以确保发送者就是他们所说的发送者。
 此外，由于签名是使用 header 和 payload 计算的，您还可以验证内容没有被篡改。
```


<br>

## JSON Web Token 的结构是怎样的？

jwt 由 3 部分组成，每部分以 点(.) 分开，它们就是

* Header
* Payload
* Signature

因此，一个 jwt 格式看起来像以下的形式

``` 
xxxxx.yyyyy.zzzzz
```

<br>

## header(头部)

header由两部分组成：token 的**类型**和使用什么**签名算法** ，例如HAMC SHA25 或者 RSA 

例子：

``` json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

然后，这个 JSON 被 Base64Url 编码形成 jwt 的第**一**部分。

<br>

## Payload(载荷)

payload，它包含**claims** (声明)。声明是关于实体(通常是用户)和其他数据的声明。

声明有三种类型:**registered**(注册声明)、**public** (公开声明)和 **private**(私人声明)。

* [**Registered claims**](https://tools.ietf.org/html/rfc7519#section-4.1):
 这些是一组预定义的声明要求，它们不是强制性的，而是推荐的，目的是提供一组有用的、可互操作的声明要求。
 其中包括: **iss**(发行者)、**exp**(到期时间)、**sub**(主题)、**aud**(观众)等。

  

``` nginx
  请注意，声明名称只有三个字符长，JWT的目的是紧凑。
  ```

* [**Public claims**](https://tools.ietf.org/html/rfc7519#section-4.2): 
这些可以由使用 JWTs 的人随意定义。但是为了避免冲突，应该在 [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) 令牌注册表中定义它们，或者将它们定义为包含抗冲突命名空间的URI。

* [**Private claims**](https://tools.ietf.org/html/rfc7519#section-4.3): 
这些是为了在同意使用它们的各方之间共享信息而创建的自定义声明，它们既不是注册的声明，也不是公开的声明。

  

例子：

``` json
{
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
}
```

这个 JSON 也被 Base64Url 编码形成 jwt 的第**二**部分。

``` nginx
请注意，对于已签名的令牌，此信息虽然受保护，但任何人都可以读取。
不要将机密信息放入JWT的有效载荷或头元素中，除非对其进行了加密。
```

<br>

## Signature(签名)

创建 signature 部分，你必须编码 header、payload 和 secret（自己设置的密匙），header 中指定的算法，并对其进行签名。

例如，你想使用 HMAC SHA256 算法，signature (签名) 将会创建以下方式

``` js
HMACSHA256(
    base64UrlEncode(header) + '.' +
    base64UrlEncode(payload),
    secret
)
```

签名用于验证消息在整个过程中没有被更改，并且，对于使用私钥签名的令牌，它还可以验证 JWT 的发送方就是它所说的发送方。

<br>

## Putting all together(所有聚在一起)

输出是三个由点分隔的Base64-URL字符串，可以在 HTML 和 HTTP 环境中轻松传递，与 SAML 等基于 xml 的标准相比更紧凑。

下面显示了 JWT，它对前面的 header 和 payload 进行了编码，并且使用了一个秘密签名。

<img width=500 height=200 src="https://api.bearcub.club/tech/other/jwt-1.png">

<br>

## JSON Web Tokens 怎样工作？

在身份验证中，当用户使用其凭证成功登录时，将返回一个 JSON Web Token。由于 Token 是凭据，所以必须非常小心地防止安全问题。一般来说，您不应该保留 Token 超过要求的时间。

由于缺乏安全性，您也不应该在浏览器存储中存储敏感的会话数据。

<br>

当用户希望访问受保护的路由或资源时，用户代理应该发送 JWT，
通常在使用 **Authorization** header 中的 设置**Bearer** 。
header 的内容应该如下图所示:

``` nginx
Authorization: Bearer <token>
```

在某些情况下，这可能是一种无状态授权机制。服务器的受保护路由将在 Authorization 头中检查是否存在有效的JWT，

如果存在，则允许用户访问受保护的资源。如果 JWT 包含必要的数据，那么查询数据库进行某些操作的需求可能会减少，

尽管情况并不总是如此。

如果 token 是在 Authorization 中发送的，那么跨源资源共享(CORS)就不是问题，因为它不使用cookie。

下图展示了如何获得 JWT 并使用它来访问api或资源:

<img width=500 height=200 src="https://api.bearcub.club/tech/other/jwt-2.png">

<br>

## HMAC
HMAC是密钥相关的哈希运算消息认证码（Hash-based Message Authentication Code）的缩写，
一种基于Hash函数和密钥进行消息认证的方法。

## 例子
```js
const jwt = require('jsonwebtoken')
const { privateKey } = require('../config')

// 生成token
function generateToken(data) {
    const created = Math.floor(Date.now() / 1000) // 单位 s
    const exp = created + 3600 * 24 * 30 // 30天
    const cert = privateKey
    const token = jwt.sign({ data, exp }, cert, { algorithm: 'HS256' })

    return token
}

// 验证token
function verifyToken(token) {
    const cert = privateKey;

    let decodedResult;

    jwt.verify(token, cert, { algorithm: 'HS256' }, (err, decoded) => {
        if (err) {
            // console.error(err)
            return undefined
        } else {
            decodedResult = decoded
        }
    })

    return decodedResult
}

module.exports = {
    generateToken,
    verifyToken
}
```

