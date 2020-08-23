## Node相关

[nodeAPI](http://nodejs.cn/api/)

### process

> `process` 对象是一个全局变量，它提供有关当前 Node.js 进程的信息并对其进行控制。 作为一个全局变量，它始终可供 Node.js 应用程序使用，无需使用 `require()`。 它也可以使用 `require()` 显式地访问：

```js
const process = require('process');
```



可以通过`console.log('process')`打印出来看

将`console.log('process')`写在一个js文件，然后`node js文件名`来执行这个js文件。

### module

> 在每个模块中， `module` 的自由变量是对表示当前模块的对象的引用。 为方便起见，还可以通过全局模块的 `exports` 访问 `module.exports`。 `module` 实际上不是全局的，而是每个模块本地的。

#### 模块环境探测

> 现今，CommonJS Modules 与 AMD 有着广泛的应用，如果确定 AMD 的 define 是可用的，我们当然可以使用 define 来编写模块化的代码。然而，我们不能假定我们的代码必然运行于 AMD 环境下。有没有办法可以让我们的代码既兼容于 CommonJS Modules 或 AMD 规范，又能在一般环境下运行呢？
>
> 其实我们只需要在某个地方加上对 CommonJS Modules 与 AMD 的探测并根据探测结果来“注册”自己就可以了，以上那些模块模式仍然有用。
>
> AMD 定义了 define 函数，我们可以使用 typeof 探测该函数是否已定义。若要更严格一点，可以继续判断 define.amd 是否有定义。另外，SeaJS 也使用了 define 函数，但和 AMD 的 define 又不太一样。
>
> 对于 CommonJS，可以检查 exports 或是 module.exports 是否有定义。

#### `module.children`

> 被该模块引用的模块对象。

#### exports和module.exports

`exports` 变量是在模块的文件级作用域内可用的