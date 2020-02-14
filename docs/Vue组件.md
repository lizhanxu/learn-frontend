## Vue组件

**Vue实例可以看作是最顶层(root)的组件**

**template属性在Vue内部最终会渲染成render函数**

props 传递数据、events 触发事件和slot内容分发就构成了 Vue组件的**3个API来源**，再复 杂的组件也是由这3部分构成的。

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

## solt(插槽)分发内容

当需要让组件组合使用，混合父组件的内容与子组件的模板时，就会用到 slot， 这个过程叫作内容分发（transclusion）。

### 基本使用

在template中通过`<solt>`标签占位，在使用时会用组件标签内的所有内容替换插槽。插槽中可以有默认值。

### 具名插槽

通过name属性给solt指定名字，在使用时通过solt属性去关联name

### 编译的作用域

组件和一般标签在使用时作用域一样

父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译

### 作用域插槽

父组件替换插槽的标签，但内容由子组件提供

## Vue组件中name的作用

比如keep-alive的include和exclude属性，使用name来包含或排除