## Vue CLI

脚手架

Vue CLI依赖node，依赖webpack。

在已经安装Vue CLI3的基础上，想要使用Vue CLI2，需要安装一个桥接工具。

```bash
npm install -g @vue/cli-init
```

### 初始化项目

Vue CLI2    `vue init webpack my-project`

Vue CLI3    `vue create my-project`

#### 使用模板

`vue init webpack my-project`  这里使用的模板是webpack

### runtime-only和runtime-compiler

[P95](https://www.bilibili.com/video/av59594689?p=95)

#### runtime-only

render—>virtual dom—>real dom(UI)

性能更高，代码更少。

除去compiler的其它一切。

代码中不可以有任何的template，不会处理template。

#### runtime-compiler

template—>ast(abstract syntax tree)—>render—>virtual dom—>real dom(UI)

代码中可以有template，compiler可以用于编译template。

可以在webpack.config.js中指定vue的版本，见webpack.md----webpack配置文件。

#### 开发时

开发时为了更高的性能，更小的打包，一般选用runtime-only。

.vue文件中的template通过开发时依赖的webpack-template-comoiler完成"template—>ast—>render"的过程。

### ESLint

ES是指ECMAScript。*ES*是*JS*语言的国际标准,*JS*是*ES*的实现。

Lint是指限制。

ESLint选中了之后将按ES标准对JS代码进行严格的检查，如果不满足规范，编译器将直接报错。



建议：不选，有些限制并不好，不好用，严格得过分



已将选用了ESLint，如何关闭：

config/index.js中将useEslint改成false

### 单元测试

前端单元测试用得比较少

### 端到端测试

比较高级的测试，一般由专门的测试人员去做

## Vue CLI2

### Vue CLI2目录结构

#### build文件夹

放配置文件

##### check-version.js

检测当前的npm和node版本是不是符合package.json中定义的，如果不符合就提示wraning

#### config文件夹

放的配置相关文件，**抽取了一些变量出来**，主要是为build的配置文件服务

#### node_modules文件夹

存放引入的模块代码

#### src文件夹

放开发的源码

#### static文件夹

静态资源文件夹

**资源文件放在static文件夹与src文件夹中的区别**：

static文件夹中的资源文件不会做任何处理，直接拷贝到dist文件下。

src文件夹中的资源文件会做一些处理，比如url-loader对大于limit的文件会做转base64处理，重新命名等，再打包到dist文件夹下。

### Vue CLI2最外层文件

#### .babelrc文件

babel是JS文件转换用的，ES6转ES5。

.babelrc文件是babel的配置文件。

建议：很少改它

#### .editorconfig

用来统一编码风格，缩进、换行等等。

建议：为了规范性，一般都需要用这个文件来统一编码规范。

#### .eslintignore

eslint检查忽略的文件、文件夹

#### .eslintrc

eslint配置文件

建议：一般不修改

#### .postcssrc.js

进行css转化时的配置

建议：一般不修改

#### package-lock.json

因为package.json中指定的依赖，并不是明确指定某一个版本。

` ^5.2.0`中`^` 是指0是可变的，大于等于5.2.0的版本。

`~5.2.0`中`~`是指0和2都是可变的，大于等于5.2.0的版本。



package-lock.json锁定明确的依赖版本。



## Vue CLI3和2的区别

* vue-cli3基于webpack4，vue-cli2基于webpack3
* vue-cli3的设计原则是”0配置“，移除配置文件根目录下的、build和config等目录下的
* vue-cli3提供了vue ui命令，提供了可视化配置
* 移除了static文件夹，新增了public文件夹，并且将index.html移动到public，public文件夹可以当作static文件夹
* Vue CLI3将很多devDependencies封装到@vue/cli-serveice中了

## Vue CLI3

### Vue CLI3初始化预设

Progressive Web App (PWA) Support：提供一些高级支持，如推送、通知、缓存等，还不是很流行。

CSS Pre-processors：CSS预处理器，less、scss等

Linter/Formatter：就是ESLint

### Vue CLI3最外层文件

#### .browserslistrc

配置适配哪些浏览器

### src/main.js

```
// Tip  提示
// 关闭打包时(构建时)的提示信息
// 用处不大
Vue.config.productionTip = false

以下这两种挂载el的方式一样，el:'#app'将值传到Vue源码，Vue源码内部也是调用$mount方法

new Vue({
  el:'#app',
  render: h => h(App)
})

new Vue({
  el:'#app',
  render: h => h(App)
}).$mount('#app')
```

### 如何修改配置

一、通过vue ui修改

二、配置在node_modules/@vue/cli-service/webpack.config.js

三、在根目录下创建 **vue.config.js** (固定的名字)，可以增加/修改想要的配置，会自动合并

### 备注

#### .gitkeep文件

git不会上传空文件夹，想上传空文件夹需在文件夹中添加.gitkeep文件。