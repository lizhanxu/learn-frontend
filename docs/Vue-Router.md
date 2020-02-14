## Vue-Router

### 路由

内网IP和公网IP

同一个网络下IP唯一

路由表：映射内网ip和mac

### 阶段一

#### 后端渲染(服务器渲染)

后端完成整个页面并将完整的页面传给前端，前端只做展示。

后端渲染对SEO(Search Engine Optimization，搜索引擎优化)比较好一点

JSP是后端渲染

#### 后端路由

后端处理URL和页面之间的映射关系

### 阶段二

#### 前后端分离(前端渲染)

* 随着Ajax的出现，有了前后端分离的开发模式。
* 后端只通过API来返回数据，前端通过Ajax获取数据，然后通过JS将数据渲染到网页中。
* 后端专注数据，前端专注交互和可视化。
* 同一套API多端通用。

jquery就是这个阶段的产物。

静态资源服务器存放html+css+js

API服务器提供数据服务

当在浏览器输入url时，浏览器通过该url在静态资源服务器中下载html+css+js，html、css浏览器可以直接渲染展示，js会被浏览器执行。通过js中的ajax请求，去API服务器请求到数据，再用js将数据渲染到页面。

### 阶段三

SPA(simple page web application，单页面富应用)

整个页面中有一个html页面。

**SPA最主要的特点**就是在前后端分离的基础上加了一层**前端路由**，也就是前端来维护路由规则。

SPA在静态资源服务器中只有一套html+css+js。非SPA，在静态资源服务器中每一个url对应一套html+css+js。



SPA中当在浏览器输入url时，浏览器通过该url在静态资源服务器中下载html+css+js(**全部资源**，暂时这么理解，实际并不是)。虽然获得了全部资源，但是**并不会**全部展示执行。

利用**前端路由**，前端可以通过url映射资源（从全部资源中抽取html+css+js，在Vue中可以认为是组件），通过url抽取不同的资源进行渲染，从而达到更新页面的效果。由于这些资源都在本地，所以不需要再向静态资源服务器请求，即页面不需要整体刷新。

### 前端路由的核心

改变URL，但是页面不进行整体的刷新。

**如何做到这一点？**

两种方案

* 改变url的hash

  通过`location.hash = 'home'` 来修改

  location.hash用来读取#值

  ’#‘就是改变hash的方式

  ‘#’是用来指导浏览器动作的，对服务器端完全无用

* html5的history模式

  `history.pushState({},'','home')`  入栈

  `history.back()`   出栈

  `history.go(-1)`  等同于  `history.back()`

  `history.go(1)`  等同于  `history.forward()`

  `history.replaceState({},'','home')`  不可前后跳转

### vue-router

vue-router是Vue.js官方插件，和Vue.js深度集成，适合用于构建单页面应用。

vue-router基于路由和组件：

* 路由用于设定访问路径，将路径和组件映射起来
* 在vue-router的单页面用用中，页面的路径改变就是组件的切换

#### 安装vue-router

`npm install vue-router --save`

#### 搭建vue-router框架

* 导入路由对象，并调用`Vue.use(VueRouter)`
* 创建路由实例，并且传入路由映射配置
* 在Vue实例中挂载创建的路由实例

#### 使用vue-router步骤

* 创建路由组件

* 配置路由映射

* 使用路由：通过`<router-link>`和`<router-view>`

  这两个标签时vue-router中注册的全局组件

  `<router-link>`最终被渲染成`<a>`标签

  `<router-view>`用于占位，告诉渲染的位置，会根据当前路径，动态渲染出不同的组件

#### 相关代码

在src文件夹下创建router文件夹，创建index.js来配置路由相关的信息

```
// index.js

// 配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'

//导入组件
import Home from '../components/Home'
import About from '../components/About'

// 1.所有插件都要通过Vue.use(插件)，来安装插件
// 内部会去调用install方法
Vue.use(VueRouter)

// 将routers抽离出来
const routers = [
  { //配置默认路径
    path:'/'   // 也可以是 ''
    redirect:'/home'  //重定向，让'/'能够显示'/home'的内容
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/about',
    component: About
  }
]
// 2.创建VueRouter对象
const router = new VueRouter({
  //  在routers中配置路由和组件的映射关系
  routers
})

// 3.导出router，用于将router对象挂载到Vue实例中
export default router
```

```
// main.js

import Vue from 'vue'
import App from './App'
// 当from一个文件夹时，会自动去找index.js这个文件，所以可以省去
import router from './router'
// 等同于import router from './router/index'

new Vue({
  el: '#app',
  // router: router,   对象字面量简写
  // 将router对象挂载到Vue实例中
  router,
  render: h => h(App)
})
```

```
// App.vue的template

<div>
  <router-link to="/home">首页</router-link>
  <router-link to="/about">关于</router-link>
  <router-view></router-view>
</div>
```

#### 改成history模式

```
const router = new VueRouter({
  //  在routers中配置路由和组件的映射关系
  routers,
  //  hash模式url有'#'
  //  默认是hash模式，修改为history模式
  mode:'history'
})
```

#### router-link属性

| 属性名       | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| to           | 用于指定跳转的路径                                           |
| tag          | router-link默认渲染成`<a>`标签，`tag = 'button'`会将router-link最终渲染成`<button>`标签 |
| replace      | 不可前后跳转，不需要给值                                     |
| active-class | 对于router-link最终渲染出的标签，当选中时会自动添加两个class(router-link-exact-active,router-link-active)，通过给这些class样式可以添加样式，这种一般用router-link-active。通过active-class属性将router-link-active改名。当要给所有标签的router-link-active改名时，则在router对象中添加`linkActiveClass:'newName'`来进行修改。 |

#### 通过js点击事件来实现router-link的功能

