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

![MVVM](/docs/MVVM.png)

![MVVM各层解释](/docs/MVVM解释.png)

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
通过{}语法，将对象解析出来
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

```
.stop：阻止单击事件冒泡
<a @click.stop="handle"></a>

.prevent：阻止默认事件

.once:只触发一次回调

.监听键盘事件
如：监听enter键
<input type = "text" @keyup.enter="keyup">

.native:监听组件根元素的原生事件
```

## Vue实例中的template

Vue实例中的template中的template最终会完全替换，Vue实例通过el绑定的html元素。

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

## 注意

不要在选项属性或回调上使用箭头函数(娜姆大表达式)。

`Object.freeze()`，会阻止修改现有的属性，也意味着响应系统无法再*追踪*变化。

### 计算属性computed和方法methods的区别

只要入参不变computed会缓存计算结果，而methods在每次渲染时都要重新计算

### JavaScript在head和body中的区别

在head中：被调用才执行。

在body中：页面加载时被执行，通常被用来生成页面的内容。

### JavaScript"=="和"==="的区别

"==="表示恒等，首先比较两边的变量数据类型是否相等，其次比较两边的变量的数值是否相等；
"=="表示相等即仅仅比较两边变量的数值是否相等。

### 方法与函数的区别

* 方法：method
* 函数：function

方法通常和某个类或实例挂钩。

Java里面只有方法，没有函数，含后面引入了函数式接口。因为不能脱离类。

JavaScript里面既有方法也有函数。

### 如何取得input中的值？

`$event.target.value`

### Vue全家桶

Vue全家桶是指vueCore+vue-router+vuex

### JS字节码

JS类似Java中间也会生成字节码,再交给浏览器

V8引擎可以直接将JS转成二进制代码，所以效率更高，V8NB。

### 箭头函数的this和普通函数function的this

箭头函数没有自己的this值，它的this是从里往外找，直到找到this的定义。

* 普通函数：根据调用我的人（谁调用我，我的this就指向谁）

* 箭头函数：根据所在的环境（我在哪个环境中，this就指向谁）

**普通函数中的this:**

1. this总是代表它的直接调用者

2. 在默认情况(非严格模式下,未使用 'use strict'),没找到直接调用者,则this指的是 window
3. 在严格模式下,没有直接调用者的函数中的this是 undefined
4. 使用call,apply,bind(ES5新增)绑定的,this指的是 绑定的对象

**箭头函数中的this：**

1. 箭头函数没有自己的this, 它的this是继承而来;
2. 默认指向在定义它时所处的对象(宿主对象),而不是执行时的对象

**作用域链：**

当在函数中使用一个变量的时候,首先在本函数内部查找该变量,如果找不到则找其父级函数,最后直到window,全局变量默认挂载在window对象下