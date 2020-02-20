# Web作业 总说明文档

邝鸿燊 171250560



## 作业2 登录注册

### 界面截图

登录：

![login](.\web2-screenshot\login.png)



注册：

![signup](.\web2-screenshot\signup.png)



主页面：

![index](.\web2-screenshot\index.png)



### 实现功能：

浏览器端与服务器端分开，验证码，通信内容加密，服务器端使用nodejs

浏览器端项目为：171250560-web2

服务器端项目为：171250560-web2-server

使用技术：nodejs, express, md5加密, jQuery, Ajax



### 目录结构

#### 浏览器端

![目录结构1](.\web2-screenshot\目录结构1.png)

- /public - 静态资源文件目录
  - /css - html需要的css文件
  - /tml - 两个主页面
    - index.html - 登陆后的主页
    - login.html - 登录和注册的页面
  - /img - 网页中需要的图片
  - /js - html需要的js文件
    - checkCode.js - 生成验证码与验证验证码
    - md5.min.js - 通过MD5对内容进行加密
    - jquery-3.4.1.min.js - jQuery的js文件
  - /video - 视频



#### 服务器端

![目录结构2](.\web2-screenshot\目录结构2.png)

- /sql - mysql文件
- express本地服务器，端口：http://127.0.0.1:8082
- server.js - express服务端, 使用MySql存储
- server-mongodb.js - 使MongoDB存储的版本



##### 服务端的另一种尝试：HTTP

从server.js的130行开始

通过http.createServer创建服务端，监听3002端口，将前端ajax发送过来的请求进行解析，并做出相应的处理。

与express的方法的不同之处在于，无论前端的请求是get还是post，都可以在createServer的function里进行处理，而express需要对同一请求url设置get和post的两个处理方法。

![http](.\web2-screenshot\http.png)



![http2](.\web2-screenshot\http2.png)

### 存储账号信息的数据库

使用数据库：MySql

Database名：web_database_171250560

Table名：account_web_171250560

![mysql](.\web2-screenshot\mysql.png)

已存在的两个账号：

#1用户名：Mr.MySql3

密码：connection2

#2用户名：pokemon

密码：beamaster



### 验证码

![登陆界面](.\web2-screenshot\登陆界面.png)

由前端随机生成验证码，点击验证码可以更换验证码，验证码的验证由前端负责

点击“加入我们”，登录框会变化为注册框



验证码算法：/js/checkCode.js

原理：从[0-9A-Z]中随机选取5个字符作为当前验证码，并将该验证码字符串用全局函数code保存下来，同时将html中该元素的值刷新为本次验证码，css渲染过后显示为当前的验证码。

![验证码算法](.\web2-screenshot\验证码算法.png)

/public/css/login.css，前端css渲染

![验证码前端](.\web2-screenshot\验证码前端.png)

### 加密

前端检查验证码正确后会将密码通过MD5进行加密，然后将加密过后的MD5和用户名发到服务器端

![加密信息](.\web2-screenshot\加密信息.png)

加密通过md5.min.js的md5()方法来进行加密

该算法出处：https://github.com/blueimp/JavaScript-MD5



### 通信

浏览器端通过jQuery选取元素，然后使用ajax向服务器端发送信息

![ajax](./web2-screenshot\ajax.png)



### 验证身份

服务器端收到用户名和加密后的密码，与数据库中的账户信息进行对比，并将对比结果返回浏览器端





### 注册

![注册](.\web2-screenshot\注册.png)

输入注册信息，浏览器端验证过格式正确后会将信息发送到服务器端，服务器端验证数据库中是否存在已有的用户名，如果没有就注册成功

前端格式验证：用户名至少6个字符，密码至少6个字符，两次密码必须一致

密码也会通过MD5加密过后才发送到服务器端







## 作业3 图片加载



网页交互展示：

![show](.\show.gif)



### 目录结构

![目录结构](.\web3-screenshot\目录结构.png)

/public - 静态文件存放目录

- /html - 本次作业的实现在index.html中
- /css - 本次作业的实现在index.css中
- /js - 本次作业的实现在index.js中
- /img - 图片存放
  - /background - 背景图片
  - /pokemon - 左侧浮动栏内的图片
  - /tiny - 所有图片的略缩图
  - /wallpaper - 大图片瀑布流中的图片
  - favicon.ico - 网站标签的icon图片
- /video - 页面中的视频



### 使用技术

为了用户在低网速下访问网站的体验，要避免在加载多张图片时用户的等待时间，

因此在网站中结合使用了**懒加载**和**渐进式加载**两种方法。



#### 懒加载

页面中的图片主要分成三部分：

- 背景图片

由于我的背景图大部分都是同一个颜色，因此在加载背景图之前先将背景颜色设置为背景图的主颜色，优化用户体验

![背景图片](.\web3-screenshot\背景图片.png)



- 左侧浮动栏中的图片

![左侧浮动栏](.\web3-screenshot\左侧浮动栏.png)

![model略缩图加载](.\web3-screenshot\model略缩图加载.png)



- 大图片瀑布流

![瀑布流图](D:\Code\GitRepository2019.9\Web\Web2\web3-screenshot\瀑布流图.png)

![model略缩图加载](.\web3-screenshot\model略缩图加载.png)



在这三部分图片中，有多图片的两部分都加载了略缩图

而原图url放在每张图片的data-src属性中

略缩图目录为/public/img/tiny，略缩图大小在10kb以内

![略缩图目录](.\web3-screenshot\略缩图目录.png)

原图大小为几百Kb到几Mb不等

![原图目录1](.\web3-screenshot\原图目录1.png)

![原图目录2](.\web3-screenshot\原图目录2.png)

##### 懒加载方式

在/public/js/index.js中，使用API接口IntersectionObserver创建观察者

当观察到有图片进入视图100px以上时，就开始加载原图，将对应图片的data-src的值赋给它的src属性，赋值完后便停止观察该图片

![observer](.\web3-screenshot\observer.png)





#### 渐进式加载

考虑到低网速时的加载体验，略缩图对于用户而言太模糊，在原图还没加载完成前，只加载略缩图对用户体验而言不够友好，因此在略缩图上加上一个高斯模糊，优化了观感

![高斯模糊](.\web3-screenshot\高斯模糊.png)



高斯模糊效果使用css完成，以class的方式加入到每张图片中：

![高斯模糊css](.\web3-screenshot\高斯模糊css.png)

等原图加载完后，移除该图片的高斯模糊class

![移除高斯模糊js](.\web3-screenshot\移除高斯模糊js.png)



#### 视频延迟加载

视频的加载等到页面加载完成后再加载，左侧浮动栏图片列表的原图也是再页面加载完后再加载

![视频懒加载](.\web3-screenshot\视频懒加载.png)



#### 小功能：背景切换

点击页面中左侧浮动栏中的任意一个图片（除了最后一个以外），就会触发**随机背景切换**

![背景切换2](.\web3-screenshot\背景切换2.png)



切换背景时会先切换为要加载的**背景主颜色**，优化加载体验

![背景切换1](.\web3-screenshot\背景切换1.png)





### Chrome开发者工具截图

DOM主体（除了背景图片和视频之外）大小在100kb以内

#### 下载速度：1024kb/s

![1m用户](.\web3-screenshot\1m用户.png)



#### 下载速度：400kb/s

![400k用户](.\web3-screenshot\400k用户.png)



#### 下载速度：100kb/s

![100k用户](.\web3-screenshot\100k用户.png)



加载原图时的网页体验：

![100k用户-原图加载](.\web3-screenshot\100k用户-原图加载.png)