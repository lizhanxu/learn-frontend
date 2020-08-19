# Emmet语法

## 生成HTML5的模板代码`！`

`!`或者`html:5`

## 生成后代元素`>`

`div>p>span`

```html
<div>
    <p>
        <span></span>
    </p>
</div>
```

## 生成多个元素`*`

`div>p*4`

```html
<div>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```

## 生成兄弟元素`+`

`h2+div+p`

```html
<h2></h2>
<div></div>
<p></p>
```

## 返回上一层级`^`

一个`^`向上返回一层

`div>p>span^h2+a`

```html
<div>
    <p><span></span></p>
    <h2></h2>
    <a href=""></a>
</div>
```

`div>p>span^^h2+a`

```html
<div>
    <p><span></span></p>
</div>
<h2></h2>
<a href=""></a>
```

## 对元素进行分组`()`

`div>(p>span)+h2+a`

等同于  `div>p>span^h2+a`

```html
<div>
    <p><span></span></p>
    <h2></h2>
    <a href=""></a>
</div>
```

## 生成元素的属性

### 生成id属性`#`

`div#main`

```html
<div id="main"></div>
```

### 生成class属性`.`

`div.main.active`

```html
<div class="main active"></div>
```

### 生成普通属性`[]`

`div[title="首页"]`

```html
<div title="首页"></div>
```

## 生成元素的内容`{}`

`div{Hello World}`

```html
<div>Hello World</div>
```

## 生成结构有数字`$`

`div.box$*4`

```html
<div class="box1"></div>
<div class="box2"></div>
<div class="box3"></div>
<div class="box4"></div>
```

`div>p{文字内容$}*4`

```html
  <div>
    <p>文字内容1</p>
    <p>文字内容2</p>
    <p>文字内容3</p>
    <p>文字内容4</p>
  </div>
```

## 生成隐式标签

### 一般默认生成div元素

`.box`

```html
<div class="box"></div>
```

### ul下默认生成li元素

`ul>.item$*4`

等同于 `ul>li.item$*4`

```html
  <ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
  </ul>
```

### table下默认生成tr元素，tr下默认生成td元素

`table>#row$*4>[colspan="$"]`

```html
  <table>
    <tr id="row1">
      <td colspan="1"></td>
    </tr>
    <tr id="row2">
      <td colspan="2"></td>
    </tr>
    <tr id="row3">
      <td colspan="3"></td>
    </tr>
    <tr id="row4">
      <td colspan="4"></td>
    </tr>
  </table>
```

## css的Emmet语法

`w200+h200+m20+p30`

```css
width: 200px;
height: 200px;
margin: 20px;
padding: 30px;
```

`m20-30-40-50`

```css
margin: 20px 30px 40px 50px;
```

`m10px20px`

```css
margin: 10px 20px;
```

`fz20`

```css
font-size: 20px;
```

`fz1.5`

```css
font-size: 1.5em;
```

`fwb`

```css
font-weight: bold;
```

`bgc#f`

```css
background-color: #ffffff;
```

`dib`

```css
display: inline-block;
```

