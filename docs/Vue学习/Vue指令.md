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