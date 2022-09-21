# npm模块

## ncu

```
npm install -g npm-check-updates

检查依赖
ncu

检查全局依赖
ncu -g

更新package.json
ncu -u
```

## npx

npm内置

调用项目内部安装的模块

```
./node_modules/.bin/eslint --init
等同于
npx eslint --init
```

## portfinder

自动获取当前可用的port。

## ora

实现node.js 命令行环境的 loading效果，和显示各种状态的图标等

## rimraf

以包的形式包装`rm -rf`命令，就是用来删除文件和文件夹的，不管文件夹是否为空，都可以删除。

## del

Similar to rimraf, but with a Promise API and support for multiple files and globbing. It also protects you against deleting the current working directory and above.

del和rimraf类似，但是使用的是Promise API

## chalk

一个颜色插件，为了输出不再单调，添加文字背景，改变字体颜色等。

## semver

[Semantic Version](https://link.jianshu.com/?t=http://semver.org/)是当下被大多数软件/库使用的一套版本命名规范。

[Semver](https://link.jianshu.com/?t=https://github.com/npm/node-semver)是一个专门分析Semantic Version（语义化版本）的工具，“semver”其实就是这两个单词的缩写。Npm使用了该工具来处理版本相关的工作。

功能：

- 比较两个版本号的大小
- 验证某个版本号是否合法
- 提取版本号，例如从“=v1.2.1”体取出"1.2.1"
- 分析版本号是否属于某个范围或符合一系列条件
- 等等...

## shelljs

该模块用来执行shell命令。

## cross-env

Run scripts that set and use environment variables across platforms

## cfonts

This is a silly little command line tool for sexy fonts in the console.

## webpack-hot-middleware

Webpack hot reloading using only [webpack-dev-middleware](https://webpack.js.org/guides/development/#webpack-dev-middleware). This allows you to add hot reloading into an existing server without [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).

This module is **only** concerned with the mechanisms to connect a browser client to a webpack server & receive updates.

## vue-electron

 将 electron API 附加到 Vue 对象

## [WebStorageCache](https://www.npmjs.com/package/web-storage-cache)

`WebStorageCache` 对HTML5 `localStorage` `和sessionStorage` 进行了扩展，添加了超时时间，序列化方法。可以直接存储json对象，同时可以非常简单的进行超时时间的设置。
**优化**：`WebStorageCache`自动清除访问的过期数据，避免了过期数据的累积。另外也提供了清除全部过期数据的方法：`wsCache.deleteAllExpires();`

**使用**

```
<script src="src/web-storage-cache.js"></script>
<script>
// create WebStorageCache instance.
// var wsCache = new WebStorageCache();

var wsCache = new WebStorageCache({
    // [可选] 'localStorage', 'sessionStorage', window.localStorage, window.sessionStorage
    //        或者其他实现了 [Storage API] 的storage实例.
    //        默认 'localStorage'.
    storage: 'localStorage',
    // [可选]  类型Number，公共超时事件设置。默认无限大
    exp: Infinity
});

// 缓存字符串'wqteam' 到 'username' 中, 超时时间100秒
wsCache.set('username', 'wqteam', {exp : 100});

// 超时截止日期，可用使用Date类型
var nextYear = new Date();
nextYear.setFullYear(nextYear.getFullYear() + 1);
wsCache.set('username', 'wqteam', {exp : nextYear});

// 获取缓存中 'username' 的值
wsCache.get('username');

// 缓存简单js对象，默认使用序列化方法为JSON.stringify。可以通过初始化wsCache的时候配置serializer.serialize
wsCache.set('user', { name: 'Wu', organization: 'wqteam'});

// 删除缓存中 'username'
wsCache.delete('username');

// 手工删除所有超时CacheItem,
wsCache.deleteAllExpires();

// 清除客户端中所有缓存
wsCache.clear();

// 为已存在的（未超时的）缓存值设置新的超时时间。
wsCache.touch('username', 1);

// 如果缓存中没有key为username2的缓存，则添加username2。反之什么都不做
wsCache.add('username2', 'wqteam', {exp : 1});

// 如果缓存中有key为username的缓存，则替换为新值。反之什么都不做
wsCache.replace('username', 'new wqteam', {exp : 1});

// 检查当前选择作为缓存的storage是否被用户浏览器支持。
//如果不支持调用WebStorageCache API提供的方法将什么都不做。
// 返回值Boolean
wsCache.isSupported();
</script> 
```

## [EventEmitter](https://www.npmjs.com/package/EventEmitter)

> javascript中事件机制的实现