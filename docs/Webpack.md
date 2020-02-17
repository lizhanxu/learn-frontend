## Webpack

### 简介

JavaScript应用的静态模块打包工具。

其他打包工具：grunt/gulp/rollup等。

webpack对前端模块化规范如AMD、CMD、CommonJs、ES6等都有支撑。

**webpack将所有文件都当作模块来使用。**

webpack会处理模块之间的依赖。

webpack依赖node环境。

### 目录解析

src    源码目录

dist   存放打包之后的东西，直接将该文件夹给服务器发布 。distribution(发布) 



### 命令

`webpack ./src/main.js ./dist/bundle.js`

使用webpack将main.js打包，生成./dist/bundle.js文件



### webpack配置文件

webpack.config.js

```
const path = require('path')  //引入node的path模块
module.exports = {
  entry: './src/main.js',   //入口
  output: {                 //出口
    //路径，必须是绝对路径，要动态获路径，使用node的path模块
    //resolve函数可以对两个路径进行拼接
    //_dirname是一个node中的全局变量，保存当前文件所在路径
    path: path.resolve(_dirname,'dist'),
    filename:'bundle.js',    //文件名
    publicPath:'dist/'  
    //publicPath并不会对生成文件的路径造成影响，主要是对页面里面引入的资源的路径url做对应的补全
  }，
  module: {
    rules: [
      {
        test: /\.css$/,
        use:['css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      //指定vue版本
      //vue.esm.js包含compiler
      'vue&': 'vue/dist/vue.esm.js',
      
      //起别名
      '@': resolve('src'),
      'pages': resolve('src/pages'),
    },
    extensions: {             //设置导入时可不写的扩展名
      ['.js','.css','.vue']
    }
  }
}
```

`.. `     表示上级目录

### package.json

对node环境依赖的一些相关信息

```
package.json中scripts的命令，可以使用全局模块的，也可以使用局部(本地)模块的,优先使用局部(本地)模块。
在终端中只有全局模块配置在系统的环境变量中，能直接找到。

开发时依赖 devDependencies
--save-dev

webpack是开发时依赖，打包完就没用了,所以在安装时执行：
npm install webpack --save-dev

运行时依赖 dependencies
--save
vue是运行时依赖
```

### loader

作用：实现文件转化处理。

webpack本身只支持js文件的转化，对于其它文件的转化，需要给webpack扩展对应的loader。

将文件作为模块引用，让webpack能够找到，如：

`require('./normal.css')`

**webpack使用多个loader时是从右向左**

#### loader的使用

* 一：通过npm安装loader；

* 二：在webpack.config.js中的modules关键字下进行配置。

**loader可以去官网找**，有loader介绍和使用教程



#### css文件处理

css-loader只负责将css文件进行加载，不解析

style-loader负责将样式添加到DOM中生效



样式预处理

less、scss、stylus ，扩展了css

#### 资源文件处理

以图片资源为例

`file-loader`将文件发送到输出文件夹，并返回（相对）URL

`url-loader ` 像file-loader一样工作，但如果文件小于limit，会将图片编译成base64字符串，如果大于limit会使用file-loader处理文件。

##### 将文件编译成base64的好处

* 提升性能：base64可以随着 HTML 的下载同时下载到本地。减少http请求
* 加密
* 方便引用：在多个文件同时使用某些图片时, 可以把图片转为base64格式的文件, 把样式放在全局中, 比如common.css, 以后在用的时候就可以直接加类名, 二不需要多层找文件路径, 会提升效率

```
use:[
  {
    loader: 'url-loader',
    options: {
      limit: 8192,
      //[]表示是变量
      //name 文件名
      //hash:8表示截取8位
      //ext 扩展名
      name: 'img/[name].[hash:8].[ext]' //指定文件路径和文件名
    }
  }
]
```

#### ES6转ES5

使用babel-loader

#### .vue文件处理

vue-loader   加载vue文件

vue-template-compiler  编译.vue文件

### plugin

#### loader与plugin的区别

* loader主要用于转换某些类型的模块，它是一个转换器
* plugin是插件，它是对webpack本身的扩展，是一个扩展器

#### plugin的使用

* 一：通过npm安装plugin
* 二：在webpack.config.js中的plugins中配置插件

```
plugins: [
  new webpack.BannerPlugin('最终版权归coderLee所有'),
  new HtmlWebpackPlugin({
    template: 'index.html'       //传入模板
  })
]
```

#### BannerPlugin

在打包后的代码顶部添加版权信息

它是webpack内置plugin

#### HtmlWebpackPlugin

打包html文件：

自动生成一个index.html文件(可以指定模板来生成)

将打包的js文件，自动通过script标签插入到body中

#### CopyWebpackPlugin

复制文件或文件夹到dist文件夹下

#### friendly-errors-webpack-plugin

友好错误提示插件，对错误提示进行优化。

#### ExtractTextPlugin

从打包好的文件中抽出部分内容形成单独的文件。

比如将css单独抽离出来，使打包后的内容更合理，不混乱。

#### uglifyJsPlugin

压缩(丑化)JS的plugin

开发阶段不要用这个插件

#### optimize-css-assets-webpack-plugin

A Webpack plugin to optimize \ minimize CSS assets.

#### webpack-dev-server

热更新。

使用步骤：

* 一：通过npm安装webpack-dev-server
* 二：配置webpack.config.js

```
和entry同级
devServer: {
  contentBase: './dist',        //设置监听的文件夹
  inline: true                  //开始实时监听
}
```

运行命令

webpack-dev-server 

--open  自动打开网页

--inline   热更新

--progress    显示进度条

--config   指定配置文件

### 开发和生产配置分离

 将webpack.config.js的开发(dev)时配置和生产(build，打包)时配置进行分离。

新建 **build** 文件夹存放配置文件

将webpack.config.js分离成3个文件

| 文件名         | 描述       |
| -------------- | ---------- |
| base.config.js | 通用配置   |
| dev.config.js  | 开发时配置 |
| prod.config.js | 打包时配置 |

webpackMerge模块通过npm安装 ,注意`--save-dev`

通过webpackMerge模块进行配置的合并

```
prod.config.js

module.exports = webpackMerge(baseConfig,{
  plugin:[
    new UglifyjsWebpackPlugin()
  ]
})
```

修改package.json的scripts

指定配置文件

`"build": webpack --config ./build/prod.config.js`

`"dev": webpack-dev-server --open --config ./build/dev.config.js`

### 备注

* jpg和jpeg一样，只是名字不同。