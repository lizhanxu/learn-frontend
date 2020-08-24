# Vue.js

## 安装Vue

CDN引入、下载源码、npm安装

## 版本

vue在最后发布时构建了很多个版本，详情见官网。

## runtime-only和runtime-compiler

详情见官网

## 术语解释

### 渐进式

渐进式框架，所谓渐进式，就是指可以一步一步、有阶段性地来使用Vue.js,不必一开始就使用所有东西。自底向上逐层应用。

### 声明式渲染

声明式渲染是Vue.js 的核心。允许采用简洁的模板语法来声明式地将数据渲染进 DOM。

Vue中的渲染是指将Vue的东西解析成原生的HTML文本。

示例：

```
var app = new Vue({
    // el用于指定一个页面中已经存在的DOM元素来挂载Vue实例，它可以是HTMLElement，也可以是CSS选择器。
    el: '#app',//或者document.getElementById('app'),但是尽量不要这么写。
    // 挂载成功后可以通过app.$el来访问该元素。Vue中提供了许多常用的实例属性和方法，都以$开头，以便与用户定义的属性区分。
    data: {
        message: 'Hello Vue!'
        // 可以通过app.message来访问该属性。
    }
})
```

### 响应式

响应式是指可以智能地根据用户行为以及使用的设备环境进行相对应的布局。

数据和 DOM 已经被建立了关联，所有东西都是**响应式的**。

### 组件化

在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的

```
var vm = new Vue({
// 选项
})
```

所有的 Vue 组件都是 Vue 实例。

Vue 实例暴露了一些有用的实例属性与方法。它们都有前缀 `$`，以便与用户定义的属性区分开来。

### MVVM模型

Model-View-ViewModel

![MVVM](/Vue.js.assets/MVVM.png)

![MVVM各层解释](Vue.js.assets/MVVM解释-1598194875254.png)

Model用纯粹的JavaScript对象表示，View负责显示。

ViewModel连接视图View和数据业务的Model层，ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model。

本质上是MVC的改进版。MVVM将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。

Vue没有完全遵循MVVM模型，但是Vue的设计也受到了它的启发。

### 虚拟DOM

出于性能考虑，会尽可能复用已有的

给元素添加不同的key属性用来区分，就不会复用了。

### 生命周期钩子

created：一个Vue实例被创建之后调用。注意，此时尚未挂载。

mounted：el挂载到实例上之后调用。注意，一般业务逻辑从这里开始。

* **`mounted` 不会承诺所有的子组件也都一起被挂载**。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`：

  ```js
  mounted: function () {
  this.$nextTick(function () {
  
  // Code that will run only after the
  // entire view has been rendered
  })
  }
  ```

updated：界面更新之后回调

beforeDestroy：实例销毁之前调用。

### 前端模块化

#### 没有模块化造成的问题

多个js文件，全局变量命名冲突。在没有模块化之前采用匿名函数(闭包)的方式解决，但又降低了代码的复用性。

#### CommonJS规范

最著名的实现NodeJS

导出：

```
module.exports={
  // 要导出的东西
  flag,
  sum
}
```

导入：

```
let {flag,sum} = require('./aaa.js')
require得到一个对象
通过{}语法，将对象解析出来，对象的解构

导入路径是文件夹时，默认去找文件夹下的index.js,相当于把index.js省略了。如果在package.json中指定了main参数，则默认去文件夹下找main参数指定的js文件。

对于json文件，不需要导出，可以通过例如require('../package.json')直接导入。
```

#### ES6的Moudles

`<script>`标签添加属性`type="module"`开启模块化开发支持

导出 export

```
导出方式一：
export {flag,sum}

导出方式二：在定义变量时导出
export let flag = true;

导出对象：
export class Person{
  run(){
    console.log('奔跑')
  }
}

某些情况下，一个模块中包含某个功能，我们并不希望给这个功能命名，而且让导入者可以自己来命名 此时使用 export default。
export default在同一个模块里面不允许同时存在多个。
export default导出的内容可以不用指定名字。

