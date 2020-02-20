const express = require('express');
let app = express();
let http = require('http');
let path = require('path');
let querystring = require('querystring');
let fs = require('fs');
let url = require('url');
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let mongoUrl = "mongodb://localhost:27017/";
let mysql = require('mysql');

let mysql_connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'web_database_171250560'
});

mysql_connection.connect();

app.use('/public', express.static('public'));   // 使nodejs能够正确访问所有静态资源，css和图片和视频

// app.use(express.json());     // 据说是express新版内置的解析方法，但是没用，只能用下面的两个
app.use(bodyParser.json());     // 正确解析ajax的post数据所需要的解析器1
app.use(bodyParser.urlencoded({ extended: false }));    // 正确解析ajax的post数据所需要的解析器2


// 解决跨域CORS问题，原理不是很清楚.......
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    if (req.method == "OPTIONS") res.send(200);
    /*让options请求快速返回*/ else next();
});

//  登录
// app.post('/log-in/:username/:password', function (req, res) {    // 通过url传输账号密码
app.post('/log-in', function (req, res) {

    let usr = req.body.username;    //  浏览器端传过来的username
    let pwd = req.body.password;    //  浏览器端传过来的password
    console.log(usr + " try Log");

    //  在数据库中查找对应的username
    let queryAccount = 'SELECT * FROM account_web_171250560 where username=' + "\'" + usr + "\';";

    mysql_connection.query(queryAccount,function (err, result) {
        if (err) throw err;
        if (result.length) // 找到对应的username
        {
            if (result[0]["password"] === pwd)
            {   // 密码正确
                console.log(usr + " Login");
                res.send({"status": true, "msg": "登陆成功！"});
            }
            else    // 密码错误
            {
                console.log(usr + " Log Fail");
                res.send({"status": false, "msg": "密码错误"});
            }
        }
        else // 找不到对应的username
        {
            console.log(usr + " Log Fail");
            res.send({"status": false, "msg": "该用户不存在"});
        }

    });

});

//  注册
app.post('/sign-up', function (req, res) {
    let usr = req.body.username;    //  浏览器端传过来的username
    let pwd = req.body.password;    //  浏览器端传过来的password
    console.log(usr + " try Sign");
    // 查找该用户名是否已存在
    let sqlQuery = 'SELECT * FROM account_web_171250560 where username=' + "\'" + usr + "\';";

    mysql_connection.query(sqlQuery,function (err, result) {
        // mongo_collection.find({"username": usr}).toArray(function (err, result) {
        if (err) throw err;
        if (result.length) // 找到对应的username
        {
            res.send({"status": false, "msg": "用户名已存在"});
            console.log(usr + " Sign Fail");
        }
        else
        {    // 将该用户信息加入数据库
            let sqlAdd = 'INSERT INTO account_web_171250560(username, password) VALUES (?,?)';
            let account = [usr, pwd];

            mysql_connection.query(sqlAdd, account,function (err, result) {
            // mongo_collection.insertOne({"username": usr, "password": pwd})
                    console.log(usr + " Sign up");   // 后台打印插入结果
                    res.send({"status": true, "msg": "注册成功！"});
            });
        }
    });
});


let server = app.listen(8082, function () {
    let port = server.address().port;
    console.log('应用实例，访问地址为 http://127.0.0.1:' + port);
});

// app.get('/', function (req, res) {
//     console.log("goto login");
//     res.sendFile(__dirname + '/' + 'html/login.html');
// });
//
// app.get('/index', function (req, res) {
//     console.log("goto index");
//     res.sendFile(__dirname + '/' + 'html/index.html');
// });
//
// app.get('/registered', function (req, res) {
//     console.log("goto registered");
//     res.sendFile(__dirname + '/' + 'html/registered.html');
// });


// http服务端版本
// let server = http.createServer(function(req, res) {
//     let urlObj = url.parse(req.url, true);
//     const urlPathname = urlObj.pathname;
//
//     const pathname = url.parse(req.url).pathname; // 请求的文件名
//
//     // 用于保存拼接后的请求体
//     let post = '';
//     // 'data' 事件触发, 将接受的数据块 chunk 拼接到 post 变量上
//     req.on('data', function (chunk) {
//         post += chunk;
//     });
//     // 请求完毕, 'end' 事件触发
//     req.on('end', function () {
//         // querystring 是 Node.js 自带模块, parse 方法用于将查询字符串解析成对象
//         const queryObj = querystring.parse(post);
//         const query = urlObj.query;
//
//         // 将接收的 POST 请求体以 JSON 格式响应回客户端
//         // res.writeHead(200, { "Content-Type": "text/plain" });
//         // res.write(JSON.stringify(queryObj));
//         // res.end();
//         if (urlPathname === "/post-login")
//         {
//             console.log(urlPathname, query, queryObj);
//             console.log("UserName: " + queryObj.username);
//             console.log("Password: " + queryObj.password);
//             console.log("UserName: " + query.username);
//             console.log("Password: " + query.password);
//             res.write('{"login-success":true,"msg":"注册成功"}');
//             res.end();
//         }
//         else
//         {
//             switch (pathname) {
//                 case "/index":
//                     myReadFile(res, path.join("./html/index.html"));
//                     break;
//                 case "/registered":
//                     myReadFile(res, path.join("./html/registered.html"));
//                     break;
//                 case "/login":
//                 case "/":
//                     myReadFile(res, path.join("./html/login.html"));
//                     break;
//                 default:    // 其他静态资源文件
//                     myReadFile(res, path.join(".", pathname));
//                     break;
//             }
//             console.log("Pathname:" + pathname);
//         }
//
//     });
//
//     // if (req.method == 'POST') {
//
//
//
// });
//
// server.listen(3002, "127.0.0.1",function() {
//     let host = server.address().address;
//     let port = server.address().port;
//     console.log("服务器运行中.");
//     console.log("Address: http://%s:%s", host, port);
// })
//
// // 读取静态文件并返回
// function myReadFile(res, fileName) {
//     fs.readFile(fileName, (err, data) => {
//         // 错误处理
//         if (err) {
//             res.writeHead(404, { "Content-Type": "text/plain" });
//             res.write("404 - NOT FOUND");
//             res.end();
//         } else {
//             res.writeHead(200);
//             res.write(data);
//             res.end();
//         }
//     });
// }
//


// let e = document.querySelector('[data-login-form="trigger"]');

// document.addEventListener('click',function () {
//     console.log("Keep Quiet!");
// });

// function form_listen() {
//     alert("good");
//
//     let info = document.getElementById('login-frame');
//     let username = info['username'].value;
//     alert(username);
// }


//增加一个form表单使得a标签可以以post方式提交
// function doPost(to, p) {  // to:提交动作（action）,p:参数
//     let myForm = document.createElement("form");
//     myForm.method = "post";
//     myForm.action = to;
//     for (let i in p) {
//         let myInput = document.createElement("input");
//         myInput.setAttribute("name", i);  // 为input对象设置name
//         myInput.setAttribute("value", p[i]);  // 为input对象设置value
//         myForm.appendChild(myInput);
//     }
//     document.body.appendChild(myForm);
//     myForm.submit();
//     document.body.removeChild(myForm);  // 提交后移除创建的form
// }