# Vue.js

## 安装Vue

CDN引入、下载源码、npm安装

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

## MVVM模型

Model-View-ViewModel

![MVVM](/MVVM.png)

![MVVM各层解释](/MVVM解释.png)

Model用纯粹的JavaScript对象表示，View负责显示。

ViewModel连接视图View和数据业务的Model层，ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model。

本质上是MVC的改进版。MVVM将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。

Vue没有完全遵循MVVM模型，但是Vue的设计也受到了它的启发。

## 生命周期钩子

created：一个Vue实例被创建之后调用。注意，此时尚未挂载。

mounted：el挂载到实例上之后调用。注意，一般业务逻辑从这里开始。

beforeDestroy：实例销毁之前调用。

## 虚拟DOM

出于性能考虑，会尽可能复用已有的

给元素添加不同的key属性用来区分，就不会复用了。

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

## Vue组件

**Vue实例可以看作是最顶层(root)的组件**

**template属性在Vue内部最终会渲染成render函数**

组件可以像Vue实例那样使用其他的选项。
注意：使用data时，data必须是函数，然后将数据return出去。

注意：JavaScript对象是引用关系。

props传递数据、events 触发事件和slot内容分发就构成了Vue 组件的3个API来源，再复 杂的组件也是由这3部分构成的。

### 组件的使用步骤

* 创建组件构造器
```
const myComponent = Vue.extend({
  template:   .....
   .....
})
Vue.extend可以通过语法糖省略，由Vue源码内部去调用extend方法
```
* 注册组件
```
Vue.component('my-component',myComponent)
```
* 使用组件

使用时必须放在被Vue实例管理了的元素里面

### 全局组件和局部组件

全局组件可以在多个Vue的实例下使用，通过Vue.component方法注册

局部组件只能在一个Vue实例下使用，通过Vue实例的components属性注册

**开发中使用局部组件多**

**开发中一般只有一个Vue实例**

### 分离组件中的template

方法一：

```
body中
<script type = "text/x-template" id="#cpn">
	<div>
	
	</div>
</script>

template:"#cpn"
```

方法二：

```
body中
<template id="#cpn">
	<div>
	
	</div>
</template>

template:"#cpn"
```

### 组件中的data

组件内部不能直接访问Vue实例中的data

组件中的data必须是一个函数，通过return对象来返回数据

#### 组件中的data为什么必须是一个函数？

	需要每次return一个新的对象

### 数据的网络请求

一般在最外层的组件发送网络请求，请求数据，然后再传给子组件作为展示

### 数据传递/组件通信

    父子组件通信、兄弟组件通信、跨级组件通信

#### 使用props传递数据(父传子，常用)
    该方式为正向传递，单向传输。
    正向传递：从父组件到子组件
    
    变量需要v-bind绑定，也可以使用v-model
    
    可以是一个数组，也可以是一个对象。对象写法更好，可以增加类型限制和默认值等，type、default、validator、required。
    
    props中声明的数据与组件data函数return的数据主要区别就是props的来自父级，而data中的是组件自己的数据，作用域是组件本身
    
    父组件传递初始值，子组件将它保存下来，在自己的作用域内随便修改。在子组件的data中声明一个数据，引用父组件的prop。
    
    可以利用计算属性对传入值进行转变，再引用。
    
    注意：JavaScript中对象和数组都是引用类型

##### props中的驼峰标识

props中写cInfo，在组件中使用时要写成c-info

#### 自定义事件(子传父)

    通过该方式使子组件向父组件传递数据
     
    v-on除了监听DOM事件外，还可以用于组件之间的自定义事件
    
    子组件用$emit()来触发事件，父组件用$on()或者v-on来监听子组件的事件
    
    $emit()方法的第一个参数使自定义事件的名称，后面跟传入参数
    
    还可以用.native修饰符来监听原生事件，如`<my-component v-on:click.native="handleClick></my-component>`

##### 使用v-model来绑定监听

```
在使用v-model绑定时，事件名用input

注意：不要使用v-model绑定props的数据，props应该来自父组件由父组件来更改
```

##### 可以通过watch属性来监听数据改变

#### 父子组件的访问方式

父组件访问子组件对象：使用$children或$refs，开发中一般用$refs(在组件使用时调添加ref属性)，要拿到全部子组件采用$children

子组件访问父组件对象：使用$parent，一般用这个，不建议这样用，会造成父子组件耦合

访问根组件，$root，直接访问到Vue实例，很少用

#### 非父子组件通信

    使用一个空的Vue实例作为中央事件总线（bus）,该方法在SPA中常用

#### 父链
    在子组件中使用this.$parent可以直接访问该组件的父实例或组件；
    父组件也可以通过this.$children访问它所有的子组件；
    都是递归访问
    
    缺点：造成了父子组件的耦合，应尽量避免

#### 子组件索引
    $refs，非响应式的，应该尽量不适用这个

#### vuex——状态管理、组件通信解决方案

## Vue指令

带有"v-"前缀

指令的主要职责是当其表达式的值改变时，相应将某些行为应用到DOM上。

### v-on

语法糖  @

绑定事件，事件监听

##### v-on的参数传递问题

* 如果该方法本身不需要参数，使用时，方法后的()可以不添加
* 如果该方法中有一个参数，使用时不带()，则会默认将浏览器生成的event事件对象作为参数传入；使用时带()传参，会传入undefined。
* 如果该方法需要传入event对象，同时也需要传入其他参数，则可以通过$event显式传入事件，以及显示传入其他参数

### v-bind

语法糖  ：
动态绑定属性，双向绑定

### v-model

表单绑定

vue提供的一个语法糖，它等价于 v-bind:value + v-on:input，来实现同步更新。

v-model绑定的值是一个静态字符串或布尔值，但在业务中，有时需要绑定一个动态的数据，这时可以用v-bind来实现。

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

插入HTML

### v-text

插入文本，没有Mustache灵活

### v-pre

完全不解析，不改变的插入

### v-once

是一个不需要表达式的指令，作用是只渲染一次，在性能优化时可能用到

### v-cloak

在Vue实例结束编译时从绑定的HTML元素上移除。

作用：解决刷新或者加载出现闪烁。

操作虚拟DOM时该指令不需要

使用时要添加样式：

`[v-cloak] {`
 	display : none;
`}`

### 条件渲染

v-if   v-else-if   v-else

如果一次判断的是多个元素，可以使用`<template>`包裹起来

### v-show和v-if

用法和v-if基本一致，不过v-show改变的是css属性的display（style = "display : none"），仅仅是隐藏。

v-if才是真正的条件渲染，它会根据表达式适当地销毁或重建元素及绑定的事件或子组件。若表达式初始值为false则一开始不会渲染。

v-show只是简单的css属性切换，无论条件真假都会编译。

v-if更适合不经常改变的场景，v-show适用于频繁切换条件

### v-for 列表渲染指令

可以遍历数组(value,index)

可以对象属性(value,index,key)

还可以迭代整数

官方推荐在使用v-for时，给对应的元素或组件添加一个key属性(key要求唯一，一一对应)，可以提高性能。原因：和虚拟DOM的Diff算法有关。 `:key="item"`

## solt(插槽)分发内容

当需要让组件组合使用，混合父组件的内容与子组件的模板时，就会用到 slot， 这个过程叫作内容分发（transclusion）。

### 基本使用

在template中通过`<solt>`标签占位，在使用时会用组件标签内的所有内容替换插槽。插槽中可以有默认值。

### 具名插槽

通过name属性给solt指定名字，在使用时通过solt属性去关联name

### 作用域插槽

#### 编译的作用域

组件和一般标签在使用时作用域一样



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