# centos7安装node18

## 场景

centos7服务器使用nvm安装的node之后，只要使用npm或者node，均会出现以下问题

```shell
[root@172 ~]# node -v
node: /lib64/libm.so.6: version `GLIBC_2.27' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by node)
node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by node)
```

## 原因

查看系统内安装的glibc版本
然后再根据分析可得知 新版的node v18开始 都需要GLIBC_2.27支持，可是目前系统内却没有那么高的版本

```shell
[root@172 glibc-2.28]# strings /lib64/libc.so.6 |grep GLIBC_
GLIBC_2.2.5
...
GLIBC_2.17
....
```

libstdc版本过低

```
strings /usr/lib64/libstdc++.so.6 | grep GLIBCXX
strings /lib64/libstdc++.so.6 | grep GLIBCXX
```

## 解决办法

### 更新glibc

根据提示 安装所需要的glibc-2.28

```shell
wget http://ftp.gnu.org/gnu/glibc/glibc-2.28.tar.gz
tar xf glibc-2.28.tar.gz 
cd glibc-2.28/ && mkdir build  && cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```

### 可能出现的错误

上步更新glibc 可能会发生错误。
如果没有错误 下边这一步 不用看。

#### make问题

```shell
configure: error: 
*** These critical programs are missing or too old: make bison compiler
*** Check the INSTALL file for required versions.
```

解决办法：升级gcc与make

```shell
# 升级GCC(默认为4 升级为8)
yum install -y centos-release-scl
yum install -y devtoolset-8-gcc*
mv /usr/bin/gcc /usr/bin/gcc-4.8.5
ln -s /opt/rh/devtoolset-8/root/bin/gcc /usr/bin/gcc
mv /usr/bin/g++ /usr/bin/g++-4.8.5
ln -s /opt/rh/devtoolset-8/root/bin/g++ /usr/bin/g++

# 升级 make(默认为3 升级为4)
wget http://ftp.gnu.org/gnu/make/make-4.3.tar.gz
tar -xzvf make-4.3.tar.gz && cd make-4.3/
./configure  --prefix=/usr/local/make
make && make install
cd /usr/bin/ && mv make make.bak
ln -sv /usr/local/make/bin/make /usr/bin/make
```

这时 所有的问题 都已经解决完毕 再重新执行上一步 更新glibc即可

```shell
cd /root/glibc-2.28/build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```

我的依旧报错：bison太老旧

```shell
configure: error: 
*** These critical programs are missing or too old: bison
*** Check the INSTALL file for required versions.
```

看看我的bison版本多少

```shell
[root@172 ~]# bison -v
-bash: bison: 未找到命令
```

#### bison问题

嗨，没装啊。装一下呗

```shell
yum install -y bison
```

这时 所有的问题 真的真的都已经解决完毕 再重新执行上一步 更新glibc即可

```shell
cd /root/glibc-2.28/build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```

### 更新glibc

make 和 make install在linux中就是安装软件的意思 简单这么理解就好。
这个过程较长，大约半小时左右，建议打一局游戏就好了。

```shell
make && make install
// 验证下 是不是好了
npm -v
```

#### 以下报错不用理会

```
LD_SO=ld-linux-x86-64.so.2 CC="gcc -B/usr/bin/" /usr/bin/perl scripts/test-installation.pl /usr/local/src/glibc-2.28/build/
/usr/bin/ld: cannot find -lnss_test2
collect2: error: ld returned 1 exit status
Execution of gcc -B/usr/bin/ failed!
The script has found some problems with your installation!
Please read the FAQ and the README file and check the following:
- Did you change the gcc specs file (necessary after upgrading from
  Linux libc5)?
- Are there any symbolic links of the form libXXX.so to old libraries?
  Links like libm.so -> libm.so.5 (where libm.so.5 is an old library) are wrong,
  libm.so should point to the newly installed glibc file - and there should be
  only one such link (check e.g. /lib and /usr/lib)
You should restart this script from your build directory after you've
fixed all problems!
Btw. the script doesn't work if you're installing GNU libc not as your
primary library!
make[1]: *** [Makefile:111: install] Error 1
make[1]: Leaving directory '/usr/local/src/glibc-2.28'
make: *** [Makefile:12: install] Error 2
```

### 更新libstdc

```
# make all
# yum whatprovides libstdc++.so.6
# yum update -y libstdc++.x86_64

# 这个版本的libstdc++.so.6实际上版本比较旧，并不能解决问题。
# 下载稍微新一点的版本
sudo wget http://www.vuln.cn/wp-content/uploads/2019/08/libstdc.so_.6.0.26.zip
unzip libstdc.so_.6.0.26.zip
cp libstdc++.so.6.0.26 /lib64/
cd /lib64

# 把原来的命令做备份
cp libstdc++.so.6 libstdc++.so.6.bak
rm -f libstdc++.so.6

# 重新链接
ln -s libstdc++.so.6.0.26 libstdc++.so.6
```

### 可能出现的错误

```
manpath: can't set the locale; make sure $LC_* and $LANG are correct

yum -y install glibc-locale-source
localedef -i en_US -f UTF-8 en_US.UTF-8
```

