# Vue.js

## 渐进式

渐进式框架，所谓渐进式，就是指可以一步一步、有阶段性地来使用Vue.js,不必一开始就使用所有东西。自底向上逐层应用。

## 声明式渲染

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

## 响应式

响应式是指可以智能地根据用户行为以及使用的设备环境进行相对应的布局。

数据和 DOM 已经被建立了关联，所有东西都是**响应式的**。

## 组件化

在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的
```
var vm = new Vue({
// 选项
})
```

所有的 Vue 组件都是 Vue 实例。

Vue 实例暴露了一些有用的实例属性与方法。它们都有前缀 `$`，以便与用户定义的属性区分开来。

## MVVM模型

Model-View-ViewModel

Model用纯粹的JavaScript对象表示，View负责显示。

ViewModel连接视图View和数据业务的Model层，ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model。

本质上是MVC的改进版。MVVM将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。

Vue没有完全遵循MVVM模受型，但是Vue的设计也受到了它的启发。

## 生命周期钩子

created：一个Vue实例被创建之后调用。注意，此时尚未挂载。

mounted：el挂载到实例上之后调用。注意，一般业务逻辑从这里开始。

beforeDestroy：实例销毁之前调用。

## Vue指令

带有"v-"前缀

指令的主要职责是当其表达式的值改变时，相应将某些行为应用到DOM上。

### v-on

语法糖  @

绑定事件

### v-bind

语法糖  ：
绑定属性，双向绑定

### v-model

vue提供的一个语法糖，它等价于 v-bind + v-on，来实现同步更新。

v-model绑定的值是一个静态字符串或布尔值， 但在业务中，有时需要绑定一个动态的数据，这时可以用v-bind来实现。

#### v-model修饰符
.lazy
```
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

.number
自动将用户的输入值转为数值类型
```
<input v-model.number="age" type="number">
```

.trim
自动过滤用户输入的首尾空白字符


### v-html

输出HTML

### v-once

是一个不需要表达式的指令，作用是只渲染一次，在性能优化时可能用到

### v-clock

在Vue实例结束编译时从绑定的HTML元素上移除

作用：解决刷新或者加载出现闪烁

### 条件渲染

v-if v-elseif v-else

如果一次判断的是多个元素，可以使用`<template>`包裹起来

### v-show和v-if

用法和v-if基本一致，不过v-show改变的是css属性的display（style="display:none"），仅仅是隐藏。

v-if才是真正的条件渲染，它会根据表达式适当地销毁或重建元素及绑定的事件或子组件。若表达式初始值为false则一开始不会渲染。

v-show只是简单的css属性切换，无论条件真假都会编译。

v-if更适合不经常改变的场景，v-show适用于频繁切换条件

### v-for 列表渲染指令

可以遍历数组(value,index)

可以对象属性(value,index,key)

还可以迭代整数

## 数组更新

通过以下方式改变数组会触发视图更新：

set(),push(),pop(),shift(),unshift(),splice(),sort(),reverse()会改变原数组；

filter(),concat(),slice()会返回一个新数组，不会给变原数组

```
例如：给books添加一项
app.books.push({
    ...
});
```

## 事件修饰符

.stop  .prevent  .capture  .self  .once等

```
例如：阻止单击事件冒泡
<a @click.stop="handle"></a>
```

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