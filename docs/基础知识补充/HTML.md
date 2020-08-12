# HTML

Hyper Text Markup Language

超文本标记语言

标记语言

> HTML文档由无数个标记(**标签**、tag)组成
>
> 由标签和内容组成的成为**元素**(element)
>
> img元素、`<img>`标签

超文本

>页面内可以包含图片、链接、音乐、视频等非文字元素

## 文档声明

`<!doctype html>`

告诉浏览器文档类型

## 单标签

meta、img、br、input没有包含具体内容，书写格式是单标签 而不是通常的标签对

## 后代元素

元素内嵌套的所有层级的元素都是该元素的后代元素

## 所有元素都有的属性

class、id、title

## HTML文件的扩展名

`.htm`或者`.html`

Win95/Win98系统的文件扩展名不能超过3个字符

现在一般都是使用`.html`

## 元素

### html

W3C标准建议，html元素增加一个lang属性设置语言，en、zh-CN、zh

作用：

* 帮助语音合成工具确定要使用的发音
* 帮助翻译工具确定要使用的翻译规则

### head

head元素里面的内容是一些“元数据”

#### meta

元数据 -> metadata

* 描述数据的数据
* 对网页来进行一些基本设置
  * 指定字符集

H5之前，meta标签的写法比较复杂

```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
```

H5

```html
<meta charset="utf-8">
```

视口

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

适配IE，很多都不加

```html
<meta http-equiv="X-UA-Compatible" content="ie=edge">
```

#### link

设置网页图标

`<link rel="shortcut icon" type="image/x-icon" href="https://static.zhihu.com/static/favicon.ico">`

可以省略为

`<link rel="icon" href="https://static.zhihu.com/static/favicon.ico">`

### h

表示网页的标题

h1~h6，六个等级

### p

段落

### strong

加粗，用得不多，一般通过css进行加粗

## SEO

### h元素和SEO优化

h元素有助于网站的SEO，可以促进关键词排名

### SEO

Search Engin Optimization，搜索引擎优化

## 块级元素和内联元素

块级元素在浏览器显示时，通常会以新行来开始（和结束）。

内联元素在显示时通常不会以新行开始，也成为行内元素。

行内元素的宽度和高度是其内容撑开的范围大小，默认不能设置宽度和高度。

可以给块级元素设置宽度和高度，如果一个块级元素没有设置宽度,那么其宽度等于其父元素的宽度。

`<div> `元素是块级元素，可用于组合其他 HTML 元素的容器。

`<span> `元素是内联元素，可用作文本的容器。

## 行内块状元素

- 不自动换行
- 能够识别宽高
- 默认排列方式为从左到右

## 替换元素和非替换元素

替换元素：浏览器并不直接显示其内容，而是通过其某个属性的值来显示具体的内容

非替换元素：浏览器直接显示元素所包含的内容

## `<img>`的alt属性

> alt 属性是一个必需的属性，它规定在图像无法显示时的替代文本。

## `<a>`标签的href属性

### 死链接

`<a href="javascript:void(0)"></a>`

**让超链接去执行一个js函数，而不是去跳转到一个地址**，目的是**保留链接的样式，但不让链接执行实际操作**

### #跳转

`<a href="#"></a>`

**#** 包含了一个位置信息，默认的锚是**#top** 也就是网页的上端。

在页面很长的时候会使用 **#** 来定位页面的具体位置，格式为：**# + id**。

`<a href="#pos">点我定位到指定位置!</a>`

## 备注

* 很少使用br元素来换行

* 浏览器对标签不区分大小写
* 所有的网页目前都需要采用UTF-8编码