```
// 点击事件函数  不要绕过vue-router

homeClick(){
  // push ==>  pushState
  this.&router.push('/home')
  // replace ==> replaceState
  // this.&router.replace('/home')
}

&router  就是/router/index.js中new的router对象
```

#### 动态路由

path不确定

```
//相关代码
{
  path:'/user/:userId',
  component: User
}

<router-link :to="'/user'+userId">用户</router-link>

data(){
  return {
    userId:'zhangshan'
  }
}

&route   代表当前活跃的route
可以通过 &route.params.userId 来拿到参数
```

#### 路由的懒加载

* 将所有内容全部打包到一个文件，这个文件就很大，影响页面加载（下载的文件过大花的时间越多，下载时由于还没有拿到文件，页面无法渲染展示），所以需要进行拆分。

* 把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对用组件，这样就更加高效。

* 备注：这里的加载是指从静态资源服务器去下载文件

* 

* css分包：将css单独抽离到一个css文件当中

* js分包：默认将js分成3个文件：app.xxxx.js放开发的所有代码(业务代码)；manifest.xxxx.js放底层支撑代码；vendor.xxxx.js放第三方代码(Vue/VueRouter/axios等)

* `_webpack_require_` 是底层支撑的关键函数，能处理模块化。这个函数就在manifest.xxxx.js中

* 随着业务量增加app.xxxx.js会越来越大，所以要对它进行拆分。

* 懒加载：用到时，再加载

* 路由的懒加载就是拆分app.xxxx.js文件，一个路由打包一个js文件，用到了再去服务器请求下来

* ```
  路由懒加载的写法：
  const Home = () => import('../component/Home')
  const routes = [
    {
      path:'/home',
      component: Home
    }
  ]
  ```

#### 路由的嵌套

实现路由嵌套的步骤：

* 创建对应的子组件，并再配置子路由的映射

  ```
  const Home = () => import('../component/Home')
  const HomeNews = () => import('../component/HomeNews')
  const HomeMessage = () => import('../component/HomeMessage')
  const routes = [
    {
      path:'/home',
      component: Home,
      children: [
        { //配置默认显示
          path:'/'   // 也可以是 ''
          redirect:'news'  //重定向
        },
        {
          path:'news',     //子路由不需要加 /
          component: HomeNews
        },
        {
          path:'message',     //子路由不需要加 /
          component: HomeMessage
        }
      ]
    }
  ]
  ```

  

* 在组件内部使用`<router-view>`标签

  ```
  在Home.vue中使用
  <div>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
  ```


#### 参数传递

传递的参数主要有两种类型：params和query、

当有大量数据要传递时，选用query的方式

##### params的类型

* 配置路由的格式：`/user/:userid`
* 传递的方式：在path后面跟上对应的值
* 传递后形成的路径：/user/123456
* 例子：见动态路由

##### query的类型

* 配置路由格式：常规配置

* 传递方式：对象中使用query的key作为传递方式，query是一个对象，将要传递的东西放入这个对象，然后将query整个传过去，再从query中拿到传过来的东西。

* 传递后形成的路径：/user?id=123456，**？后面的部分就是query**

  ```
  <router-link :to="{path : '/profile',query : {id = '123456',name : 'lizhanxu',age : 18,}}">档案</router-link>
  
  ```

通过&route.query获得query对象

  点击事件写法：
  profileClick(){
    this.&router.push({
      path: '/profile',
      query: {
        id = '123456',
        name = 'lizhanxu',
        age : 18
      }
    })
  }
  ```
  

#### &router和&route

&router  就是/router/index.js中new的router对象

&route    代表当前活跃的route，就是在routes中配置的route

所有的组件都继承自Vue的原型 （去了解原型链）。

&router和&route这些都是加在Vue的原型链上的。

`Vue.prototype.&router = {}`   这样子

#### 响应式实现的核心

`Object.defineProperty(要改的对象引用,'key',value)`

通过这个方法给对象添加属性

#### 导航守卫

监听路由之间跳转的事件

导航钩子

##### 全局守卫

  ```
// 前置钩子
router.beforeEach((to,from,next) => {
  // 从from跳转到to ，to和from时Route类型，就是配置中一个个路由

  // .matched[0]匹配第一个，解决子路由没有title的问题
  document.title = to.matched[0].meta.title
  //next()必须调用，才能进入下一步
  //next(path),可以指定跳转


  //可以在这里进行登录判断

  next()
})

{
  path:'/home',
  component:Home,
  meta:{        // 添加属性
    title:'首页'
  },
  children:[

  ]
}

// 后置钩子，不需要主动调用next()函数
router.afterEach((to,from) => {

})
```

##### 路由独享的守卫

```
{
  path:'/home',
  component:Home,
  beforeEnter: (to,from,next) => {

  }
}
```

##### 组件内的守卫

```
beforeRouteEnter(to,from,next){

}
beforeRouteUpdate(to,from,next){

}
beforeRouteLeave(to,from,next){

}
```

[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

#### keep-alive

没有使用keep-alive，路由跳转时，组件内部所有的状态都不会保存下来，每次跳转过来都会重新创建一个组件。

keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

router-view也是一个组件，如果直接被包在keep-alive里面，所有路径匹配到的视图组件都会被缓存。

```
<keep-alive>
  <router-view/>
</keep-alive>
```

##### 钩子函数

在使用了keep-alive的情况下，能使用两个钩子函数：

**activated  /  deactivated**

在deactivated( )中使用this.$route获得的route是改变之后的route

##### keep-alive的属性

include和exclude

字符串或者正则，去匹配组件的 **name** 属性，多个用逗号隔开。

### 备注

Profile  -->  我的；配置文件；个人档案

浏览器默认80端口

meta：元数据，描述数据的数据

回调很多时候也叫钩子(hook)
```