## Promise

> Promise是异步编程的一种解决方案
>
> 优雅

reject可以不传

### Promise的使用

```
new Promise((resolve,reject) => {
  // 将异步操作用Promise封装
  setTimeout(() => {
    // 成功的时候调用resolve
    // 当调用resolve方法时会直接去执行then中的方法
    resolve()
    
    // 失败的时候调用reject
    // 当调用reject方法时会直接去执行catch中的方法
    reject('failure')
  },1000)
}).then(() => {
  console.log('success')
}).catch((err) => {
  console.log(err)
})

// 另一种写法
// then(函数1,函数2)
// 函数1对应resolve，函数2对应reject
new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('success')
    reject('failure')
  },1000)
}).then((data) => {
  console.log(data)
},err => {
  console.log(err)
})
```

### 内部过程

> new -> 构造函数)(进行一系列操作，最终会执行传入的函数)
>
> 在执行传入的回调函数时，会传入两个参数：resolve、reject，这两个参数也是函数。

### Promise三种状态

* Pending，等待状态
* Fulfilled，resolve( )
* Rejected，reject( ) 

### 链式调用中的简写

then和catch都可以return一个Promise对象，从而进行链式编程。

```
return new Promsie(resolve => {
  resolve(res+'111')
})
// 可以简写为如下，内部会进行Promise包装
return Promise.resolve(res+'111')
// 可以更加简写为如下，内部会进行Promise包装
return res+'111'


return new Promise((resolve,reject) => {
  reject('error message')
})
// 可以简写为如下，内部会进行Promise包装
return Promise.reject('error message')
// 可以更加简写为如下，内部会进行Promise包装
throw 'error message'
```

### Promise的all方法使用

```
// 使用Promise包装多个异步操作
// 当里面的异步操作都执行完之后，会调用then方法，并将多个结果放到一个数组中。
Promise.all([
  new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('result1')
    },2000)
  }),
  new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('resolve2')
    })
  }，1000)
]).then(results => {
  console.log(results)
})
```

