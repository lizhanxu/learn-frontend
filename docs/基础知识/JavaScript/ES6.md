# ES6(ES2015)

ES5中的var是没有块级作用域的，函数有作用域

ES5之前因为if和for都没有块级作用域的概念，所以很多时候必须借助function的作用域来解决引用外部变量的问题(闭包)。



**匿名闭包**

```
(function(){

})(传参列表)
```



ES6中的let是增加了块级作用域(比如：if和for)

在ES6开发中，优先使用const，只有需要改变某一个标识符的时候才使用let

ES6中可以使用Tab键上边的``定义可换行的字符串。

迭代器

**for...of** 循环得到元素



**for...in** 循环得到索引



高阶函数(可以用函数作为参数的函数，可以用那慕达函数(箭头函数))：

reduce/filter/map

 

filter

filter中的回调函数有一个要求：必须返回一个boolean值。

当返回true时，函数内部会自动将这次回调的元素加入到新的数组中。

当返回false时，函数内部会过滤掉这次的元素



map

对每个元素执行回调函数，放入到新的数组



reduce

对数组中所有的内容进行汇总

可以有两个参数，第一个参数为回调函数(回调函数有两个参数，第一个为preValue，第二个为元素)，第二个参数为初始化参数。



ES5中定义类

```
function Persion(){

}
```



ES6中定义类
```
class Person{

}
```





## 对象的解构

```
const obj = {
  name: 'lizhanxu',
  age: 18,
  height: 1.88
}

// 一样的，按名字而不是按位置赋值
// const {name,height,age} = obj;
const {name,age,height} = obj;

// 上面这行代码等价于
const name = obj.name;
const age = obj.age;
const height = obj.height;
```

数组也可以解构，但很少用

