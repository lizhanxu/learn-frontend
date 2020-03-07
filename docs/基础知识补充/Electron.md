# Electron

## 关于

由Github开发；

用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源 **库**；

Electron通过将 Chromium 和 Node.js 合并到同一个 **运行时** 环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。

## 应用架构

### 两种进程类型

#### 主进程

Electron 运行 `package.json` 的 `main` 脚本的进程被称为 **主进程**。

一个 Electron 应用总是 **有且只有** 一个主进程。

每个 Electron 中的 web 页面运行在它 **自己的渲染进程** 中。

#### 渲染进程

渲染进程是你的应用内的一个浏览器窗口。

渲染进程除了额外能够使用node模块的能力外，与普通网页没有什么区别。

#### 主进程和渲染进程之间的区别

主进程使用 `BrowserWindow` 实例创建页面。

每个 `BrowserWindow` 实例都在 **自己的** 渲染进程里运行页面。

当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

主进程 **管理** 所有的web页面和它们对应的渲染进程。

每个渲染进程都是 **独立的**，它只关心它所运行的 web 页面。

#### 注意

基本规则是: 如果一个模块是 GUI 或底层系统相关的, 那么它应该只在主进程中可用。

不要在web页面的JS中调用GUI相关的原生API，容易造成资源泄露。

如果确实想在web页面中使用GUI操作，应该让其对应的渲染进程与主进程通信，请求主进程进行相关GUI操作。

#### 主进程和渲染进程间通信

方式一：

用 `Electron` 内的 IPC 机制实现，`ipcRenderer`和`ipcMain`。

方式二：

RPC方式通信，将数据存在主进程的某个全局变量中，然后在多个渲染进程中使用 `remote` 模块来访问它。

## API

可以使用Electron API 和 Node.js API

### Electron API

所有Electron的API都被指派给一种进程类型。 许多API只能被用于主进程或渲染进程中，但其中一些API可以同时在上述两种进程中使用。

Electron通过`remote`模块暴露一些通常只能在主进程中获取到的API。

#### process

> 进程对象

使用范围：主进程、渲染进程

Electron的process对象继承自Node.js的process。新增了一些事件、属性和方法。

#### app

> 控制你的应用程序的事件生命周期

使用范围：主进程

事件：

* ready，当Electron完成初始化时被触发。绝大部分情况下，你必须在`ready`事件句柄中处理所有事务。

#### BrowserWindow

> 创建和控制浏览器窗口

使用范围：主进程

##### 方法

* show()，显示并聚焦于窗口

* loadURL ( url [, options] )，加载html到窗口

  `url` 可以是远程地址 (例如 `http://`),也可以是 `file://` 协议的本地HTML文件的路径。

##### 优雅地显示窗口

当页面在窗口中直接加载时，用户会看到未完成的页面，这不是一个好的原生应用的体验。为了让画面准备好了再显示，这有两种不同的解决方案。

* 方式一: ready-to-show    在此事件后显示窗口将没有视觉闪烁
* 方式二: 设置`backgroundColor`，立刻显示窗口，并使用接近应用程序背景的 `backgroundColor`

子窗口重视显示在父窗口的顶部。

##### 无边框窗口

[无边框窗口](https://www.electronjs.org/docs/api/frameless-window)

要创建无边框窗口，只需在BrowserWindow的 `options` 中将 `frame` 设置为 `false`。

通过将 `transparent` 选项设置为 `true`, 还可以使无框窗口透明。

###### 可拖拽区

默认情况下, 无边框窗口是不可拖拽的。 

应用程序需要在 CSS 中指定 `-webkit-app-region: drag` 来告诉 Electron 哪些区域是可拖拽的（如操作系统的标准标题栏），在可拖拽区域内部使用 `-webkit-app-region: no-drag` 则可以将其中部分区域排除。 

请注意, 当前只支持矩形形状。

请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用户将无法点击它们

#### webContents

> 渲染和控制web页面

使用范围：主进程

webContents模块继承自EventEmitter类。

负责渲染和控制网页, 是`BrowserWindow`对象的一个属性。

`contents.send(channel, ...args)`通过channel，异步发送消息和参数到渲染进程

channel是string类型，指定字符串，在接收时用同样的channel接收。

#### Menu

> 创建原生应用菜单和上下文菜单

使用范围：主进程

#### MenuItem

> 菜单项

* role    指定菜单项的行为，定义`click`属性后此属性将被忽略。

#### ipcMain

> 从主进程到渲染进程的异步通信。

使用范围：主进程

ipcMain模块继承自EventEmitter类。当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

#### ipcRenderer

> 从渲染器进程到主进程的异步通信。

使用范围：渲染进程

ipcRenderer模块继承自EventEmitter类。可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

#### remote

> 在渲染进程中使用主进程模块，RPC方式通信

使用范围：渲染进程

使用 `remote` 模块, 你可以调用 main 进程对象的方法, 而不必显式发送进程间消息。

#### Tray

> 添加图标和上下文到系统通知区

#### shell

> 使用默认应用程序管理文件和 url。

### Node API

所有在Node.js可以使用的API，在Electron中同样可以使用。

**非常重要的提示**: 原生Node.js模块 (即指，需要编译源码过后才能被使用的模块) 需要在编译后才能和Electron一起使用。

## 用asar打包应用程序

### 什么是asar？

asar 是一种将多个文件合并成一个文件的类tar风格的归档格式。Electron无需解压整个文件，即可从其中读取任意文件内容。

### 为什么使用asar？

* 为缓解 Windows 下路径名过长的问题。提高在Windows下的性能。
* 略微加快一下 `require`的速度
* 隐藏源代码

使用asar将应用打包成asar档案文件。

### 支持

* **在electron-packager、electron-forge、electron-builder中都得到了支持，开箱即用。**

在 Electron 中有两类 APIs：Node.js 提供的 Node API 和 Chromium 提供的 Web API。 这两种 API 都支持从 `asar` 档案中读取文件。

由于 Electron 中打了特别补丁， Node API 中如 `fs.readFile` 或者 `require` 之类 的方法可以将 `asar` 视之为虚拟文件夹，读取 asar 里面的文件就和从真实的文件系统中读取一样。

在 Web 页面里，用 `file:` 协议可以获取 `asar` 包中文件。和 Node API 一样，视 asar 包如虚拟文件夹。

在某些情况下可以把asar档案作为一个普通文件。

### 局限性

档案文件是只读的。

工作目录不能设置为档案文件里的目录。

某些API需要解压档案包。

## 备注

使用es6解构赋值(对象的解构)来使用内置模块更方便。

调用 `event.preventDefault()` 会阻止默认的行为。

`process.env.NODE_ENV`是**自定义**的全局变量，之后会取出这个变量来进行区分，从而分别进行不同的操作。

darwin是苹果公司开发的UNIX操作系统，是苹果所有操作系统的基础，包括macOS。