## npm使用

### 常用命令

```
npm config ls      查看npm配置

更改npm全局模块和cache的默认路径
npm  config set prefix "D:\npm\node_global_modules"
npm  config set cache "D:\npm\node_cache"
```

### 配置path环境变量

D:\npm\node_global_modules

D:\npm\node_global_modules\node_modules

注意此处node_global_modules不能用node_modules为名字。

### cnpm

淘宝镜像

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 常见问题

* 从cnpm下载有时会有错误(缺少某些依赖的模块)，此时从npm下载

* 尽量使用npm install下载依赖，

  如果某些依赖下载不下来，或者一直不正确，有问题，

  把node_modules里的对应的那个依赖的文件夹删掉，使用cnpm去下载

### 建议

大多数项目，webpack官方建议本地安装