const address = '成都市'
export default address
```

导入 import

```
import {flag,sum} form './aaa.js'

导入对象：
import {Person} form './aaa.js'
const p = new Person();
p.run();

导入export default导出的内容,不使用{}
import haha from './aaa.js'
haha是导入者的命名

统一全部导入：
import * as haha from './aaa.js'
将aaa.js的所有导出内容全部导入到haha对象中
```

## 数组更新

通过以下方式改变数组会触发视图更新：

set(),push(),pop(),shift(),unshift(),splice(),sort(),reverse()会改变原数组；

filter(),concat(),slice()会返回一个新数组，不会改变原数组

```
例如：给books添加一项
app.books.push({
    ...
});
```

### 响应式的：

* push()，栈操作(数组尾部为栈顶)，入栈，在数组最后面添加元素；

* pop()，栈操作(数组尾部为栈顶)，出栈，在数组后面删除元素。

* shift()，在数组最前面删除元素。

* unshift()，在数组最前面添加元素。

* splie(start)：删除/插入/替换元素。

删除元素：第二个参数传入删除几个元素，如果不传入则是删除后面所有的。

替换元素：第二个参数表示要替换几个元素，第二个参数之后的元素为去替换的新元素。

插入元素：第二个元素传0，第二个参数之后的元素为去插入的新元素。

```
例如：
splice(2,3)，从第2个位置开始(初始位置为1)，删除3个元素。即删除第3、4、5个位置上的元素。

splice(2,0,'F')，在第2个位置后面插入'F'。
```

* sort()，排序

* reverse()，反转

* Vue.set(要修改的对象，索引值，修改后的值)，修改数组中的元素。

### 非响应式的：

通过索引修改数组中的元素

## 事件修饰符

.stop  .prevent  .capture  .self  .once等

### .stop

> 阻止单击事件冒泡

`<a @click.stop="handle"></a>`

### .prevent

> 阻止默认事件

`<div @keydown.enter.prevent=""/>`

阻止了按下enter键的换行

### .once

> 只触发一次回调

### .native

>监听组件根元素的原生事件

## 按键修饰符

例如：监听enter键
`<input type = "text" @keyup.enter="keyup">`

### 按键码

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名

如：ctrl的keycode是17

`@keyup.17="  "`

### 系统修饰键

实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

#### **注意**：

请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。

**而单单释放 `ctrl` 也不会触发事件**。

如果你想要这样的行为，请为 `ctrl` 换用 `keyCode`：`keyup.17`。

## Vue实例中的template

Vue实例通过el绑定的html元素，最终会将Vue实例中的template完全替换。

## render函数

可以通过render函数来操作虚拟DOM。

Render函数是一个高阶函数，通过createElement参数来创建Virtual Dom。

Render函数的参数可以是任何名字，但它实际都是当作createElement。

createElement是一个函数，第一个参数必选，可以是一个 HTML 标签，也可以是一个组件或函数；第二个是可选参数， 数据对象，设置标签属性。第三个是也是可选参数，标签内容，可以是子元素。 

## Vue插件

### vuex

状态管理插件

### vue-router

前端路由管理插件

### vue-particles

vue实现的粒子特效

* color：设置粒子和线的颜色

* `:particlesNumber`设置粒子的密度

## 知识补充

不要在选项属性或回调上使用箭头函数(娜姆大表达式)。

`Object.freeze()`，会阻止修改现有的属性，也意味着响应系统无法再*追踪*变化。

### 计算属性computed和方法methods的区别

只要入参不变computed会缓存计算结果，而methods在每次渲染时都要重新计算

### 如何取得input中的值？

`$event.target.value`

### Vue全家桶

Vue全家桶是指vueCore+vue-router+vuex

### 网络请求的时机

一般在created中进行网络请求。

#### 网络请求在created和mounted的区别

前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态。

### 技巧

![image-20200821032845683](Vue.js.assets/image-20200821032845683.png)