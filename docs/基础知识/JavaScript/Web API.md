# Web API

## fetch

提供了一个获取资源的接口（包括跨域请求）

比XHR更加灵活强大

Fetch 提供了对 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 和 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) （以及其他与网络请求有关的）对象的通用定义。

fetch()返回一个 Promise 对象，resolve 对应请求的Response。

### 比较

`fetch` 规范与 `jQuery.ajax()` 主要有三种方式的不同：

* 当接收到一个代表错误的 HTTP 状态码时，从 `fetch()` 返回的 Promise **不会被标记为 reject，** 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 `ok` 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。

  成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 [`Response.ok`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/ok) 属性为 true。HTTP 404 状态并不被认为是网络错误。

* `fetch()` **不会接受跨域 cookies；**

* `fetch` **不会发送 cookies**。

### 参数

#### url

必填参数

#### init对象

可选参数

一个配置项对象

### 发送带凭据的请求

为了让浏览器发送包含凭据的请求（即使是跨域源），要将`credentials: 'include'`添加到传递给 `fetch()`方法的`init`对象。

```js
fetch('https://example.com', {
  credentials: 'include'  
})
```

如果你只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加 `credentials: 'same-origin'`。

要改为确保浏览器不在请求中包含凭据，请使用 `credentials: 'omit'`。

## 参考网址

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#Body