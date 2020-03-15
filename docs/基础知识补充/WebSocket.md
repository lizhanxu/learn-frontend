# WebSocket

## 常量

| **Constant**           | **Value** |
| ---------------------- | --------- |
| `WebSocket.CONNECTING` | `0`       |
| `WebSocket.OPEN`       | `1`       |
| `WebSocket.CLOSING`    | `2`       |
| `WebSocket.CLOSED`     | `3`       |

## 属性

### WebSocket.url

WebSocket 的绝对路径

### WebSocket.readyState

获取WebSocket当前状态

### WebSocket.binaryType

返回websocket连接所传输二进制数据的类型

**可以通过该参数进行设置**。**默认格式**为“blob”

有以下两种数据类型：

#### Blob

Binary long object

表示一个**不可变**、原始数据的类文件对象。

可以通过FileReader去读，但是不能写

File对象是Blob对象的扩展

#### ArrayBuffer

表示通用的、固定长度的原始二进制数据缓冲区

是一个字节数组，通常在其他语言中称为“byte array”,

不能直接操作 `ArrayBuffer` 的内容。可以通过DataView进行读写

#### 区别

ArrayBuffer存储在内存当中，Blob可以存储在磁盘或者内存中

#### 选择

需要对字节进行操作的时候，应该选用ArrayBuffer，否则选Blob会更加容易。

### 回调

WebSocket.onclose，用于指定连接关闭后的回调函数

WebSocket.onerror，用于指定连接失败后的回调函数

WebSocket.onmessage，用于指定当从服务器接受到信息时的回调函数

WebSocket.onopen，用于指定连接成功后的回调函数

## 方法

### WebSocket.close([code[,reason]])

关闭当前连接

#### code

数字状态码

code是CloseEvent.code

CloseEvent是onclose的event参数

#### reason

解释关闭原因，不超过123个字节

### WebSocket.send(data)

向服务器发送数据

## 备注

### MIME

Multipurpose Internet Mail Extensions

媒体类型，是一种标准

通用结构：type/subtype

对大小写不敏感，但是传统写法都是小写