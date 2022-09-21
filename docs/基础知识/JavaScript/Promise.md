# Promise(期约)

> Promise是异步编程的一种解决方案
>
> 期约是对尚不存在结果的一个替身

## 期约基础

### 创建期约

```
new Promise(executor)
创建新期约时需要传入执行器（executor）函数作为参数
```

### 期约状态机

- Pending，待定，期约的初始状态
- Fulfilled，resolve( )，兑现，解决
- Rejected，reject( ) ，拒绝

> 在待定状态下，期约可以落定为fuilfilled或者rejected状态，无论落定为哪种状态都是不可逆的
>
> 不能保证期约必定会脱离待定状态
>
> 通过resolve( )和reject( )控制期约状态的切换

```js
无论resolve()和reject()哪一个被调用，状态转换都不可撤销，继续修改状态会静默失败
let p = Promise((resolve,reject)=>{
    resolve()
    reject() // 没有效果
})

Promise.resolve() // 实例化一个解决的期约
等同于 new Promise((resolve,reject)=>{resolve()})

Promise.reject() // 实例化一个拒绝的期约并抛出一个异步错误，这个错误不能通过try/catch捕获
```

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

> new -> 构造函数()进行一系列操作，最终会执行传入的函数)
>
> 在执行传入的回调函数时，会传入两个参数：resolve、reject，这两个参数也是函数。

### 链式调用中的简写

then和catch都可以return一个Promise对象，从而进行链式编程。

```
return new Promsie(resolve => {
  resolve(res+'111')
})
// 可以简写为如下，内部会进行Promise包装
return Promise.resolve(res+'111')
// async方法中 可以更加简写为如下，内部会进行Promise包装
return res+'111'


return new Promise((resolve,reject) => {
  reject('error message')
})
// 可以简写为如下，内部会进行Promise包装
return Promise.reject('error message')
// async方法中 可以更加简写为如下，内部会进行Promise包装
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

## async`/`await

`async`/`await`的目的是简化使用多个 promise 时的同步行为，并对一组 `Promises`执行某些操作。正如`Promises`类似于结构化回调，`async`/`await`更像结合了generators和 promises。

大多数异步函数也可以使用Promises编写。但是，在错误处理方面，`async`函数更容易捕获异常错误

`async function` 的返回值将被隐式地传递给 `Promise.resolve`。

### 备注

`catch(failureCallback)` 是 `then(null, failureCallback)` 的缩略形式。