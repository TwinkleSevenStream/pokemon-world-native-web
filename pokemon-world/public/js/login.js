$(function () {
    //  点击验证码图片时，会刷新验证码
    $("#checkCode").on( "click",function () {
        createCode();
    });

    //  登录
    $("#log-in-button").on( "click",function () {
        if (validate()) {    //  验证输入的验证码
            $.ajax({
                // url: "http://127.0.0.1:8082/log-in/" + $("#username").val() + "/" + $("#password").val(),
                url: "http://127.0.0.1:8082/log-in",
                type: "post",
                data: {
                    action: "login",
                    username: $("#username").val(),
                    password: md5($("#password").val())      // 加密
                },
                success: function (res) {
                    if (res.status)     // 账号密码验证成功
                    {
                        alert(res.msg); // 打印信息
                        window.location = "./index.html";   // 跳转
                    } else {
                        //  alert(res.msg); // 此处打印详细的登陆错误信息
                        alert("账户信息有误，请重新输入");
                    }
                },
                error: function (err) {
                    alert("error! 服务器不在线");
                    alert(err);
                }
            });
        }
        else
        {
            alert("请输入正确的验证码");
        }
    });

    //  注册
    $("#sign-up-button").on( "click",function () {

        // 检查输入的格式是否正确
        if ($("#sign-up-password").val() === $("#sign-up-password-again").val() &&
            $("#sign-up-password").val().length >= 6 &&
            $("#sign-up-username").val().length >= 6
        ) {
            $.ajax({
                // url: "http://127.0.0.1:8082/log-in/" + $("#username").val() + "/" + $("#password").val(),
                url: "http://127.0.0.1:8082/sign-up",
                type: "post",
                data: {
                    action: "sign-up",
                    username: $("#sign-up-username").val(),
                    password: md5($("#sign-up-password").val())     // 加密
                },
                success: function (res) {
                    if (res.status)     // 账号密码验证成功
                    {
                        alert(res.msg); // 打印信息
                        window.location = "./index.html";   // 跳转
                    } else {
                        alert(res.msg);
                    }
                },
                error: function (err) {
                    alert("error!");
                    alert(err);
                }
            });
        }
        else if ($("#sign-up-username").val().length < 6)
        {
            alert("账户名需要至少6个字符");
        }
        else if ($("#sign-up-password").val().length < 6)
        {
            alert("密码需要至少6个字符");
        }
        else
        {
            alert("两次输入密码不相同");
        }
    });
});
