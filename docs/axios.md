## axios

### 网络模块封装

通常要对网络模块进行封装。

即使是使用第三方框架，也要对第三方框架进行封装(万一第三方出现严重bug或者不维护了，可以更方便替换)，然后使用自己封装的模块。

### 网络模块选择

#### 传统的Ajax

传统的Ajax是基于XMLHttpRequest(XHR)。

很难用。

#### jQuery-Ajax

* 相对于传统Ajax非常好用
* jQuery的代码1w+行，Vue的代码才1w+行，没有必要为了网络请求就引用这个重量级框架。
* Vue的整个开发中都不需要使用jQuery

#### Vue-resource

Vue官方推出，但停止更新维护，不选用

#### axios

Vue作者推荐

功能特点：

* 在浏览器中发送XMLHttpRequest请求
* 在node.js中发送http请求
* 支持Promise API
* 拦截请求和响应
* 转换请求和响应数据

#### jsonp

* 使用jsonp最主要的原因往往是为了解决跨域访问的问题