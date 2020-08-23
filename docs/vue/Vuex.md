## Vuex

状态管理工具

专门为Vue.js应用程序开发的状态管理模式。

通过Vuex管理的状态(State)仍然是**响应式**的。

是一个全局**单例**对象。

全局单例模式(大管家)

### 什么是状态管理

多个组件需要共享状态，将共享的状态全部存储到一个对象里面进行状态管理。

比如用户的登录状态(token)、地理位置信息等。

比如商品的收藏、购物车中的物品等



只是父子组件，不要把状态往Vuex里面塞。

### Vuex使用

* `npm install vuex --save`
* 创建store(仓库)文件夹，新建index.js

```
import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const store = new Vuex.Store({
  state: {  //保存状态
    counter:1000
  },
  mutations: {
    // 通过mutation来修改state
    // 定义方法
    increment(state){
      state.counter++
    }
  },
  actions: {
    // 异步操作通过action
  },
  getters: {
  
  },
  modules: {
  
  }
})

//3. 导出store对象
export default store
```

```
// 4.去挂载store
new Vue({
  el:'#app',
  // 和挂载router一样
  store,
  render: h => h(App)
})
```

**可以使用&store拿到这个store对象**

### Vuex的思想

![vuex](Vuex.assets/vuex.png)

官方不建议通过`&store.state`来直接操作state，因为这样很难**跟踪**到底是谁改了这个状态，**不便于调试**。

**Devtools**  是Vue开发的一个浏览器插件，它实现了这种跟踪。

**Devtools**  可以通过chrome应用商店下载。

只有通过Mutations修改，Devtools才能记录。



Mutations里面不推荐使用异步操作，因为Devtools无法跟跟踪异步操作。



当有异步操作时，应该用Actions来做，异步操作完成了再commit到Mutations。

没有异步操作时Actions可以跳过。

异步操作，通常是网络请求。

### 修改state

```
  mutations: {
    // 通过mutation来修改state
    // 定义方法
    increment(state){
      state.counter++
    }
  },
  actions: {
    // 异步操作通过action
  },
  
  
  使用时,通过mutation来修改state
  $store.commit('increment')
```

### Vuex核心概念

#### State 

单一状态树(单一数据源)，即单例

```
通过  &store.state.xxx  来获得状态
```



#### Getters

类似计算属性

```
getters: {
  powerCounter(state){
    return state.counter*state.counter
  },
  powerPowerCounter(state,getter){
    return getter.powerCounter*getter.powerCounter
  },
  moreAgeStu(state) {
    return function (age) {
      return state.students.filter(s => s.age>age)
    }
  }
}

$store.getters.powerCounter
```

#### Mutation

通常情况下，Mutation中的方法必须是同步的，因为Mutation中的异步方法Devtools无法追踪。比如setTimeout函数就是异步的。

Vuex的store状态更新的唯一方式：提交Mutation。

主要包括两部分：字符串的事件类型(type)(就是函数名)；一个回调函数(函数体)，该回调函数第一个参数就是state。

##### Mutation传参

```
// 像counta这种额外的参数，被称为mutation的负载(载荷，Payload)

mutations: {
  incrementCount(state,counta){
    state.counter += counta
  }
}

methods: {
  addCount(counta) {
    this.&store.commit('incrementCount',counta)
  }
}
```

##### 另一种提交方式

```
mutations: {
  incrementCount(state,payload){
    state.counter += payload.counta
  }
}

methods: {
  addCount(counta) {
    this.$store.commit({
    type:'incrementCount',
    counta
    })
  }
}

```

#### 如何修改对象做到响应式

给对象添加属性

```
state.info['address'] = 'BeiJin'   不是响应式的

Vue.set(state.info,'address','BeiJin')    是响应式的
```

删除对象属性

```
delete state.info.age      不是响应式的

Vue.delete(state.info,'age')   是响应式的
```

#### Mutations的类型常量

新建一个文件用来保存常量定义。

```
// mutations-types.js

export const INCREMENT = 'increment'
```

```
// 使用时导入常量
import {
  INCREMENT
} from './store/mutations-types'
```

```
mutations: {
//  两种定义函数的方式
//  test1(){
//  
//  },
  ['test1'](){
  
  },
//  将方法名抽离出来定义
  [INCREMENT](state) {
    state.conter++
  }
}
```

#### Action

异步操作

使用类似Mutation

传参和Mutation一样

```
mutations: {
  updateInfo(state){
    state.info.name = 'lizhanxu'
  }
},
actions: {
  // context:上下文
  // 这里的context就是store对象
  aUpdateInfo(context,payload){
    setTimeout(() => {
      context.commit('updateInfo')
      // 这里就是异步修改完成后
      console.log(payload.message);
      // 回调
      payload.success();
      
      // 这里的回调也可以用Promise来写
    },1000)
  }
}


methods: {
  this.$store.dispatch('aUpdateInfo',{
    message:'我是message',
    success() {
      console.log('里面已经完成了')
    }
  })
}
```



#### Module

划分模块，解决单例造成的过于臃肿的问题

```
modules: {
  a: {
    state: {
      name: 'lizhanxu'
    },
    mutations: {
      updateName(state,payload) {
        state.name = payload
      }
    },
    actions: {},
    getters: {},
  },
  b: {
    state: {},
    mutations: {},
    actions: {},
    getters: {},
  },
  c: {
    state: {},
    mutations: {},
    actions: {},
    getters: {},
  }
}

// 使用state
$store.state.a.name

// 使用mutation,和普通提交一样
updateName(){
  this.$store.commit('updateNmae','lisi')
}

// 使用getter也是和普通的一样，但是多了rootState参数可以用来拿到根里的state

// 使用action，context不再是store对象，有所区别，比如context.commit()方法只能拿到自己模块中的。
```

### store文件夹里的目录组织

将state抽出单独的对象

将mutations、actions、getters抽出单独的js文件

将modules抽出成一个文件夹，每个module抽出一个js



抽出js文件，再通过`export default {}`导出。

### 规范

复杂的方法(即使不是异步操作)放到actions中，mutations中做单一的事。

### 备注

* backend：后端

* frontend：前端
* 