## electron-vue问题整理

### 问题一

```
Html Webpack Plugin:
  ReferenceError: process is not defined
  
  - index.ejs:11 eval
    [.]/[_html-webpack-plugin@3.2.0@html-webpack-plugin]/lib/loader.js!./src/index.ejs:11:2
  
  - index.ejs:16 module.exports
    [.]/[_html-webpack-plugin@3.2.0@html-webpack-plugin]/lib/loader.js!./src/index.ejs:16:3
  
  - index.js:284 
    [electron-vue-project]/[_html-webpack-plugin@3.2.0@html-webpack-plugin]/index.js:284:18
  
  - runMicrotasks
  
  - task_queues.js:93 processTicksAndRejections
    internal/process/task_queues.js:93:5
```

解决方式：在`webpack.render.config.js`和`webpack.web.config.js`中添加如下代码：

```
      // 在new HtmlWebpackPlugin中添加
      
      templateParameters(compilation, assets, options) {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options
          },
          process,
        };
      },
```

### 问题二

```
[36052:0218/123202.231:ERROR:CONSOLE(7574)] "Extension server error: Object not found: <top>", source: chrome-devtools://devtools/bundled/inspector.js (7574)
```

解决方式：关闭自动弹出调试工具

```
// 在index.dev.js中    true改成false
require('electron-debug')({ showDevTools: false })
```

### 静态资源使用

static文件夹，可以放置可供 `main` 和 `renderer` 进程使用的静态资源。



在 Vue 应用程序中使用这些资源很简单，但是使用 `fs` 和其他需要完整路径的模块可能会有点棘手。 幸运的是，electron-vue 提供了一个 `__static` 变量，它可以在开发和产品阶段生成 `static/` 目录的路径。

### `build:web`

打包成能在浏览器运行的web应用。

#### 打包web应用中遇到的问题

> Module not found: Error: Can't resolve 'fs'

解决方式：注释store中的对vuex-electron的使用

>// import { createPersistedState, createSharedMutations } from 'vuex-electron'
>
>
>
>export default new Vuex.Store({
>
>  modules,
>
>  // plugins: [
>
>  //   createPersistedState(),
>
>  //   createSharedMutations()
>
>  // ],
>
>  strict: process.env.NODE_ENV !== 'production'
>
>})

### 备注

内建完整的Travis-ci、Appveyor配置脚本，只需少数修改就能做到利用CI自动构建的应用发布

