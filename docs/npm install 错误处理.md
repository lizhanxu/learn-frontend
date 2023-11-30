# npm install 错误处理

## 解决网络问题

* 开启vpn系统代理

* 设置cmd代理

  ```
  set http_proxy=http://127.0.0.1:7890 & set https_proxy=http://127.0.0.1:7890
  ```

* 设置git代理

  ```
  设置
  git config --global http.proxy http://127.0.0.1:7890
  git config --global https.proxy http://127.0.0.1:7890
  查看
  git config --global --get http.proxy
  git config --global --get https.proxy
  取消
  git config --global --unset http.proxy
  git config --global --unset https.proxy
  ```

* 设置npm代理

  ```
  设置
  npm config set proxy http://127.0.0.1:7890
  npm config set https-proxy http://127.0.0.1:7890
  查看
  npm config list    等同于  npm config ls
  取消
  npm config delete proxy
  npm config delete https-proxy
  
  有些情况下，设置npm代理反而不能访问
  ```

* 设置yarn代理

  ```
  设置
  yarn config set proxy http://127.0.0.1:7890
  yarn config set https-proxy http://127.0.0.1:7890
  查看
  yarn config list
  取消
  yarn config delete proxy
  yarn config delete https-proxy
  ```

## 清空npm缓存

```
npm cache clean --force
```

## 更新npm

> 不同的项目对npm依赖的版本不同
>
> npm版本和node版本有对应关系
>
> 可以用nvm来进行管理切换

```
npm install -g npm@latest --force
```

## 快速删除node_modules

```
npm install -g rimraf
rimraf node_modules
```

## cnpm

> 最终方法，不推荐使用
>
> 强烈建议不要直接使用cnpm进行安装，由于软链接带来的玄学bug是真的没法说，最好就是用nrm切换一下registry，或者使用yarn，是最好的了。
>
> 一般遇到`Electron failed to install correctly，please delete node_moules/electron and try installing again`这种错误时，就是electron本体没有下载成功，删除node_module文件夹，并按照上面的设置进行electron镜像地址设置之后就好了

```
安装cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
```

## electron install fail

```
cd node_modules/electron

编辑install.js
downloadArtifact中增加
mirrorOptions:{
  mirror:"https://npmmirror.com/mirrors/electron/",
}

mirrorOptions:{
  mirror:"https://npm.taobao.org/mirrors/electron/",
}

node install.js
```

```
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

## python报错处理

```
npm config set python E:\tool\Python27\python.exe //路径换成自己的
```

```
gyp ERR! stack Error: Command failed: C:\Users\pc\AppData\Local\Programs\Python\Python310\python.EXE -

python3报错就换python2
```

## 重点

各种代理及网络都设置了的情况下，仍然有网络相关报错，请 **更换网络**