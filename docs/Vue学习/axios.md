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
* **支持Promise API**
* 拦截请求和响应
* 转换请求和响应数据

#### jsonp

* 使用jsonp最主要的原因往往是为了解决 **跨域访问的问题**

### axios使用

#### 基本使用

```
// 这里是使用的是全局axios
impotr axios from 'axios'

// 传入config对象,默认情况下是get请求
//    axios()方法返回  Promise
axios({
  url:'',
  method:'',
  // params是专门针对get请求的参数拼接
  params:{
  
  }
}).then(res => {
  console.log(res)
})
```

#### axios发送并发请求

```
axios.all([axios({
  url:''
}),axios({
  url:''
})]).then(results => {

})

// 分离结果,将数组展开
    .then(axios.spread((res1,res2) => {
    
    }))
```

#### 全局配置

```
axios.defaults.baseURL = ''
axios.defaults.timeout = 5000    //超时设为5秒
axios.defaults.headers.post['Content-Type'] = ''
```

#### 常见的配置选项

| 参数名                                 | 描述                            |
| -------------------------------------- | ------------------------------- |
| `url`                                  | 请求地址                        |
| `method`                               | 请求方法，默认get               |
| `baseURL`                              | 请求根路径                      |
| `transformRequest:[function(data){}]`  | 请求前的数据处理                |
| `transformResponse:[function(data){}]` | 响应后的数据处理                |
| `headers:{'':''}`                      | 自定义的请求头                  |
| `params:{'':''}`                       | URL参数(query对象)，get方法能用 |
| `data:{'':''}`                         | 请求体，post方法参数放这里      |
| `timeout`                              | 超时设置                        |
| `withCredentials`                      | 跨域是否带token                 |
| `auth`                                 | 身份验证信息                    |
| `responseType`                         | 响应数据类型                    |

#### axios实例

开发时一般不使用全局axios，而是创建axios实例

```
const instace1 = axios.create({
  //在这里设置通用配置
  baseURL:'',
  timeout:''
})

// 使用
instance1({

}).then()
```

#### 封装网络请求

应该对axios进行封装，而不是在网络请求时直接使用axios。

通过封装来降低和第三方框架的耦合。

```
//request.js
import axios from 'axios'

// 回调的实现方式一
export function request(config,success,failure){
  // 创建axios实例
  const instace = axios.create({
    baseURL:'',
    timeout:5000
  })
  
  // 发送真正的网络请求
  instance(config)
    .then(res => {
      success(res);
    })
    .catch(err => {
      failure(err)
    })
}

// 回调的实现方式二
export function request(config){
  // 创建axios实例
  const instace = axios.create({
    baseURL:'',
    timeout:5000
  })
  
  // 发送真正的网络请求
  instance(config.baseConfig)
    .then(res => {
      config.success(res);
    })
    .catch(err => {
      config.failure(err)
    })
}

// 使用Promise来实现回调
export function request(config){
  return new Promise((resolve,reject) => {
    const instance = axios.create({
      baseURL:'',
      timeout:5000
    })
    
    // 发送真正的网络请求
    instace(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

request({
  url:''
}).then(res => {
  
}).catch(err => {
  
})

//  最终方案
//  axios()方法本身返回的就是Promise
export function request(config){
  const instance = axios.create({
    baseURL:'',
    timeout:5000
  })
  // 发送真正的网络请求
  return instance(config)
}
```

#### 拦截器

axios提供了拦截器，用于在发送每次请求或者得到响应后，进行对应的处理。

提供了四中拦截：请求成功、请求失败、响应成功、响应失败

```
export function request(config){
  return new Promise((resolve,reject) => {
    const instance = axios.create({
      baseURL:'',
      timeout:5000
    })
    
    // axios的拦截器
    instance.interceptors.request.use(config => {
      console.log(config);
      // 拦截器作用：
      // 1.比如config中的一些信息不符合服务器的要求
      // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
      // 3.某些网络请求(比如登录需要token)，需要一些特殊的信息
      return config
    },err => {
      
    })
    
    instance.interceptors.response.use(res => {
      console.log(res);
      
      return res.data
    },err => {
    
    })
    
    // 发送真正的网络请求
    return instace(config)
  })
}
```



### 备注

#### 什么是跨域访问？

凡是发送请求url的协议、域名、端口三者之间任意一个与当前页面地址不同即为跨域。